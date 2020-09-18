import React, { useState, useEffect } from 'react';
import { Typography } from 'antd';
import { UpCircleOutlined } from '@ant-design/icons';
import axios from 'axios';
import './Sns_LandingPage.scss';
import RenderPosts from './utils/RenderPosts';

const { Title } = Typography;
const Sns_LandingPage = () => {
	const [posts, setPosts] = useState([]);

	const limit = 8;
	let skip;

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
	const infiniteScroll = () => {
		let scrollHeight = Math.max(
			document.documentElement.scrollHeight,
			document.body.scrollHeight
		);

		let scrollTop = Math.max(
			document.documentElement.scrollTop,
			document.body.scrollTop
		);

		let clientHeight = document.documentElement.clientHeight;

		if (scrollTop + clientHeight === scrollHeight) {
			skip = skip + limit;
			getPosts();
		}
	};

	useEffect(() => {
		window.addEventListener('scroll', infiniteScroll, true);
		skip = 0;
		getPosts();
	}, []);

	return (
		<div className="posts">
			<Title level={3} style={{ marginBottom: '3rem' }}>
				지금의 트렌드
			</Title>
			<div id="scrollArea">
				<RenderPosts posts={posts} />
				<button
					className="up_to_top"
					onClick={() => {
						window.scrollTo(0, 0);
					}}
				>
					<UpCircleOutlined />
				</button>
			</div>
		</div>
	);
};

export default Sns_LandingPage;
