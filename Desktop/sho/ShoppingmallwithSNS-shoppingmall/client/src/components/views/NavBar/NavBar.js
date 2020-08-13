import React from 'react';
import { useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import LandingPageNav from './sections/LandingPageNav';
import LoginHandler from './sections/LoginHandler';
import SNSBorder from './sections/SNS_Border';
import LogoutHandler from './sections/LogoutHandler';
import UpdateNav from './sections/UpdateNav';
import './NavBar.scss';
import SellerUpload from './sections/SellerUpload';
import SearchBar from './SearchBar/Search/SearchBar'
import CartPageIcon from './sections/CartPageIcon';

function NavBar(props) {
	const userData = useSelector((state) => state.user.userData);

	const logoutHandler = () => {
		axios.get('/api/users/logout').then((response) => {
			if (response.data.success) {
				props.history.push('/login');
			} else {
				console.log('로그아웃에 실패하였습니다');
			}
		});
	};

	const boardHandler = () => {
		if (props.history.location.pathname.substring(0, 4) === '/sns') {
			return <SNSBorder />;
		} else {
			return <SellerUpload />;
		}
	};

	return (
		<div className="nav_container">
			<div>
				<LandingPageNav />
			</div>
			<div>
				<SearchBar/>
			</div>
			<div>
				{userData && !userData.isAuth && <LoginHandler />}
				{userData && userData.isAuth && (
					<LogoutHandler renderLogout={logoutHandler} />
				)}
				{userData && userData.isAuth && <UpdateNav />}
				{userData && userData.isAuth && boardHandler()}
				{userData && userData.isAuth && <CartPageIcon />}
				
			</div>
		</div>
	);
}

export default withRouter(NavBar);
