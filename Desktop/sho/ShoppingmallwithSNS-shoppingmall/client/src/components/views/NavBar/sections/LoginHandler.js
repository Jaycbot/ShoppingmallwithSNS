import React from 'react';
import { Link } from 'react-router-dom';
import './LoginHandler.scss';
const LoginHandler = () => (
	<div className="loginAndRegister_button">
		<button>
			<Link to="/login" style={{ color: 'inherit' }}>
				로그인
			</Link>
		</button>
		<button>
			<Link to="/register" style={{ color: 'inherit' }}>
				회원가입
			</Link>
		</button>
	</div>
);

export default LoginHandler;
