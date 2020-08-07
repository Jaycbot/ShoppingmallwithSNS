import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { EditOutlined } from '@ant-design/icons';
import RenderPosts from '../SNS/utils/RenderPosts'
import './Mypage.scss';


function Mypage(props) {
	const user = useSelector((state) => state.user.userData);
	const [posts, setPosts] = useState([]);

	const [SearchTerm, setSearchTerm] = useState("")

	useEffect(() => {
		if (user) {
			axios.get(`/api/sns/getsnsposts?id=${user._id}`)
				.then((response) => {
					if (response.data.success) {
						setPosts(response.data.posts);
					} else {
						alert('포스트 불러오기에 실패했습니다.');
					}
				});
		}
	}, [user]);

	const renderImage = () => {
		if (user && user.image) {
			return <img src={`http://localhost:5000/${user.image}`} />;
		} else {
			return (
				<img
					src={`https://1sfj1635wrts49n9bz3kpi6y-wpengine.netdna-ssl.com/wp-content/uploads/2019/07/no-image-found.png`}
				/>
			);
		}
	};

	const loadUpdatePage = () => {
		props.history.push('/update');
	};


	return (
		<div className="container">
			<div className="list_container">
				<div className="profile_image">{renderImage()}</div>
				<div className="userInfo">
					{user && <h1>{`${user.name}(${user.email})`}</h1>}
				</div>

				<div className="update_info">
					<button onClick={loadUpdatePage}>
						<EditOutlined />
						수정하기
					</button>
				</div>
			</div>

			<div className="user_posts">
				<h2>내 포스트</h2>
				<RenderPosts posts={posts} />
			</div>
		</div>
	);
}

export default withRouter(Mypage);