import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import './AdminButton.scss';
function AdminButton() {
	return (
		<div className="AdminButton_container">
			<button>
				<Link to="/admin" style={{ color: 'inherit' }}>
                관리자페이지
				</Link>
			</button>
		</div>
	);
}

export default withRouter(AdminButton);
