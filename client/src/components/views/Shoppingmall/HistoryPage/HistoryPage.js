import React from 'react'
import { useSelector } from "react-redux";


function HistoryPage() {
	const userData = useSelector((state) => state.user.userData);

    return (
        <div style={{ width: '80%', margin: '3rem auto' }}>
            <div style={{ textAlign: 'center' }}>
                <h1>주문내역</h1>
            </div>
            <br />

            <table> 
                <thead>
                    <tr>
                        <th>주문상품명</th>
                        <th>가격</th>
                        <th>수량</th>
                        <th>총 주문금액</th>
                        <th>구입날짜</th>
                    </tr>
                </thead>

                <tbody>
                    {userData && userData.history.map(item => (
                        <tr key={item.id}>
                            <td>{item.name}</td>
                            <td>{item.price} 원</td>
                            <td>{item.quantity} 개</td>
                            <td>{item.price * item.quantity} 원</td>
                            <td>{item.dateOfPurchase}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default HistoryPage
