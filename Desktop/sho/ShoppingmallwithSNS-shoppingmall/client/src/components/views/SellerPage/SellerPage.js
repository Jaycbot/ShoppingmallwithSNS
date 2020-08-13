import React from 'react'
import ProductCardBlock from './Sections/ProductCardBlock'
import Axios from 'axios'


function SellerPage(props) {
 
    return (
        <div style={{ width : '85%', margin: '3rem auto'}}>
            <h1>상품내역</h1>

            <div>
                <ProductCardBlock/>
            </div>
        </div>
    )
}


export default SellerPage
