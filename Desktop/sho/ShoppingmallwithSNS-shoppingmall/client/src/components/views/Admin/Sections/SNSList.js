import React, {useState, useEffect} from 'react'
import axios from 'axios'
import swal from 'sweetalert';
import SearchFeature from './SearchFeature'

function SNSList(props) {

    const [Posts, setPosts] = useState([]);
    const [SearchTerm, setSearchTerm] = useState("")

    useEffect(() => {

        let body = {

        }

        getSNS(body)

    }, [])

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

    const updateSearchTerm = (newSearchTerm) => {
        
        let body = {
            searchTerm : newSearchTerm
        }

        setSearchTerm(newSearchTerm)
        getSNS(body)
    }

    const removeItem = (snsId) => {
        
        const data = {
            id : snsId,
        };

        swal({
            title: '정말 삭제하시겠습니까?',
            text: '확인을 누르면 해당 포스트정보가 사라지며, 복구 할 수 없습니다.',
            icon: 'warning',
            buttons: true,
            dangerMode: true,
        }).then((willDelete) => {
            if (willDelete) {
                axios.post('/api/sns/removeSNS', data).then((response) => {
                    if (response.data.success) {
                        swal('게시물 삭제에 성공했습니다.');
                    } else {
                        swal('게시물 삭제에 실패했습니다.');
                    }
                });
            } else {
                swal('취소하셨습니다.');
            }
        });
    
}

    const renderPostImage = (snapshots) => {
        if(snapshots.length > 0) {
            let image = snapshots[0]
            return `http://localhost:5000/${image}`
        } 
    }   

    const renderPosts = () => (
        Posts && Posts.map((post, index) => (
            <tr key={index}>
                <td>{post._id}</td>
                <td>{post.writer}</td>
                <td>
                    <div className="CartGoodsDesktop__goods-info">
                    <img style={{ width: '50px', height: '50px' }} alt="sns" 
                    src={renderPostImage(post.snapshots)} />
                        <div className="CartGoodsDesktop__goods-info-inner">
                            <p className="CartGoodsDesktop__goods-info-name">
                                {post.text}
                            </p>
                        </div> 

                    </div>
                </td> 
                <td>{post.likes}</td> 
                <td>{post.views}</td>
                <td>
                    <button onClick={() => removeItem(post._id)}>
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
                    <th>게시물ID</th>
                        <th>작성자</th>
                        <th>글</th>
                        <th>좋아요</th>
                        <th>조회수</th>
                        <th>삭제</th>
                    </tr>
                </thead>

                <tbody>
                    {renderPosts()}
                </tbody>
                
            </table>
        </div>
    )
}

export default SNSList

