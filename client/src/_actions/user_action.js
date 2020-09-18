import axios from 'axios';
import {
	LOGIN_USER,
	REGISTER_USER,
	AUTH_USER,
	UPDATE_USER,
	SELLER_USER,
	ADD_TO_CART,
	GET_CART_ITEMS,
	REMOVE_CART_ITEM,
	ON_SUCCESS_BUY,
} from './types';

export function loginUser(dataToSubmit) {
	const request = axios
		.post('/api/users/login', dataToSubmit)
		.then((response) => response.data);
	return {
		type: LOGIN_USER,
		payload: request,
	};
}

export function registerUser(dataToSubmit) {
	const request = axios
		.post('/api/users/register', dataToSubmit)
		.then((response) => response.data);
	return {
		type: REGISTER_USER,
		payload: request,
	};
}

export function auth() {
	const request = axios
		.get('/api/users/auth')
		.then((response) => response.data);
	return {
		type: AUTH_USER,
		payload: request,
	};
}

export function updateUser(dataToSend) {
	const request = axios
		.post('/api/users/update', dataToSend)
		.then((response) => {
			if (response.data.success) {
				return response.data;
			} else {
				alert('전송 실패');
			}
		});
	return {
		type: UPDATE_USER,
		payload: request,
	};
}

export function sellerUser(id) {
	let body = {
		writer: id,
	};

	const request = axios
		.post('/api/product/sellerProducts', body)
		.then((response) => response.data);

	return {
		type: SELLER_USER,
		payload: request,
	};
}

export function addToCart(id) {
	let body = {
		productId: id,
	};

	const request = axios
		.post(`/api/users/addToCart`, body)
		.then((response) => response.data);

	return {
		type: ADD_TO_CART,
		payload: request,
	};
}

export function getCartItems(cartItems, userCart) {
	const request = axios
		.get(`/api/product/products_by_id?id=${cartItems}&type=array`)
		.then((response) => {
			userCart.forEach((cartItem) => {
				response.data.forEach((productDetail, i) => {
					if (cartItem.id === productDetail._id) {
						response.data[i].quantity = cartItem.quantity;
					}
				});
			});

			return response.data;
		});

	return {
		type: GET_CART_ITEMS,
		payload: request,
	};
}

export function removeCartItem(productId) {
	const request = axios
		.get(`/api/users/removeFromCart?_id=${productId}`)
		.then((response) => {
			response.data.cart.forEach((item) => {
				response.data.productInfo.forEach((product, index) => {
					if (item.id === product._id) {
						response.data.productInfo[index].quantity = item.quantity;
					}
				});
			});
			return response.data;
		});

	return {
		type: REMOVE_CART_ITEM,
		payload: request,
	};
}

export function onSuccessBuy(data) {
	const request = axios
		.post(`/api/users/successBuy`, data)
		.then((response) => response.data);

	return {
		type: ON_SUCCESS_BUY,
		payload: request,
	};
}
