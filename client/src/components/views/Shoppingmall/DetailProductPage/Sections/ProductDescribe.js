import React, { useEffect, useState } from 'react'
import { Collapse } from 'antd';
import {RoutingVariable} from '../../../../Config'
import './ProductDescribe.scss' 

const { Panel } = Collapse;

function ProductDescribe(props) {
    const [Images, setImages] = useState([])
    const [PostSize, setPostSize] = useState(0)

    useEffect(() => {

        setImages(props.detail.description)
        setPostSize(props.detail.description && props.detail.description.length)

    }, [props.detail])

   
    return ( 
        <div className="Box-fzpncP iIZfvh">
            <div className="Box-fzpncP cFlNGk">
            <Collapse defaultActiveKey={['1']} ghost>
                <Panel header="상품상세" key="1" className="Text-pXEYb cpraeM">
                <p><br/><br/>
                    <picture>
                        {Images && Images.map((images)=> (
                            <img src={`${RoutingVariable}${images}`}/>
                        ))}
                    </picture>
                </p>
                { PostSize >= 0 && (
                <div className="Box-fzpncP Flex-qawHp Grid__Row-hAirfs cukPBe" style={{display: 'flex'}}>


                    <div width="1,0.3333333333333333" className="Box-fzpncP Grid__Column-dAGzcc kLGjpY">
                        <button width="100%" style={{display: 'flex', fontWeight : "bold"}} className="BaseButton-fEuaOx Button__ButtonWithIcon-fYDSEL bSJKSD"> 이미지 더보기 
                            <svg viewBox="0 0 24 24" fill="currentColor" width="1em" height="1em" class="sc-AxgMl cNFEUw"><path fill-rule="evenodd" d="M18.66 9.5c.002.2-.078.39-.22.53l-6 6a.75.75 0 01-1.06 0l-6-6A.75.75 0 016.44 9l5.47 5.44L17.38 9a.75.75 0 011.28.5z"></path></svg>
                        </button>
                    </div>


                </div>)}
                
                </Panel>
                <Panel header="배송/교환/반품" key="2" className="Text-pXEYb cpraeM">
                <p><div class="Box-fzpncP Collapsible__Panel-gHQxNs cMXQmD">
                    <div>
                        <div class="Box-fzpncP jUEhGK">
                            <div class="Box-fzpncP fXeJBb">
                                <h6 color="gray90" font-weight="bold" class="Text-pXEYb jGIkVz">배송 정보</h6>
                                <ul class="GoodsPolicy__StyledUl-itJxUg gPYhzI">
                                    <li color="gray70" font-weight="normal" class="Text-pXEYb hGXBFY">브랜드 및 제품에 따라 입점 업체 배송과 스타일쉐어 자체 배송으로 나뉩니다.</li>
                                    <li color="gray70" font-weight="normal" class="Text-pXEYb hGXBFY">입점 업체 배송의 경우 업체마다 개별 배송비가 부여됩니다.</li>
                                    <li color="gray70" font-weight="normal" class="Text-pXEYb hGXBFY">결제완료 후 약 1~3일 후 출고됩니다.</li>
                                    <li color="gray70" font-weight="normal" class="Text-pXEYb hGXBFY">제주도를 포함한 도서산간 지역은 추가 배송일과 추가 배송비 입금요청이 있을 수 있습니다.</li>
                                </ul>
                            </div>
                            <div class="Box-fzpncP fXeJBb">
                                <h6 color="gray90" font-weight="bold" class="Text-pXEYb jGIkVz">교환/환불/AS안내/기타</h6>
                                <ul class="GoodsPolicy__StyledUl-itJxUg gPYhzI">
                                    <li color="gray70" font-weight="normal" class="Text-pXEYb hGXBFY">교환, 환불 및 기타문의는 스타일쉐어 고객센터 1833-8879으로 문의주셔야 합니다.</li>
                                    <li color="gray70" font-weight="normal" class="Text-pXEYb hGXBFY">단순변심으로 인한 교환/환불인 경우 반송비를 입금해주셔야 합니다.</li>
                                    <li color="gray70" font-weight="normal" class="Text-pXEYb hGXBFY">상품 불량인 경우는 배송비를 포함한 전액이 환불됩니다.</li>
                                    <li color="gray70" font-weight="normal" class="Text-pXEYb hGXBFY">교환/환불시 입점업체 상품의 경우 각 업체에 따라 반송비용이 다를 수 있습니다.</li>
                                    <li color="gray70" font-weight="normal" class="Text-pXEYb hGXBFY">상품 수령일로부터 7일 이내 반품/환불 접수 가능합니다.</li>
                                    <li color="gray70" font-weight="normal" class="Text-pXEYb hGXBFY">단순변심 반품의 경우 제품 및 포장 상태가 재판매 가능하여야 합니다.</li>
                                    <li color="gray70" font-weight="normal" class="Text-pXEYb hGXBFY">출고 이후 환불요청 시 상품 회수 후 처리됩니다.</li>
                                    <li color="gray70" font-weight="normal" class="Text-pXEYb hGXBFY">화면상의 사진과 제품의 색상은 개인 환경에 따라 다소 차이가 있을 수 있으며 미세한 색상, 주름등의 차이는 제품 이상으로 인한 반품 사유가 되지 않습니다.</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div></p>
                </Panel>
            </Collapse>
            </div>
        </div>
                
    )
}

export default ProductDescribe