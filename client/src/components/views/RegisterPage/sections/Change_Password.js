import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import swal from 'sweetalert';
import './Change_Password.scss';
function Change_Password() {
	const user = useSelector((state) => state.user.userData);
	const [id, setId] = useState('');
	const [currentPassword, setCurrentPassword] = useState('');
	const [newPassword, setNewPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	useEffect(() => {
		if (user) {
			setId(user._id);
		}
	}, [user]); 

	const currentPasswordHandler = (e) => {
		setCurrentPassword(e.target.value);
	};
	const newPasswordHandler = (e) => {
		setNewPassword(e.target.value);
	};
	const confirmPasswordHandler = (e) => {
		setConfirmPassword(e.target.value);
	};
	const submitPassword = () => {
		if (newPassword !== confirmPassword) {
			swal('패스워드를 일치시켜 주세요!');
			return;
		}
		let data = {
			id,
			password: currentPassword,
			newPassword: newPassword,
		};
		axios.post('/api/users/updatePassword', data).then((response) => {
			if (response.data.success) {
				swal('비밀번호 변경에 성공했습니다.');
			} else {
				swal('비밀번호 변경에 실패했습니다.');
			}
		});
	};
	return (
		<div className="change_password_container">
			<form>

				<div className="title">
					<h2>비밀번호 변경</h2>
				</div>
				<div className="input_label">
					<label htmlFor="current"className="input-text" >현재 비밀번호</label>
					<input
					className="label1"
						type="password"
						name="current"
						placeholder="현재 비밀번호"
						value={currentPassword}
						onChange={currentPasswordHandler}
					/>
					<br/>
					<br/>
				
				</div>
				<div className="input_label">
					<label htmlFor="new" className="input-text" >변경할 비밀번호</label>
					<input
					className="label1"
						type="password"
						name="new"
						placeholder="변경할 비밀번호"
						value={newPassword}
						onChange={newPasswordHandler}
					/>
					<br/>
					<br/>
					
				</div>
				<div className="input_label">
					<label htmlFor="confirm" className="input-text" >비밀번호 확인</label>
					<input
					className="label1"
						type="password"
						name="confirm"
						placeholder="비밀번호 확인"
						value={confirmPassword}
						onChange={confirmPasswordHandler}
					/>
				</div>
				<div className="submit_password">
					<button onClick={submitPassword}>변경하기</button>
				</div>
			</form>
		</div>
	);
}

export default withRouter(Change_Password);
