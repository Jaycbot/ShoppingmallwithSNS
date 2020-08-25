import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {
  PieChart, Pie
} from 'recharts';

function UserRatio() {

  const [Seller, setSeller] = useState(0)
  const [Customer, setCustomer] = useState(0)

  useEffect(() => {
        
    let body = {}

    getUsers(body)
    
}, [])

const getUsers = (body) => {
  axios.post('/api/users/admin', body)
      .then(response => {
          if(response.data.success) {
            const userRole = response.data.users.map((u) => {
              return u.role;
            });
            userRole.forEach(element => {
              switch (element) {
                case 0:
                  setCustomer((c) => c + 1)
                  break;
                case 2:
                  setSeller((s) => s + 1)
                  break;
                default:
                  break;
              }
            });
          } else {
              alert("유저들을 가져오는데 실패했습니다.")
          }
      })
}

const RADIAN = Math.PI / 180;

const renderCustomizedLabel = ({
  cx, cy, midAngle, innerRadius, outerRadius, percent, payload
  }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  return (
      <text x={x} y={y} fill="gray" textAnchor='middle' dominantBaseline="central">
      {`${payload.name} ${payload.value}`}
      </text>
  );
  };

  const data = [
    { name: '판매자', value: Seller, fill : '#86e57f'}, { name: '구매자', value: Customer, fill : '#6699ff' },
  ];

    return (
        <div style={{marginTop: '50px'}}>
            <h1 style={{marginLeft: '50px'}}>사용자 비율</h1>
            <PieChart width={800} height={500}>
              <Pie 
                dataKey="value" 
                startAngle={180} 
                endAngle={0} 
                data={data} 
                cx={400} 
                cy={200} 
                outerRadius={100} 
                fill="#8884d8" 
                labelLine={false}
                label={renderCustomizedLabel} 
              />
            </PieChart>
        </div>
    )
}

export default UserRatio
