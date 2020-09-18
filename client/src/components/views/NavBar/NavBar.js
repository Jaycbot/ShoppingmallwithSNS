import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import LandingPageNav from './sections/LandingPageNav';
import './NavBar.scss';
import SearchBar from './SearchBar/Search/SearchBar';
import ButtonHandler from './sections/ButtonHandler'
import { AlignLeftOutlined } from '@ant-design/icons';
import { Drawer, Button } from 'antd';

function NavBar(props) {

	const [visible, setVisible] = useState(false)
	const showDrawer = () => {
		setVisible(true)
	};
	const onClose = () => {
		setVisible(false)
	};


	return (
		<div>

			<div className="nav_container">
				<div className="Menu">
					<LandingPageNav />
				</div>

				<div className="Search">
					<SearchBar />
				</div>

				<div className="allButtons">
					<ButtonHandler />
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
					<ButtonHandler />
				</Drawer>
			</div>



		</div>
	);
}

export default withRouter(NavBar);
