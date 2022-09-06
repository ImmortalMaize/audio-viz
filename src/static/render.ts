import { VisualiserConfig } from "./config"
import { useAudioData, visualizeAudio } from "@remotion/media-utils"
import { interpolate, interpolateColors } from "remotion"

export function renderList(changes: Map<number, any>, duration: number) {
  const rendering = []
  let lastChange = changes.get(0)

  for (let frame = 0; frame < duration; frame++) {
    const change = changes.get(frame)
    if (change) {
      lastChange = change
    }
    rendering.push(lastChange)
  }

  return rendering
}

export function visualisersNList(configs: Array<VisualiserConfig>, frame: number, fps: number, numberOfSamples: number, duration: number) {
  const visualisers = configs.map((track) => {
    const audioData = useAudioData(track.track.audio)

    if (!audioData) { return null }

    return visualizeAudio({
      smoothing: true,
      audioData,
      frame: frame - track.from,
      fps,
      numberOfSamples
    })
  })

  const list = renderList(new Map(configs.map((track, index) => [track.from, index])), duration)
  return {
    visualisers,
    list
  }
}

export const renderTransitions = (duration: number, input: Array<number>, interpolate: [number, number]) => {
  const transitionPoints = input.map(i => [(i - 10) >= 0 ? i - 10 : null, i, (i + 10) <= duration ? i + 10 : null]).flat().filter(n => Number.isInteger(n))
  const transitions = transitionPoints.map((transition, index) => {
    return index % 3 === 0 ? interpolate[0] : interpolate[1]
  })

  return {
    input: transitionPoints as Array<number>,
    output: transitions as Array<number>
  }
}

export const renderTimestamps = (configs: Array<VisualiserConfig>, prop: keyof VisualiserConfig["track"]): Array<number> => {
  const set = new Set(); const timestamps = configs.map(config => { if (set.has(config.track[prop])) { return null } else { set.add(config.track[prop]); return config.from } }).filter(n => Number.isInteger(n)); return timestamps as Array<number>
}

export const renderColors = (configs: Array<VisualiserConfig>, frame: number, duration: number) => {
  const colors = configs.map(config => config.gradient)

  const transitionPoints = [...configs
  .map(config => config.from)
  .map(i => [(i - 10) >= 0 ? i - 10 : null, i + 10]).flat().filter(n => Number.isInteger(n)) as Array<number>, duration]

  const color0 = interpolateColors(frame, transitionPoints, [ ...colors.map(color => [color[0], color[0]]).flat()])
  const color1 = interpolateColors(frame, transitionPoints, [ ...colors.map(color => [color[1], color[1]]).flat()])

  return [color0, color1]
}

export const renderValues = (configs: Array<VisualiserConfig>, prop: keyof VisualiserConfig["process"], frame: number, duration: number) => {
  const transitionPoints = [...configs
  .map(config => config.from)
  .map(i => [(i - 10) >= 0 ? i - 10 : null, i + 10]).flat().filter(n => Number.isInteger(n)) as Array<number>, duration]

  return interpolate(frame, transitionPoints, [...configs.map(config => [config.process[prop], config.process[prop]]).flat()], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp"
  })
}