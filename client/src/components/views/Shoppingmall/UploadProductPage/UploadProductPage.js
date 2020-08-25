import React, {useState} from 'react'
import { withRouter } from 'react-router-dom';
import {Button, Form, Input} from 'antd';
import {useSelector} from 'react-redux'
import FileUpload from '../utils/FileUpload'
import DescriptionUpload from '../utils/DescriptionUpload'
import Axios from 'axios';

const { TextArea } = Input;

const Continents = [
    {key: 1, value:"아우터"},
    {key: 2, value:"상의"},
    {key: 3, value:"바지"},
    {key: 4, value:"원피스"},
    {key: 5, value:"치마"},
    {key: 6, value:"신발"},
]

function UploadProducPage(props) {

    const userInfo = useSelector((state) => state.user.userData);

    const [Title, setTitle] = useState("")
    const [Description, setDescription] = useState([])
    const [Price, setPrice] = useState(0)
    const [Continent, setContinent] = useState(1)
    const [Images, setImages] = useState([])

    const titleChangeHandler = (event) => {
        setTitle(event.currentTarget.value)
    }

    const descriptionChangeHandler = (newDescription) => {
        setDescription(newDescription)
    }

    const priceChangeHandler =(event) => {
        setPrice(event.currentTarget.value)
    }

    const conitnentChangeHandler = (event) => {
        setContinent(event.currentTarget.value)
    }

    const updateImages = (newImages) => {
        setImages(newImages)
    }

    const submitHandler = (event) => {
        event.preventDefault()

        if(!Title || !Description || !Price || !Continent || !Images) {
            return alert('모든 값을 넣어주셔야 합니다.')
        }

        const body = {
            //로그인 된 사람의 ID
            writer: userInfo._id,
            title : Title,
            description : Description,
            price : Price,
            images : Images,
            continents : Continent
        }
        //서버에 채운 값들을 request로 보낸다.
        Axios.post("/api/product", body)
            .then(response => {
                if(response.data.success) {
                    alert('상품 업로드에 성공 했습니다.')
                    props.history.push('/')
                } else {
                    alert('상품 업로드에 실패 했습니다.')
                }
            })

    }

    return (
        <div style={{maxWidth: '700px', margin: '2rem auto'}}>
            <div style={{textAlign: 'center', marginBottom: '2rem'}}>
                <h2 level={2}>상품 업로드</h2>
            </div>

            <Form onSubmit={submitHandler}>
                {/* DropZone */}

                <FileUpload refreshFunction={updateImages}/>

                <br /> 
                <br />
                <label>상품명</label>
                <Input onChange={titleChangeHandler} value={Title} />
                <br/>
                <br/>
                <label>설명</label>
                <DescriptionUpload refreshFunction={descriptionChangeHandler}/>
                <br/>
                <br/>
                <label>가격($)</label>
                <Input type="number" onChange={priceChangeHandler} value={Price}/> 
                <br />
                <br />
                <select onChange={conitnentChangeHandler} value={Continent}>
                    {Continents.map(item => (
                        <option key={item.key} value={item.key}>{item.value}</option>   
                    ))}
                </select>
                <br/>
                <br/>
                <Button type="submit" onClick={submitHandler}>
                    확인
                </Button>
            </Form>
        </div>
    )
}

export default withRouter(UploadProducPage);
