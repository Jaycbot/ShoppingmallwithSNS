import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import LoginPage from './views/LoginPage/LoginPage';
import RegisterPage from './views/RegisterPage/RegisterPage';
import Mypage from './views/MyPage/Mypage';
import UpdateProfile from './views/RegisterPage/UpdateProfile';
import NavBar from './views/NavBar/NavBar';
import Sns_LandingPage from './views/SNS/Sns_LandingPage';
import Sns_posts from './views/SNS/Sns_posts';
import Auth from '../hoc/auth';
import S_NavBar from '../components/views/NavBar/S_NavBar';
import Shop_Landingpage from './views/Shoppingmall/LandingPage/Shop_Landingpage';
import Shop_EventPages from './views/Shoppingmall/EventPage/EventPages';
import UploadProductPage from './views/Shoppingmall/UploadProductPage/UploadProductPage';
import DetailProductPage from './views/Shoppingmall/DetailProductPage/DetailProductPage';
import CartPage from './views/Shoppingmall/CartPage/CartPage';
import BestItem from './views/Shoppingmall/MenuPage/BestItem';
import TopCategory from './views/Shoppingmall/MenuPage/TopCategory';
import OuterCategory from './views/Shoppingmall/MenuPage/OuterCategory';
import PantsCategory from './views/Shoppingmall/MenuPage/PantsCategory';
import OnepieceCategory from './views/Shoppingmall/MenuPage/OnePieceCategory';
import SkirtCategory from './views/Shoppingmall/MenuPage/SkirtCategory';
import ShoesCategory from './views/Shoppingmall/MenuPage/ShoesCategory';
import HistoryPage from './views/Shoppingmall/HistoryPage/HistoryPage';
import SellerPage from './views/SellerPage/SellerPage';
import SellerProducts from './views/Admin/SellerProducts';
import SNSList from './views/Admin/SNSList';
import DashBoard from './views/Admin/DashBoard';
import SearchPage from './views/NavBar/SearchBar/SearchPage';
import UserPage_SNS from './views/UserPage/UserPage';
import EditPostPage from './views/EditPostPage/EditPostPage'
import Footer from './views/Footer/Footer'
import UserPage from './views/Admin/UserPage';

function App() {
	return (
		<div>
			<Router>
				<NavBar />
				<S_NavBar />
				<Switch>
					<Route exact path="/" component={Auth(Shop_Landingpage, null)} />
					<Route exact path="/login" component={Auth(LoginPage, false)} />
					<Route exact path="/register" component={Auth(RegisterPage, false)} />
					<Route exact path="/mypage" component={Auth(Mypage, true)} />
					<Route exact path="/update" component={Auth(UpdateProfile, true)} />
					
					
					<Route exact path="/edit/:info" component={Auth(EditPostPage, true)} />
					
					
					<Route
						exact
						path="/change_password"
						component={Auth(UpdateProfile, true)}
					/>
					<Route exact path="/sns" component={Auth(Sns_LandingPage, null)} />
					<Route exact path="/sns/posts" component={Auth(Sns_posts, true)} />

					<Route exact path="/search/:keyword" component={Auth(SearchPage,null)}/>


					<Route
						exact
						path="/user/:userId"
						component={Auth(UserPage_SNS, null)}
					/>

					<Route
						exact
						path="/shoppingmall"
						component={Auth(Shop_Landingpage, null)}
					/>
					<Route
						exact
						path="/shoppingmall/eventpage"
						component={Auth(Shop_EventPages, null)}
					/>
					<Route
						exact
						path="/product/upload"
						component={Auth(UploadProductPage, true)}
					/>
					<Route
						exact
						path="/product/:productId"
						component={Auth(DetailProductPage, null)}
					/>
					<Route exact path="/user/cart/cartpage" component={Auth(CartPage, true)} />
					<Route
						exact
						path="/shoppingmall/best_item"
						component={Auth(BestItem, null)}
					/>
					<Route
						exact
						path="/shoppingmall/outer"
						component={Auth(OuterCategory, null)}
					/>
					<Route
						exact
						path="/shoppingmall/top"
						component={Auth(TopCategory, null)}
					/>
					<Route
						exact
						path="/shoppingmall/pants"
						component={Auth(PantsCategory, null)}
					/>
					<Route
						exact
						path="/shoppingmall/onepiece"
						component={Auth(OnepieceCategory, null)}
					/>
					<Route
						exact
						path="/shoppingmall/skirt"
						component={Auth(SkirtCategory, null)}
					/>
					<Route
						exact
						path="/shoppingmall/shoes"
						component={Auth(ShoesCategory, null)}
					/>
					<Route
						exact
						path="/shoppingmall/history"
						component={Auth(HistoryPage, true)}
					/>
					<Route exact path="/seller" component={Auth(SellerPage, true)} />
					<Route exact path="/admin" component={Auth(DashBoard, true, true)} />
					<Route
						exact
						path="/admin/user"
						component={Auth(UserPage, true, true)}
					/>
					<Route
						exact
						path="/admin/product"
						component={Auth(SellerProducts, true, true)}
					/>
					<Route
						exact
						path="/admin/sns"
						component={Auth(SNSList, true, true)}
					/>
				</Switch>
				<Footer/>
			</Router>
		</div>
	);
}

export default App;
