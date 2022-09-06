export const Pair = (props: {
  center: Array<number>,
  radius: number,
  sample: number,
  gradient: string,
  exponent: number
}) => {
  const { radius, center, gradient, exponent } = props
  const sample = (props.sample ?? 0.2)**exponent
  const circumference = radius * Math.PI

  return <g strokeWidth="20">
    <circle cx={center[0]} cy={center[1]} r={radius} style={{
      stroke: gradient,
      fill: "none",
      transformOrigin: "center",
      strokeLinecap: "round",
      transform: "rotate(-90deg) scaleX(-1)",
      strokeDasharray: circumference + " " + circumference * 2,
      strokeDashoffset: circumference * sample
    }} ></circle>
    <circle cx={center[0]} cy={center[1]} r={radius} style={{
      stroke: gradient,
      fill: "none",
      transformOrigin: "center",
      strokeLinecap: "round",
      transform: "rotate(90deg)",
      strokeDasharray: circumference + " " + circumference * 2,
      strokeDashoffset: circumference * sample
    }}></circle>
  </g>
}