import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import sanitize from 'sanitize-html';
function Comment(props) {
	const user = useSelector((state) => state.user.userData);

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
	const filterComment = (text) => {
		let preText = text.split(' ');
		let postingText = '';

		preText.forEach((content) => {
			if (typeof content !== 'undefined') {
				if (content.charAt(0) === '#') {
					postingText += `<a href="/search/${content.substr(
						1
					)}">${content} </a>`;
				} else {
					postingText += content + ' ';
				}
			}
		});
		return { __html: sanitize(postingText) };
	};
	const renderComments = () => {
		if (comments.length >= 2) {
			let slicedComments = comments.slice(0, 2);
			return slicedComments.map((comment) => (
				<div key={comment._id}>
					<img
						style={{ width: '50px', height: '50px' }}
						src={`/api/${comment.writer.image}`}
						alt="유저이미지"
					/>
					<h3>{comment.writer.name}</h3>
					<p dangerouslySetInnerHTML={filterComment(comment.comment)}></p>
					{user && user._id == comment.writer._id && <button>x</button>}
				</div>
			));
		} else if (comments.length == 1) {
			return comments.map((comment) => (
				<div key={comment._id}>
					<img
						style={{ width: '50px', height: '50px' }}
						src={`/api/${comment.writer.image}`}
						alt="유저이미지"
					/>
					<h3>{comment.writer.name}</h3>
					<p dangerouslySetInnerHTML={filterComment(comment.comment)}></p>
					{user && user._id == comment.writer._id && <button>x</button>}
				</div>
			));
		} else {
			return;
		}
	};

	return <div>{renderComments()}</div>;
}

export default Comment;
