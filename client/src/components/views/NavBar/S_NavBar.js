import React from 'react';
import { withRouter } from 'react-router-dom';
import Store_NavBar from './s_sections/Stroe_NavBar';
import './S_NavBar.scss';

function S_NavBar(props) {
	const NavBarS = () => {
		if (props.history.location.pathname.substring(0, 8) === '/product') {
			return <Store_NavBar />;
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
	
	const NavBarSSS = () => {
		if (props.history.location.pathname.substring(0, 1) === '/') {
			return <Store_NavBar />;
		} else {
			return;
		}
	};

	return (
		<div className="s_nav_container">
			<div className="s_nav_1">{NavBarS()}</div>
			<div className="s_nav_2">{NavBarSS()}</div>
			<div className="s_nav_3">{NavBarSSS()}</div>
		</div>
	);
}

export default withRouter(S_NavBar);
