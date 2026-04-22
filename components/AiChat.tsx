'use client'
import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Send, 
  Mic, 
  Menu, 
  X, 
  Minus, 
  Maximize2, 
  User, 
  Bot, 
  ChevronRight,
  ShieldCheck,
  Zap,
  Clock,
  Sparkles
} from 'lucide-react'

interface Message {
  role: 'user' | 'ai';
  text: string;
}

interface QuickService {
  icon: string;
  label: string;
}

export default function AiChat() {
  const [started, setStarted] = useState(false)
  const [termsAccepted, setTermsAccepted] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [showWelcome, setShowWelcome] = useState(true)

  const quickServices: QuickService[] = [
    { icon: '🏦', label: 'Account' },
    { icon: '💳', label: 'Cards' },
    { icon: '📄', label: 'Fixed Deposit' },
    { icon: '📋', label: 'Loan Services' },
    { icon: '📈', label: 'Investments' },
    { icon: '🏢', label: 'Corporate' },
  ]

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  async function handleSend(text: string) {
    if (!text.trim()) return

    setMessages(prev => [...prev, { role: 'user', text }])
    setInput('')
    setLoading(true)

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          history: messages, 
          message: text 
        })
      })
      const data = await res.json()
      setMessages(prev => [...prev, { role: 'ai', text: data.reply || 'I am sorry, I am currently undergoing maintenance.' }])
    } catch (err) {
      setMessages(prev => [...prev, { role: 'ai', text: 'Error connecting to the AI brain.' }])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="chat-widget-premium">
      <div className="chat-header">
        <div className="header-left">
          <div className="ai-status">
            <div className="status-dot"></div>
            <span>Online</span>
          </div>
          <div className="header-logo">
            <strong>CREDI</strong>MATE!
          </div>
        </div>
        <div className="header-actions">
          <button className="action-btn"><Minus size={16} /></button>
          <button className="action-btn"><Maximize2 size={16} /></button>
          <button className="action-btn close-btn"><X size={16} /></button>
        </div>
      </div>

      <div className="chat-body-container">
        <AnimatePresence mode="wait">
          {!started ? (
            <motion.div 
              key="welcome"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="welcome-screen"
            >
              <div className="welcome-content">
                <div className="big-logo-bubble">
                  <Bot size={48} />
                </div>
                <h1>Hello!</h1>
                <h2>Welcome to CrediMate <span>Concierge</span></h2>
                <p>I am your AI banking assistant, ready to help you with anything from loans to investments.</p>
              </div>
              
              <div className="welcome-footer">
                <label className="custom-checkbox">
                  <input 
                    type="checkbox" 
                    checked={termsAccepted} 
                    onChange={(e) => setTermsAccepted(e.target.checked)} 
                  />
                  <span className="checkmark"></span>
                  <span className="label-text">I accept the <a href="#">Terms & Conditions</a></span>
                </label>
                
                <button 
                  className={`start-btn ${termsAccepted ? 'active' : ''}`}
                  disabled={!termsAccepted}
                  onClick={() => setStarted(true)}
                >
                  Start Conversation <ChevronRight size={18} />
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div 
              key="chat"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="chat-interface"
            >
              <div className="message-area">
                <div className="message ai-message greeting">
                  <div className="bot-avatar"><Bot size={20} /></div>
                  <div className="msg-content">
                    <h3>Welcome back!</h3>
                    <p>How can I assist your financial journey today?</p>
                  </div>
                </div>

                {messages.length === 0 && (
                  <div className="quick-services">
                    <p>Popular Services:</p>
                    <div className="service-chips">
                      {quickServices.map((service, i) => (
                        <button key={i} onClick={() => handleSend(`Tell me about ${service.label}`)}>
                          {service.icon} {service.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {messages.map((msg, i) => (
                  <div key={i} className={`message ${msg.role === 'user' ? 'user-message' : 'ai-message'}`}>
                    {msg.role === 'ai' && <div className="bot-avatar"><Bot size={20} /></div>}
                    <div className="msg-bubble">
                      {msg.text}
                    </div>
                  </div>
                ))}
                
                {loading && (
                  <div className="message ai-message">
                    <div className="bot-avatar"><Bot size={20} /></div>
                    <div className="msg-bubble loading">
                      <span className="dot"></span>
                      <span className="dot"></span>
                      <span className="dot"></span>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              <div className="input-footer">
                <div className="input-container">
                  <button className="utility-btn"><Menu size={20} /></button>
                  <input 
                    type="text" 
                    placeholder="Type your message..." 
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSend(input)}
                    disabled={loading}
                  />
                  <button 
                    className={`send-btn ${input.trim() ? 'active' : ''}`}
                    onClick={() => handleSend(input)}
                    disabled={!input.trim() || loading}
                  >
                    <Send size={20} />
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <style jsx>{`
        .chat-widget-premium {
          width: 100%;
          background: white;
          border-radius: 24px;
          box-shadow: 0 30px 60px rgba(0,0,0,0.1);
          height: 700px;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          border: 1px solid rgba(0,0,0,0.05);
          position: relative;
        }

        .chat-header {
          background: var(--primary-burgundy);
          color: white;
          padding: 1.5rem 2rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          z-index: 10;
        }

        .header-left {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .ai-status {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.7rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1px;
          opacity: 0.8;
        }
        .status-dot { width: 6px; height: 6px; background: #10b981; border-radius: 50%; box-shadow: 0 0 8px #10b981; }

        .header-logo {
          font-size: 1.2rem;
          font-weight: 300;
          letter-spacing: -0.5px;
        }
        .header-logo strong { font-weight: 900; }

        .header-actions { display: flex; gap: 0.5rem; }
        .action-btn {
          background: rgba(255,255,255,0.1);
          border: none;
          color: white;
          width: 32px;
          height: 32px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: 0.2s;
        }
        .action-btn:hover { background: rgba(255,255,255,0.2); }

        .chat-body-container { flex: 1; position: relative; background: #fdfdfd; }

        /* Welcome Screen */
        .welcome-screen {
          padding: 3rem 2rem;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          text-align: center;
        }

        .big-logo-bubble {
          width: 100px; height: 100px; background: var(--primary-burgundy);
          color: white; border-radius: 30px; display: flex; align-items: center;
          justify-content: center; margin: 0 auto 2rem; box-shadow: 0 20px 40px rgba(151, 20, 77, 0.2);
        }

        .welcome-content h1 { font-size: 2.5rem; color: #333; margin-bottom: 0.5rem; }
        .welcome-content h2 { font-size: 1.5rem; color: #666; font-weight: 300; }
        .welcome-content h2 span { color: var(--primary-burgundy); font-weight: 800; }
        .welcome-content p { color: #888; margin-top: 1.5rem; line-height: 1.6; }

        .welcome-footer { display: flex; flex-direction: column; gap: 1.5rem; }

        .custom-checkbox {
          display: flex; align-items: center; gap: 10px; cursor: pointer; font-size: 0.9rem; color: #666; justify-content: center;
        }
        .custom-checkbox input { display: none; }
        .checkmark { width: 20px; height: 20px; border: 2px solid #ddd; border-radius: 6px; position: relative; }
        .custom-checkbox input:checked + .checkmark { background: var(--primary-burgundy); border-color: var(--primary-burgundy); }
        .custom-checkbox input:checked + .checkmark:after {
          content: ""; position: absolute; left: 6px; top: 2px; width: 5px; height: 10px;
          border: solid white; border-width: 0 2px 2px 0; transform: rotate(45deg);
        }

        .start-btn {
          background: #f1f5f9; color: #94a3b8; border: none; padding: 1.2rem;
          border-radius: 16px; font-weight: 800; font-size: 1rem; display: flex;
          align-items: center; justify-content: center; gap: 0.5rem; transition: 0.3s;
        }
        .start-btn.active { background: var(--primary-burgundy); color: white; cursor: pointer; }
        .start-btn.active:hover { transform: translateY(-2px); box-shadow: 0 10px 20px rgba(151, 20, 77, 0.2); }

        /* Chat Interface */
        .chat-interface { height: 100%; display: flex; flex-direction: column; }
        .message-area { flex: 1; padding: 2rem; overflow-y: auto; display: flex; flex-direction: column; gap: 1.5rem; }

        .message { display: flex; gap: 1rem; max-width: 85%; }
        .ai-message { align-self: flex-start; }
        .user-message { align-self: flex-end; flex-direction: row-reverse; }

        .bot-avatar {
          width: 36px; height: 36px; background: #fdf2f7; color: var(--primary-burgundy);
          border-radius: 12px; display: flex; align-items: center; justify-content: center; flex-shrink: 0;
        }

        .msg-bubble {
          padding: 1rem 1.25rem; border-radius: 18px; font-size: 0.95rem; line-height: 1.5;
        }
        .ai-message .msg-bubble { background: white; color: #333; border: 1px solid #f1f5f9; border-top-left-radius: 2px; box-shadow: 0 2px 10px rgba(0,0,0,0.02); }
        .user-message .msg-bubble { background: var(--primary-burgundy); color: white; border-top-right-radius: 2px; }

        .greeting .msg-content h3 { font-size: 1.1rem; color: #333; margin-bottom: 0.25rem; }
        .greeting .msg-content p { color: #666; font-size: 0.9rem; }

        .quick-services { background: #f8fafc; padding: 1.5rem; border-radius: 20px; border: 1px dashed #e2e8f0; }
        .quick-services p { font-size: 0.8rem; font-weight: 700; color: #94a3b8; text-transform: uppercase; margin-bottom: 1rem; }
        .service-chips { display: flex; flex-wrap: wrap; gap: 0.75rem; }
        .service-chips button {
          background: white; border: 1px solid #e2e8f0; padding: 0.6rem 1rem;
          border-radius: 12px; font-size: 0.85rem; font-weight: 600; color: #475569;
          cursor: pointer; transition: 0.2s;
        }
        .service-chips button:hover { border-color: var(--primary-burgundy); color: var(--primary-burgundy); }

        .input-footer { padding: 1.5rem; background: white; border-top: 1px solid #f1f5f9; }
        .input-container {
          background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 16px;
          padding: 0.5rem; display: flex; align-items: center; gap: 0.5rem;
        }
        .input-container input {
          flex: 1; border: none; background: transparent; padding: 0.5rem;
          font-size: 0.95rem; outline: none; color: #333;
        }
        .utility-btn, .send-btn {
          width: 40px; height: 40px; border-radius: 12px; border: none;
          display: flex; align-items: center; justify-content: center; cursor: pointer; transition: 0.2s;
        }
        .utility-btn { background: transparent; color: #94a3b8; }
        .send-btn { background: #f1f5f9; color: #cbd5e1; }
        .send-btn.active { background: var(--primary-burgundy); color: white; }

        .loading { display: flex; gap: 4px; padding: 1.2rem !important; }
        .loading .dot { width: 6px; height: 6px; background: #cbd5e1; border-radius: 50%; animation: bounce 1.4s infinite ease-in-out both; }
        .loading .dot:nth-child(1) { animation-delay: -0.32s; }
        .loading .dot:nth-child(2) { animation-delay: -0.16s; }

        @keyframes bounce { 0%, 80%, 100% { transform: scale(0); } 40% { transform: scale(1.0); } }

        @media (max-width: 600px) {
          .chat-widget-premium { height: 600px; }
          .welcome-content h1 { font-size: 2rem; }
        }
      `}</style>
    </div>
  )
}
