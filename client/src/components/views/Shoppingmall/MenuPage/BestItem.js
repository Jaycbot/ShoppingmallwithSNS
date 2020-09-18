import React, { useState, useEffect } from 'react'
import axios from 'axios'
import MenuCardImage from './MenuCardImage';
import { Select, Col, Card, Row } from 'antd';
import './Menu.scss'

const { Meta } = Card;
const { Option } = Select;

function BestItem() {

    const [Products, setProducts] = useState([])
    const [Skip, setSkip] = useState(0)
    const [PostSize, setPostSize] = useState(0)
    

    useEffect(() => {
        
        let body = {
            skip : Skip,
        }

        getProducts(body)

    }, [])

    const getProducts = (body) => {

        axios.post('/api/product/products', body)
            .then(response => {
                if(response.data.success) {
                    if(body.loadMore) {
                        setProducts([...Products, ...response.data.productInfo])
                    } else {
                        setProducts(response.data.productInfo.sort((a,b) => b.sold - a.sold))
                    }
                    setPostSize(response.data.postSize)
                } else {
                    alert("상품들을 가져오는데 실패했습니다.")
                }
            })

    }

    const renderCards = 
        Products.map((product, index) => {
                return  <Col lg={6} md={8} xs={24}>
                            <Card 
                                style ={{width:'280px', height: '350px'}}
                                hoverable={true}
                                cover={<a href={`/product/${product._id}`}><MenuCardImage images={product.images} /></a>}
                            >
                                <Meta
                                    title={product.title}
                                    description={`${product.price}원`}
                                />
                            </Card>
                        </Col>
        })

    function handleChange(value) {
        switch (`${value}`) {
            case "Best":
                setProducts([...Products.sort((a,b) => b.sold - a.sold)])
                break;
            case "New":
                setProducts([...Products.sort((a, b) => b.createdAt.localeCompare(a.createdAt))])
                break;
            case "LowPrice":
                setProducts([...Products.sort((a,b) => a.price - b.price)])            
                break;
            case "HighPrice":
                setProducts([...Products.sort((a,b) => b.price - a.price)])
                break;
        
            default:
                
                break;
        }
    }

    return (
        <article className="store-page page">
            <div className="category-container best-category clearfix">
                <div className="category-goods-label">
                    <p className="all-goods-in-category">BEST 상품보기</p>    
                </div>
                <div className="sort-filter clearfix">
                    <div className="dropdown basic-select">
                    <Select defaultValue="Best" id="select" style={{ width: 120 }} onChange={handleChange} bordered={false}>
                        <Option value="Best">인기순</Option>
                        <Option value="New">최신순</Option>
                        <Option value="LowPrice">낮은가격순</Option>
                        <Option value="HighPrice">높은가격순</Option>
                    </Select>
                    </div>
                </div>
                <div className="goods-card-container">
                    <div className="inner-wrapper clearfix">
                        <Row gutter={[16, 16]}>
                            {(`$('#fruits').val('Best')`) ? renderCards : <h1>0</h1>}
                        </Row>
                    </div>
                </div>
            </div>
        </article>
    )
}

export default BestItem
