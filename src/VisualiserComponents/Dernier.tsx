import { scale, Scale } from "chroma-js"
import { interpolate } from "remotion"

export const Dernier = (props: {
  radius: number,
  sample: number,
  center: Array<number>,
  scale: Scale,
  twitch: number,
  frame: number
}) => {
  const { radius, sample, center, frame, scale, twitch } = props
  const circumference = radius * Math.PI
  const rotation = interpolate(frame, [0, 20], [0, 20])
  return <circle id="dernier" cx={center[0]} cy={center[1]} r={radius} style={{
    stroke: scale(sample**.95).hex(),
    strokeWidth: 20,
    fill: "none",
    transformOrigin: "center",
    strokeLinecap: "round",
    transform: "rotate(" + rotation + "deg)",
    strokeDasharray: circumference + " " + circumference,
    strokeDashoffset: circumference * (sample ** twitch)
  }}></circle>
} 