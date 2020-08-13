import React from 'react'
import { Carousel, Typography } from 'antd'
import { ArrowDownOutlined, LeftOutlined, RightOutlined } from '@ant-design/icons'
import './ImageBanner.scss'
import clothe1 from './images/7.jpg'
import clothe2 from './images/3.jpg'
import clothe3 from './images/5.jpg'
import clothe4 from './images/8.jpg'

const { Title } = Typography;

function ImageBanner() {
    return (
        <div>
            <div height="133.33vw,100vh">
                <Carousel autoplay effect="fade">
                            <div overflow="hidden" width="100%">
                                <a href="/shoppingmall/eventpage">
                                <img className="ban_img"
                                    src={clothe1} alt="img1"/>
                                <div>
                                    <div className="ban_div" >
                                        <Title style={{ color: 'white' }} level={5} >현대백화점 지프 특가</Title>
                                        <p className="ban_p_white">백화점에서만 볼수 있던 매력적인 브랜드를 이제 만나보세요</p>
                                    </div>
                                </div>
                                </a>
                            </div>
                            <div>
                                <a href="/shoppingmall/eventpage">
                                <img className="ban_img"
                                    src={clothe2} alt="img2"/>
                                <div>
                                    <div className="ban_div" >
                                        <Title style={{ color: '#1B1D1F' }} level={5} > 여름 옷장 고민끝! </Title>
                                        <p className="ban_p">올 여름 옷장고민을 멈춰줄 컬렉션 ~70%</p>
                                    </div>
                                </div>
                                </a>
                            </div>
                            <div>
                                <a href="/shoppingmall/eventpage">
                                <img className="ban_img"
                                    src={clothe3} alt="img3"/>
                                <div>
                                    <div className="ban_div" >
                                        <Title style={{ color: '#1B1D1F' }} level={5} >달콤한 시즌 오프 키르시</Title>
                                        <p className="ban_p">기다려온 시즌오프 최대 60% 찬스는 놓치면 후회!</p>
                                    </div>
                                </div>
                                </a>
                            </div>
                            <div>
                                <a href="/shoppingmall/eventpage">
                                <img className="ban_img"
                                    src={clothe4} alt="img4"/>
                                <div>
                                    <div className="ban_div" >
                                        <Title style={{ color: '#1B1D1F' }} level={5} >현대백화점 피어플렉스</Title>
                                        <p className="ban_p">편집샵 PEER UP TO 64%</p>
                                    </div>
                                </div>
                                </a>
                            </div>
        
                </Carousel>
                {/* <a className="ban_icon_left">
                    <LeftOutlined fill= "currentcolor"/>
                </a>
                    <div width="100%" className="ban_box_div"></div>
                <a className="ban_icon_right" href="#carousel-img" role="button" dataSlide="next">
                    <RightOutlined fill= "currentcolor"/>
                </a> */}
                    <button className="ban_button" onClick={()=>window.scrollTo(0,1080)}>
                        <span className="ban_scroll_text" color="#1B1D1F" font-weight="normal">SCORLL</span>
                            <div className="ban_scroll_circle" height="64px" width="64px" display="flex">
                                <ArrowDownOutlined style={{size : '32px'}}/>
                            </div> 
                    </button>
            
            </div>
                    
        </div>            
    )
}

export default ImageBanner
