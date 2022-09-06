import { interpolate, Easing } from "remotion"
import { renderTransitions } from "../static/render"

export const Track = (props: {
  titleTransitions: Array<number>,
  artistTransitions: Array<number>,
  color: string,

  title: Array<string>, artist: Array<string>,
  frame: number, durationInFrames: number
}) => {
  const { title, artist, titleTransitions, artistTransitions, frame, durationInFrames, color } = props
  const titleOpacity = renderTransitions(durationInFrames, titleTransitions, [0, 1])
  const titleTranslate = renderTransitions(durationInFrames, titleTransitions, [-40, 0])
  const subtitleOpacity = renderTransitions(durationInFrames, artistTransitions, [0, 1])
  const subtitleTranslate = renderTransitions(durationInFrames, artistTransitions, [-40, 0])


  const trackOpacity = interpolate(frame, [0, 10, durationInFrames], [0, 1, 1], {
		easing: Easing.bezier(1,0,0,1),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp"
	})
	const trackTitleTranslate = interpolate(frame, titleTranslate.input, titleTranslate.output, {
		easing: Easing.bezier(1,0,0,1),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp"
	})
	const trackTitleOpacity = interpolate(frame, titleOpacity.input, titleOpacity.output, {
		easing: Easing.bezier(1,0,0,1),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp"
	})
	const trackSubtitleTranslate = interpolate(frame, subtitleTranslate.input, subtitleTranslate.output, {
		easing: Easing.bezier(1,0,0,1),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp"
	})
	const trackSubtitleOpacity = interpolate(frame, subtitleOpacity.input, subtitleOpacity.output, {
		easing: Easing.bezier(1,0,0,1),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp"
	})

  return <div id="track" style={{
    zIndex: 5,
    opacity: trackOpacity,
    borderColor: color
  }}>
    <span className="title" style={{
      "display": "block",
      "transform": "translateX(" + trackTitleTranslate + "px)",
      "opacity": trackTitleOpacity
    }}>{
     title[frame]
    }</span>
    <br></br>
    <span className="subtitle" style={{
      "display": "block",
      "transform": "translateX(" + trackSubtitleTranslate + "px)",
      "opacity": trackSubtitleOpacity
    }}>
      {artist[frame]}
    </span>
  </div>
}