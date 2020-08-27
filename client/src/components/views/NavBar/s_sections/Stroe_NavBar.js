import React, { useState } from 'react';
import './Store_NavBar.scss';
import { Link } from 'react-router-dom';

import { AlignLeftOutlined } from '@ant-design/icons';
import { Drawer, Button } from 'antd';

function Stroe_NavBar() {
	<div className="Store_navbar">
		<p>
			<Link to="/shoppingmall" style={{ color: 'inherit' }}>
				홈&nbsp;&nbsp;
			</Link>
		</p>
		<p>
			<Link to="/shoppingmall/best_item" style={{ color: 'inherit' }}>
				랭킹&nbsp;&nbsp;
			</Link>
		</p>
		<p>
			<Link to="/shoppingmall/outer" style={{ color: 'inherit' }}>
				아우터&nbsp;&nbsp;
			</Link>
		</p>
		<p>
			<Link to="/shoppingmall/top" style={{ color: 'inherit' }}>
				상의&nbsp;&nbsp;
			</Link>
		</p>
		<p>
			<Link to="/shoppingmall/pants" style={{ color: 'inherit' }}>
				바지&nbsp;&nbsp;
			</Link>
		</p>
		<p>
			<Link to="/shoppingmall/onepiece" style={{ color: 'inherit' }}>
				원피스&nbsp;&nbsp;
			</Link>
		</p>
		<p>
			<Link to="/shoppingmall/skirt" style={{ color: 'inherit' }}>
				치마&nbsp;&nbsp;
			</Link>
		</p>
		<p>
			<Link to="/shoppingmall/shoes" style={{ color: 'inherit' }}>
				신발&nbsp;&nbsp;
			</Link>
		</p>
	</div>;

	return (
		<div>
			<div className="Store_navbar">
				<div>
					<Home />
				</div>
				<div>
					<Rangking />
				</div>
				<div>
					<Outer />
				</div>
				<div>
					<Top />
				</div>
				<div>
					<Pants />
				</div>
				<div>
					<Onepiece />
				</div>
				<div>
					<Skirt />
				</div>
				<div>
					<Shoes />
				</div>
			</div>

			<div>
				<Button
					className="menu__mobile-button"
					type="primary"
					onClick={showDrawer}
				>
					<AlignLeftOutlined type="align-right" />
				</Button>
				<Drawer
					title="Basic Drawer"
					placement="right"
					className="menu_drawer"
					closable={false}
					onClose={onClose}
					visible={visible}
				>
					<Home />
					<Rangking />
					<Outer />
					<Top />
					<Pants />
					<Onepiece />
					<Skirt />
					<Shoes />
				</Drawer>
			</div>
		</div>
	);
}

export default Stroe_NavBar;
