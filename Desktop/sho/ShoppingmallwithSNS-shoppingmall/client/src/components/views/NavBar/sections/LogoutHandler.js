import React from 'react';
import { withRouter } from 'react-router-dom';
import './LogoutHandler.scss';
function LogoutHandler(props) {
	return (
		<div className="logoutButton_container">
			<button onClick={props.renderLogout}>로그아웃</button>
		</div>
	);
}

export default withRouter(LogoutHandler);
