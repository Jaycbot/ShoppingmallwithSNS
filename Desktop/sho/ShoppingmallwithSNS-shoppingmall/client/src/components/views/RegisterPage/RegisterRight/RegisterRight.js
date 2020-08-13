import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import "./RegisterRight.scss";
//import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
//import { faFacebookF } from "@fortawesome/free-brands-svg-icons";


class RegisterRight extends Component {
    state = {
        id: "",
        pwd: "",
        isLoggedIn: false,
        userID: "",
        name: "",
        email: "",
        picture: "",
      
    };
    componentDidMount = () => {
        this.facebookSDK();
        this.googleSDK();
    };

    facebookSDK = () => {
        // SDK 초기 설정
        window.fbAsyncInit = function () {
            window.FB.init({
                appId: "231044071202792",
                autoLogAppEvents: true,
                cookie: true,
                xfbml: true,
                version: "v7.0"
            });
            //  로그인 상태 체크
            window.FB.getLoginStatus(function (response) {
                if (response.status === "connected") {
                    let uid = response.authResponse.userID;
                    let accessToken = response.authResponse.accessToken;
                    console.log(uid, accessToken);
                    console.log(response.authResponse);
                    console.log(response);
                } else if (response.status === "not_authorized") {
                    console.log(response.authResponse);
                } else {
                    console.log(response.authResponse);
                }
            });
        };
        // 페이스북 SDK 로드
        (function (d, s, id) {
            // Load the SDK asynchronously
            var js,
                fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) return;
            js = d.createElement(s);
            js.id = id;
            js.src = "https://connect.facebook.net/ko_KR/sdk.js";
            fjs.parentNode.insertBefore(js, fjs);
        })(document, "script", "facebook-jssdk");
    };

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
            console.log("Token || " + googleUser.getAuthResponse().id_token);
            console.log("ID: " + profile.getId());
            console.log("Name: " + profile.getName());
            console.log("Image URL: " + profile.getImageUrl());
            console.log("Email: " + profile.getEmail());
            console.log("total", googleUser.getAuthResponse());
          },
          error => {
            alert(JSON.stringify(error, undefined, 2));
          }
        );
      };
    

    //페이스북 로그인
    loginWithFacebook = () => {
        
        window.FB.login(function (response) {
            console.log(response);
            window.FB.api("/me", "GET", { fields: "email" }, function (response) {
                console.log(response);
            });
        });
    };


    render() {
        return (
            <div className="login_main_right">
        <ul>
          <li>
            <button
              onClick={this.prepareLoginButton}
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
              <div style={{ border: "none", color: "gray" }}>
                <span>Google로 계속하기</span>
              </div>

            </button>
          </li>
          <li>
          <div className="fb-login-button" data-size="large" data-button-type="continue_with" data-layout="default" data-auto-logout-link="false" data-use-continue-as="false" data-width=""></div>
          </li>
        </ul>
      </div>
    );
  }
}

export default withRouter(RegisterRight);
