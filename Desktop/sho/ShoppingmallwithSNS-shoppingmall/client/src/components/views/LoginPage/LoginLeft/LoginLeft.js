import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import "./LoginLeft.scss";
import { loginUser } from '../../../../_actions/user_action'
import { useDispatch } from 'react-redux';

function LoginLeft(props) {
	const dispatch = useDispatch();
	const [Email, setEmail] = useState('');
	const [Password, setPassword] = useState('');
	const onEmailHandler = (event) => {
		setEmail(event.currentTarget.value);
	};
	const onPasswordHandler = (event) => {
		setPassword(event.currentTarget.value);
	};
	const onSubmitHandler = (event) => {
		event.preventDefault(); //page가 refresh 되는 것을 막아줌
		let body = {
			email: Email,
			password: Password,
		};
		dispatch(loginUser(body)).then((response) => {
			if (response.payload.loginSuccess) {
				props.history.push('/');
			} else {
				alert('ID / PW를 다시 확인해주세요');
			}
		});
	};
	 
    return (
      <div className="login_main_left">
          <form onClick={onSubmitHandler}>
        <div>
            
          <label htmlFor="id" className="input_wrapper">
            <input
              type="email"
              value={Email}
              placeholder="Email"
              onChange={onEmailHandler}
              className="info_input"
            />
          </label>
          <div className="forgot_info_div">
            <a className="forgot_info" href="/">
              ID가 기억이 나지 않으세요?
            </a>
          </div>
          <label htmlFor="pwd" className="input_wrapper">
            <input
             
              type="password"
              value={Password}
              placeholder="비밀번호를 입력해주세요"
              onChange={onPasswordHandler}
              className="info_input"
            ></input>
          </label>
          <div className="forgot_info_div">
            <a className="forgot_info" href="/">
              비밀번호를 잊으셨나요?
            </a>
          </div>
          <div className="login_btn_div">
            <button type="submit" className="login_btn">
              로그인
            </button>
          </div>
         
        </div>
        </form>
      </div>
    );
  }

export default withRouter(LoginLeft);
