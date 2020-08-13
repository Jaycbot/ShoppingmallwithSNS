import React from 'react';
import { withRouter } from 'react-router-dom';
import Sns_NavBar from './s_sections/SNS_NavBar';
import Store_NavBar from './s_sections/Stroe_NavBar';
import './S_NavBar.scss';

function S_NavBar(props) {
	const NavBarS = () => {
		if (props.history.location.pathname.substring(0, 4) === '/sns') {
			return <Sns_NavBar />;
		} else {
			return;
		}
	};

	const NavBarSS = () => {
		if (props.history.location.pathname.substring(0, 13) === '/shoppingmall') {
			return <Store_NavBar />;
		} else {
			return;
		}
	};

	return (
		<div className="s_nav_container">
			<div className="s_nav_1">{NavBarS()}</div>
			<div className="s_nav_2">{NavBarSS()}</div>
		</div>
	);
}

export default withRouter(S_NavBar);
