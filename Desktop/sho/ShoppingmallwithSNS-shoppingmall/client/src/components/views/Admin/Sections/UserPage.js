import React, {useState, useEffect} from 'react'
import axios from 'axios'
import swal from 'sweetalert';
import SearchFeature from './SearchFeature'

function UserPage(props) {

    const [User, setUser] = useState([])
    const [SearchTerm, setSearchTerm] = useState("")

    useEffect(() => {
        
        let body = {}

        getUsers(body)
        
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

    const updateSearchTerm = (newSearchTerm) => {
        
        let body = {
            searchTerm : newSearchTerm
        }

        setSearchTerm(newSearchTerm)
        getUsers(body)
    }

    const removeItem = (id) => {
        
            const data = {
                id,
            };
    
            swal({
                title: '정말 삭제하시겠습니까?',
                text: '확인을 누르면 해당 계정정보가 사라지며, 복구 할 수 없습니다.',
                icon: 'warning',
                buttons: true,
                dangerMode: true,
            }).then((willDelete) => {
                if (willDelete) {
                    axios.post('/api/users/withdraw', data).then((response) => {
                        if (response.data.success) {
                            swal('계정 삭제에 성공했습니다.');
                        } else {
                            swal('계정 삭제에 실패했습니다.');
                        }
                    });
                } else {
                    swal('취소하셨습니다.');
                }
            });
        
    }

    const renderProfileImage = (user) => {
		if (user && user.image) {
			return `http://localhost:5000/${user.image}`;
		} else {
			return 'https://thumbs.dreamstime.com/b/default-avatar-profile-vector-user-profile-default-avatar-profile-vector-user-profile-profile-179376714.jpg';
		}
	};


    const renderItems = () => (
        User && User.map((user, index) => (
            <tr key={index}>
                <td>{user._id}</td>
                <td>
                    <div className="CartGoodsDesktop__goods-info">
                    <img style={{ width: '50px', height: '50px' }} alt="user" 
                    src={renderProfileImage(user)} />
                        <div className="CartGoodsDesktop__goods-info-inner">
                            <p className="CartGoodsDesktop__goods-info-name">
                                {user.name}
                            </p>
                        </div> 

                    </div>
                </td> 
                <td>{user.email}</td> 
                <td>{user.role}</td>
                <td>
                    <button onClick={() => removeItem(user._id)}>
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
                    <th>UserID</th>
                        <th>name</th>
                        <th>email</th>
                        <th>role</th>
                        <th>remove</th>
                    </tr>
                </thead>

                <tbody>
                    {renderItems()}
                </tbody>
                
            </table>
        </div>
    )
}

export default UserPage

