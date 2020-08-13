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
			<div className="current_password">
				<label htmlFor="current">현재 비밀번호</label>
				<input
					type="password"
					name="current"
					value={currentPassword}
					onChange={currentPasswordHandler}
				/>
			</div>
			<div className="new_password">
				<label htmlFor="new">변경할 비밀번호</label>
				<input
					type="password"
					name="new"
					value={newPassword}
					onChange={newPasswordHandler}
				/>
			</div>
			<div className="new_password_confirmation">
				<label htmlFor="confirm">확인</label>
				<input
					type="password"
					name="confirm"
					value={confirmPassword}
					onChange={confirmPasswordHandler}
				/>
			</div>
			<div className="submit_password">
				<button onClick={submitPassword}>변경하기</button>
			</div>
		</div>
	);
}

export default withRouter(Change_Password);
