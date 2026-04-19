'use client'
import { useState, useRef, useEffect } from 'react'

export default function AiChat() {
  const [started, setStarted] = useState(false)
  const [termsAccepted, setTermsAccepted] = useState(false)
  const [messages, setMessages] = useState<{role: 'user' | 'ai', text: string}[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const quickServices = [
    { icon: '🏦', label: 'Account' },
    { icon: '💳', label: 'Cards' },
    { icon: '📄', label: 'Open Fixed Deposit' },
    { icon: '👆', label: 'Apply For Product' },
    { icon: '📋', label: 'Retail Loan Services' },
    { icon: '🛍️', label: 'Merchant Servicing' },
    { icon: '📈', label: 'Investments' },
    { icon: '💻', label: 'API Support' },
    { icon: '🏢', label: 'Corporate Banking' },
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
      const historyPayload = messages; // Send all previous messages
      
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          history: historyPayload, 
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
    <div className="aha-chat-widget">
      {/* Header */}
      <div className="aha-header">
        <div className="aha-logo">
          <strong>MATE!</strong>
        </div>
        <div className="aha-header-actions">
          <span>➖</span>
          <span>✖️</span>
        </div>
      </div>

      <div className="aha-body">
        {/* Background Pattern Overlay */}
        <div className="aha-bg-pattern"></div>

        {!started ? (
          /* Get Started Screen */
          <div className="aha-get-started">
            <div className="aha-welcome-logo">
              <div className="logo-bubble">
                <h2>MATE!</h2>
                <p>CREDIMATE</p>
              </div>
            </div>
            <div className="aha-welcome-text">
              <h1>Hi</h1>
              <h2>Get Started with CrediMate AI, your CrediMate Anytime Assistant!</h2>
              <p>Happy to help you. Just ask & I'll reply in a jiffy</p>
            </div>
            
            <div className="aha-terms-box">
              <label className="aha-checkbox">
                <input 
                  type="checkbox" 
                  checked={termsAccepted} 
                  onChange={(e) => setTermsAccepted(e.target.checked)} 
                />
                <span>I have read, understood and accepted all the <a href="#">Terms & Conditions</a></span>
              </label>
              
              <div className="aha-start-actions">
                <button 
                  className={`aha-btn ${termsAccepted ? 'active' : 'disabled'}`}
                  disabled={!termsAccepted}
                  onClick={() => setStarted(true)}
                >
                  Get Started!
                </button>
                <div className="aha-lang-toggle">
                  <span className="active">EN</span>
                  <span>हिं</span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Chat Screen */
          <div className="aha-chat-area">
            <div className="aha-chat-messages">
              {/* Initial Greeting */}
              <div className="aha-msg ai-msg greeting-msg">
                <div className="logo-bubble small">
                  <h2>MATE!</h2>
                  <p>CREDIMATE</p>
                </div>
                <div className="greeting-text">
                  <h3>Hi, Welcome To CrediMate!</h3>
                  <p>I'm CrediMate AI, your personal banking assistant</p>
                </div>
              </div>

              {messages.length === 0 && (
                <div className="aha-services-container">
                  <p className="services-prompt">Do you want help with any of these services?</p>
                  <div className="aha-chips">
                    {quickServices.map((service, idx) => (
                      <button 
                        key={idx} 
                        className="aha-chip"
                        onClick={() => handleSend(`I need help with ${service.label}`)}
                      >
                        <span className="chip-icon">{service.icon}</span> {service.label}
                      </button>
                    ))}
                  </div>

                  {/* Promo Banner */}
                  <div className="aha-promo-banner">
                    <div className="promo-text">
                      <h3>12 EMIs off* with<br/>Home Loans</h3>
                      <p>at attractive rates of interest</p>
                      <button className="promo-btn">Apply Now</button>
                    </div>
                    <div className="promo-image">🏠👨‍🦰</div>
                  </div>
                </div>
              )}

              {/* Dynamic Messages */}
              {messages.map((msg, idx) => (
                <div key={idx} className={`aha-msg ${msg.role === 'user' ? 'user-msg' : 'ai-msg'}`}>
                  {msg.role === 'ai' && (
                    <div className="logo-bubble tiny">
                      <b>MATE</b>
                    </div>
                  )}
                  <div className={`msg-bubble ${msg.role}`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              
              {loading && (
                <div className="aha-msg ai-msg">
                   <div className="logo-bubble tiny"><b>MATE</b></div>
                   <div className="msg-bubble ai"><span className="spinner"></span></div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="aha-input-area">
              <button className="icon-btn">🍔</button>
              <div className="input-wrapper">
                <input 
                  type="text" 
                  placeholder="How may I help you?" 
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend(input)}
                  disabled={loading}
                />
                <button className="icon-btn mic-btn">🎤</button>
              </div>
              <div className="aha-lang-toggle small">
                <span className="active">EN</span>
                <span>हिं</span>
              </div>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        .aha-chat-widget {
          width: 100%;
          max-width: 450px;
          height: 700px;
          background: #ffffff;
          border-radius: 12px;
          box-shadow: 0 10px 40px rgba(0,0,0,0.15);
          display: flex;
          flex-direction: column;
          overflow: hidden;
          font-family: 'Lato', sans-serif;
          position: relative;
        }

        .aha-header {
          background: #97144D;
          color: white;
          padding: 12px 20px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          z-index: 10;
        }

        .aha-logo strong {
          background: white;
          color: #97144D;
          padding: 4px 8px;
          border-radius: 4px;
          font-size: 1.2rem;
          font-weight: 900;
        }

        .aha-header-actions span {
          margin-left: 15px;
          cursor: pointer;
          font-size: 14px;
        }

        .aha-body {
          flex: 1;
          position: relative;
          display: flex;
          flex-direction: column;
          background: #fdfdfd;
        }

        .aha-bg-pattern {
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
          background-image: radial-gradient(#e5e5e5 1px, transparent 1px);
          background-size: 20px 20px;
          opacity: 0.5;
          pointer-events: none;
          z-index: 0;
        }

        /* Get Started Screen */
        .aha-get-started {
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
          background: linear-gradient(to bottom right, rgba(255,255,255,0.9), rgba(245,245,245,0.95));
          z-index: 5;
          display: flex;
          flex-direction: column;
        }

        .aha-welcome-logo {
          padding: 30px 20px 10px;
        }

        .logo-bubble {
          background: #C41E64;
          color: white;
          display: inline-flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 15px 20px;
          border-radius: 12px;
          border-bottom-right-radius: 0;
          box-shadow: 0 4px 10px rgba(0,0,0,0.1);
        }

        .logo-bubble h2 { margin: 0; font-size: 1.8rem; font-weight: 900; }
        .logo-bubble p { margin: 0; font-size: 0.6rem; letter-spacing: 1px; }

        .logo-bubble.small { padding: 10px 15px; }
        .logo-bubble.small h2 { font-size: 1.2rem; }
        
        .logo-bubble.tiny { padding: 5px; border-radius: 8px; border-bottom-right-radius: 0; }
        .logo-bubble.tiny b { font-size: 0.8rem; }

        .aha-welcome-text {
          padding: 0 20px;
          flex: 1;
        }
        
        .aha-welcome-text h1 { font-size: 2rem; color: #333; margin-bottom: 5px; }
        .aha-welcome-text h2 { font-size: 1.4rem; color: #333; margin-bottom: 15px; line-height: 1.4; }
        .aha-welcome-text p { color: #666; font-size: 1rem; }

        .aha-terms-box {
          background: white;
          padding: 20px;
          border-top: 1px solid #eee;
        }

        .aha-checkbox {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          font-size: 0.9rem;
          color: #333;
          margin-bottom: 20px;
          cursor: pointer;
        }
        .aha-checkbox a { color: #C41E64; text-decoration: none; }

        .aha-start-actions {
          display: flex;
          gap: 15px;
          align-items: stretch;
        }

        .aha-btn {
          flex: 1;
          padding: 15px;
          border: none;
          border-radius: 8px;
          font-size: 1.1rem;
          font-weight: 700;
          color: white;
          transition: 0.3s;
        }
        .aha-btn.disabled { background: #b0b0b0; cursor: not-allowed; }
        .aha-btn.active { background: #97144D; cursor: pointer; }

        .aha-lang-toggle {
          display: flex;
          background: #f0f0f0;
          border-radius: 8px;
          overflow: hidden;
        }
        .aha-lang-toggle span {
          padding: 0 15px;
          display: flex;
          align-items: center;
          font-weight: 700;
          color: #666;
          cursor: pointer;
        }
        .aha-lang-toggle span.active { background: #C41E64; color: white; }

        /* Chat Area */
        .aha-chat-area {
          flex: 1;
          display: flex;
          flex-direction: column;
          z-index: 2;
          height: 100%;
        }

        .aha-chat-messages {
          flex: 1;
          padding: 20px;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          gap: 15px;
        }

        .greeting-msg {
          display: flex;
          gap: 15px;
          align-items: flex-start;
          margin-bottom: 20px;
        }

        .greeting-text h3 { color: #333; margin-bottom: 5px; font-size: 1.2rem; }
        .greeting-text p { color: #666; font-size: 0.95rem; }

        .aha-services-container {
          background: #f5f5f5;
          border-radius: 12px;
          padding: 15px;
          margin-bottom: 20px;
        }

        .services-prompt {
          font-weight: 600;
          color: #333;
          margin-bottom: 15px;
        }

        .aha-chips {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin-bottom: 20px;
        }

        .aha-chip {
          background: white;
          border: 1px solid #ddd;
          padding: 8px 15px;
          border-radius: 20px;
          font-size: 0.85rem;
          color: #333;
          cursor: pointer;
          transition: 0.2s;
          display: flex;
          align-items: center;
          gap: 5px;
        }
        .aha-chip:hover { border-color: #97144D; color: #97144D; }

        .aha-promo-banner {
          background: #fef0ea;
          border-radius: 12px;
          display: flex;
          overflow: hidden;
        }
        .promo-text { padding: 20px; flex: 1; }
        .promo-text h3 { color: #333; font-size: 1.1rem; margin-bottom: 5px; }
        .promo-text p { color: #666; font-size: 0.85rem; margin-bottom: 15px; }
        .promo-btn {
          background: #97144D;
          color: white;
          border: none;
          padding: 8px 15px;
          border-radius: 6px;
          font-weight: 700;
          cursor: pointer;
        }
        .promo-image {
          width: 100px;
          background: #c4f0d4;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 3rem;
        }

        .aha-msg {
          display: flex;
          gap: 10px;
          max-width: 90%;
        }
        .aha-msg.user-msg { align-self: flex-end; flex-direction: row-reverse; }
        
        .msg-bubble {
          padding: 12px 16px;
          border-radius: 12px;
          font-size: 0.95rem;
          line-height: 1.4;
        }
        .msg-bubble.user { background: #f0f0f0; color: #333; border-bottom-right-radius: 0; }
        .msg-bubble.ai { background: white; color: #333; border: 1px solid #eee; border-top-left-radius: 0; box-shadow: 0 2px 5px rgba(0,0,0,0.02); }

        /* Input Area */
        .aha-input-area {
          padding: 15px;
          background: white;
          border-top: 1px solid #eee;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .icon-btn {
          background: none;
          border: none;
          font-size: 1.2rem;
          cursor: pointer;
          color: #666;
        }

        .input-wrapper {
          flex: 1;
          display: flex;
          align-items: center;
          background: #f9f9f9;
          border: 1px solid #ddd;
          border-radius: 20px;
          padding: 5px 15px;
        }
        .input-wrapper input {
          flex: 1;
          border: none;
          background: transparent;
          padding: 8px 0;
          font-size: 0.95rem;
          outline: none;
        }
        .mic-btn { color: #97144D; }

        .aha-lang-toggle.small span { padding: 0 8px; font-size: 0.8rem; border-radius: 4px; }
      `}</style>
    </div>
  )
}
