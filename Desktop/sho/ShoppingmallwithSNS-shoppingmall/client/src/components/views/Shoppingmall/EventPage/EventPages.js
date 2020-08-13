import React from 'react'
import {Card, Row} from 'antd'
import './EventPages.scss'

const {Meta} = Card

function EventPages() {
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
                </section>
                <section>
                    <div className="goods-card-container in-catalog">
                        <Row gutter={[32,32]} className="inner-wrapper clearfix">
            
                                <Card className="goods-card"
                                    hoverable
                                    style={{ width: 200 }}
                                    cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
                                >    
                                <Meta
                                    title='aa'
                                    description='aa'
                                />
                                </Card>
                                <Card
                                    className="goods-card"
                                    hoverable
                                    style={{ width: 200 }}
                                    cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
                                >    
                                <Meta
                                    title='aa'
                                    description='aa'
                                />
                                </Card>
                                <Card
                                    className="goods-card"
                                    hoverable
                                    style={{ width: 200 }}
                                    cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
                                >    
                                <Meta
                                    title='aa'
                                    description='aa'
                                />
                                </Card>
                                <Card
                                    className="goods-card"
                                    hoverable
                                    style={{ width: 200 }}
                                    cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
                                >    
                                <Meta
                                    title='aa'
                                    description='aa'
                                />
                                </Card>
                                <Card
                                    className="goods-card"
                                    hoverable
                                    style={{ width: 200 }}
                                    cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
                                >    
                                <Meta
                                    title='aa'
                                    description='aa'
                                />
                                </Card>
                        </Row>
                    </div>
                </section>
            </article>
        </div>
    )
}

export default EventPages
