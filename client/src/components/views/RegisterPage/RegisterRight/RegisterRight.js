import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import axios from 'axios'
import KaKaoLogin from "react-kakao-login"
import styled from 'styled-components';
import kakaoImg from '../../../Img/kakao_login.png'
import "./RegisterRight.scss";

class RegisterRight extends Component {
  constructor(props) {
    super(props);
  this.state = {
        id: "",
        pwd: "",
        isLoggedIn: false,
        isLogin: false,
        userID: "",
        name: "",
        email: "",
        picture: "",
        provider: "",
        nickname: "",
        logged: false,
        
              
  }
    };
    componentDidMount = () => {
      const id = window.sessionStorage.getItem('id');
      if(id) {
        this.onLogin();
      } 
        this.googleSDK();
        
    };
    
    //카카오 로그인
    onLogin = () => {
      this.setState({
        logged: true
      });
    }
       
    responseKakao = (res) => {
      this.setState({
      id: res.profile.id,
      name: res.profile.properties,
      provider: 'kakao'
       });
	  this.doSignUp();
	  let variable = {
		  email: res.profile.id,
		  name: res.profile.name
	  }
	  axios.post('/api/users/register', variable).then(res => {
		  if(res.data.success){
			  alert('회원가입에 성공하셨습니다')
			  this.props.history.push('/login');
		  } else{
			  alert('회원가입에 실패했습니다.')
		  }
	  })
       }
      
      // Login Fail
      responseFail = (err) => {
      console.error(err);
       }
      doSignUp = () => {
		
      const { id, name, provider } = this.state;
      window.sessionStorage.setItem('id', id);
      window.sessionStorage.setItem('name', name);
      window.sessionStorage.setItem('provider', provider);
     
      //this.props.onLogin();
      //this.props.history.push('/');
		
      }
      
    
    googleSDK = () => {
        // 구글 SDK 초기 설정
        window["googleSDKLoaded"] = () => {
          window["gapi"].load("auth2", () => {
            this.auth2 = window["gapi"].auth2.init({
              client_id:
                "908711010931-d1g3tmgji4a4sad32u4slq3hiu32dv7s.apps.googleusercontent.com",
              scope: "profile email"
            });
            this.loginWithGoogle();
          });
        };
    
        (function(d, s, id) {
          var js,
            fjs = d.getElementsByTagName(s)[0];
          if (d.getElementById(id)) {
            return;
          }
          js = d.createElement(s);
          js.id = id;
          js.src = "https://apis.google.com/js/platform.js?onload=googleSDKLoaded";
          fjs.parentNode.insertBefore(js, fjs);
        })(document, "script", "google-jssdk");
      };
    
      //구글 로그인
      loginWithGoogle = () => {
       
        this.auth2.attachClickHandler(
          this.refs.googleLoginBtn,
          {},
          googleUser => {
          
            let profile = googleUser.getBasicProfile();
            let temp = {
              id: profile.getEmail(),
            }
            axios.post('/api/users/register', temp).then(res => {
              if(res.data.success){
                alert('회원가입에 성공하셨습니다')
                this.props.history.push('/login');
              } else{
                alert('회원가입에 실패했습니다.')
              }
            })
          },
          error => {
            alert(JSON.stringify(error, undefined, 2));
          }
        );
      };
    
    render() {
        return (
            <div className="login_main_right">
        <ul>
          <li>
            <button
              onClick={this.loginWithGoogle}
              style={{ backgroundColor: "white" }}
              className="googleLoginBtn"
              ref="googleLoginBtn"
            >
              <img
                alt="google"
                style={{
                  width: "35px",
                  backgroundColor: "white",
                  padding: "0 3px"
                }}
                src="https://pbs.twimg.com/profile_images/770139154898382848/ndFg-IDH_400x400.jpg"
              />
              <div type="sumit" style={{ border: "none", color: "gray" }}>
                <span>Google 로그인</span>
              </div>

            </button>
          </li>
          <li>
            
          <KaKaoBtn
						jsKey={'45e2102eb546d447d24bc19db598acb3'}
						onSuccess={this.responseKakao}
						onFailure={this.responseFail}
						getProfile="true"
						
					>
            <img
            alt="kakao"
            src={kakaoImg}
            />
          </KaKaoBtn>
          
          </li>

        </ul>
      </div>
    );
  }
}

const KaKaoBtn = styled(KaKaoLogin)`
  padding: 0;
  width: 300px;
  height: 45px;
  line-height: 44px;
  color: #783c00;
  background-color: #ffeb00;
  border: 1px solid transparent;
  border-radius: 3px;
  font-size: 14px;
  font-weight: bold;
  text-align: center;
  cursor: pointer;
  &:hover {
    box-shadow: 0 0px 15px 0 rgba(0, 0, 0, 0.2);
  }
`;

export default withRouter(RegisterRight);
