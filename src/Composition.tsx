import { Audio, Sequence, useCurrentFrame, useVideoConfig, interpolate, Easing } from "remotion"
import { visualizeAudio, useAudioData, AudioData } from "@remotion/media-utils"
import { Violet } from "./Violet"
import { Visualiser } from "./Visualiser"
import "./styles.css"

export const MyComposition = (props: {
	audio: any
}) => {
  const frame = useCurrentFrame()
	const { audio } = props
  const { fps, durationInFrames } = useVideoConfig()
	const audioData = useAudioData(audio) as AudioData

	const trackOpacity = interpolate(frame, [0, 10, durationInFrames], [0, 1, 1], {
		easing: Easing.bezier(1,0,0,1)
	})
	const trackTitleTranslate = interpolate(frame, [0, 20, durationInFrames], [-40, 0, 0], {
		easing: Easing.bezier(1,0,0,1)
	})
	const trackTitleOpacity = interpolate(frame, [0, 20, durationInFrames], [0, 1, 1], {
		easing: Easing.bezier(1,0,0,1)
	})
	const trackSubtitleTranslate = interpolate(frame, [0, 30, durationInFrames], [-40, 0, 0], {
		easing: Easing.bezier(1,0,0,1)
	})
	const trackSubtitleOpacity = interpolate(frame, [0, 30, durationInFrames], [0, 1, 1], {
		easing: Easing.bezier(1,0,0,1)
	})

	const creditOpacity = interpolate(frame, [0, 40, 50, durationInFrames], [0, 0, 1, 1], {
		easing: Easing.bezier(1,0,0,1)
	})
	const creditTitleTranslate = interpolate(frame, [0, 40, 60, durationInFrames], [40, 40, 0, 0], {
		easing: Easing.bezier(1,0,0,1)
	})
	const creditTitleOpacity = interpolate(frame, [0, 40, 60, durationInFrames], [0, 0, 1, 1], {
		easing: Easing.bezier(1,0,0,1)
	})
	const creditSubtitleTranslate = interpolate(frame, [0, 40, 70, durationInFrames], [40, 40, 0, 0], {
		easing: Easing.bezier(1,0,0,1)
	})
	const creditSubtitleOpacity = interpolate(frame, [0, 40, 70, durationInFrames], [0, 0, 1, 1], {
		easing: Easing.bezier(1,0,0,1)
	})
	const fadeInNOut = interpolate(frame, [0, 5, durationInFrames-30, durationInFrames], [1, 0, 0, 1], {
		easing: Easing.bezier(.5,0,.5,1)
	})


	if (!audioData) {
		return null
	}

  const frequencies = visualizeAudio({
    fps,
    frame,
    audioData,
    numberOfSamples: 8
  })

	const samples = frequencies.map(frequency => {
		const minDb = -40;
		const maxDb = -100;

		const db = 40*Math.log10(frequency)
		const scaled = (db - minDb) / (maxDb - minDb);
 
  	return scaled;
	})
	
  return <>
    <Violet zIndex={-2} opacity={1}/>
		<Violet zIndex={10} opacity={fadeInNOut}/>
    <Audio src={audio} startFrom={0}></Audio>
    <Visualiser samples={samples} frequencies={frequencies}></Visualiser>

		<div id="track" style={{
			zIndex: 5,
			opacity: trackOpacity
		}}>
			<span className="title" style={{
				"display": "block",
				"transform": "translateX(" + trackTitleTranslate + "px)",
				"opacity": trackTitleOpacity
			}}>Dream</span>
			<br></br>
			<span className="subtitle" style={{
				"display": "block",
				"transform": "translateX(" + trackSubtitleTranslate + "px)",
				"opacity": trackSubtitleOpacity
			}}>
				DJ Kuroneko
			</span>
		</div>

		<div id="credits"
		style={{
			zIndex: 5,
			opacity: creditOpacity
		}}>
		<span className="title"
		style={{
			"display": "block",
			"transform": "translateX(" + creditTitleTranslate + "px)",
			"opacity": creditTitleOpacity
		}}>Maizualizer</span>
			<br></br>
			<span className="subtitle" style={{
				"display": "block",
				"transform": "translateX(" + creditSubtitleTranslate + "px)",
				"opacity": creditSubtitleOpacity
			}}>
				Scarlet / Maize
			</span>
		</div>
  </>
}
