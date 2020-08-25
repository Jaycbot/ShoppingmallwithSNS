import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import sanitize from 'sanitize-html';
import './RenderDescription.scss';
import axios from 'axios';
import { Input } from 'antd';
import { RoutingVariable } from '../../../Config';

function RenderDescription(props) {
	const user = useSelector((state) => state.user.userData);
	const [comment, setComment] = useState('');
	const [comments, setComments] = useState([]);
	const [update, setUpdate] = useState(false);
	useEffect(() => {
		axios.get(`/api/sns/getcomments?id=${props.post._id}`).then((response) => {
			if (response.data.success) {
				setComments(response.data.comments);
			} else {
				alert('댓글 로드에 실패했습니다.');
			}
		});
	}, [update]);
	const renderProfileImage = () => {
		if (props.post && props.post.writer.image) {
			return `${RoutingVariable}${props.post.writer.image}`;
		} else {
			return 'https://thumbs.dreamstime.com/b/default-avatar-profile-vector-user-profile-default-avatar-profile-vector-user-profile-profile-179376714.jpg';
		}
	};


	const renderText = (text) => {
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
	const commentHandler = (e) => {
		setComment(e.target.value);
	};
	const submitHandler = (e) => {
		e.preventDefault();
		let data = {
			writer: user._id,
			post: props.post._id,
			comment,
		};
		axios.post('/api/sns/addcomment', data).then((response) => {
			if (response.data.success) {
				setComment('');
				setUpdate(!update);
			} else {
				alert('댓글 생성에 실패했습니다.');
			}
		});
	};
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

	const commentsRender = () => {
		return comments.map((comment) => (
			<div key={comment._id}>


				<div style={{ display: 'flex' }}>
					<img
						style={{ width: '35px', height: '35px', borderRadius: '16px' }}
						src={`${RoutingVariable}${comment.writer.image}`}
						alt="유저이미지"
					/>
					<h3>&nbsp;&nbsp;{comment.writer.name}</h3>
					{user && user._id == comment.writer._id && (
						<button onClick={() => deleteComment(comment._id)}>x</button>
					)}

				</div>


				<p dangerouslySetInnerHTML={filterComment(comment.comment)}></p>



				<br />
			</div>
		));
	};

	const deleteComment = (commentId) => {
		let variable = {
			id: commentId,
		};
		axios.post('/api/sns/deletecomment', variable).then((response) => {
			if (response.data.success) {
				setUpdate(!update);
			} else {
				alert('댓글 삭제에 실패했습니다.');
			}
		});
	};

	return (
		<div className="description_container">
			<div className="post_info">
				<div className="post_user_container">

					<div className="post_user_image">
						<img
							// style={{ width: '40px', height: '40px' }}
							src={renderProfileImage()}
							alt="게시자 프로필사진"
						/>
					</div>

					<div className="post_user_name">
						<h4>{props.post.writer.name}</h4>
					</div>

				</div>


				<div
					className="post_text"
					dangerouslySetInnerHTML={renderText(props.post.text)}
					>
				</div>
				{/* <div className="post_user_info">{renderPostUser()}</div> */}
				<div className="post_user_info">{renderPostUser()}</div>

				{/* <div className="post_description"></div> */}
			</div>



			<hr />



			<div className="comments">
				<div className="comments_input">
					<div className="comments_from_user">{commentsRender()}</div>
				</div>
				<br />
				<br />
				<form onSubmit={submitHandler}>
					<Input
						className="comments_input"
						type="text"
						value={comment}
						onChange={commentHandler}
					/>
					<br />
					<button type="submit"></button>
				</form>
			</div>




		</div>
	);
}

export default RenderDescription;
