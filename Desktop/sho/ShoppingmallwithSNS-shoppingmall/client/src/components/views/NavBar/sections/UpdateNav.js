import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import './UpdateNav.scss';
function UpdateNav() {
	return (
		<div className="updateNav_container">
			<button>
				<Link to="/mypage" style={{ color: 'inherit' }}>
					마이페이지
				</Link>
			</button>
		</div>
	);
}

export default withRouter(UpdateNav);
