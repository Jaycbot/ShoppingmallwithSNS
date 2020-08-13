import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux'
import swal from 'sweetalert';
import SearchFeature from '../../Admin/Sections/SearchFeature'

function ProductCardBlock(props) {
    
    const userInfo = useSelector((state) => state.user.userData)

    const [Products, setProducts] = useState([])
    const [SearchTerm, setSearchTerm] = useState("")
    
    let body;

    useEffect(() => {
 
        if(userInfo){
            body = {
                writer : userInfo._id
            } 

            getProduct(body)
        }

    }, [userInfo])

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

    const renderProductImage = (images) => {
        if(images.length > 0) {
            let image = images[0]
            return `http://localhost:5000/${image}`
        } 
    }   

    const renderItems = () => (
        Products && Products.map((product, index) => (
            <tr key={index}>
                <td>{product._id}</td>
                <td>
                    <div className="CartGoodsDesktop__goods-info">
                    <img style={{ width: '70px', height: '50px' }} alt="product" 
                    src={renderProductImage(product.images)} />
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
                <td>{product.description}</td>
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
    )
}

export default ProductCardBlock
