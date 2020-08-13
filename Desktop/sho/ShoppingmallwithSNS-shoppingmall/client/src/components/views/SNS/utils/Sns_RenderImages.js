import React, { useState } from 'react';

import axios from 'axios';

import Slick from 'react-slick';
import RenderModal from './RenderModal';

function Sns_RenderImages(props) {
	const [visible, setVisible] = useState(false);

	const onImageClick = () => {
		let data = {
			id: props.post._id,
		};
		axios.post('/api/sns/upviews', data).then((response) => {
			if (response.data.success) {
			} else { 
				alert('조회수가 올라가지 않았습니다.');
			}
		});
		setVisible(true);
	};

	const renderImages = (snapshots) =>
		snapshots.map((snapshot, index) => (
			<div key={index}>
				<img
					id={props.post._id}
					style={{ borderRadius: '16px' }}
					onClick={onImageClick}
					width="250px"
					background-color="inherit"
					height="250px"
					alt="포스트"
					src={`http://localhost:5000/${snapshot}`}
				/>
			</div>
		));

	return (
		<>
			<div>
				<Slick
					dots={true}
					infinite={true}
					speed={500}
					slidesToScroll={1}
					slidesToShow={1}
				>
					{renderImages(props.post.snapshots)}
				</Slick>
				<div>
					<RenderModal
						visible={visible}
						setVisible={setVisible}
						post={props.post}
						renderImages={renderImages}
					/>
				</div>
			</div>
		</>
	);
}

export default Sns_RenderImages;
