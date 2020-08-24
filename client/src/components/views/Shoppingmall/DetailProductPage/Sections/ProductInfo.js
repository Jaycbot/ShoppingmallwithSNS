import React from 'react'
import { Button, Descriptions, Row } from 'antd'
import { useDispatch } from 'react-redux'
import { addToCart } from '../../../../../_actions/user_action'
import { Link } from "react-router-dom";
import './ProductInfo.scss'


function ProductInfo(props) {

    const dispatch = useDispatch()

    const clickHandler = () => {

        //필요한 정보를 Cart 필드에 넣어준다.
        dispatch(addToCart(props.detail._id))

    }

    return (

        <div width="1,0.4166666666666667" className="jtLMFf">
            <div className="iojNJW">
                <div className="cBrSlq">

                    <Descriptions title="상세정보" bordered>

                        <Descriptions.Item label="구매량" span={2}>{props.detail.sold}</Descriptions.Item>
                        <Descriptions.Item label="조회수">{props.detail.views}</Descriptions.Item>
                        <Descriptions.Item label="가격">{props.detail.price}</Descriptions.Item>
                    </Descriptions>
                </div>
                <br />
                <br />
                <br />
                <div className="buy_button_parent">
                    <Link to="/user/cart">
                        <div className="immediately_buy_box">
                            <button onClick={clickHandler} className="immediately_buy_button" type="danger">
                                바로 구매
                        </button>
                        </div>

                    </Link>
                    <Link to="/user/cart">
                        <div className="get_cart_box">
                            <button onClick={clickHandler} className="get_cart_button" type="danger">
                                장바구니 담기
                        </button>
                        </div>
                    </Link>


                    <br />
                </div>

            </div>
           
        </div>
        
    )
}

export default ProductInfo
