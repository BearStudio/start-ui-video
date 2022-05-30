import {useEffect, VFC} from 'react';
import {continueRender, interpolate, useCurrentFrame} from 'remotion';
import {useCallback} from 'react';
import {delayRender} from 'remotion';
import {useState} from 'react';
import {PullRequest, User} from '../@types/GitHub';
import dayjs from 'dayjs';
import {Contributor} from './Contributor';
import {uniqBy} from 'lodash';

export const ContributorsOfTheMonth: VFC<{repository: string}> = ({
	repository,
}) => {
	const [data, setData] = useState<PullRequest[]>([]);
	const [handle] = useState(() => delayRender());

	const frame = useCurrentFrame();

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

	const users = uniqBy(
		data
			.filter((pullRequest) => pullRequest.merged_at !== null)
			.filter((pullRequest) =>
				dayjs(pullRequest.merged_at).isAfter(dayjs().subtract(1, 'month'))
			)
			.reduce((accumulator, currentValue) => {
				return [...accumulator, currentValue.user, ...currentValue.assignees];
			}, INITIAL_VALUE),
		'login'
	);
	const TRANSITION_DURATION = 20;

	const opacity = interpolate(frame, [0, TRANSITION_DURATION], [0, 1]);

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
					opacity,
				}}
			>
				PR contributors of the month
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
