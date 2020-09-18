import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import './SNS_Border.scss';
function SNS_Border() {
	return (
		<div className="boarder_button">
			<button>
				<Link to="/sns/posts" style={{ color: 'inherit' }}>
					포스팅
				</Link>
			</button>
		</div>
	);
}

export default withRouter(SNS_Border);
