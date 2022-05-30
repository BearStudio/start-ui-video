import {interpolate, Series, useCurrentFrame, useVideoConfig} from 'remotion';
import {Logo} from './components/Logo';
import {StargazersCount} from './components/StargazersCount';
import '@fontsource/inter/900.css';
import '@fontsource/inter/500.css';
import {ContributorsOfTheMonth} from './components/ContributorsOfTheMonth';

export const StartUIVideo: React.FC<{
	repository: string;
}> = ({repository}) => {
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
				<Series>
					<Series.Sequence durationInFrames={50}>
						<Logo />
					</Series.Sequence>
					<Series.Sequence durationInFrames={80}>
						<StargazersCount repository={repository} />
					</Series.Sequence>
					<Series.Sequence durationInFrames={150}>
						<ContributorsOfTheMonth repository={repository} />
					</Series.Sequence>
				</Series>
			</div>
		</div>
	);
};
