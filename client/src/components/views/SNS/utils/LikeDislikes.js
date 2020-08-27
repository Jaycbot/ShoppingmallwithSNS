// import React, { useEffect, useState } from 'react';
// import { Tooltip } from 'antd';
// import { LikeOutlined } from '@ant-design/icons';

// import axios from 'axios';
// import './LikeDislikes.scss';

// function LikeDislikes(props) {
// 	const [Likes, setLikes] = useState(0);
// 	const [LikeAction, setLikeAction] = useState(null);


// 	let variable = {};

// 	if (props.modal) {
// 		variable = { userId: props.userId, commentId: props.commentId };
// 	}

// 	useEffect(() => {
// 		console.log(123);
// 		axios.post('/api/like/getLikes', variable).then((response) => {
// 			if (response.data.success) {
// 				//얼마나 많은 좋아요를 받았는디
// 				setLikes(response.data.likes.length);

// 				//내가 이미 그 좋아요를 눌렸는지
// 				response.data.likes.map((like) => {
// 					if (like.userId === props.userId) {
// 						setLikeAction('liked');
// 					}
// 				});
// 			} else {
// 				alert('Likes에 정보를 가져오지 못했습니다.');
// 			}
// 		});

// 	}, []);

// 	const onLike = () => {
// 		if (LikeAction === null) {
// 			axios.post('/api/like/upLike', variable).then((response) => {
// 				if (response.data.success) {
// 					setLikes(Likes + 1);
// 					setLikeAction('liked');			
// 				} else {
// 					alert('Like를 올리지 못했습니다.');
// 				}
// 			});
// 		} else {
// 			axios.post('/api/like/unLike', variable).then((response) => {
// 				if (response.data.success) {
// 					setLikes(Likes - 1);
// 					setLikeAction(null);
// 				} else {
// 					alert('Like를 내리지 못했습니다.');
// 				}
// 			});
// 		}
// 	};

// 	return (
// 		<div>
// 			<span key="comment-basic-like">
// 				<Tooltip title="Like">
// 					<LikeOutlined
// 						type="like"
// 						style={{ color: '#08c' , fontSize:'20px'}}
// 						theme={LikeAction === 'liked' ? 'filled' : 'outlined'}
// 						onClick={onLike}
// 					/>
// 				</Tooltip>
// 				<span style={{ paddingLeft: '8px', cursor: 'auto' }}>{Likes}</span>
// 			</span>
// 			&nbsp;&nbsp;
// 		</div>
// 	);
// }

// export default LikeDislikes;
import React, { useEffect, useState } from 'react';
import { Tooltip } from 'antd';
import { LikeOutlined } from '@ant-design/icons';

import axios from 'axios';
import './LikeDislikes.scss';

function LikeDislikes(props) {
	const [Likes, setLikes] = useState(0);
	const [LikeAction, setLikeAction] = useState(null);


	let variable = {};

	if (props.modal) {
		variable = { userId: props.userId, commentId: props.commentId };
	}

	useEffect(() => {
		axios.post('/api/like/getLikes', variable).then((response) => {
			if (response.data.success) {
				//얼마나 많은 좋아요를 받았는디
				setLikes(response.data.likes.length);

				//내가 이미 그 좋아요를 눌렸는지
				response.data.likes.map((like) => {
					if (like.userId === props.userId) {
						setLikeAction('liked');
					}
				});
			} else {
				alert('Likes에 정보를 가져오지 못했습니다.');
			}
		});

	}, []);

	const onLike = () => {
		if (LikeAction === null) {
			axios.post('/api/like/upLike', variable).then((response) => {
				if (response.data.success) {
					setLikes(Likes + 1);
					setLikeAction('liked');			
				} else {
					alert('Like를 올리지 못했습니다.');
				}
			});
		} else {
			axios.post('/api/like/unLike', variable).then((response) => {
				if (response.data.success) {
					setLikes(Likes - 1);
					setLikeAction(null);
				} else {
					alert('Like를 내리지 못했습니다.');
				}
			});
		}
	};

	return (
		<div>
			<span key="comment-basic-like">
				<Tooltip title="Like">
					<LikeOutlined
						type="like"
						style={{ color: '#08c' , fontSize:'20px'}}
						theme={LikeAction === 'liked' ? 'filled' : 'outlined'}
						onClick={onLike}
					/>
				</Tooltip>
				<span style={{ paddingLeft: '8px', cursor: 'auto' }}>{Likes}</span>
			</span>
			&nbsp;&nbsp;
		</div>
	);
}

export default LikeDislikes;