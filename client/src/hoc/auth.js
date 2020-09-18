import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { auth } from '../_actions/user_action';
export default function (SpecificComponent, option, adminRoute = null) {
	//option
	//1.null => 아무나 출입이 가능한 페이지
	//2.true => 로그인한 유저만 출입이 가능한 페이지
	//3. false => 로그인한 유저는 출입 불가능한 페이지
	//4. adminRoute - 어드민 유저만 들어갈 수 있는 페이지- true값을 줄 시 보여줌
	function AuthenticationCheck(props) {
		const dispatch = useDispatch();
		//페이지를 이동시 매번 auth를 채크한다.
		useEffect(() => {
			dispatch(auth()).then((response) => {
				//로그인 하지 않은 상태
				if (!response.payload.isAuth) {
					if (option) {
						props.history.push('/login');
					}
				} else {
					//로그인 한 상태 -admin 페이지에 어드민 권한 없이 들어가려는 경우 막기
					if (adminRoute && response.payload.role !== 1) {
						props.history.push('/');
					} else {
						//로그인 유저가 들어가지 못하는 곳
						if (option === false) {
							props.history.push('/');
						}
					}
				}
			});
		}, []);
		return <SpecificComponent />;
	}
	return AuthenticationCheck;
}
