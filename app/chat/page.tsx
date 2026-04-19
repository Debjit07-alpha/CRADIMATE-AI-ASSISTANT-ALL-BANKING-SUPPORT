import AiChat from '@/components/AiChat'

export default function ChatPage() {
  return (
    <main className="main-content" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h2 className="section-title" style={{ marginBottom: '1rem' }}>CrediMate <strong>AI Support</strong></h2>
      <p style={{ color: 'var(--text-light)', marginBottom: '2rem' }}>Ask me anything about loans, interest rates, or your eligibility.</p>
      <AiChat />
    </main>
  )
}
