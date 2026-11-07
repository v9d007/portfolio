import { useState, useEffect } from 'react'
import { Crosshair } from 'lucide-react'

interface BlueprintOverlayProps {
  isBlueprint: boolean
}

const BlueprintOverlay = ({ isBlueprint }: BlueprintOverlayProps) => {
  const [coords, setCoords] = useState({ x: 0, y: 0 })

  useEffect(() => {
    if (!isBlueprint) return

    const handleMouseMove = (e: MouseEvent) => {
      setCoords({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [isBlueprint])

  if (!isBlueprint) return null

  return (
    <div className="fixed inset-0 pointer-events-none z-40 select-none overflow-hidden text-[#00f0ff] font-mono text-[10px]">
      {/* Background Architectural Grid Lines */}
      <div className="absolute inset-0 cad-grid opacity-90 pointer-events-none" />

      {/* Top Left Coordinate Telemetry */}
      <div className="absolute top-14 left-4 p-2 rounded bg-[#021324]/90 border border-[#00f0ff]/40 shadow-[0_0_15px_rgba(0,240,255,0.15)] flex flex-col gap-1">
        <div className="flex items-center gap-1.5 font-bold">
          <Crosshair size={12} className="animate-spin text-[#00f0ff]" />
          <span>CAD TELEMETRY // ACTIVE</span>
        </div>
        <div className="text-gray-300">
          CURSOR: [X: {String(coords.x).padStart(4, '0')}, Y: {String(coords.y).padStart(4, '0')}]
        </div>
        <div className="text-gray-400 text-[9px]">
          DATUM: WGS84 // EPSG:3857 // GRID: 16px
        </div>
      </div>

      {/* Center Target Dimension Line Markers */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-52 border border-dashed border-[#00f0ff]/40 rounded-3xl pointer-events-none">
        {/* Horizontal Dimension Arrow */}
        <div className="absolute -top-5 left-0 right-0 flex items-center justify-between text-[#00f0ff]/70 text-[9px]">
          <span>|&lt;</span>
          <span className="bg-[#021324] px-1 border-t border-b border-[#00f0ff]/40">340.00 mm BOT CORE</span>
          <span>&gt;|</span>
        </div>

        {/* Vertical Dimension Arrow */}
        <div className="absolute -left-7 top-0 bottom-0 flex flex-col items-center justify-between text-[#00f0ff]/70 text-[9px]">
          <span>^</span>
          <span className="bg-[#021324] py-1 [writing-mode:vertical-lr] border-l border-r border-[#00f0ff]/40">
            220.00 mm
          </span>
          <span>v</span>
        </div>

        {/* Crosshair Center */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 flex items-center justify-center opacity-40">
          <div className="w-full h-[1px] bg-[#00f0ff]" />
          <div className="h-full w-[1px] bg-[#00f0ff] absolute" />
        </div>
      </div>

      {/* Corner Registration Marks */}
      <div className="absolute top-4 left-4 w-4 h-4 border-t-2 border-l-2 border-[#00f0ff]/60" />
      <div className="absolute top-4 right-4 w-4 h-4 border-t-2 border-r-2 border-[#00f0ff]/60" />
      <div className="absolute bottom-4 left-4 w-4 h-4 border-b-2 border-l-2 border-[#00f0ff]/60" />

      {/* Bottom Right Architectural Engineering Title Block */}
      <div className="absolute bottom-4 right-4 p-3 rounded bg-[#021324]/95 border-2 border-[#00f0ff]/60 shadow-[0_0_20px_rgba(0,240,255,0.25)] max-w-xs text-left">
        <div className="border-b border-[#00f0ff]/40 pb-1 mb-1.5 flex items-center justify-between">
          <span className="font-bold text-white tracking-wider">PROJECT: ARCH-V9D</span>
          <span className="text-[#00f0ff] font-bold">REV 2.4</span>
        </div>
        <div className="space-y-0.5 text-gray-300">
          <div>ENGINEER: VINOD KUMAR SINGH</div>
          <div>DISCIPLINE: SENIOR MOBILE ARCHITECT</div>
          <div>ALMA MATER: IIT KANPUR (AIR 110)</div>
          <div>SPEC: SWIFT 6 // CONCURRENCY // 60 FPS</div>
          <div className="text-emerald-400 font-bold mt-1">STATUS: RELEASE TO PRODUCTION</div>
        </div>
      </div>
    </div>
  )
}

export default BlueprintOverlay