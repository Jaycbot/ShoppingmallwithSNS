import { SNS_POST } from './types';
import axios from 'axios';

export function snsPost(dataToSubmit) {
	const request = axios.post('/api/sns/post', dataToSubmit).then((response) => {
		return response.data;
	});

	return {
		type: SNS_POST,
		payload: request,
	};
}
