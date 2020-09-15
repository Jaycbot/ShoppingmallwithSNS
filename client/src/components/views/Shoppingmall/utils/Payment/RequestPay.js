import React from 'react';
import './RequestPay.scss'

class RequestPay extends React.Component {
  requestPay = () => {
    // IMP.request_pay(param, callback) 호출
    var IMP = window.IMP; // 생략가능
    IMP.init('imp46821506');  // 가맹점 식별 코드
 
    IMP.request_pay({
        pg : 'html5_inicis', // 결제방식
        pay_method : 'card',	// 결제 수단
        merchant_uid : 'merchant_' + new Date().getTime(),
        name : 'Style Share',	// order 테이블에 들어갈 주문명 혹은 주문 번호
        amount : '1',	// 결제 금액
        buyer_email : '',	// 구매자 email
        buyer_name :  '',	// 구매자 이름
        buyer_tel :  '',	// 구매자 전화번호
        buyer_addr :  '',	// 구매자 주소
        buyer_postcode :  '',	// 구매자 우편번호
       
    }, function(rsp) {

   if ( rsp.success ) { // 성공시
     var msg = '결제가 완료되었습니다.';
     msg += '고유ID : ' + rsp.imp_uid;
     msg += '상점 거래ID : ' + rsp.merchant_uid;
     msg += '결제 금액 : ' + rsp.paid_amount;
     msg += '카드 승인번호 : ' + rsp.apply_num;
     console.log("결제성공")

   } else { // 실패시
     var msg = '결제에 실패하였습니다.';
     msg += '에러내용 : ' + rsp.error_msg;
     console.log("결제실패")
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