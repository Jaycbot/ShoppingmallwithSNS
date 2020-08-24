import React, { useState, useEffect } from 'react';
import axios from 'axios';
import swal from 'sweetalert';
import SearchFeature from './Sections/SearchFeature';
import { Layout, Menu } from 'antd';
import {
	DashboardOutlined,
	UserOutlined,
	ShopOutlined,
	SolutionOutlined,
} from '@ant-design/icons';
import { RoutingVariable } from '../../../Config';
const { Header, Content, Sider } = Layout;

function SNSList(props) {
	const [Posts, setPosts] = useState([]);
	const [SnSsearchTerm, setSnSsearchTerm] = useState('');

	useEffect(() => {
		let body = {};

		getSNS(body);
	}, []);

	const getSNS = (body) => {
		axios
			.post('/api/sns/adminSNS', body)
			.then((response) => {
				if (response.data.success) {
					setPosts(response.data.posts);
				}
			})
			.catch((e) => {
				alert(e);
			});
	};

	const updateSearchTerm = (newSearchTerm) => {
		let body = {
			searchTerm: newSearchTerm,
		};

		setSnSsearchTerm(newSearchTerm);
		getSNS(body);
	};

	const removeItem = (snsId) => {
		const data = {
			id: snsId,
		};

		swal({
			title: '정말 삭제하시겠습니까?',
			text: '확인을 누르면 해당 포스트정보가 사라지며, 복구 할 수 없습니다.',
			icon: 'warning',
			buttons: true,
			dangerMode: true,
		}).then((willDelete) => {
			if (willDelete) {
				axios.post('/api/sns/removeSNS', data).then((response) => {
					if (response.data.success) {
						swal('게시물 삭제에 성공했습니다.');
					} else {
						swal('게시물 삭제에 실패했습니다.');
					}
				});
			} else {
				swal('취소하셨습니다.');
			}
		});
	};

	const renderPostImage = (snapshots) => {
		if (snapshots.length > 0) {
			let image = snapshots[0];
			return `${RoutingVariable}${image}`;
		}
	};

	const renderPosts = () =>
		Posts &&
		Posts.map((post, index) => (
			<tr key={index}>
				<td>{post._id}</td>
				<td>{post.writer}</td>
				<td>
					<div className="CartGoodsDesktop__goods-info">
						<img
							style={{ width: '50px', height: '50px' }}
							alt="sns"
							src={renderPostImage(post.snapshots)}
						/>
						<div className="CartGoodsDesktop__goods-info-inner">
							<p className="CartGoodsDesktop__goods-info-name">{post.text}</p>
						</div>
					</div>
				</td>
				<td>{post.likes}</td>
				<td>{post.views}</td>
				<td>
					<button onClick={() => removeItem(post._id)}>삭제</button>
				</td>
			</tr>
		));

	return (
		<div>
			<Layout style={{ minHeight: '100vh' }}>
				<Sider
					breakpoint="lg"
					collapsedWidth="0"
					onBreakpoi
					nt={(broken) => {
						console.log(broken);
					}}
					onCollapse={(collapsed, type) => {
						console.log(collapsed, type);
					}}
				>
					<div className="logo" />
					<Menu theme="dark" mode="inline" defaultSelectedKeys={['4']}>
						<Menu.Item key="1" icon={<DashboardOutlined />}>
							<a href="/admin">대시보드</a>
						</Menu.Item>
						<Menu.Item key="2" icon={<UserOutlined />}>
							<a href="/admin/user">사용자</a>
						</Menu.Item>
						<Menu.Item key="3" icon={<ShopOutlined />}>
							<a href="/admin/product">상품</a>
						</Menu.Item>
						<Menu.Item key="4" icon={<SolutionOutlined />}>
							<a href="/admin/sns">SNS 게시물</a>
						</Menu.Item>
					</Menu>
				</Sider>
				<Layout className="site-layout">
					<Header className="site-layout-background" style={{ padding: 0 }} />
					<Content style={{ margin: '0 16px' }}>
						<div
							className="site-layout-background"
							style={{ padding: 24, minHeight: 360 }}
						>
							<h1>SNS LIST</h1>
							<div
								style={{
									display: 'flex',
									justifyContent: 'flex-end',
									margin: '1rem auto',
								}}
							>
								<SearchFeature refreshFunction={updateSearchTerm} />
							</div>
							<table>
								<thead>
									<tr>
										<th>게시물ID</th>
										<th>작성자</th>
										<th>글</th>
										<th>좋아요</th>
										<th>조회수</th>
										<th>삭제</th>
									</tr>
								</thead>

								<tbody>{renderPosts()}</tbody>
							</table>
						</div>
					</Content>
				</Layout>
			</Layout>
		</div>
	);
}

export default SNSList;
