import React from "react";
import { Link } from "react-router-dom"
import StyleShare from "../../Img/style__share.PNG";
import RegisterLeft from "./RegisterLeft/RegisterLeft";
import RegisterRight  from "./RegisterRight/RegisterRight";
import "./RegisterPage.scss";

class RegisterPage extends React.Component {


  render() {

    return (
      <div className="register_wrapper">
        <div className="register_bg_img">
          <div className="register_bg"></div>
        </div>

        <div className="register_body_wrapper">
          <div className="register_body">
            <div className="register_box">
              <Link to="/sns">
                <img src={StyleShare} alt="img"></img>
              </Link>
              <main>
                <header>
                  <div className="register_title"></div>
                  <p>가입</p>


                </header>

                <div className="register_main">

                  <RegisterLeft />
                  <RegisterRight handleGender={this.handleGender} />
                </div>
              </main>
              <footer>
                <div className="no_id">이미 계정을 갖고 계시다구요?</div>
                <Link to="/login">
                  <a>여기서 로그인</a>
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

export default RegisterPage;
