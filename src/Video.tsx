import {Composition} from 'remotion';
import {StartUIVideo} from './StartUIVideo';
import {Logo} from './components/Logo';
import {Stars} from './components/Stars';
import {ContributorsOfTheWeek} from './components/ContributorsOfTheWeek';

export const RemotionVideo: React.FC = () => {
	return (
		<>
			<Composition
				id="StartUIVideo"
				component={StartUIVideo}
				durationInFrames={150}
				fps={30}
				width={1920}
				height={1200}
			/>
			<Composition
				id="Logo"
				component={Logo}
				durationInFrames={30}
				fps={30}
				width={1920}
				height={1200}
			/>
			<Composition
				id="Stars"
				component={Stars}
				durationInFrames={90}
				fps={30}
				width={1920}
				height={1200}
			/>
			<Composition
				id="ContributorsOfTheWeek"
				component={ContributorsOfTheWeek}
				durationInFrames={150}
				fps={30}
				width={1920}
				height={1200}
			/>
		</>
	);
};
