import React, { useEffect, useState } from 'react';
import { Form, Button, Input } from 'antd';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import ImageGallery from 'react-image-gallery';
import { RoutingVariable } from '../../Config';
import './EditPostPage.scss';
const { TextArea } = Input;

function EditPostPage(props) {
	let postinfo = props.match.params.info;
	const [Images, setImages] = useState([])
	const [Edit, setEdit] = useState('');
	const [EditPost, setEditPost] = useState([]);
	const [Test, setTest] = useState([]);
	const [Previous, setPrevious] = useState('');

	useEffect(() => {

		let body = {
			edit: postinfo,
		};
		getInfo(body);


	}, []);



	let snapshots = [];
	Images.map((snapshot) => {
		snapshots.push({
			original: `${RoutingVariable}${snapshot}`,
			thumbnail: `${RoutingVariable}${snapshot}`,
		});
	});



	const getInfo = (body) => {
		axios.post('/api/sns/edit', body).then((response) => {
			if (response.data.success) {
				setEditPost(response.data.posts);
				setTest(response.data.posts[0]);
				setEdit(response.data.posts[0].text);
				setPrevious(response.data.posts[0].text);
				setImages(response.data.posts[0].snapshots);
			} else {
				alert('Post를 가져오는데 실패했습니다.');
			}
		});
	};
	console.log(Images);

	const textChangeHandler = (event) => {
		setEdit(event.currentTarget.value);
	};

	const updateButton = () => {
		let body = {
			previous: Previous,
			newest: Edit,
			writer: Test.writer._id,
		};
		testChange(body);
	};

	const testChange = (body) => {
		axios.post('/api/sns/editText', body).then((response) => {
			if (response.data.success) {
				setEditPost(response.data.posts);
				setEdit(response.data.posts.text);
				alert('수정하기가 성공했습니다.');
				props.history.push('/sns');
			} else {
				alert('수정하기가 실패했습니다.');
			}
		});
	};

	return (
		<div>
			<div className="post_container">
				<div className="description">

					<div className="modal_image">
						<ImageGallery
							items={snapshots}
							showPlayButton={false}
							disableThumbnailScroll={true}
						/>
					</div>

					<Form>

						<label htmlFor="description">
							<h2>내용</h2>
						</label>
						<TextArea onChange={textChangeHandler} value={Edit} />
						<Button onClick={updateButton}>수정하기</Button>
					</Form>
				</div>
			</div>
		</div>
	);
}

export default withRouter(EditPostPage);
