import React from 'react';

import { withRouter, Link } from 'react-router-dom';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import ProfileChange from './sections/Update_Profile';
import ChangePassword from './sections/Change_Password';
import './UpdateProfile.scss';

function UpdateProfile(props) {
	const renderUpdateComponent = () => {
		if (props.location.pathname === '/update') {
			return <ProfileChange />;
		}
		if (props.location.pathname === '/change_password') {
			return <ChangePassword />;
		} else {
			return null;
		}
	};

	return (
		<div className="update_container">
			<ul className="left_navbar">
				<li className="profile">
					<Link to="/update" style={{ color: 'inherit' }}>
						<UserOutlined />
						프로필 수정
					</Link>
				</li>
				<li className="change_password">
					<Link to="/change_password" style={{ color: 'inherit' }}>
						<LockOutlined />
						비밀번호 수정
					</Link>
				</li>
			</ul>
			<div className="update_toggle">{renderUpdateComponent()}</div>
		</div>
	);
}

export default withRouter(UpdateProfile);
