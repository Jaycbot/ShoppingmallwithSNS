import React, {useEffect,useState} from 'react'
import axios from 'axios';
import { Card, Avatar, Row, Col } from 'antd';
import RenderImages from '../../../SNS/utils/Sns_RenderImages'
import RenderText from '../../../SNS/utils/RenderText';
import { RoutingVariable } from '../../../../Config';


function ProductReview(props) {
	
	const { Meta } = Card;

	const [title, setTitle] = useState("")

	const [ReviewPost, setReviewPost] = useState([])
	
	let keyword = props.detail.title

	useEffect(() => {
		if(props && props.detail.title){
		setTitle(props.detail.title);
		}
		
		let body = {
            searchTerm: keyword
        }

		getSearch(body)
	}, [props.detail])


	const getSearch = (body) => {
        axios.post('/api/sns/getsearch', body)
            .then(response => {
                if (response.data.success) {
					setReviewPost(response.data.posts)
                } else {
                }
            })
	}
	
	const renderProfileImage = (post) => {
		if (post && post.writer.image) {
			return `${RoutingVariable}${post.writer.image}`;
		} else {
			return 'https://thumbs.dreamstime.com/b/default-avatar-profile-vector-user-profile-default-avatar-profile-vector-user-profile-profile-179376714.jpg';
		}
	};

	const renderPosts = (posts) =>
	posts.map((post) => {
			// (
			if (post && post.writer) {
				// 수정한 내용 원래는 없음
				return (
					<Col key={post._id} lg={6} xs={24}>
						<Card
							style={{
								width: 250,
								border: '2px solid #e8ebed',
								borderRadius: '20px',
							}}
							cover={<RenderImages post={post} />}
						>
							<Meta
								avatar={<Avatar src={renderProfileImage(post)} />}
								description={<RenderText post={post} />}
							/>
						</Card>
					</Col>
				);
			} // 수정한 내용
		}); // ))


    return (
		<div>
		<section className="hot_section" style={{ backgroundColor: 'black' }}>
			<div className="hot_div_h2" style={{ marginTop: '3rem' }}>
				<h2 className="hot_h2" style={{ color: 'white', fontWeight: 'bold' }}>
					상품 리뷰
				</h2>
			</div>
			<br /> <br />
			<div style={{ display: 'flex', justifyContent: 'center' }}>
				<div width="0.5, 0.25">
					<Row gutter={[16, 32]}>{renderPosts(ReviewPost)}</Row>
				</div>
			</div>
			<br />
			<br />
		</section>
	</div>
    )
}

export default ProductReview