import { Composition, continueRender, delayRender } from 'remotion';
import { MyComposition } from './Composition';
import { getAudioDurationInSeconds } from "@remotion/media-utils"
import huff from "./songs/album/03Huff.wav"
import honeybun from "./songs/album/02Honeybun.wav"
import boris from "./songs/album/01Boris.wav"
import interlewd from "./songs/album/04Interlewd.wav"
import deathproof from "./songs/album/05Deathproof.wav"
import brokenflowers from "./songs/album/06BrokenFlowers.wav"
import fluff from "./songs/album/07Fluff.wav"
import solanin from "./songs/album/08solanin.wav"

import { defaults } from './static/config';
import { useCallback, useEffect, useState } from 'react';

export const RemotionVideo: React.FC = () => {
	const [durationInSeconds, defineDurationInSeconds] = useState(0)

	const [delay] = useState(delayRender())
	const defineDuration = useCallback(async () => {
		const duration = await getAudioDurationInSeconds(boris)
		defineDurationInSeconds(duration)
		console.log(duration)

		continueRender(delay)
	}, [])

	useEffect(() => {
		defineDuration()
	}, [])


	return (
		<>
			<Composition
				id="MyComp"
				component={MyComposition}
				durationInFrames={4148} //you'll have to adjust this manually until i figure out a way to do it automatically
				fps={30}
				width={1280}
				height={720}
				defaultProps={{
					config: [{
						from: 0,
						gradient: ["#ff9eef", "#c95db7"],
						process: {
							maxDb: -100,
							minDb: -0,
							dernierTwitch: 0.1
						},
						track: {
							artist: "Mere",
							title: "Boris",
							art: "https://i.scdn.co/image/ab67616d0000b27397cf6757f3c89860ac5ee225",
							audio: boris
						}
					}, {
						from: 25 * 30,
						gradient: ["#ff9eef", "#ff00b7"],
						process: {
							maxDb: -120,
							minDb: -40,
							dernierTwitch: 0.9
						},
						track: {
							artist: "Mere",
							title: "Honeybun",
							art: "https://i.scdn.co/image/ab67616d0000b27397cf6757f3c89860ac5ee225",
							audio: honeybun
						}
					}, {
						from: 50 * 30,
						gradient: ["#b3005f", "#ff00b7"],
						process: {
							maxDb: -120,
							minDb: -50,
							dernierTwitch: 0.5
						},
						track: {
							artist: "Mere",
							title: "Huff",
							art: "https://i.scdn.co/image/ab67616d0000b27397cf6757f3c89860ac5ee225",
							audio: huff
						}
					}, {
						from: 69 * 30,
						gradient: ["#b3005f", "#e9b0ff"],
						process: {
							maxDb: -110,
							minDb: -50,
							dernierTwitch: 0.3
						},
						track: {
							artist: "Mere",
							title: "Interlewd",
							art: "https://i.scdn.co/image/ab67616d0000b27397cf6757f3c89860ac5ee225",
							audio: interlewd
						}
					}, {
						from: 2508,
						gradient: ["#ffffff", "#e9b0ff"],
						process: {
							maxDb: -100,
							minDb: -30,
							dernierTwitch: 0.5
						},
						track: {
							artist: "Mere",
							title: "DeathProof",
							art: "https://i.scdn.co/image/ab67616d0000b27397cf6757f3c89860ac5ee225",
							audio: deathproof
						}
					}, {
						from: 2960,
						gradient: ["#ffffff", "#b30036"],
						process: {
							maxDb: -120,
							minDb: -30,
							dernierTwitch: 0.2
						},
						track: {
							artist: "Mere",
							title: "BrokenFlowers",
							art: "https://i.scdn.co/image/ab67616d0000b27397cf6757f3c89860ac5ee225",
							audio: brokenflowers
						},
					}, {
						from: 3530,
						gradient: ["#fc03c6", "#b30036"],
						process: {
							maxDb: -70,
							minDb: -30,
							dernierTwitch: 0.2
						},
						track: {
							artist: "Mere",
							title: "Fluff",
							art: "https://i.scdn.co/image/ab67616d0000b27397cf6757f3c89860ac5ee225",
							audio: fluff
						},
					}, {
						from: 3956,
						gradient: ["#fc03c6", "#c95db7"],
						process: {
							maxDb: -50,
							minDb: -40,
							dernierTwitch: 2
						},
						track: {
							artist: "Mere",
							title: "Solanin",
							art: "https://i.scdn.co/image/ab67616d0000b27397cf6757f3c89860ac5ee225",
							audio: solanin
						},
					}
				]
				}
				}
			/>
		</>
	);
};
