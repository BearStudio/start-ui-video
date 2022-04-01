import {random, useCurrentFrame} from 'remotion';
import {Star} from './Star';

export const Stars = ({stargazersCount = 0}) => {
	const frame = useCurrentFrame();

	const totalStars = Math.min(1000, stargazersCount);

	const randomCoordinates = new Array(totalStars).fill(true).map((_, i) => {
		return {
			x: random(`x-${i}`) * 1920,
			y: random(`y-${i}`) * 1200 - 100,
			speed: random(`speed-${i}`) * 3,
			scale: (random(`scale-${i}`) + 1) * 3,
		};
	});

	return (
		<>
			{randomCoordinates.map(({x, y, scale, speed}, index) => (
				<Star
					key={index}
					style={{
						position: 'absolute',
						top: y,
						left: x,
						transform: `scale(${scale}) translateY(${frame * speed}px)`,
					}}
				/>
			))}
		</>
	);
};
