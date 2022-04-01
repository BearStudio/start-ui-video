import {interpolate, Sequence, useCurrentFrame, useVideoConfig} from 'remotion';
import {Logo} from './components/Logo';
import {StargazersCount} from './components/StargazersCount';
import '@fontsource/inter/900.css';
import '@fontsource/inter/500.css';
import {ContributorsOfTheWeek} from './components/ContributorsOfTheWeek';

export const StartUIVideo: React.FC = () => {
	const frame = useCurrentFrame();
	const videoConfig = useVideoConfig();

	const opacity = interpolate(
		frame,
		[videoConfig.durationInFrames - 25, videoConfig.durationInFrames - 15],
		[1, 0],
		{
			extrapolateLeft: 'clamp',
			extrapolateRight: 'clamp',
		}
	);

	return (
		<div style={{flex: 1, backgroundColor: 'white'}}>
			<div style={{opacity}}>
				<Sequence from={0} durationInFrames={30}>
					<Logo />
				</Sequence>
				<Sequence from={30} durationInFrames={90}>
					<StargazersCount />
				</Sequence>
				<Sequence from={30 + 90} durationInFrames={150}>
					<ContributorsOfTheWeek />
				</Sequence>
			</div>
		</div>
	);
};
