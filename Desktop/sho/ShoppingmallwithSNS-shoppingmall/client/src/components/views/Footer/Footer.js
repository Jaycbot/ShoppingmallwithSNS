import React, { Component } from "react";
import { FacebookOutlined, TwitterOutlined, YoutubeOutlined, InstagramOutlined } from '@ant-design/icons';
import "./Footer.scss"

class Footer extends Component {
  render() {
    return (
      <div className="footer_wrapper">
        <div className="footer">
          <div className="main">
            <div className="left_content">
              <p className="callcenter_info">대표전화</p>
              <div>
                <p className="callcenter_number">02-3486-1234</p>
                <div className="eat_time">
                  <span className="eat_name">평일&nbsp;</span>
                  <span>09:00 ~ 18:00(점심시간:12:00 ~ 13:00)</span>
                </div>
              </div>
            </div>
            <div className="center_content">
              <p className="center_title">회사 소개 및 약관 내용</p>
              <div className="center_body">
                <a href="https://www.bit.kr/05_bitcom/bitcom_01.aspx">회사소개</a>
                <a href="https://www.bit.kr/03_custom/custom_01.aspx">고객센터</a>
                <a href="https://www.bit.kr/etc/privacy.aspx">
                  개인정보 취급방침
                </a>
              </div>
            </div>
            <div className="right_content">
              <p className="right_title">Follow us</p>
              <div className="right_body">
                <a href="https://www.facebook.com/Bitschool">
                <FacebookOutlined  style={{ fontSize: 30, marginBottom: 3 }} />
                </a>
                <a href="https://twitter.com/bit_academy">
                <TwitterOutlined style={{ fontSize: 30, marginBottom: 3 }} />
                </a>
                <a href="https://www.youtube.com/channel/UCGHC5EAqEsiWxKdVhl59hcA">
                  <YoutubeOutlined style={{ fontSize: 30, marginBottom: 3 }} />
                </a>
                <a href="https://www.instagram.com/bitacademy_official/">
                  <InstagramOutlined style={{ fontSize: 30, marginBottom: 3 }} />
                </a>
                
              </div>
            </div>
          </div>
          <div className="company_info_box">
            <div>
              <span>
                상호명: 주식회사 Style Share(이하 S.S){" "}
                <span className="seperate_bar"></span>
                사업자 등록번호:110-123-45678
                <span className="seperate_bar"></span>
                <a
                  href="https://www.bit.kr/index.aspx"
                  style={{
                    textDecoration: "underline",
                    color: "#454C53"
                  }}
                >
                  사업등록정보 확인
                </a>
              </span>
            </div>
            <span>
              통신판매업신고: 제 2015-서울강남-02962호
              <span className="seperate_bar"></span>주소: 서울특별시 서초구 서초대로
              74길33 비트빌 3층
              <span className="seperate_bar"></span>대표자: 홍길동
              <span className="seperate_bar"></span>개인정보책임자: 고길동 
            </span>
          </div>
          <div>
            <div className="info_protect"></div>
          </div>
        </div>
      </div>
    );
  }
}

export default Footer;