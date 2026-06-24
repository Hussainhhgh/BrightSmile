/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import Vapi from '@vapi-ai/web';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Mic, MicOff, X, Sparkles, MessageSquare, AlertCircle, Settings, Check, RefreshCw 
} from 'lucide-react';

interface TranscriptMessage {
  id: string;
  role: 'user' | 'assistant';
  text: string;
  isFinal: boolean;
  timestamp: Date;
}

export default function VapiVoiceAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [isCallActive, setIsCallActive] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<'idle' | 'connecting' | 'active' | 'error' | 'stopped'>('idle');
  const [error, setError] = useState<string | null>(null);
  const [volumeLevel, setVolumeLevel] = useState(0);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [messages, setMessages] = useState<TranscriptMessage[]>([]);
  const [showSettings, setShowSettings] = useState(false);

  // Load from environment variables or custom local storage fallbacks
  const [vapiPublicKey, setVapiPublicKey] = useState(() => {
    return (
      (import.meta.env.VITE_VAPI_PUBLIC_KEY as string) ||
      (import.meta.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY as string) ||
      localStorage.getItem('vapi_public_key') ||
      ''
    );
  });

  const [vapiAssistantId, setVapiAssistantId] = useState(() => {
    return (
      (import.meta.env.VITE_VAPI_ASSISTANT_ID as string) ||
      (import.meta.env.NEXT_PUBLIC_VAPI_ASSISTANT_ID as string) ||
      localStorage.getItem('vapi_assistant_id') ||
      ''
    );
  });

  const vapiRef = useRef<any>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Save settings when changed
  const handleSaveSettings = (key: string, assistantId: string) => {
    setVapiPublicKey(key);
    setVapiAssistantId(assistantId);
    localStorage.setItem('vapi_public_key', key);
    localStorage.setItem('vapi_assistant_id', assistantId);
    setShowSettings(false);
    // Force re-instantiation
    if (vapiRef.current) {
      vapiRef.current.stop();
      vapiRef.current = null;
    }
  };

  // Scroll to bottom on new transcript message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isOpen]);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (vapiRef.current) {
        vapiRef.current.stop();
      }
    };
  }, []);

  const startVoiceCall = () => {
    if (!vapiPublicKey || !vapiAssistantId) {
      setShowSettings(true);
      setError('Please provide your Vapi Public Key and Assistant ID to start.');
      return;
    }

    setError(null);
    setConnectionStatus('connecting');
    setMessages([]);

    try {
      // Lazy init of Vapi instance
      if (!vapiRef.current) {
        vapiRef.current = new Vapi(vapiPublicKey);

        // Bind Events
        vapiRef.current.on('call-start', () => {
          setConnectionStatus('active');
          setIsCallActive(true);
          setMessages([
            {
              id: 'init',
              role: 'assistant',
              text: "Hello! Thank you for calling BrightSmile Dental Clinic. How can I assist you with your oral health today?",
              isFinal: true,
              timestamp: new Date(),
            },
          ]);
        });

        vapiRef.current.on('call-end', () => {
          setConnectionStatus('stopped');
          setIsCallActive(false);
          setVolumeLevel(0);
          setIsSpeaking(false);
        });

        vapiRef.current.on('volume-level', (vol: number) => {
          setVolumeLevel(vol);
        });

        vapiRef.current.on('speech-start', () => {
          setIsSpeaking(true);
        });

        vapiRef.current.on('speech-end', () => {
          setIsSpeaking(false);
        });

        vapiRef.current.on('message', (message: any) => {
          if (message.type === 'transcript') {
            const { role, transcript, transcriptType } = message;
            if (!transcript) return;

            setMessages((prev) => {
              const last = prev[prev.length - 1];
              if (last && last.role === role && !last.isFinal) {
                const updated = [...prev];
                updated[updated.length - 1] = {
                  ...last,
                  text: transcript,
                  isFinal: transcriptType === 'final',
                  timestamp: new Date(),
                };
                return updated;
              } else {
                return [
                  ...prev,
                  {
                    id: Math.random().toString(),
                    role: role as 'user' | 'assistant',
                    text: transcript,
                    isFinal: transcriptType === 'final',
                    timestamp: new Date(),
                  },
                ];
              }
            });
          }
        });

        vapiRef.current.on('error', (err: any) => {
          console.error('Vapi Error:', err);
          setError(err?.message || 'Failed to connect. Please check your keys.');
          setConnectionStatus('error');
          setIsCallActive(false);
        });
      }

      vapiRef.current.start(vapiAssistantId);
    } catch (err: any) {
      console.error(err);
      setError(err?.message || 'An unexpected error occurred during startup.');
      setConnectionStatus('error');
      setIsCallActive(false);
    }
  };

  const stopVoiceCall = () => {
    if (vapiRef.current) {
      vapiRef.current.stop();
    }
    setConnectionStatus('stopped');
    setIsCallActive(false);
    setVolumeLevel(0);
    setIsSpeaking(false);
  };

  const handleToggleCall = () => {
    if (isCallActive) {
      stopVoiceCall();
    } else {
      startVoiceCall();
    }
  };

  return (
    <>
      {/* Floating Microphone Button */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 10 }}
              className="mb-4 w-96 max-w-[calc(100vw-2rem)] bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-100 overflow-hidden flex flex-col h-[500px]"
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-blue-600 to-cyan-500 px-4 py-4 flex justify-between items-center text-white">
                <div className="flex items-center space-x-2">
                  <div className="bg-white/20 p-1.5 rounded-lg animate-pulse">
                    <Sparkles className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-sm tracking-wide leading-tight">
                      Olivia - Voice Assistant
                    </h3>
                    <p className="text-[10px] text-cyan-100 font-mono">
                      {connectionStatus === 'active' ? '● Live Call Connected' : 'BrightSmile AI Receptionist'}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-1.5">
                  <button
                    onClick={() => setShowSettings(!showSettings)}
                    className="p-1.5 hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
                    title="Assistant Credentials"
                  >
                    <Settings className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-1.5 hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Main Workspace Area */}
              <div className="flex-1 overflow-y-auto p-4 flex flex-col bg-slate-50/50">
                {showSettings ? (
                  /* Settings Interface */
                  <div className="flex-1 flex flex-col justify-center space-y-4 p-2">
                    <h4 className="font-display font-semibold text-gray-800 text-sm flex items-center gap-1.5">
                      <Settings className="w-4 h-4 text-blue-600" />
                      Vapi Voice Assistant Keys
                    </h4>
                    <p className="text-xs text-gray-500 leading-relaxed">
                      To test the live dental receptionist, configure your credentials below. These are stored securely in your browser cache.
                    </p>
                    <div className="space-y-3 text-xs">
                      <div>
                        <label className="block text-gray-600 font-medium mb-1">Vapi Public Key</label>
                        <input
                          type="password"
                          value={vapiPublicKey}
                          onChange={(e) => setVapiPublicKey(e.target.value)}
                          placeholder="vapi-public-key-..."
                          className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-gray-800 bg-white"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-600 font-medium mb-1">Assistant ID</label>
                        <input
                          type="text"
                          value={vapiAssistantId}
                          onChange={(e) => setVapiAssistantId(e.target.value)}
                          placeholder="e.g. 56a297fc-..."
                          className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-gray-800 bg-white"
                        />
                      </div>
                    </div>
                    <div className="flex gap-2 pt-2">
                      <button
                        onClick={() => handleSaveSettings(vapiPublicKey, vapiAssistantId)}
                        className="flex-1 py-2 bg-blue-600 text-white font-medium text-xs rounded-lg hover:bg-blue-700 transition cursor-pointer flex justify-center items-center gap-1.5"
                      >
                        <Check className="w-3.5 h-3.5" /> Save Keys
                      </button>
                      <button
                        onClick={() => setShowSettings(false)}
                        className="py-2 px-3 bg-gray-100 text-gray-600 font-medium text-xs rounded-lg hover:bg-gray-200 transition cursor-pointer"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  /* Call Chat Interface */
                  <div className="flex-1 flex flex-col">
                    {error && (
                      <div className="mb-3 p-3 bg-red-50 border border-red-100 rounded-xl text-xs text-red-600 flex items-start space-x-2">
                        <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                        <span>{error}</span>
                      </div>
                    )}

                    {messages.length === 0 ? (
                      /* Idle State Hints */
                      <div className="flex-1 flex flex-col justify-center items-center text-center p-4">
                        <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 mb-4 animate-bounce">
                          <Mic className="w-8 h-8" />
                        </div>
                        <h4 className="font-display font-bold text-gray-800 text-sm mb-1">Olivia is ready to speak</h4>
                        <p className="text-xs text-gray-500 max-w-[220px] mb-4">
                          Start a real voice session to ask about appointments, cleaning details, and services!
                        </p>
                        <div className="w-full text-left bg-white border border-gray-100 p-3.5 rounded-xl space-y-2">
                          <span className="text-[10px] font-mono text-gray-400 uppercase tracking-wider block font-semibold">Try asking Olivia:</span>
                          <p className="text-xs text-gray-600 bg-gray-50 p-1.5 rounded border border-gray-100">"Can I book a routine cleaning next Saturday?"</p>
                          <p className="text-xs text-gray-600 bg-gray-50 p-1.5 rounded border border-gray-100">"Do you take PPO insurance plans?"</p>
                        </div>
                      </div>
                    ) : (
                      /* Live Transcripts Scroll Window */
                      <div className="flex-1 flex flex-col space-y-3 pb-4">
                        {messages.map((msg) => (
                          <div
                            key={msg.id}
                            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                          >
                            <div
                              className={`max-w-[85%] p-3 rounded-2xl text-xs leading-relaxed shadow-sm ${
                                msg.role === 'user'
                                  ? 'bg-blue-600 text-white rounded-tr-none'
                                  : 'bg-white text-gray-800 border border-gray-100 rounded-tl-none'
                              }`}
                            >
                              <span className="block text-[8px] opacity-70 mb-1 uppercase tracking-wider font-mono">
                                {msg.role === 'user' ? 'You' : 'Olivia'}
                              </span>
                              <span>{msg.text}</span>
                              {!msg.isFinal && (
                                <span className="inline-flex gap-0.5 ml-1">
                                  <span className="w-1 h-1 bg-current rounded-full animate-bounce delay-100" />
                                  <span className="w-1 h-1 bg-current rounded-full animate-bounce delay-200" />
                                  <span className="w-1 h-1 bg-current rounded-full animate-bounce delay-300" />
                                </span>
                              )}
                            </div>
                          </div>
                        ))}
                        <div ref={messagesEndRef} />
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Call Controls and Waveform Visualizer */}
              <div className="bg-white border-t border-gray-100 p-4 flex flex-col items-center">
                {/* Audio Waveform Reaction */}
                {isCallActive && (
                  <div className="flex items-center space-x-1 justify-center h-8 mb-3">
                    {Array.from({ length: 9 }).map((_, i) => {
                      // Generate varying scaling heights reacting to volume level
                      const val = Math.max(0.15, volumeLevel * (1.2 - Math.abs(i - 4) * 0.15) * (1 + Math.random() * 0.5));
                      const height = `${Math.min(100, Math.round(val * 100))}%`;
                      return (
                        <motion.div
                          key={i}
                          animate={{ height: isCallActive ? height : '4px' }}
                          transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                          className={`w-1 rounded-full ${
                            isSpeaking ? 'bg-cyan-500' : 'bg-blue-600'
                          }`}
                          style={{ height: '4px' }}
                        />
                      );
                    })}
                  </div>
                )}

                <div className="w-full flex justify-between items-center">
                  <span className="text-[10px] text-gray-400 font-mono flex items-center gap-1">
                    <span className={`w-2 h-2 rounded-full ${
                      connectionStatus === 'active' ? 'bg-emerald-500 animate-pulse' :
                      connectionStatus === 'connecting' ? 'bg-amber-400 animate-spin' : 'bg-gray-300'
                    }`} />
                    Status: {connectionStatus.toUpperCase()}
                  </span>

                  <button
                    onClick={handleToggleCall}
                    className={`px-5 py-2.5 rounded-full text-xs font-semibold flex items-center space-x-2 cursor-pointer transition-all duration-200 shadow-md ${
                      isCallActive
                        ? 'bg-rose-500 hover:bg-rose-600 text-white shadow-rose-100'
                        : 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-100'
                    }`}
                  >
                    {isCallActive ? (
                      <>
                        <MicOff className="w-3.5 h-3.5" />
                        <span>Hang Up Call</span>
                      </>
                    ) : (
                      <>
                        <Mic className="w-3.5 h-3.5" />
                        <span>Start Voice Session</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Outer Circular Microphone Trigger */}
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`p-4 rounded-full text-white shadow-2xl relative cursor-pointer z-50 ${
            isCallActive
              ? 'bg-gradient-to-tr from-cyan-500 to-emerald-500 shadow-cyan-300'
              : 'bg-gradient-to-tr from-blue-600 to-cyan-500 shadow-blue-300'
          }`}
        >
          {isCallActive ? (
            <div className="absolute inset-0 bg-cyan-400 rounded-full animate-ping opacity-20 pointer-events-none" />
          ) : (
            <div className="absolute inset-0 bg-blue-500 rounded-full animate-pulse opacity-10 pointer-events-none" />
          )}
          {isCallActive ? <Mic className="w-6 h-6 animate-pulse" /> : <MessageSquare className="w-6 h-6" />}
        </motion.button>
      </div>
    </>
  );
}
