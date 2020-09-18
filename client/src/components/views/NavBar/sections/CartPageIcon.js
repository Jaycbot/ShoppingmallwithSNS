import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import { ShoppingOutlined } from '@ant-design/icons';
import {Badge} from 'antd'
import { useSelector } from 'react-redux';
import './CartPageIcon.scss';

function CartPageIcon() {
	const user = useSelector((state) => state.user.userData);

	return (
		<div className="cartNav_container">
			<button>
				<Badge count={user && user.cart.length}>
					<Link to="/user/cart/cartpage"  style={{ marginRight: -22 , color:'#667777'}}>
						<ShoppingOutlined style={{ fontSize: 30, marginBottom: 3 }} />
					</Link>
				</Badge>
			</button>
		</div>
	);
}

export default withRouter(CartPageIcon);
