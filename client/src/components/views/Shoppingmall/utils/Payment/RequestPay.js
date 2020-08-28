import React from 'react';
import './RequestPay.scss'

class RequestPay extends React.Component {
  requestPay = () => {
    // IMP.request_pay(param, callback) 호출
    var IMP = window.IMP;
    IMP.init("imp46821506");
    IMP.request_pay({ // param
      pg: "html5_inicis",
      pay_method: "card",
      merchant_uid: "ORD20180131-0000011",
      name: "Style Share",
      amount: 4,
      buyer_email: "",
      buyer_name: "",
      buyer_tel: "010-4242-4242",
      buyer_addr: "서울특별시 서초구",
      buyer_postcode: "01181"
    }, rsp => { // callback
      if (rsp.success) {
        var msg = '결제가 완료되었습니다.';
        msg += '고유ID : ' + rsp.imp_uid;
        msg += '상점 거래ID : ' + rsp.merchant_uid;
        msg += '결제 금액 : ' + rsp.paid_amount;
        msg += '카드 승인번호 : ' + rsp.apply_num;
        // 결제 성공 시 로직,
        console.log("결제 성공");
      } else {
        var msg = '결제에 실패하였습니다.';
        msg += '에러내용 : ' + rsp.error_msg;
        // 결제 실패 시 로직,
        console.log("결제 실패");
      }
    });
  }

  render() {
    return (
      <div className="pay_button_parent">
      <div className="pay_get_cart_box">
      <button 
      onClick={this.requestPay}
      className="pay_get_cart_button" 
      >
        결제하기
       </button>
       </div>
       </div>
    );
  }
}

export default RequestPay;