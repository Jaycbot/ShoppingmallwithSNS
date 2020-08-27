import React, {useState, useEffect} from 'react'
import axios from 'axios'
import swal from 'sweetalert';
import SearchFeature from './Sections/SearchFeature'
import { Layout, Menu } from 'antd';
import { DashboardOutlined, UserOutlined, ShopOutlined, SolutionOutlined } from '@ant-design/icons';

const { Header, Content, Sider } = Layout;

function SellerProducts(props) {

    const [Products, setProducts] = useState([])  
    const [SearchTerm, setSearchTerm] = useState("")

    useEffect(() => {

        let body ={

        }
        
        getProduct(body)

    }, [])

    const getProduct = (body) => {
        axios.post('/api/product/products', body)
            .then(response => {
                if(response.data.success) {
                    setProducts(response.data.productInfo)
                } else {
                    alert("상품들을 가져오는데 실패했습니다.")
                }
            })
    }

    const renderProductImage = (images) => {
        if(images.length > 0) {
            let image = images[0]
            return `http://localhost:5000/${image}`
        } 
    }   

    const updateSearchTerm = (newSearchTerm) => {
        
        let body ={
            searchTerm : newSearchTerm
        }

        setSearchTerm(newSearchTerm) 
        getProduct(body)
    }

    const removeItem = (productId) => {
        const data = {
			id : productId,
		};

		swal({
			title: '정말 삭제하시겠습니까?',
			text: '확인을 누르면 해당 상품정보가 사라지며, 복구 할 수 없습니다.',
			icon: 'warning',
			buttons: true,
			dangerMode: true,
		}).then((willDelete) => {
			if (willDelete) {
				axios.post('/api/product/removeProduct', data).then((response) => {
					if (response.data.success) {
						swal('상품을 삭제했습니다.');
					} else {
						swal('상품 삭제를 실패했습니다.');
					}
				});
			} else {
				swal('취소하셨습니다.');
			}
		});
    }

    const renderItems = () => (
        Products && Products.map((product, index) => (
            <tr key={index}>
                <td>{product._id}</td>
                <td>
                    <div className="CartGoodsDesktop__goods-info">
                    <img style={{ width: '50px', height: '50px' }} alt="product" 
                    src={renderProductImage(product.images)}/>
                        <div className="CartGoodsDesktop__goods-info-inner">
                            <p className="CartGoodsDesktop__goods-info-name">
                                {product.title}
                            </p>
                        </div> 

                    </div>
                </td> 
                <td>{product.price} 원</td>
                <td>{product.continents}</td>
                <td style={{color : 'blue' , fontStyle: 'bodered'}}>{product.sold} 개</td>
                <td style={{color : 'red' , fontStyle: 'bodered'}}>{product.price * product.sold} 원</td>
                <td><img style={{ width: '50px', height: '50px' }} alt="product" 
                    src={renderProductImage(product.description)}/></td>
                <td>
                    <button onClick={() => removeItem(product._id)}>
                        삭제
                    </button> 
                </td>
            </tr>
        ))
    )


    return (
        <div>
            <Layout style={{ minHeight: '100vh' }}>
                <Sider
                breakpoint="lg"
                collapsedWidth="0"
                onBreakpoi nt={broken => {
                    console.log(broken);
                }}
                onCollapse={(collapsed, type) => {
                    console.log(collapsed, type);
                }}
                >
                <div className="logo" />
                <Menu theme="dark" mode="inline" defaultSelectedKeys={['3']}>
                <Menu.Item key="1" icon={<DashboardOutlined />}>
                    <a href='/admin'>대시보드</a>
                    </Menu.Item>
                    <Menu.Item key="2" icon={<UserOutlined />}>
                    <a href='/admin/user'>사용자</a>
                    </Menu.Item>
                    <Menu.Item key="3" icon={<ShopOutlined />}>
                    <a href='/admin/product'>상품</a>
                    </Menu.Item>
                    <Menu.Item key="4" icon={<SolutionOutlined />}>
                    <a href='/admin/sns'>SNS 게시물</a>
                    </Menu.Item>
                </Menu>
                </Sider>
                <Layout className="site-layout">
                <Header className="site-layout-background" style={{ padding: 0 }} />
                <Content style={{ margin: '0 16px' }}>
                    <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                        <h1>PRODUCT LIST</h1>
                            <div style={{display: 'flex', justifyContent: 'flex-end', margin: '1rem auto'}}>
                                <SearchFeature 
                                    refreshFunction={updateSearchTerm}
                                />
                            </div>
                            <table>
                                <thead>
                                    <tr>
                                    <th>상품아이디</th>
                                        <th>상품명</th>
                                        <th>가격</th>
                                        <th>카테고리</th>
                                        <th style={{color : 'blue' , fontStyle: 'bodered'}}>판매개수</th>
                                        <th style={{color : 'red' , fontStyle: 'bodered'}}>판매실적</th>
                                        <th>설명</th>
                                        <th>삭제</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {renderItems()}
                                </tbody>
                                
                            </table>
                    </div>
                </Content>
                </Layout>
            </Layout>
            
        </div>
    )
}

export default SellerProducts
