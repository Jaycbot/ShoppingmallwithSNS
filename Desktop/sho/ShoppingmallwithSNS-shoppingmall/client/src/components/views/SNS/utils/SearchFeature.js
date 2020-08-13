import React, { useState } from 'react'
import { Input } from 'antd';
import { withRouter } from 'react-router-dom';
import { Card, Avatar, Row, Col } from 'antd';
import axios from 'axios'

import RenderImages from './RenderImage';
import RenderText from './RenderText';


const { Search } = Input;
const { Meta } = Card;


function SearchFeature(props) {

    const [SearchTerm, setSearchTerm] = useState("")

    const [SearchWord, setSearchWord] = useState([])


    const getSearch = (body) => {
        axios.post('/api/sns/getsearch', body)
            .then(response => {
                if (response.data.success) {
                    console.log(123);
                    setSearchWord(response.data.posts)
                } else {
                    alert("검색결과가 없습니다.")
                }
            })
    }


    const SearchKeyword = (keyword) => {
        console.log(keyword);

        let body = {
            searchTerm: keyword
        }

        setSearchTerm(keyword)
        getSearch(body)

    }


    
    return (
        <div>

        <div>
            <Search
                type="search"
                placeholder="검색어를 입력하시요"
                onSearch={SearchKeyword}
                style={{ width: 200 }}
                // value={SearchTerm}
                />
        </div>

                </div>
    )
}

export default SearchFeature
