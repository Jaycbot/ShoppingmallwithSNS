import React from 'react';
import { Card, Avatar, Row, Col } from 'antd';
import RenderImages from './Sns_RenderImages';
import RenderText from './RenderText';
import Comment from './Comment';
const { Meta } = Card;
function RenderPosts(props) {
	const renderProfileImage = (post) => {
		if (post && post.writer.image) {
			return `http://localhost:5000/${post.writer.image}`;
		} else {
			return 'https://thumbs.dreamstime.com/b/default-avatar-profile-vector-user-profile-default-avatar-profile-vector-user-profile-profile-179376714.jpg';
		}
	};

	return (
		<div>
			<Row gutter={[16, 32]}>
				{props.posts.map((post) => {
					if (post && post.writer) {
						return (
							<Col key={post._id} lg={6} xs={24}>
								<Card
									style={{
										width: 250,
										border: '2px solid #E8EBED',
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
						);
					}
				})}
			</Row>
		</div>
	);
}

export default RenderPosts;
