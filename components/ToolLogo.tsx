'use client'
import { getColor, initials } from '../lib/data'
import type { Tool } from '../lib/data'
interface Props { tool: Tool; size?: number; radius?: number }
export default function ToolLogo({ tool, size=48, radius=13 }: Props) {
  return (
    <div style={{width:size,height:size,borderRadius:radius,background:getColor(tool),
      display:'flex',alignItems:'center',justifyContent:'center',
      flexShrink:0,overflow:'hidden',fontSize:size<40?9:11,fontWeight:800,color:'#fff'}}>
      <img
        src={`https://www.google.com/s2/favicons?domain=${new URL(tool.website).hostname}&sz=64`}
        alt={tool.name_en} width={size} height={size}
        style={{objectFit:'cover',borderRadius:radius}}
        onError={e => {
          const img = e.currentTarget; img.style.display='none'
          const p = img.parentElement
          if(p && !p.querySelector('span')){
            const s=document.createElement('span'); s.textContent=initials(tool.name_en); p.appendChild(s)
          }
        }}
      />
    </div>
  )
}
