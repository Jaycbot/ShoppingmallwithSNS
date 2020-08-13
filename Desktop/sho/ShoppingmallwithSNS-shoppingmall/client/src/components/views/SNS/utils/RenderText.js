import React from 'react';
import sanitize from 'sanitize-html';
import './RenderText.scss';

function RenderText(props) {
	const filterText = (text, addMore) => {
		let preText = text.split(' ');
		let postingText = '';
		preText.forEach((content) => {
			if (typeof content !== 'undefined') {
				if (content.charAt(0) === '#') {
					postingText += `<a>${content} </a>`;
				} else {
					postingText += content + ' ';
				}
			}
		});
		if (addMore) {
			postingText += `...`;
		}

		return { __html: sanitize(postingText) };
	};

	const renderText = () => {
		if (props.post.text.length > 16) {
			let slicedText = props.post.text.substr(0, 16);
			let addMore = true;
			return filterText(slicedText, addMore);
		} else {
			return filterText(props.post.text);
		}
	};
	return (
		<div className="text_container">
			<div className="text_user_name">
				<h4>{props.post.writer.name}</h4>
			</div>
			<div className="text_main" dangerouslySetInnerHTML={renderText()}></div>
			<div className="text_views">{props.post.views} views</div>
		</div>
	);
}

export default RenderText;
