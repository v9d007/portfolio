import { memo } from 'react'

interface PostageStampBorderProps {
  isActive?: boolean
  className?: string
  fillColor?: string
  strokeColor?: string
  strokeWidth?: number | string
}

// Authentic philatelic postage stamp border
// Refined with smaller, elegant semicircular cuts (radius 2.2 instead of 3.4)
export const PostageStampBorder = memo(({
  isActive = false,
  className = '',
  fillColor = '#FDFDFB',
  strokeColor,
  strokeWidth
}: PostageStampBorderProps) => {
  const defaultStroke =
    strokeColor || (isActive ? '#7C3AED' : 'rgba(21, 25, 34, 0.18)')
  const defaultWidth = strokeWidth !== undefined ? strokeWidth : (isActive ? 0.7 : 0.6)

  return (
    <svg
      className={`absolute inset-0 w-full h-full overflow-visible pointer-events-none ${className}`}
      viewBox="0 0 60 78"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path
        d="M0 0L4.20 0A2.2 2.2 0 0 0 8.60 0L13.64 0A2.2 2.2 0 0 0 18.04 0L23.08 0A2.2 2.2 0 0 0 27.48 0L32.52 0A2.2 2.2 0 0 0 36.92 0L41.96 0A2.2 2.2 0 0 0 46.36 0L51.40 0A2.2 2.2 0 0 0 55.80 0L60 0L60 4.20A2.2 2.2 0 0 0 60 8.60L60 13.51A2.2 2.2 0 0 0 60 17.91L60 22.82A2.2 2.2 0 0 0 60 27.22L60 32.13A2.2 2.2 0 0 0 60 36.53L60 41.44A2.2 2.2 0 0 0 60 45.84L60 50.75A2.2 2.2 0 0 0 60 55.15L60 60.06A2.2 2.2 0 0 0 60 64.46L60 69.37A2.2 2.2 0 0 0 60 73.77L60 78L55.80 78A2.2 2.2 0 0 0 51.40 78L46.36 78A2.2 2.2 0 0 0 41.96 78L36.92 78A2.2 2.2 0 0 0 32.52 78L27.48 78A2.2 2.2 0 0 0 23.08 78L18.04 78A2.2 2.2 0 0 0 13.64 78L8.60 78A2.2 2.2 0 0 0 4.20 78L0 78L0 73.77A2.2 2.2 0 0 0 0 69.37L0 64.46A2.2 2.2 0 0 0 0 60.06L0 55.15A2.2 2.2 0 0 0 0 50.75L0 45.84A2.2 2.2 0 0 0 0 41.44L0 36.53A2.2 2.2 0 0 0 0 32.13L0 27.22A2.2 2.2 0 0 0 0 22.82L0 17.91A2.2 2.2 0 0 0 0 13.51L0 8.60A2.2 2.2 0 0 0 0 4.20L0 0Z"
        fill={fillColor}
        vectorEffect="non-scaling-stroke"
        stroke={defaultStroke}
        strokeWidth={defaultWidth}
      />
    </svg>
  )
})
