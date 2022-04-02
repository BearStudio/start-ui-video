import {FC} from 'react';
import {useCurrentFrame} from 'remotion';
import {Img} from 'remotion';
import {interpolate} from 'remotion';
import {User} from '../@types/GitHub';

export const Contributor: FC<{
	user: Pick<User, 'id' | 'avatar_url' | 'login'>;
	index: number;
}> = ({user, index}) => {
	const frame = useCurrentFrame();

	const OPACITY_TRANSITION_LENGTH = 20;

	const opacity = interpolate(
		frame,
		[
			index + 1 * OPACITY_TRANSITION_LENGTH,
			index + 1 * OPACITY_TRANSITION_LENGTH + OPACITY_TRANSITION_LENGTH,
		],
		[0, 1]
	);

	return (
		<div
			style={{
				display: 'flex',
				gap: '4rem',
				alignItems: 'center',
				opacity,
			}}
		>
			<Img
				style={{
					borderRadius: '100%',
					width: '150px',
				}}
				src={user.avatar_url}
			/>
			<div
				key={user.id}
				style={{
					fontSize: '100px',
					fontFamily: 'Inter',
				}}
			>
				{user.login}
			</div>
		</div>
	);
};
