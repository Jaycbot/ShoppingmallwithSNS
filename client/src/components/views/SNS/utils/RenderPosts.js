import React, { useEffect } from 'react';
import {useSelector} from 'react-redux';
import { Card, Avatar, Row, Col } from 'antd';
import RenderImages from './Sns_RenderImages';
import RenderText from './RenderText';
import Comment from './Comment';
import LikeDislikes from './LikeDislikes'
import { RoutingVariable } from '../../../Config';


const { Meta } = Card;
function RenderPosts(props) {
	const renderProfileImage = (post) => {
		if (post && post.writer.image) {
			return `${RoutingVariable}${post.writer.image}`;
		} else {
			return 'https://thumbs.dreamstime.com/b/default-avatar-profile-vector-user-profile-default-avatar-profile-vector-user-profile-profile-179376714.jpg';
		}
	};
	
	const user = useSelector(state => state.user.userData);
	

	

	const Rending = () =>{
		return(
			<div>
			<Row gutter={[16, 32]}>
				{props.posts.map((post) => {
					if (post && post.writer) {
						return (
							<Col key={post._id} lg={6} md={8} xs={24}>
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
									<div style={{display : 'flex' , justifyContent : 'space-around'}}>
									<LikeDislikes post={post} user={user}/>																			
									<Comment post={post} />
									</div>
								</Card>
							</Col>
						);
					}
				})}
			</Row>
		</div>

		)


	}


	return	(
		<div>
			{user&& Rending()}
		</div>
		) 

	

	}
export default RenderPosts;
