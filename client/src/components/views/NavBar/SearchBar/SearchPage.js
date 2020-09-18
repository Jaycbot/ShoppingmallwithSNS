import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import axios from 'axios'
import RenderPosts from '../../SNS/utils/RenderPosts'
import './SearchPage.scss'

//test
import { Col, Card, Row, Tabs } from 'antd';
import ImageSlider from '../../Shoppingmall/utils/ImageSlider'
const { Meta } = Card;


function SearchPage(props) {


    //test
    const [Products, setProducts] = useState([])



    const [SearchTerm, setSearchTerm] = useState("")

    const [SearchWord, setSearchWord] = useState([])

    let keyword = props.match.params.keyword


    const getSearch = (body) => {
        axios.post('/api/sns/getsearch', body)
            .then(response => {
                if (response.data.success) {
                    setSearchWord(response.data.posts)
                } else {
                    alert("검색결과가 없습니다.")
                }
            })
    }


    useEffect(() => {

        let body = {
            searchTerm: keyword
        }
        setSearchTerm(keyword)
        getSearch(body)


        //test
        getProducts(body)

    }, [props.match.params])


    //test
    const getProducts = (body) => {

        axios.post('/api/product/products', body)
            .then(response => {
                if (response.data.success) {
                    setProducts(response.data.productInfo)

                } else {
                    alert("상품들을 가져오는데 실패했습니다.")
                }
            })

    }

    //test
    const renderCards = Products.sort((a, b) => b.sold - a.sold).map((product, index) => {

        return <Col lg={6} md={6} xs={6}>
            <Card
                style={{ width: '320px', height: '435px' }}
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







    return (
        <div>

            <div className='Search_posts'>
                <h2>검색 : SNS</h2>
                <RenderPosts posts={SearchWord} />
            </div>


            
            <br />
            <br />
            <hr />

            <div className='Search_posts'>
                <h2>검색 : STROE</h2>

                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <div width="0.5, 0.25">
                        <Row gutter={[16, 16]}>
                            {renderCards}
                        </Row>
                    </div>
                </div>
            </div>




        </div>
    )
}

export default withRouter(SearchPage)