import {spring} from 'remotion';
import {useVideoConfig} from 'remotion';
import {useEffect} from 'react';
import {continueRender, useCurrentFrame} from 'remotion';
import {useCallback} from 'react';
import {delayRender} from 'remotion';
import {useState} from 'react';
import {Repository} from '../@types/GitHub';
import {Stars} from './Stars';

export const StargazersCount = () => {
	const [data, setData] = useState<Repository | undefined>(undefined);
	const [handle] = useState(() => delayRender());

	const videoConfig = useVideoConfig();
	const frame = useCurrentFrame();

	const fetchData = useCallback(async () => {
		const response = await fetch(
			'https://api.github.com/repos/BearStudio/start-ui-web'
		);
		const json: Repository = await response.json();
		setData(json);

		continueRender(handle);
	}, [handle]);

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

	return (
		<>
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
		</>
	);
};
