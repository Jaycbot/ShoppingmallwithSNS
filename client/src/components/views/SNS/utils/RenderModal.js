import React, { useEffect } from 'react';
import Modal from 'react-modal';
import ImageGallery from 'react-image-gallery';
import RenderDescription from './RenderDescription';
import LikeDislikes from './LikeDislikes';
import axios from 'axios';
import swal from 'sweetalert';
import './RenderModal.scss';

import { withRouter } from 'react-router-dom';
import { useSelector } from 'react-redux';

const customStyles = {
	overlay: {
		opacity: 1,
		position: 'fixed',
	},
	content: {
		margin: 'auto',
		width: '955px',
		height: '851px',
		overflow: 'hidden',
		background: '#FFFFFF',
	},
};

function RenderModal(props) {
	const user = useSelector((state) => state.user.userData);

	useEffect(() => {
		Modal.setAppElement('#root');
	}, []);

	const handleCancel = () => {
		props.setVisible(false);
	};

	let snapshots = [];
	props.post.snapshots.map((snapshot) => {
		snapshots.push({
			original: `/api/${snapshot}`,
			thumbnail: `/api/${snapshot}`,
		});
	});

	const removeItem = (snsId) => {
		const data = {
			id: snsId,
		};

		swal({
			title: '정말 삭제하시겠습니까?',
			text: '확인을 누르면 해당 포스트정보가 사라지며, 복구 할 수 없습니다.',
			icon: 'warning',
			buttons: true,
			dangerMode: true,
		}).then((willDelete) => {
			if (willDelete) {
				axios.post('/api/sns/removeSNS', data).then((response) => {
					if (response.data.success) {
						swal('게시물 삭제에 성공했습니다.');
					} else {
						swal('게시물 삭제에 실패했습니다.');
					}
				});
			} else {
				swal('취소하셨습니다.');
			}
		});
	};

	const editPage = (info) => {
		props.history.push(`/edit/${info._id}`);
	};

	return (
		<div className="aaa">
			<Modal
				okText="확인"
				isOpen={props.visible}
				onRequestClose={handleCancel}
				style={customStyles}
			>
				<div className="modal_container">
					<div className="modal_image">
						<ImageGallery
							items={snapshots}
							showPlayButton={false}
							disableThumbnailScroll={true}
						/>
					</div>
					<hr />
					<div className="modal_info">
						<div>
							<RenderDescription post={props.post} />
						</div>

						<br />
						<LikeDislikes
							modal
							useId={localStorage.getItem('userId')}
							commentId={props.post._id}
						/>

						{user && user._id === props.post.writer._id && (
							<button onClick={() => removeItem(props.post._id)}>삭제</button>
						)}

						{user && user._id === props.post.writer._id && (
							<button onClick={() => editPage(props.post)}>수정</button>
						)}
					</div>
				</div>
			</Modal>
		</div>
	);
}

export default withRouter(RenderModal);
