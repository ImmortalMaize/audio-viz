import { visualizeAudio } from "@remotion/media-utils"
import { SVGAttributes, useMemo } from "react"
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion"
import { Dernier } from "./VisualiserComponents/Dernier"
import { Pair } from "./VisualiserComponents/Pair"
import { Premier } from "./VisualiserComponents/Premier"
import chroma from 'chroma-js'

export const Visualiser = (props: {
  samples: Array<number>,
  frequencies: Array<number>
}) => {
  const { samples, frequencies } = props
  const frame = useCurrentFrame()
  const factor = 600
  const circumference = (factor / 2) * Math.PI
  const { width, height } = useVideoConfig()
  const center = [factor / 2, factor / 2]

  const rotation = interpolate(frame, [0, 20], [0, 20])
  const scale = chroma.scale(["#fcd303", "#00a9d4"])
  const pourDernier = chroma.scale(["#ffffff", "#00a9d4"])
  const colors = useMemo(() => {
    const colors = []

    for (let i = 0;i <= 7; i++) {
      colors.push([scale(i/8), scale(i+1/8)])
    }
    
    return colors
  }, [])

  return <><svg style={{
    "zIndex": 2,
    "overflow": "visible",
    "position": "absolute",
    "height": factor + "px",
    "width": factor + "px",
    transform: "translate(" + (width - factor) / 2 + "px, " + (height - factor) / 2 + "px) rotate(" + rotation + "deg)"
  }}>
    <defs>
      <pattern id="cover" x="0" y="0" height='100%' width="100%">
        <image x="0" y="0" width={factor * .25} height={factor * .25} href="https://m.media-amazon.com/images/I/81JCMHA84kL._SS500_.jpg">
        </image>
      </pattern>
    </defs>
    <Premier center={center} scale={scale} radius={(factor * .25) / 2} sample={frequencies[samples.length-1]}></Premier>
  </svg>
    <svg style={{
      "zIndex": 2,
      "overflow": "visible",
      "position": "absolute",
      "height": factor + "px",
      "width": factor + "px",
      transform: "translate(" + (width - factor) / 2 + "px, " + (height - factor) / 2 + "px)"
    }}>
      {
        colors.map((set, index) => {
          return <linearGradient id={"Color" + index}>
            <stop offset="0%" stop-color={set[0].hex()}></stop>
            <stop offset="100%" stop-color={set[1].hex()}></stop>
          </linearGradient>
        })
      }
      {
        Array.from(Array(samples.length - 2), (item, index) => {
          return <Pair center={center} sample={index <= 0? frequencies[index] : samples[index]} radius={(factor*((index+2)/samples.length))/2} gradient={index}
          exponent={1-(index/samples.length)}></Pair>
        })
      }
      <Dernier frame={frame} center={center} radius={(factor) / 2} scale={pourDernier} sample={frequencies[0]}></Dernier>
    </svg></>
}