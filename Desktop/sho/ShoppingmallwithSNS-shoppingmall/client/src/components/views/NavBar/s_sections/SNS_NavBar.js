import React from 'react';
import './SNS_Narbar.scss';
import { Link } from 'react-router-dom';

function SNS_NavBar() {
	return (
		<div className="sns_navbar">
			<h1>
				<Link to="/sns/BoardPage" style={{ color: 'inherit' }}>
					게시판&nbsp;&nbsp;
				</Link>
				<Link to="/sns/HotPage" style={{ color: 'inherit' }}>
					인기&nbsp;&nbsp;
				</Link>
				<Link to="/sns/NewPage" style={{ color: 'inherit' }}>
					최신&nbsp;&nbsp;
				</Link>
				<Link to="/sns/QnaPage" style={{ color: 'inherit' }}>
					QnA
				</Link>
			</h1>
		</div>
	);
}

export default SNS_NavBar;
