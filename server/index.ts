import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import cors from 'cors';

dotenv.config({ path: './.env' });

const app = express();
app.use(express.json());
app.use(cors({ origin: true }));
app.use(morgan('tiny'));

const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 60, // limit each IP to 60 requests per windowMs
  standardHeaders: true,
  legacyHeaders: false,
});

app.use(limiter);

const PORT = Number(process.env.PORT || 3001);

app.get('/api/health', (_req, res) => {
  res.json({ ok: true, env: process.env.NODE_ENV || 'development' });
});

// Vapi proxy endpoint: forwards client requests to the Vapi API using server-side secret
app.all('/api/vapi/*', async (req, res) => {
  try {
    const vapiBase = process.env.VAPI_API_URL || process.env.VAPI_BASE_URL || '';
    const apiKey = process.env.VAPI_PUBLIC_KEY || process.env.VAPI_SECRET || '';

    if (!vapiBase || !apiKey) {
      return res.status(500).json({ error: 'VAPI server not configured on backend' });
    }

    // build target URL
    const targetPath = req.path.replace(/^\/api\/vapi/, '');
    const url = new URL(targetPath, vapiBase);
    url.search = new URLSearchParams(req.query as any).toString();

    const headers: Record<string, string> = { 'Authorization': `Bearer ${apiKey}` };
    // forward content-type if present
    if (req.headers['content-type']) headers['Content-Type'] = String(req.headers['content-type']);

    const response = await fetch(url.toString(), {
      method: req.method,
      headers,
      body: ['GET', 'HEAD'].includes(req.method) ? undefined : JSON.stringify(req.body),
    });

    const text = await response.text();
    res.status(response.status).set(Object.fromEntries(response.headers)).send(text);
  } catch (err: any) {
    console.error('Vapi proxy error:', err);
    res.status(500).json({ error: err?.message || 'Vapi proxy failed' });
  }
});

// Booking endpoint: validates payload and forwards to configured n8n webhook server-side
app.post('/api/book', async (req, res) => {
  try {
    const payload = req.body;

    // Basic sanitization and validation
    if (!payload || typeof payload !== 'object') {
      return res.status(400).json({ error: 'Invalid payload' });
    }

    const callerName = String(payload.callerName || '').trim();
    const callerEmail = String(payload.callerEmail || '').trim();

    if (!callerName || !callerEmail) {
      return res.status(400).json({ error: 'Missing required fields: callerName, callerEmail' });
    }

    const webhook = process.env.VITE_N8N_WEBHOOK_URL || process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL || '';

    if (!webhook) {
      // If webhook not configured, accept and return simulated success
      console.warn('No n8n webhook configured on server. Received booking payload:', payload);
      return res.json({ ok: true, simulated: true });
    }

    const response = await fetch(webhook, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const text = await response.text();
      return res.status(502).json({ error: 'Webhook returned error', status: response.status, body: text });
    }

    return res.json({ ok: true });
  } catch (err: any) {
    console.error('Error in /api/book:', err);
    return res.status(500).json({ error: err?.message || 'Internal server error' });
  }
});

app.listen(PORT, () => {
  console.log(`API server listening on http://localhost:${PORT}`);
});
