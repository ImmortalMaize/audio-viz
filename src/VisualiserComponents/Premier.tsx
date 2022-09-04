import { Scale } from "chroma-js"

export const Premier = (props: {
  radius: number
  center: Array<number>,
  sample: number,
  scale: Scale
}) => {
  const {center, radius, sample, scale} = props

  return <g>
    <circle cx={center[0]} cy={center[1]} r={radius} fill="url(#cover)" style={{
      "stroke": scale(1-(sample**0.4)).hex(),
      "strokeWidth": 20
    }}>
  </circle>
  </g>
}