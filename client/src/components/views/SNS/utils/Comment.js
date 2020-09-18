import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MessageOutlined } from '@ant-design/icons';
function Comment(props) {
	const [comments, setComments] = useState([]);

	useEffect(() => {
		axios.get(`/api/sns/getcomments?id=${props.post._id}`).then((response) => {
			if (response.data.success) {
				setComments(response.data.comments);
			} else {
				alert('댓글로드 실패');
			}
		});
	}, []);

	return <div>
		<MessageOutlined style={{ fontSize: '20px' }} />
			&nbsp;&nbsp;{comments.length}
		</div>;
}

export default Comment;
