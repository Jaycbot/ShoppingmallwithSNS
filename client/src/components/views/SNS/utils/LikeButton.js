import React, { useEffect, useState } from 'react';
import { Tooltip } from 'antd';
import { LikeOutlined } from '@ant-design/icons';
import axios from 'axios';


function LikeButton(props) {
	const [Likes, setLikes] = useState(0);
	const [LikeAction, setLikeAction] = useState(null);

	// let likesNum = props.match.params.likes

	useEffect(() => {
		console.log(props);
		let body = {
			// likes : likesNum
		}

		getLikes(body)
		
	}, []);

	const getLikes = (body)=>{
		axios.post('/api/sns/post', body)
		.then((response) => {
			if (response.data.success) {
				//얼마나 많은 좋아요를 받았는디
				setLikes(response.data.likes);
				//내가 이미 그 좋아요를 눌렸는지
				response.data.likes.map((like) => {
					if (like.userId === props.writer) {
						setLikeAction('liked');
					}
				});
			} else {
				alert('Likes에 정보를 가져오지 못했습니다.');
			}
		});
	}

		
	const onLike = (body) => {
		if (LikeAction === null) {
			axios.post('/api/sns/upLike', body).then((response) => {
				if (response.data.success) {
					setLikes(Likes + 1);
					setLikeAction('liked');			
				} else {
					alert('Like를 올리지 못했습니다.');
				}
			});
		} else {
			axios.post('/api/sns/unLike', body).then((response) => {
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

export default LikeButton;
