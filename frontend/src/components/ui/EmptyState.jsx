export default function EmptyState({ title, subtitle }) {
  return (
    <div style={{ display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', height:'100%', gap:14, padding:40, textAlign:'center' }}>
      <div style={{ width:64, height:64, borderRadius:20, background:'var(--accent-light)', display:'flex', alignItems:'center', justifyContent:'center' }}>
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
        </svg>
      </div>
      <div>
        <p style={{ fontWeight:700, color:'var(--text-primary)', fontSize:16, marginBottom:5 }}>{title}</p>
        {subtitle && <p style={{ fontSize:13.5, color:'var(--text-muted)', lineHeight:1.6 }}>{subtitle}</p>}
      </div>
    </div>
  )
}