import React, {useState} from 'react'
import { Input } from 'antd'

const { Search } = Input;


function SearchFeature(props) {

    const [SearchTerm, setSearchTerm] = useState("")

    const SearchHandler = (event) => {
        setSearchTerm(event.currentTarget.value)
        props.refreshFunction(event.currentTarget.value)
    }

    

    return (
        <div>
            <Search
                placeholder="input search text"
                onChange={SearchHandler}
                style={{ width: 200 }}
                value = {SearchTerm}
            />
        </div>
    )
}

export default SearchFeature
