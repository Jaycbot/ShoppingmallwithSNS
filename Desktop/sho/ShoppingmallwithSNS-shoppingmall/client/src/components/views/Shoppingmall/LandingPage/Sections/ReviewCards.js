import React, { useState, useEffect } from 'react';
import { Card, Avatar, Row, Col } from 'antd';
import axios from 'axios';
import RenderImages from '../../../SNS/utils/Sns_RenderImages';
import RenderText from '../../../SNS/utils/RenderText';
import Comment from '../../../SNS/utils/Comment';
import './Cards.scss';

const { Meta } = Card;

function ReviewCards() {
	const [posts, setPosts] = useState([]);

	const limit = 4;
	let skip = 0;

	useEffect(() => {
		getPosts();
	}, []);

	const getPosts = () => {
		axios
			.get(`/api/sns/getposts?skip=${skip} &limit=${limit}`)
			.then((response) => {
				if (response.data.success) {
					if (response.data.posts) {
						setPosts((prev) => [...prev].concat(response.data.posts));
					}
				}
			})
			.catch((e) => {
				alert(e);
			});
	};

	const renderProfileImage = (post) => {
		if (post && post.writer.image) {
			return `http://localhost:5000/${post.writer.image}`;
		} else {
			return 'https://thumbs.dreamstime.com/b/default-avatar-profile-vector-user-profile-default-avatar-profile-vector-user-profile-profile-179376714.jpg';
		}
	};

	const renderPosts = (posts) =>
		posts.map((post) => (
			<Col key={post._id} lg={6} xs={24}>
				<Card
					style={{
						width: 250,
						border: '2px solid #e8ebed',
						borderRadius: '20px',
					}}
					cover={<RenderImages post={post} />}
				>
					<Meta
						avatar={<Avatar src={renderProfileImage(post)} />}
						description={<RenderText post={post} />}
					/>
					<Comment post={post} />
				</Card>
			</Col>
		));

	return (
		<div>
			<section className="hot_section" style={{ backgroundColor: 'black' }}>
				<div className="hot_div_h2" style={{ marginTop: '3rem' }}>
					<h2 className="hot_h2" style={{ color: 'white', fontWeight: 'bold' }}>
						인기 구매후기
					</h2>
				</div>
				<br /> <br />
				<div style={{ display: 'flex', justifyContent: 'center' }}>
					<div width="0.5, 0.25">
						<Row gutter={[16, 32]}>{renderPosts(posts)}</Row>
					</div>
				</div>
				<br />
				<br />
			</section>
		</div>
	);
}

export default ReviewCards;
