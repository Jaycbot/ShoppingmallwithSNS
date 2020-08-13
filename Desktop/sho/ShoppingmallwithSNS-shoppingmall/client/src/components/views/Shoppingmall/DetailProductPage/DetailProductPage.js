import React, { useEffect, useState } from 'react'
import axios from 'axios'
import ProductImage from './Sections/ProductImage'
import ProductInfo from './Sections/ProductInfo'
import { withRouter } from 'react-router-dom'
import './DetailProductPage.scss'

function DetailProductPage(props) {

    const productId = props.match.params.productId

    const [Product, setProduct] = useState({})

    useEffect(()=>{
        axios.get(`/api/product/products_by_id?id=${productId}&type=single`)
            .then(response => {
                setProduct(response.data[0])
            })
            .catch(err => alert(err))
    },[])

    return (
        <div className="jCusAo" overflow="hidden" width="100%,80rem">
            <div className="frHBaV">
                <div display="none,block" className="cka-dPy">
                    <p className="kompeH">{Product.title}</p>
                </div>
                

                <br />
                <div display="flex" className="kxZXxz">
                    <ProductImage detail={Product}/>
                    
                    <ProductInfo detail={Product}/>                   
                </div>
            </div>
        </div>
    )
}

export default withRouter(DetailProductPage)