import React, { useState } from 'react'
import { Input } from 'antd';
import { withRouter } from 'react-router-dom'
// import search from '../../../../Img/search.png'
import './SearchBar.scss'

const { Search } = Input;


function SearchBar(props) {

    const [Word, setWord] = useState("")


    const SearchNav = (searchingword) => {

        setWord(searchingword)

        props.history.push(`/search/${searchingword}`) //지정된 경로로 이동
        // getSearch(body)

    }

    return (
        <div className="Search_Bar">
            <div className="Search_Bar_wrapper">
                <div className="Search_Bar_search">

                   
                    <Search

                        className="Search_Bar_text"
                        placeholder="스타일과 상품을 검색해 보세요"
                        type="search"
                        onSearch={SearchNav}
                        style={{ width: 800 }}

                   />

                </div>
            </div>
        </div>

    )
}

export default withRouter(SearchBar)

