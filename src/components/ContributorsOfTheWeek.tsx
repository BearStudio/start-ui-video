import {useEffect, VFC} from 'react';
import {continueRender} from 'remotion';
import {useCallback} from 'react';
import {delayRender} from 'remotion';
import {useState} from 'react';
import {PullRequest, User} from '../@types/GitHub';
import dayjs from 'dayjs';
import {Contributor} from './Contributor';

export const ContributorsOfTheWeek: VFC<{repository: string}> = ({
	repository,
}) => {
	const [data, setData] = useState<PullRequest[]>([]);
	const [handle] = useState(() => delayRender());

	const fetchData = useCallback(async () => {
		const response = await fetch(
			`https://api.github.com/repos/${repository}/pulls?state=closed&sort=updated&direction=desc`
		);
		const json: PullRequest[] = await response.json();
		setData(json);

		continueRender(handle);
	}, [handle, repository]);

	useEffect(() => {
		fetchData();
	}, [fetchData]);

	const INITIAL_VALUE: Pick<User, 'id' | 'avatar_url' | 'login'>[] = [];

	const users = data
		.filter((pullRequest) => pullRequest.merged_at !== null)
		.filter((pullRequest) =>
			dayjs(pullRequest.merged_at).isAfter(dayjs().subtract(7, 'day'))
		)
		.reduce((accumulator, currentValue) => {
			if (accumulator.some((user) => user.login === currentValue.user.login)) {
				return accumulator;
			}

			return [...accumulator, currentValue.user];
		}, INITIAL_VALUE);

	return (
		<div>
			<h1
				style={{
					position: 'absolute',
					left: '50%',
					transform: `translateX(-50%)`,
					fontSize: '100px',
					fontFamily: 'Inter',
					fontWeight: 'bold',
					whiteSpace: 'nowrap',
				}}
			>
				Contributors of the week
			</h1>
			<div
				style={{
					display: 'flex',
					flexDirection: 'column',
					gap: '4rem',
					position: 'absolute',
					top: '250px',
					left: '50%',
					transform: 'translateX(-50%)',
				}}
			>
				{users.map((user, index) => (
					<Contributor key={user.id} user={user} index={index} />
				))}
			</div>
		</div>
	);
};
