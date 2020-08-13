import React, { useEffect, useState } from 'react'
import { Tooltip } from 'antd'
import { LikeOutlined , DislikeOutlined , HeartOutlined} from '@ant-design/icons';
import Icon from '@ant-design/icons';
import axios from 'axios'
import './LikeDislikes.scss'


function LikeDislikes(props) {


    const [Likes, setLikes] = useState(0)
    const [Dislikes, setDislikes] = useState(0)
    const [LikeAction, setLikeAction] = useState(null)
    const [DisLikeAction, setDisLikeAction] = useState(null)
    let variable = {}

    if (props.modal) {
        variable = { userId: props.userId, commentId: props.commentId }
    }


    useEffect(() => {
        axios.post('/api/like/getLikes', variable)
            .then(response => {
                if (response.data.success) {
                    //얼마나 많은 좋아요를 받았는디
                    setLikes(response.data.likes.length)
                    //내가 이미 그 좋아요를 눌렸는지
                    response.data.likes.map(like => {
                        if (like.userId === props.userId) {
                            setLikeAction('liked')
                        }
                    })

                } else {
                    alert("Likes에 정보를 가져오지 못했습니다.")
                }
            })

        axios.post('/api/like/getDisLikes', variable)
            .then(response => {
                if (response.data.success) {
                    //얼마나 많은 싫어요 받았는디
                    setDislikes(response.data.dislikes.length)
                    //내가 이미 그 좋아요를 눌렸는지
                    response.data.dislikes.map(dislikes => {
                        if (dislikes.userId === props.userId) {
                            setDisLikeAction('disliked')
                        }
                    })

                } else {
                    alert("disliked 정보를 가져오지 못했습니다.")
                }
            })




    }, [])


    const onLike = () => {
        if (LikeAction === null) {
            axios.post('/api/like/upLike', variable)
                .then(response => {
                    if (response.data.success) {

                        setLikes(Likes + 1)
                        setLikeAction('liked')

                        if (DisLikeAction !== null) {
                            setDisLikeAction(null)
                            setDislikes(Dislikes - 1)
                        }

                    } else {
                        alert("Like를 올리지 못했습니다.")
                    }
                })
        } else {

            axios.post('/api/like/unLike', variable)
                .then(response => {
                    if (response.data.success) {
                        setLikes(Likes - 1)
                        setLikeAction(null)
                    } else {
                        alert("Like를 내리지 못했습니다.")
                    }
                })

        }
    }


    const onDislike = () => {

        if (DisLikeAction !== null) {
            axios.post('/api/like/unDislike', variable)
                .then(response => {
                    if (response.data.success) {
                        setDislikes(Dislikes - 1)
                        setDisLikeAction(null)
                    } else {
                        alert("dislike을 지우지 못했습니다.")
                    }
                })
        } else {
            axios.post('/api/like/upDislike', variable)
                .then(response => {
                    if (response.data.success) {

                        setDislikes(DisLikeAction + 1)
                        setDisLikeAction('disliked')

                        if (LikeAction !== null) {
                            setLikeAction(null)
                            setLikes(Likes - 1)
                        }


                    } else {
                        alert("dislike을 지우지 못했습니다.")
                    }




                })
        }
    }

    return (
        <div>
            <span key="comment-basic-like">
                <Tooltip title="Like">
                    <LikeOutlined type="like"
                        style={{color : '#08c'}}
                        theme={LikeAction === 'liked' ? 'filled' : 'outlined'}
                        onClick={onLike}
                    />
                </Tooltip>
                <span style={{ paddingLeft: '8px', cursor: 'auto' }}>{Likes}</span>
            </span>&nbsp;&nbsp;

            {/* <span key="comment-basic-dislike">
                <Tooltip title="Dislike">
                    <Icon type="dislike"
                        theme={DisLikeAction === 'disliked' ? 'filled' : 'outlined'}
                        onClick={onDislike} />
                </Tooltip>
                <span style={{ paddingLeft: '8px', cursor: 'auto' }}>{Dislikes}</span>
            </span> */}
        </div>
    )
}

export default LikeDislikes
