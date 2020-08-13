import React, { useState, useEffect } from 'react'
import axios from 'axios'
import ImageSlider from '../../utils/ImageSlider';
import { Col, Card, Row, Tabs } from 'antd';
import './Cards.scss'

const { Meta } = Card;
const { TabPane } = Tabs;

function HotCards() {

    const [Products, setProducts] = useState([])
    const [Skip, setSkip] = useState(0)

    useEffect(() => {
        
        let body = {
            skip : Skip,
            //limit : Limit
        }

        getProducts(body)

    }, [])

    const getProducts = (body) => {

        axios.post('/api/product/products', body)
            .then(response => {
                if(response.data.success) {
                        setProducts(response.data.productInfo)
                   
                } else {
                    alert("상품들을 가져오는데 실패했습니다.")
                }
            })

    }

    const renderCards = Products.sort((a,b) => b.sold - a.sold).map((product, index) => {

        return <Col lg={6} md={6} xs={6}>
            <Card 
                style ={{width:'320px', height: '435px'}}
                hoverable={true}
                cover={<a href={`/product/${product._id}`} > <ImageSlider images={product.images} /></a>}
            >
                <Meta
                    title={product.title}
                    description={`${product.price}원`}
                />
            </Card>
        </Col>
    })

    const outerCards = Products.sort((a,b) => b.sold - a.sold).map((product, index) => {
        if(product.continents === 1) {

            return <Col lg={6} md={6} xs={6}>
                <Card 
                    style ={{width:'320px', height: '435px'}}
                    hoverable={true}
                    cover={<a href={`/product/${product._id}`} > <ImageSlider images={product.images} /></a>}
                >
                    <Meta
                        title={product.title}
                        description={`${product.price}원`}
                    />
                </Card>
            </Col>
        }
    })

    const shirtCards = Products.sort((a,b) => b.sold - a.sold).map((product, index) => {
        if(product.continents === 2) {
            {return <Col lg={6} md={6} xs={6}>
                <Card 
                    style ={{width:'320px', height: '435px'}}
                    hoverable={true}
                    cover={<a href={`/product/${product._id}`} > <ImageSlider images={product.images} /></a>}
                >
                    <Meta
                        title={product.title}
                        description={`${product.price}원`}
                    />
                </Card>
            </Col>}
        }
    })

    const pantsCards = Products.sort((a,b) => b.sold - a.sold).map((product, index) => {
        if(product.continents === 3) {
            {return <Col lg={6} md={6} xs={6}>
                <Card 
                    style ={{width:'320px', height: '435px'}}
                    hoverable={true}
                    cover={<a href={`/product/${product._id}`} > <ImageSlider images={product.images} /></a>}
                >
                    <Meta
                        title={product.title}
                        description={`${product.price}원`}
                    />
                </Card>
            </Col>}
        }
    })

    const onepeiceCards = Products.sort((a,b) => b.sold - a.sold).map((product, index) => {
        if(product.continents === 4) {
            {return <Col lg={6} md={6} xs={6}>
                <Card 
                    style ={{width:'320px', height: '435px'}}
                    hoverable={true}
                    cover={<a href={`/product/${product._id}`} > <ImageSlider images={product.images} /></a>}
                >
                    <Meta
                        title={product.title}
                        description={`${product.price}원`}
                    />
                </Card>
            </Col>}
        }
    })

    const skirtCards = Products.sort((a,b) => b.sold - a.sold).map((product, index) => {
        if(product.continents === 5) {
            {return <Col lg={6} md={6} xs={6}>
                <Card 
                    style ={{width:'320px', height: '435px'}}
                    hoverable={true}
                    cover={<a href={`/product/${product._id}`} > <ImageSlider images={product.images} /></a>}
                >
                    <Meta
                        title={product.title}
                        description={`${product.price}원`}
                    />
                </Card>
            </Col>}
        }
    })

    const shoesCards = Products.sort((a,b) => b.sold - a.sold).map((product, index) => {
        if(product.continents === 6) {
            {return <Col lg={6} md={6} xs={6}>
                <Card 
                    style ={{width:'320px', height: '435px'}}
                    hoverable={true}
                    cover={<a href={`/product/${product._id}`} > <ImageSlider images={product.images} /></a>}
                >
                    <Meta
                        title={product.title}
                        description={`${product.price}원`}
                    />
                </Card>
            </Col>}
        }
    })

    return (
        <div>
            <section className="hot_section" >
                <div className="hot_div_h2">
                    <h2 className="hot_h2" style={{color: 'gray20', fontWeight: 'bold' }}>인기상품</h2>
                </div>
                <div style={{overflow: 'hidden'}}>
                    <Tabs defaultActiveKey="1" centered style={{ width: '75%', margin : '5rem auto'}}>
                        <TabPane tab="전체" key="1">
                            <div style={{display : 'flex', justifyContent: 'center'}}>
                                <div width="0.5, 0.25">
                                    <Row gutter={[16, 16]}>
                                        {renderCards}
                                    </Row>
                                </div>
                            </div>
                            <br/><br/>
                    
                            <div className="more_button">
                                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                                        <a className="more_a" href="/shoppingmall/best_item" >전체 더보기
                                            <svg viewBox="0 0 24 24" fill="currentColor" width="1em" height="1em" class="sc-Axmtr StoreSectionLinkButtonIcon___StyledCaretRight-gkYQiY iMnOGp">
                                                <path fill-rule="evenodd" d="M9.5 18.66c.2.002.39-.078.53-.22l6-6a.75.75 0 000-1.06l-6-6A.75.75 0 009 6.44l5.44 5.47L9 17.38a.75.75 0 00.5 1.28z"></path>
                                            </svg>
                                        </a>
                    
                                    </div>
                            </div>
                        </TabPane>
                        <TabPane tab="아우터" key="2">
                            <div style={{display : 'flex', justifyContent: 'center'}}>
                                <div width="0.5, 0.25">
                                    <Row gutter={[16, 16]}>
                                        {outerCards}
                                    </Row>
                                </div>
                            </div>
                            <br /><br />
                    
                            <div className="more_button">
                                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                                        <a className="more_a" href="/shoppingmall/outer" >아우터 더보기
                                            <svg viewBox="0 0 24 24" fill="currentColor" width="1em" height="1em" class="sc-Axmtr StoreSectionLinkButtonIcon___StyledCaretRight-gkYQiY iMnOGp">
                                                <path fill-rule="evenodd" d="M9.5 18.66c.2.002.39-.078.53-.22l6-6a.75.75 0 000-1.06l-6-6A.75.75 0 009 6.44l5.44 5.47L9 17.38a.75.75 0 00.5 1.28z"></path>
                                            </svg>
                                        </a>
                    
                                    </div>
                            </div>
                        </TabPane>
                        <TabPane tab="상의" key="3">
                            <div style={{display : 'flex', justifyContent: 'center'}}>
                                <div width="0.5, 0.25">
                                    <Row gutter={[16, 16]}>
                                        {shirtCards}
                                    </Row>
                                </div>
                            </div>
                            <br /><br />
                    
                            <div className="more_button">
                                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                                        <a className="more_a" href="/shoppingmall/top" >상의 더보기
                                            <svg viewBox="0 0 24 24" fill="currentColor" width="1em" height="1em" class="sc-Axmtr StoreSectionLinkButtonIcon___StyledCaretRight-gkYQiY iMnOGp">
                                                <path fill-rule="evenodd" d="M9.5 18.66c.2.002.39-.078.53-.22l6-6a.75.75 0 000-1.06l-6-6A.75.75 0 009 6.44l5.44 5.47L9 17.38a.75.75 0 00.5 1.28z"></path>
                                            </svg>
                                        </a>
                    
                                    </div>
                            </div>
                        </TabPane>
                        <TabPane tab="바지" key="4">
                            <div style={{display : 'flex', justifyContent: 'center'}}>
                                <div width="0.5, 0.25">
                                    <Row gutter={[16, 16]}>
                                        {pantsCards}
                                    </Row>
                                </div>
                            </div>
                            <br /><br />
                    
                            <div className="more_button">
                                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                                        <a className="more_a" href="/shoppingmall/pants" >바지 더보기
                                            <svg viewBox="0 0 24 24" fill="currentColor" width="1em" height="1em" class="sc-Axmtr StoreSectionLinkButtonIcon___StyledCaretRight-gkYQiY iMnOGp">
                                                <path fill-rule="evenodd" d="M9.5 18.66c.2.002.39-.078.53-.22l6-6a.75.75 0 000-1.06l-6-6A.75.75 0 009 6.44l5.44 5.47L9 17.38a.75.75 0 00.5 1.28z"></path>
                                            </svg>
                                        </a>
                    
                                    </div>
                            </div>
                        </TabPane>
                        <TabPane tab="원피스" key="5">
                            <div style={{display : 'flex', justifyContent: 'center'}}>
                                <div width="0.5, 0.25">
                                    <Row gutter={[16, 16]}>
                                        {onepeiceCards}
                                    </Row>
                                </div>
                            </div>
                            <br /><br />
                    
                            <div className="more_button">
                                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                                        <a className="more_a" href="/shoppingmall/onepiece" >원피스 더보기
                                            <svg viewBox="0 0 24 24" fill="currentColor" width="1em" height="1em" class="sc-Axmtr StoreSectionLinkButtonIcon___StyledCaretRight-gkYQiY iMnOGp">
                                                <path fill-rule="evenodd" d="M9.5 18.66c.2.002.39-.078.53-.22l6-6a.75.75 0 000-1.06l-6-6A.75.75 0 009 6.44l5.44 5.47L9 17.38a.75.75 0 00.5 1.28z"></path>
                                            </svg>
                                        </a>
                                    </div>
                            </div>
                        </TabPane>
                        <TabPane tab="치마" key="6">
                            <div style={{display : 'flex', justifyContent: 'center'}}>
                                <div width="0.5, 0.25">
                                    <Row gutter={[16, 16]}>
                                        {skirtCards}
                                    </Row>
                                </div>
                            </div>
                            <br /><br />
                    
                            <div className="more_button">
                                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                                        <a className="more_a" href="/shoppingmall/skirt" >치마 더보기
                                            <svg viewBox="0 0 24 24" fill="currentColor" width="1em" height="1em" class="sc-Axmtr StoreSectionLinkButtonIcon___StyledCaretRight-gkYQiY iMnOGp">
                                                <path fill-rule="evenodd" d="M9.5 18.66c.2.002.39-.078.53-.22l6-6a.75.75 0 000-1.06l-6-6A.75.75 0 009 6.44l5.44 5.47L9 17.38a.75.75 0 00.5 1.28z"></path>
                                            </svg>
                                        </a>
                    
                                    </div>
                            </div>
                        </TabPane>
                        <TabPane tab="신발" key="7">
                            <div style={{display : 'flex', justifyContent: 'center'}}>
                                <div width="0.5, 0.25">
                                    <Row gutter={[16, 16]}>
                                        {shoesCards}
                                    </Row>
                                </div>
                            </div>
                            <br /><br />
                    
                            <div className="more_button">
                                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                                        <a className="more_a" href="/shopppingmall/shoes" >신발 더보기
                                            <svg viewBox="0 0 24 24" fill="currentColor" width="1em" height="1em" class="sc-Axmtr StoreSectionLinkButtonIcon___StyledCaretRight-gkYQiY iMnOGp">
                                                <path fill-rule="evenodd" d="M9.5 18.66c.2.002.39-.078.53-.22l6-6a.75.75 0 000-1.06l-6-6A.75.75 0 009 6.44l5.44 5.47L9 17.38a.75.75 0 00.5 1.28z"></path>
                                            </svg>
                                        </a>
                    
                                    </div>
                            </div>
                        </TabPane>
                    </Tabs>
                </div>
                
            </section>
        </div>
    )
}

export default HotCards
