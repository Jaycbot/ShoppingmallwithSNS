import React, { useState, useEffect } from 'react';
import axios from 'axios';
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

	const renderComments = () => {
		if (comments.length >= 2) {
			let slicedComments = comments.slice(0, 2);
			return slicedComments.map((comment) => (
				<div key={comment._id}>
					<img
						style={{ width: '50px', height: '50px' }}
						src={`http://localhost:5000/${comment.writer.image}`}
						alt="유저이미지"
					/>
					<h3>{comment.writer.name}</h3>
					<p>{comment.comment}</p>
				</div>
			));
		} else if (comments.length == 1) {
			return comments.map((comment) => (
				<div key={comment._id}>
					<img
						style={{ width: '50px', height: '50px' }}
						src={`http://localhost:5000/${comment.writer.image}`}
						alt="유저이미지"
					/>
					<h3>{comment.writer.name}</h3>
					<p>{comment.comment}</p>
				</div>
			));
		} else {
			return;
		}
	};

	return <div>{renderComments()}</div>;
}

export default Comment;
