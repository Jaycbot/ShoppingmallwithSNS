import React from 'react'
import './UserCardBlock.scss'

function UserCardBlock(props) {

    const renderCartImage = (images) => {
        if(images.length > 0) {
            let image = images[0]
            return `http://localhost:5000/${image}`
        } 
    }   

    const renderItems = () => (
        props.products && props.products.map((product, index) => (
            <tr key={index} style={{ fontSize: '15px'}}>
                <td>
                    <div className="CartGoodsDesktop__goods-info">
                    <img style={{ width: '70px', height: '50px' }} alt="product" 
                    src={renderCartImage(product.images)} />
                        <div className="CartGoodsDesktop__goods-info-inner">
                            <p className="CartGoodsDesktop__goods-info-name">
                                {product.title}
                            </p>
                        </div> 
                    </div>
                </td> 
                <td>{product.quantity} 개</td>
                <td>{product.price} 원</td>
                <td style={{color: 'blue'}}>{product.price * product.quantity} 원</td>
                <td>
                    <button onClick={() => props.removeItem(product._id)}>
                        삭제
                    </button> 
                </td>
            </tr>
        ))
    )


    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>주문상품</th>
                        <th>수량</th>
                        <th>상품금액</th>
                        <th>주문금액</th>
                        <th>주문관리</th>
                    </tr>
                </thead>

                <tbody>
                    {renderItems()}
                </tbody>
                
            </table>
        </div>
    )
}

export default UserCardBlock
