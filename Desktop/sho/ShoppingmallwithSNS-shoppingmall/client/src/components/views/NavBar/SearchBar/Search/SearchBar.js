import React,{useState} from 'react'
import { Input } from 'antd';
import { withRouter } from 'react-router-dom'
const { Search } = Input;


function SearchBar(props) {

    const [Word, setWord] = useState("")


    const SearchNav = (searchingword) => {
       
        setWord(searchingword)

        props.history.push(`/search/${searchingword}`) //지정된 경로로 이동
        // getSearch(body)

    }

    return (
        <div>
            <Search
             placeholder="검색어를 입력하세요"
             onSearch={SearchNav}
             style={{ width: 200 }}
            />
        </div>
    )
}

export default withRouter(SearchBar)
