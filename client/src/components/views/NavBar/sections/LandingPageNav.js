import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import './LandingPageNav.scss';
import SSS from '../../../Img/SSS.PNG';
function LandingPageNav() {
	return (
		<div className="landingPage_nav">
			<Link to="/">
				<img src={SSS} alt="img"></img>
			</Link>

			<p>
				<Link to="/sns" style={{ color: 'inherit' }}>
					#SNS
				</Link> 
			</p>

			<p>
				<Link to="/shoppingmall" style={{ color: 'inherit' }}>
					STORE
				</Link>
			</p>
		</div>
	);
}

export default withRouter(LandingPageNav);
