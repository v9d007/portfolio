interface PostageStampBorderProps {
  isActive?: boolean
  className?: string
  fillColor?: string
  strokeColor?: string
  strokeWidth?: number | string
}

export const PostageStampBorder = ({
  isActive = false,
  className = '',
  fillColor = '#FDFDFB',
  strokeColor,
  strokeWidth
}: PostageStampBorderProps) => {
  const defaultStroke = strokeColor || (isActive ? '#7C3AED' : 'rgba(21, 25, 34, 0.14)')
  const defaultWidth = strokeWidth !== undefined ? strokeWidth : (isActive ? 1 : 0.6)

  return (
    <svg
      className={`absolute inset-0 w-full h-full overflow-visible pointer-events-none ${className}`}
      viewBox="0 0 60 78"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path
        d="M0 0L4.40 0A3.4 3.4 0 0 0 11.20 0L13.28 0A3.4 3.4 0 0 0 20.08 0L22.16 0A3.4 3.4 0 0 0 28.96 0L31.04 0A3.4 3.4 0 0 0 37.84 0L39.92 0A3.4 3.4 0 0 0 46.72 0L48.80 0A3.4 3.4 0 0 0 55.60 0L60 0L60 4.40A3.4 3.4 0 0 0 60 11.20L60 13.31A3.4 3.4 0 0 0 60 20.11L60 22.23A3.4 3.4 0 0 0 60 29.03L60 31.14A3.4 3.4 0 0 0 60 37.94L60 40.06A3.4 3.4 0 0 0 60 46.86L60 48.97A3.4 3.4 0 0 0 60 55.77L60 57.89A3.4 3.4 0 0 0 60 64.69L60 66.80A3.4 3.4 0 0 0 60 73.60L60 78L55.60 78A3.4 3.4 0 0 0 48.80 78L46.72 78A3.4 3.4 0 0 0 39.92 78L37.84 78A3.4 3.4 0 0 0 31.04 78L28.96 78A3.4 3.4 0 0 0 22.16 78L20.08 78A3.4 3.4 0 0 0 13.28 78L11.20 78A3.4 3.4 0 0 0 4.40 78L0 78L0 73.60A3.4 3.4 0 0 0 0 66.80L0 64.69A3.4 3.4 0 0 0 0 57.89L0 55.77A3.4 3.4 0 0 0 0 48.97L0 46.86A3.4 3.4 0 0 0 0 40.06L0 37.94A3.4 3.4 0 0 0 0 31.14L0 29.03A3.4 3.4 0 0 0 0 22.23L0 20.11A3.4 3.4 0 0 0 0 13.31L0 11.20A3.4 3.4 0 0 0 0 4.40Z"
        fill={fillColor}
        vectorEffect="non-scaling-stroke"
        stroke={defaultStroke}
        strokeWidth={defaultWidth}
      />
    </svg>
  )
}
