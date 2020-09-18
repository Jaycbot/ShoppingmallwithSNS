import React from 'react';
import { Carousel } from 'antd';
import { RoutingVariable } from '../../../Config';
function ImageSlider(props) {
	return (
		<div>
			<Carousel autoplay>
				{props.images.map((image, index) => (
					<div key={index}>
						<img
							style={{ width: '100%', height: '320px' }}
							src={`${RoutingVariable}${image}`}
							alt="productImage"
						/>
					</div>
				))}
			</Carousel>
		</div>
	);
}

export default ImageSlider;
