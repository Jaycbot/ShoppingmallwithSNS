import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import RenderPosts from '../SNS/utils/RenderPosts';
import { RoutingVariable } from '../../Config';

function UserPage(props) {
	const [Posts, setPosts] = useState([]);
	const [user, setUser] = useState({});
	const iduser = props.match.params.userId;

	useEffect(() => {
		if (props && props.match) {
			axios.get(`/api/sns/getsnsposts?id=${iduser}`).then((response) => {
				if (response.data.success) {
					setPosts(response.data.posts);
				} else {
					alert('포스트 불러오기에 실패했습니다.');
				}
			});
		}
	}, []);
	useEffect(() => {
		if (Posts.length > 0) {
			setUser(Posts[0]);
		}
	}, [Posts]);

	const renderImage = () => {
		if (user && user.writer) {
			return <img src={`${RoutingVariable}${user.writer.image}`} />;
		} else {
			return (
				<img
					src={`https://1sfj1635wrts49n9bz3kpi6y-wpengine.netdna-ssl.com/wp-content/uploads/2019/07/no-image-found.png`}
				/>
			);
		}
	};

	return (
		<div className="container">
			<div className="list_container">
				<div className="profile_image">{renderImage()}</div>
				<div className="userInfo">
					{user && user.writer && (
						<h1>{`${user.writer.name}(${user.writer.email})`}</h1>
					)}
				</div>
			</div>

			<div className="user_posts">
				<h2>내 포스트</h2>
				<RenderPosts posts={Posts} />
			</div>
		</div>
	);
}

export default withRouter(UserPage);
