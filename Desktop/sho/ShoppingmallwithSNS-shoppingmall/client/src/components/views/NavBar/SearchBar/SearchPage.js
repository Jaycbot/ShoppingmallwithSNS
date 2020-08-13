import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import axios from 'axios'
import RenderPosts from '../../SNS/utils/RenderPosts'
import './SearchPage.scss'

function SearchPage(props) {


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
    }, [props.match.params])

    return (
        <div className ='Search_posts'>
            <RenderPosts posts={SearchWord} />
        </div>
    )
}

export default withRouter(SearchPage)
