import React,{useState} from 'react'
import { Input } from 'antd';
import { withRouter } from 'react-router-dom'

function SearchWord(props) {
    const { Search } = Input;

    const [SearchTerm, setSearchTerm] = useState("")

    const SearchHandler = (event)=> {
        setSearchTerm(event.currentTarget.value)
        //부모 컴포넌트로 보내기
        props.refreshFunction(event.currentTarget.value)
    }


    return (
        <div>
            <Search
                placeholder="input search text"
                onChange={SearchHandler}
                style={{ width: 200 }}
                value={SearchTerm}
            />
        </div>
    )
}

export default withRouter(SearchWord)
