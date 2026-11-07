interface PostageStampBorderProps {
  isActive?: boolean
  className?: string
  fillColor?: string
  strokeColor?: string
  strokeWidth?: number | string
}

// Authentic philatelic postage stamp border from yl0.me
// Features 18 dense scallops horizontally and 24 scallops vertically (radius 1.7)
export const PostageStampBorder = ({
  isActive = false,
  className = '',
  fillColor = '#FDFDFB',
  strokeColor,
  strokeWidth
}: PostageStampBorderProps) => {
  const defaultStroke =
    strokeColor || (isActive ? '#7C3AED' : 'rgba(21, 25, 34, 0.18)')
  const defaultWidth = strokeWidth !== undefined ? strokeWidth : (isActive ? 0.6 : 0.4)

  return (
    <svg
      className={`absolute inset-0 w-full h-full overflow-visible pointer-events-none ${className}`}
      viewBox="0 0 60 78"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path
        d="M0 0L2.20 0A1.7 1.7 0 0 0 5.60 0L6.55 0A1.7 1.7 0 0 0 9.95 0L10.90 0A1.7 1.7 0 0 0 14.30 0L15.25 0A1.7 1.7 0 0 0 18.65 0L19.60 0A1.7 1.7 0 0 0 23.00 0L23.95 0A1.7 1.7 0 0 0 27.35 0L28.30 0A1.7 1.7 0 0 0 31.70 0L32.65 0A1.7 1.7 0 0 0 36.05 0L37.00 0A1.7 1.7 0 0 0 40.40 0L41.35 0A1.7 1.7 0 0 0 44.75 0L45.70 0A1.7 1.7 0 0 0 49.10 0L50.05 0A1.7 1.7 0 0 0 53.45 0L54.40 0A1.7 1.7 0 0 0 57.80 0L60 0L60 2.20A1.7 1.7 0 0 0 60 5.60L60 6.59A1.7 1.7 0 0 0 60 9.99L60 10.97A1.7 1.7 0 0 0 60 14.37L60 15.36A1.7 1.7 0 0 0 60 18.76L60 19.75A1.7 1.7 0 0 0 60 23.15L60 24.14A1.7 1.7 0 0 0 60 27.54L60 28.52A1.7 1.7 0 0 0 60 31.92L60 32.91A1.7 1.7 0 0 0 60 36.31L60 37.30A1.7 1.7 0 0 0 60 40.70L60 41.69A1.7 1.7 0 0 0 60 45.09L60 46.07A1.7 1.7 0 0 0 60 49.47L60 50.46A1.7 1.7 0 0 0 60 53.86L60 54.85A1.7 1.7 0 0 0 60 58.25L60 59.24A1.7 1.7 0 0 0 60 62.64L60 63.62A1.7 1.7 0 0 0 60 67.02L60 68.01A1.7 1.7 0 0 0 60 71.41L60 72.40A1.7 1.7 0 0 0 60 75.80L60 78L57.80 78A1.7 1.7 0 0 0 54.40 78L53.45 78A1.7 1.7 0 0 0 50.05 78L49.10 78A1.7 1.7 0 0 0 45.70 78L44.75 78A1.7 1.7 0 0 0 41.35 78L40.40 78A1.7 1.7 0 0 0 37.00 78L36.05 78A1.7 1.7 0 0 0 32.65 78L31.70 78A1.7 1.7 0 0 0 28.30 78L27.35 78A1.7 1.7 0 0 0 23.95 78L23.00 78A1.7 1.7 0 0 0 19.60 78L18.65 78A1.7 1.7 0 0 0 15.25 78L14.30 78A1.7 1.7 0 0 0 10.90 78L9.95 78A1.7 1.7 0 0 0 6.55 78L5.60 78A1.7 1.7 0 0 0 2.20 78L0 78L0 75.80A1.7 1.7 0 0 0 0 72.40L0 71.41A1.7 1.7 0 0 0 0 68.01L0 67.03A1.7 1.7 0 0 0 0 63.63L0 62.64A1.7 1.7 0 0 0 0 59.24L0 58.25A1.7 1.7 0 0 0 0 54.85L0 53.86A1.7 1.7 0 0 0 0 50.46L0 49.48A1.7 1.7 0 0 0 0 46.08L0 45.09A1.7 1.7 0 0 0 0 41.69L0 40.70A1.7 1.7 0 0 0 0 37.30L0 36.31A1.7 1.7 0 0 0 0 32.91L0 31.93A1.7 1.7 0 0 0 0 28.53L0 27.54A1.7 1.7 0 0 0 0 24.14L0 23.15A1.7 1.7 0 0 0 0 19.75L0 18.76A1.7 1.7 0 0 0 0 15.36L0 14.38A1.7 1.7 0 0 0 0 10.98L0 9.99A1.7 1.7 0 0 0 0 6.59L0 5.60A1.7 1.7 0 0 0 0 2.20Z"
        fill={fillColor}
        vectorEffect="non-scaling-stroke"
        stroke={defaultStroke}
        strokeWidth={defaultWidth}
      />
    </svg>
  )
}
