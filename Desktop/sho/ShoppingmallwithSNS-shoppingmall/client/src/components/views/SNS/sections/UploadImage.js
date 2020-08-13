import React, { useState, useCallback, useEffect } from 'react';
import Dropzone from 'react-dropzone';
import { PlusOutlined } from '@ant-design/icons';
import axios from 'axios';

const UploadImage = (props) => {
	const [Images, setImages] = useState([]);

	useEffect(() => {
		props.setSnapshots(Images);
	}, [Images]);

	const dropHandler = useCallback(
		(files) => {
			let formData = new FormData();
			const config = {
				header: { 'content-type': 'multipart/form-data' },
			};
			formData.append('files', files[0]);
			axios.post('/api/sns/uploadImages', formData, config).then((response) => {
				if (response.data.success) {
					setImages([...Images, response.data.filePath]);
				} else {
					alert('파일을 저장하는데 실패했습니다.');
				}
			});
		},
		[Images]
	);
	const deleteHandler = (image) => {
		const currentIndex = Images.indexOf(image);
		let newImages = [...Images];
		newImages.splice(currentIndex, 1);
		setImages(newImages);
	};

	return (
		<div style={{ display: 'flex', justifyContent: 'space-between' }}>
			<Dropzone onDrop={dropHandler}>
				{({ getRootProps, getInputProps }) => (
					<section>
						<div
							style={{
								width: 300,
								height: 240,
								border: '1px solid lightgray',
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
							}}
							{...getRootProps()}
						>
							<input {...getInputProps()} />
							<PlusOutlined style={{ fontSize: '3rem' }} />
						</div>
					</section>
				)}
			</Dropzone>
			<div
				style={{
					display: 'flex',
					width: '350px',
					height: '240px',
					overflowX: 'scroll',
				}}
			>
				{Images.map((image, index) => (
					<div onClick={() => deleteHandler(image)} key={index}>
						<img
							style={{ minWidth: '300px', width: '300px', height: '240px' }}
							src={`http://localhost:5000/${image}`}
							alt="업로드이미지"
						/>
					</div>
				))}
			</div>
		</div>
	);
};

export default UploadImage;
