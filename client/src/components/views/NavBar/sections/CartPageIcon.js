import React from 'react'
import { withRouter, Link } from 'react-router-dom';
import { ShoppingCartOutlined } from '@ant-design/icons'
import bag from '../../../Img/bag.png'
import { useSelector } from "react-redux";

function CartPageIcon() {
    const user = useSelector((state) => state.user)

    return (

        <div className="cartNav_container">
            <button>
            <div count={user.userData && user.userData.cart.length}> 
            <Link to="/user/cart">
                <img src={bag} alt="img"></img>
                </Link>
        </div>
            
			</button>
        </div>
    )
}

export default withRouter(CartPageIcon)
