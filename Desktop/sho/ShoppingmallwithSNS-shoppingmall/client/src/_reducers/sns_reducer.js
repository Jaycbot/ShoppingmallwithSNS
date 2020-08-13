import { SNS_POST } from '../_actions/types';

export default function (state = {}, action) {
	switch (action.type) {
		case SNS_POST:
			return {
				...state,
				postInfo: action.payload,
			};
		default:
			return state;
	}
}
