import { Audio, Sequence, useCurrentFrame, useVideoConfig, interpolate, Easing } from "remotion"
import { visualizeAudio, useAudioData, AudioData } from "@remotion/media-utils"
import { Violet } from "./Violet"
import { Visualiser } from "./Visualiser"
import "./static/styles.css"
import { VisualiserConfig } from "./static/config"
import { useEffect, useState } from "react"
import { renderColors, renderList, renderTimestamps, renderValues, visualisersNList } from "./static/render"
import { Track } from "./text/Track"

export const MyComposition = (props: {
	config: Array<VisualiserConfig>,
}) => {
  const frame = useCurrentFrame()
	const { config } = props
  const { fps, durationInFrames } = useVideoConfig()
	const { visualisers, list }  = visualisersNList(props.config, frame, fps, 8, durationInFrames)

	const titles = new Map(config.map(track => [track.from, track.track.title]))
	const artists = new Map(config.map(track => [track.from, track.track.artist]))

	const titleList = renderList(titles, durationInFrames)
	const artistList = renderList(artists, durationInFrames)

	const titleTransitions = renderTimestamps(config, "title")
	const artistTransitions = renderTimestamps(config, "artist")

	//transition credits
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

	const gradient = renderColors(config, frame, durationInFrames)
	const process: VisualiserConfig["process"] = {
		minDb: renderValues(config, "minDb", frame, durationInFrames),
		maxDb: renderValues(config, "maxDb", frame, durationInFrames),
		dernierTwitch: renderValues(config, "dernierTwitch", frame, durationInFrames)
	}

  return <>
		{
			config.map((track) => {
				return <Sequence from={track.from}>
					<Audio src={track.track.audio}></Audio>
				</Sequence>
			})
		}
    <Violet zIndex={-2} opacity={1} />
		<Violet zIndex={10} opacity={fadeInNOut} />

    <Visualiser frequencies={visualisers[list[frame]] ?? [1/8,2/8,3/8,4/8,5/8,6/8,7/8,1]} config={config[list[frame]]} gradient={gradient as [string, string]} process={process}/>

		<Track frame={frame} color={gradient[0]} durationInFrames={durationInFrames} titleTransitions={titleTransitions} artistTransitions={artistTransitions} title={titleList} artist={artistList}/>

		<div id="credits"
		style={{
			zIndex: 5,
			opacity: creditOpacity,
			borderColor: gradient[1]
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
