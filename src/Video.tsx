import {Composition} from 'remotion';
import {HelloWorld} from './HelloWorld';
// import {Logo} from './HelloWorld/Logo';
import {Logo} from './components/Logo';
import {Subtitle} from './HelloWorld/Subtitle';
import {Title} from './HelloWorld/Title';
import {Stars} from './components/Stars';

export const RemotionVideo: React.FC = () => {
	return (
		<>
			<Composition
				id="HelloWorld"
				component={HelloWorld}
				durationInFrames={150}
				fps={30}
				width={1920}
				height={1200}
				defaultProps={{
					titleText: 'Welcome to Remotion',
					titleColor: 'black',
				}}
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
				id="Title"
				component={Title}
				durationInFrames={100}
				fps={30}
				width={1920}
				height={1200}
				defaultProps={{
					titleText: 'Welcome to Remotion',
					titleColor: 'black',
				}}
			/>
			<Composition
				id="Subtitle"
				component={Subtitle}
				durationInFrames={100}
				fps={30}
				width={1920}
				height={1200}
			/>
		</>
	);
};
