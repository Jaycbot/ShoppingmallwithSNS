import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import './SellerButton.scss';
function SellerButton() {
	return (
		<div className="SellerButton_container">
			<button>
				<Link to="/seller" style={{ color: 'inherit' }}>
					판매정보
				</Link>
			</button>
		</div>
	);
}

export default withRouter(SellerButton);

