import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import { updateUser } from '../../../../_actions/user_action';
import { Button } from 'antd';
import swal from 'sweetalert';
import './Update_Profile.scss';
function Update_Profile(props) {
	const user = useSelector((state) => state.user.userData);
	const [id, setId] = useState('');
	const [userImage, setUserImage] = useState('');
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const dispatch = useDispatch();
	useEffect(() => {
		setUserImage(user && user.image);
		setName(user && user.name);
		setEmail(user && user.email);
		if (user) {
			setId(user._id);
		}
	}, [user]);

	const imageRender = () => {
		if (userImage) {
			return (
				<img src={`http://localhost:5000/${userImage}`} alt="프로필사진" />
			);
		} else {
			return (
				<img
					src={`https://1sfj1635wrts49n9bz3kpi6y-wpengine.netdna-ssl.com/wp-content/uploads/2019/07/no-image-found.png`}
				/>
			);
		}
	};

	const changeProfileImage = () => {
		document.querySelector('#file').click();
	};
	const onImageChange = (e) => {
		const formData = new FormData();
		const config = {
			header: { 'content-type': 'multipart/form-data' },
		};
		formData.append('files', e.target.files[0]);

		axios.post('/api/users/uploadImages', formData, config).then((response) => {
			if (response.data.success) {
				setUserImage(response.data.filePath);
			} else {
				alert('이미지 업로드에 실패했습니다.');
			}
		});
	};

	const nameChangeHandler = (e) => {
		setName(e.target.value);
	};
	const emailChangeHandler = (e) => {
		setEmail(e.target.value);
	};

	const handleSubmit = () => {
		let data = {
			id,
			name,
			image: userImage,
			email,
		};
		dispatch(updateUser(data)).then((response) => {
			console.log(response);
			if (response && response.payload) {
				swal('회원정보 수정을 성공했습니다.');
			} else {
				swal('이미 존재하는 이메일 입니다.');
			}
		});
	};

	const withdrawFromAccount = () => {
		const data = {
			id,
		};

		swal({
			title: '정말 탈퇴하시겠습니까?',
			text: '확인을 누르면 해당 계정정보가 사라지며, 복구 할 수 없습니다.',
			icon: 'warning',
			buttons: true,
			dangerMode: true,
		}).then((willDelete) => {
			if (willDelete) {
				axios.post('/api/users/withdraw', data).then((response) => {
					if (response.data.success) {
						swal('계정탈퇴에 성공했습니다.');
						props.history.push('/');
					} else {
						swal('계정 탈퇴에 실패했습니다.');
					}
				});
			} else {
				swal('취소하셨습니다.');
			}
		});
	};

	return (
		<div className="update_user_container">
			<div className="head_text">
				<h3>프로필 수정</h3>
			</div>
			<section className="user_info_container">
				<div className="user_image_change">
					<div className="user_image">{imageRender()}</div>
					<div className="user_info_button">
						<input type="file" onChange={onImageChange} id="file" />
						<button onClick={changeProfileImage}>바꾸기</button>
					</div>
				</div>
				<div className="user_detail">
					<div className="user_name">
						<label htmlFor="name">이름</label>
						<input
							type="text"
							value={name}
							name="name"
							onChange={nameChangeHandler}
						/>
					</div>
					<div className="user_email">
						<label htmlFor="email">이메일</label>
						<input
							type="email"
							value={email}
							name="email"
							onChange={emailChangeHandler}
						/>
					</div>
				</div>
			</section>
			<div className="submit_change">
				<Button type="ghost" onClick={handleSubmit}>
					다 했어요
				</Button>
			</div>
			<br />
			<br />
			<div className="sign_out">
				<Button type="ghost" onClick={withdrawFromAccount}>
					탈퇴하기
				</Button>
			</div>
		</div>
	);
}

export default withRouter(Update_Profile);
