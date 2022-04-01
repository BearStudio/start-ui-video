import {useEffect} from 'react';
import {continueRender} from 'remotion';
import {useCallback} from 'react';
import {delayRender} from 'remotion';
import {useState} from 'react';
import '@fontsource/inter';
import {Repository} from '../@types/GitHub';

export const Stars = () => {
	const [data, setData] = useState<Repository | undefined>(undefined);
	const [handle] = useState(() => delayRender());

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

	return (
		<div
			style={{
				fontSize: '200px',
				fontFamily: 'Inter',
				fontWeight: 'bold',
				position: 'absolute',
				left: '50%',
				top: '50%',
				transform: `translate(-50%, -50%)`,
			}}
		>
			{data?.stargazers_count} Stars
		</div>
	);
};
