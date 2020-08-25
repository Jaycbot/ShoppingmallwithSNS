import React, { useState, useEffect } from 'react';
import axios from 'axios';
import swal from 'sweetalert';
import SearchFeature from './Sections/SearchFeature';
import { Layout, Menu, Button } from 'antd';
import {
	DashboardOutlined,
	UserOutlined,
	ShopOutlined,
	SolutionOutlined,
} from '@ant-design/icons';
import { RoutingVariable } from '../../Config';
const { Header, Content, Sider } = Layout;

function UserPage(props) {
	const [User, setUser] = useState([]);
	const [UserSearchTerm, setUserSearchTerm] = useState('');

	useEffect(() => {
		let body = {};

		getUsers(body);
	}, []);

	const getUsers = (body) => {
		axios.post('/api/users/admin', body).then((response) => {
			if (response.data.success) {
				setUser(response.data.users);
			} else {
				alert('유저들을 가져오는데 실패했습니다.');
			}
		});
	};

	const updateSearchTerm = (newSearchTerm) => {
		let body = {
			userSearchTerm: newSearchTerm,
		};

		setUserSearchTerm(newSearchTerm);
		getUsers(body);
	};

	//일반회원 -> 관리자
	const onRoleAdminHandler = (_id) => {
		const variables = {
			_id,
		};
		axios.post('/api/users/roleAdmin', variables).then((response) => {
			if (response.data.success) {
				swal('관리자 변경완료');

				getUsers();
				console.log(response.data);
			} else {
				swal('실패');
			}
		});
	};

	//관리자 -> 일반회원
	const onRoleUserHandler = (_id) => {
		const variables = {
			_id,
		};
		axios.post('/api/users/roleUser', variables).then((response) => {
			if (response.data.success) {
				swal('회원등급 변경완료');
				getUsers();
				console.log(response.data);
			} else {
				swal('실패');
			}
		});
	};
	//판매자
	const onRoleSellerHandler = (_id) => {
		const variables = {
			_id,
		};
		axios.post('/api/users/roleSeller', variables).then((response) => {
			if (response.data.success) {
				swal('회원등급 변경완료');
				getUsers();
				console.log(response.data);
			} else {
				swal('실패');
			}
		});
	};

	const removeItem = (id) => {
		const data = {
			id,
		};

		swal({
			title: '정말 삭제하시겠습니까?',
			text: '확인을 누르면 해당 계정정보가 사라지며, 복구 할 수 없습니다.',
			icon: 'warning',
			buttons: true,
			dangerMode: true,
		}).then((willDelete) => {
			if (willDelete) {
				axios.post('/api/users/withdraw', data).then((response) => {
					if (response.data.success) {
						swal('계정 삭제에 성공했습니다.');
					} else {
						swal('계정 삭제에 실패했습니다.');
					}
				});
			} else {
				swal('취소하셨습니다.');
			}
		});
	};

	const renderProfileImage = (user) => {
		if (user && user.image) {
			return `${RoutingVariable}${user.image}`;
		} else {
			return 'https://thumbs.dreamstime.com/b/default-avatar-profile-vector-user-profile-default-avatar-profile-vector-user-profile-profile-179376714.jpg';
		}
	};

	const renderItems = () =>
		User &&
		User.map((user, index) => (
			<tr key={index}>
				<td>{user._id}</td>
				<td>
					<div className="CartGoodsDesktop__goods-info">
						<img
							style={{ width: '50px', height: '50px' }}
							alt="user"
							src={renderProfileImage(user)}
						/>
						<div className="CartGoodsDesktop__goods-info-inner">
							<p className="CartGoodsDesktop__goods-info-name">{user.name}</p>
						</div>
					</div>
				</td>
				<td>{user.email}</td>
				<td>{user.role}</td>
				<td>
					<Button
						type="primary"
						style={{
							backgroundColor: '#9C88FF',
							borderColor: '#9C88FF',
						}}
						// danger
						onClick={() => onRoleAdminHandler(user._id)}
					>
						관리자
					</Button>

					<Button type="primary" onClick={() => onRoleUserHandler(user._id)}>
						일반회원
					</Button>

					<Button type="primary" onClick={() => onRoleSellerHandler(user._id)}>
						판매자
					</Button>
				</td>
				<td>
					<Button onClick={() => removeItem(user._id)}>삭제</Button>
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
					<Menu theme="dark" mode="inline" defaultSelectedKeys={['2']}>
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
							<h1>USER LIST</h1>
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
										<th>UserID</th>
										<th>사용자 이름</th>
										<th>email</th>
										<th>등급</th>
										<th>관리자 설정</th>
										<th>삭제</th>
									</tr>
								</thead>

								<tbody>{renderItems()}</tbody>
							</table>
						</div>
					</Content>
				</Layout>
			</Layout>
		</div>
	);
}

export default UserPage;
