import {Composition} from 'remotion';
import {MyComposition} from './Composition';
import { getAudioDurationInSeconds } from "@remotion/media-utils"
import breaks from "./songs/alt.mp3"
import full from "./songs/audio2.mp3"
import { useCallback } from 'react';

export const RemotionVideo: React.FC = () => {

	return (
		<>
			<Composition
				id="MyComp"
				component={MyComposition}
				durationInFrames={30 * 245}
				fps={30}
				width={1280}
				height={720}
				defaultProps={{
					audio: full
				}
				}
			/>
		</>
	);
};
