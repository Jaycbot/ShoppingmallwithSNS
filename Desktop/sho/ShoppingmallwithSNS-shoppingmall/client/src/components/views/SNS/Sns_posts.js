import React, { useState, useCallback } from 'react';
import { withRouter } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import UploadImage from './sections/UploadImage';
import { Form, Button, Input } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

import { snsPost } from '../../../_actions/sns_action';

import './Sns_posts.scss';
const { TextArea } = Input;

function Sns_posts(props) {
	const userInfo = useSelector((state) => state.user.userData);

	const [text, setText] = useState('');
	const [snapshots, setSnapshots] = useState([]);
	const dispatch = useDispatch();

	const textHandler = useCallback(
		(e) => {
			setText(e.target.value);
		},
		[text]
	);

	const onSubmitHandler = () => {
		let postInfo = {
			writer: userInfo._id,
			text,
			snapshots,
		};
		dispatch(snsPost(postInfo)).then((response) => {
			if (response.payload.success) {
				alert('업로드에 성공했습니다');
				props.history.push('/sns');
			} else {
				alert('업로드에 실패했습니다.');
			}
		});
	};

	return (
		<div>
			<div className="post_container">
				<div className="uploadFile">
					<UploadImage setSnapshots={setSnapshots} />
					<br />
					<br />
				</div>
				<div className="description">
					<Form onFinish={onSubmitHandler}>
						<label htmlFor="description">
							<h2>내용</h2>
						</label>
						<TextArea id="description" value={text} onChange={textHandler} />
						<Button style={{ marginTop: '20px' }} htmlType="submit">
							<UploadOutlined /> 포스팅 하기
						</Button>
					</Form>
				</div>
			</div>
		</div>
	);
}

export default withRouter(Sns_posts);
