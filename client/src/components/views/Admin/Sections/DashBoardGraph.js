import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,  PieChart, Pie, Cell,
} from 'recharts';
import { Row } from 'antd';

function DashBoardGraph() {

    const [Sold, setSold] = useState(0)
    const [Date, setDate] = useState(0)
    const [Outer, setOuter] = useState(0)
    const [Top, setTop] = useState(0)
    const [Pants, setPants] = useState(0)
    const [Onepiece, setOnepiece] = useState(0)
    const [Skirt, setSkirt] = useState(0)
    const [Shoes, setShoes] = useState(0)

    const COLORS = ['#FF8996', '#FFC288', '#FFFAAF', '#A4FFA2','#A1B6FF','#E3A2FF'];

    const data = [
        { name: '아우터', value: Outer },
        { name: '상의', value: Top },
        { name: '바지', value: Pants }, 
        { name: '원피스', value: Onepiece },
        { name: '치마', value: Skirt },
        { name: '신발', value: Shoes },
    ];
    
    const RADIAN = Math.PI / 180;

    const renderCustomizedLabel = ({
    cx, cy, midAngle, innerRadius, outerRadius, percent, payload
    }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.59;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
    return (
        <text x={x} y={y} fill="gray" textAnchor='middle' dominantBaseline="central">
        {`${payload.name}${(percent * 100).toFixed(0)}%`}
        </text>
    );
    };

    console.log(typeof(data.name));

    useEffect(() => {

        let body ={

        }
        
        getProduct(body)
        getUsers(body)

    }, [])

    const getUsers = (body) => {
      axios.post('/api/users/admin', body)
          .then(response => {
              if(response.data.success) {
                const userHistory = response.data.users.map((h) => {
                  h.history.map((u) => {return u})
                })
                userHistory.forEach(element => {
                  switch(element) {
                    case 'quantity' :
                      setSold(element.quantity * element.price )
                    
                  }
                })
                  
              } else {
                  alert("유저들을 가져오는데 실패했습니다.")
              }
          })
    }

    console.log(Sold);

    const getProduct = (body) => {
        axios.post('/api/product/products', body)
            .then(response => {
                if(response.data.success) {
                  const continentValue = response.data.productInfo.map((p) => {
                    return p.continents;
                  });
                  continentValue.forEach(element => {
                    switch (element) {
                      case 1:
                        setOuter((outer) => outer + 1)
                        break;
                      case 2:
                        setTop((top) => top + 1)
                        break;
                      case 3:
                        setPants((pants) => pants + 1)
                          break;
                      case 4:
                        setOnepiece((onepiece) => onepiece + 1)
                        break;
                      case 5:
                        setSkirt((skirt) => skirt + 1)
                        break;
                      case 6:
                        setShoes((shoes) => shoes + 1)
                        break;
                      default:
                        break;
                    }
                  });
                } else {
                    alert("상품들을 가져오는데 실패했습니다.")
                }
            })
    }

    return (
        <div>
            <Row justify="space-around">                
            <div>
                <h1 style={{marginLeft: '50px'}}>판매량</h1><br/>
                <LineChart width={750} height={500} data={Sold}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey={Date} padding={{ left: 30, right: 30 }} />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="sold" stroke="#8884d8" activeDot={{ r: 8 }} />
                </LineChart>
            </div>

            <div>
                <h1 style={{marginLeft: '50px'}}>카테고리별 제품비율</h1><br/> 
                <PieChart width={800} height={500}>
                    <Pie
                    data={data}
                    cx={400}
                    cy={200}
                    labelLine={false}
                    label={renderCustomizedLabel} 
                    outerRadius={200}
                    fill="#8884d8"
                    dataKey="value" 
                    >
                    {
                        data.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
                    }
                    </Pie>
                </PieChart>
            </div>
            </Row>
            
        </div>
    )
}

export default DashBoardGraph
