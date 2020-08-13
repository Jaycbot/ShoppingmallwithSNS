import React from "react"
import { Link } from "react-router-dom";
import LoginLeft from "./LoginLeft/LoginLeft";
import LoginRight from "./LoginRight/LoginRight";
import StyleShare from "../../Img/style__share.PNG";

import './LoginPage.scss'

// import key from './config'

class LoginPage extends React.Component {
  render() {
    return (

      
      <div className="login_wrapper">
        <div className="login_bg_img">
          <div className="login_bg"></div>
        </div>
        <div className="login_body_wrapper">
          <div className="login_body">
            <div className="login_box">
              <div className="login_main_header">
                <Link to="/sns">
                <img src={StyleShare} alt="img"></img>
                </Link>
              </div>
              <header>
                <div className="login_title"></div>
                <p>로그인</p>
              </header>
              <main>
                <div className="login_main">
                  <LoginLeft />
                  <LoginRight />
                </div>
              </main>
              <footer>
                <div className="no_id">ID가 없으세요?</div>
                <Link to="/register">
                  <a>여기서 가입</a>
                </Link>
              </footer>
            </div>
            <div className="etc_info">
              
              <a href="https://www.bit.kr/05_bitcom/bitcom_01.aspx">StyleShare에 대하여</a>
              <a href="https://www.bit.kr/03_custom/custom_01.aspx">고객센터</a>
              <a href="https://www.bit.kr/etc/privacy.aspx"> 개인정보 취급방침</a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default LoginPage;
