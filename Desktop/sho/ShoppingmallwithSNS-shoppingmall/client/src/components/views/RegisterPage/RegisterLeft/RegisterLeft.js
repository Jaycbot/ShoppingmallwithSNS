import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { registerUser } from '../../../../_actions/user_action';
import { withRouter } from 'react-router-dom';
import "./RegisterLeft.scss";

function RegisterLeft(props) {
	const dispatch = useDispatch();

	const [Email, setEmail] = useState('');
	const [Password, setPassword] = useState('');
	const [ConfirmPassword, setConfirmPassword] = useState('');

	const onEmailHandler = (event) => {
		setEmail(event.currentTarget.value);
	};
	const onPasswordHandler = (event) => {
		setPassword(event.currentTarget.value);
	};
	const onConfirmPasswordHandler = (event) => {
		setConfirmPassword(event.currentTarget.value);
	};
	const onSubmitHandler = (event) => {
		event.preventDefault(); //page가 refresh 되는 것을 막아줌
		if (Password !== ConfirmPassword) {
			//return을 시켜주므로, 밑에 확인과정으로 진입하지 못함.
			return alert('비밀번호가 일치하지 않습니다.');
		}
		let body = {
			email: Email,
			password: Password,

		};
		dispatch(registerUser(body)).then((response) => {
			if (response.payload.success) {
				console.log("회원가입 성공");
				props.history.push('/login'); //react에서 페이지를 이동시키는 방식
			} else {
				console.log("회원가입 실패");
				alert('Fail');
			}
		});
	};

	return (
		<div className="register_main_left">

			<form onSubmit={onSubmitHandler}>
				<label htmlFor="id" className="input_wrapper" >
					<input
						type="email"
						value={Email}
						placeholder="Email"
						onChange={onEmailHandler}
						className="info_input"
						maxLength="32"
					/>

				</label>
				<label htmlFor="pwd" className="input_wrapper">
					<input
						type="password"
						value={Password}
						placeholder="비밀번호 (최소 6자)"
						onChange={onPasswordHandler}
						className="info_input1"
						maxLength="18"
					/>


					<input
						type="password"
						value={ConfirmPassword}
						placeholder="비밀번호 확인"
						onChange={onConfirmPasswordHandler}
						className="info_input"
						maxLength="18"
					/>

				</label>
				<div className="register_btn_div">
					<button
						type="submit"
						className="register_btn" >

						가입
            </button>
				</div>
			</form>
		</div>
	);
}


export default withRouter(RegisterLeft);
