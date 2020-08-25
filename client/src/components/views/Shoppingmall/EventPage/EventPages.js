import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {Card, Row} from 'antd'
import ImageSlider from '../utils/ImageSlider';
import './EventPages.scss'
import { FileExcelFilled } from '@ant-design/icons';

const {Meta} = Card

function EventPages() {

    const [Products, setProducts] = useState([])
    const [Skip, setSkip] = useState(0)
    const [Limit, setLimit] = useState(8)

    useEffect(() => {
        
        let body = {
            skip : Skip,
            limit : Limit
        }

        getProducts(body)
  
    }, [])

    const getProducts = (body) => {

        axios.post('/api/product/newproducts', body)
            .then(response => {
                if(response.data.success) {
                        setProducts(response.data.productInfo)
                } else {
                    alert("상품들을 가져오는데 실패했습니다.")
                }
            })

    }

    const renderCards = Products.map((product, index) => {
        return (
            <Card 
                style ={{width:'280px', height: '400px' , marginRight: '22px', marginBottom : '20px'}}
                hoverable={true}
                cover={<a href={`/product/${product._id}`} > <ImageSlider images={product.images} /></a>}
            >
                <Meta
                    title={product.title}
                    description={`${product.price}원`}
                />
            </Card>
         )
    })

    return (
        <div className="catalog" style={{backgroundColor: 'rgb(255, 127, 127)'}}>
            <article className="catalog-page page">
                <section className="catalog-header clearfix" style={{backgroundColor: 'rgba(255, 127, 127, 0.3)'}}>
                       <div className="cover-image-wrapper left">
                        <img className="cover-image" src="https://usercontents-c.styleshare.io/images/46126060/708x394" background-color= '#e17f7f'/>
                        <div className="gradient" id="catalog-gradient" style ={{background: 'linear-gradient(to right, rgba(255, 216, 216, 0), rgb(255, 216, 216))'}}></div>
                    </div>
                    <div className="cover-info remaining-width">
                        <div className="inner-wrapper">
                            <p className="cover-title">이번 주 신상
                            아이템 확인하기 
                            </p>
                            <p className="cover_description">바이제이키스ㅣ블랙루즈ㅣ그라미치
                            이번 주 신상템 체크하기     
                            </p>
                        </div>
                    </div>
                </section><br/><br/><br/>
                <section>
                    <div className="goods-card-container in-catalog" style={{display: 'flex' , justifyContent: 'center'}}>
                        <Row gutter={[32,32]}>            
                            {renderCards}
                        </Row>
                    </div>
                </section>
            </article>
            <br/><br/><br/><br/><br/>
        </div>
    )
}

export default EventPages
