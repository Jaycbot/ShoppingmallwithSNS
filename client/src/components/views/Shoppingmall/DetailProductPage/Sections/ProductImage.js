import React, { useEffect, useState } from 'react';
import ImageGallery from 'react-image-gallery';
import './ProductImage.scss';
import { RoutingVariable } from '../../../../Config';
function ProductImage(props) {
	const [Images, setImages] = useState([]);

	useEffect(() => {
		if (props.detail.images && props.detail.images.length > 0) {
			let images = [];

			props.detail.images &&
				props.detail.images.map((item) => {
					images.push({
						original: `${RoutingVariable}${item}`,
						thumbnail: `${RoutingVariable}${item}`,
					});
				});
			setImages(images);
		}
	}, [props.detail]);

	return (
		<div width="1,0.5833333333333334" className="feTtOu">
			<div overflow="hidden" className="jbpLml">
				<picture className="hOkNKG">
					<ImageGallery items={Images} className="ecDCYM lazy loaded" />
				</picture>
			</div>
		</div>
	);
}

export default ProductImage;
