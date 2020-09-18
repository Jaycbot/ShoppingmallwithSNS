import React, {useEffect, useState} from 'react'
import axios from 'axios'
import { Row, Card } from 'antd';
import { ShopOutlined, SolutionOutlined,
    TeamOutlined, DollarOutlined } from '@ant-design/icons';

const { Meta } = Card;

function DashBordIcon() {

    const [User, setUser] = useState([])
    const [Products, setProducts] = useState([])
    const [Posts, setPosts] = useState([]);
    const [Total, setTotal] = useState(0)

  
    useEffect(() => {
          
      let body = {}
  
      getUsers(body)
      getProduct(body)
      getSNS(body)
    }, [])
  
    const getUsers = (body) => {
        axios.post('/api/users/admin', body)
            .then(response => {
                if(response.data.success) {
                    setUser(response.data.users)
                } else {
                    alert("유저들을 가져오는데 실패했습니다.")
                }
            })
    }
  
    const getProduct = (body) => {
      axios.post('/api/product/products', body)
          .then(response => {
              if(response.data.success) {
                  setProducts(response.data.productInfo)
                  calculateTotal(response.data.productInfo)
              } else {
                  alert("상품들을 가져오는데 실패했습니다.")
              }
          })
  }
  
  const getSNS = (body) => {
    axios.post('/api/sns/adminSNS', body)
    .then((response) => {
        if (response.data.success) {
            setPosts(response.data.posts)
        }
    })
    .catch((e) => {
        alert(e);
    });
  }

  const calculateTotal = (product) => {
    let total = 0;

    product.map(item => {
      total += parseInt(item.price) * item.sold
    });
    setTotal(total)
  }   


    return (
        <div>
            <Row justify='space-around' gutter={[32,16]}>
                      <Card style={{ width: 300, marginTop: 16 }} hoverable='true'>
                        <Meta
                          avatar={
                            <DollarOutlined style={{fontSize: '50px', color: '#5bffb0'}} />
                          }
                          title={<h1 style={{fontSize: '30px'}}>₩ {Total}</h1>}
                        />
                      </Card>
                      <Card style={{ width: 300, marginTop: 16 }} hoverable='true'>
                        <Meta
                          avatar={
                            <TeamOutlined style={{fontSize: '50px', color: '#1478ff'}} />
                          }
                          title={<h1>{User.length} 명</h1>}
                          description={<a href="/admin/user">유저 더보기</a>}
                        />
                      </Card>
                      <Card style={{ width: 300, marginTop: 16 }} hoverable='true'>
                        <Meta
                          avatar={
                            <ShopOutlined style={{fontSize: '50px', color: '#8f7cee'}} />
                          }
                          title={<h1>{Products.length} 개</h1>}
                          description={<a href="/admin/product">상품 더보기</a>}
                        />
                      </Card>
                      <Card style={{ width: 300, marginTop: 16 }} hoverable='true'>
                        <Meta
                          avatar={
                            <SolutionOutlined style={{fontSize: '50px', color: '#ff33cc'}} />
                          }
                          title={<h1>{Posts.length} 글</h1>}
                          description={<a href="/admin/sns">게시글 더보기</a>}
                        />
                      </Card>
                    </Row>
        </div>
    )
}

export default DashBordIcon
