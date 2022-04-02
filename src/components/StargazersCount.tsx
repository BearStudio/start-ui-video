import {interpolate, spring} from 'remotion';
import {useVideoConfig} from 'remotion';
import {useEffect, VFC} from 'react';
import {continueRender, useCurrentFrame} from 'remotion';
import {useCallback} from 'react';
import {delayRender} from 'remotion';
import {useState} from 'react';
import {Repository} from '../@types/GitHub';
import {Stars} from './Stars';

export const StargazersCount: VFC<{repository: string}> = ({repository}) => {
	const [data, setData] = useState<Repository | undefined>(undefined);
	const [handle] = useState(() => delayRender());

	const videoConfig = useVideoConfig();
	const frame = useCurrentFrame();

	const fetchData = useCallback(async () => {
		const response = await fetch(`https://api.github.com/repos/${repository}`);
		const json: Repository = await response.json();
		setData(json);

		continueRender(handle);
	}, [handle, repository]);

	useEffect(() => {
		fetchData();
	}, [fetchData]);

	const scaleIn = spring({
		frame,
		config: {
			mass: 0.5,
		},
		fps: videoConfig.fps,
	});

	const scale = (frame < 50 ? scaleIn : 1) * 2;

	const TRANSITION_DURATION = 20;

	const opacity = interpolate(
		frame,
		[
			videoConfig.durationInFrames - TRANSITION_DURATION,
			videoConfig.durationInFrames,
		],
		[1, 0]
	);

	return (
		<div style={{opacity}}>
			<Stars stargazersCount={data?.stargazers_count} />
			<div
				style={{
					fontSize: '150px',
					fontFamily: 'Inter',
					fontWeight: 900,
					position: 'absolute',
					left: '50%',
					top: '50%',
					whiteSpace: 'nowrap',
					transform: `translate(-50%, -50%) scale(${scale})`,
				}}
			>
				{data?.stargazers_count} Stars
			</div>
		</div>
	);
};
