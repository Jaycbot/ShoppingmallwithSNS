import React, { useEffect } from 'react';
import Modal from 'react-modal';
import ImageGallery from 'react-image-gallery';
import RenderDescription from './RenderDescription';
import LikeDislikes from './LikeDislikes'

import './RenderModal.scss';

const customStyles = {
	overlay: {
		opacity: 1,
		position : "fixed"
	},
	content: {
		margin: 'auto',
		width: '955px',
		height: '851px',
		overflow: 'hidden',
		background: '#FFFFFF',
	},

};

//image galary - thumbnail, original props.snapshots

function RenderModal(props) {
	useEffect(() => {
		Modal.setAppElement('#root');
	}, []);
	const handleCancel = () => {
		props.setVisible(false);
	};
	let snapshots = [];
	props.post.snapshots.map((snapshot) => {
		snapshots.push({
			original: `http://localhost:5000/${snapshot}`,
			thumbnail: `http://localhost:5000/${snapshot}`,
		});
	});
	//test1
	// const commentId = props.match.parmas.commentId

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
					<hr/>
					<div className="modal_info">
						<div>
							<RenderDescription post={props.post} />
						</div>

						<br />
						<LikeDislikes modal useId={localStorage.getItem('userId')} commentId={props.post._id} />
						
					</div>

				</div>
			</Modal>
		</div>
	);
}

export default RenderModal;
