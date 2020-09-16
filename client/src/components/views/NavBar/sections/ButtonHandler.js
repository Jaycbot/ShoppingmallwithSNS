import React from 'react'
import { useSelector } from 'react-redux'
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import LoginHandler from './LoginHandler'
import SNSBorder from './SNS_Border'
import LogoutHandler from './LogoutHandler'
import UpdateNav from './UpdateNav'
import AdminButton from './AdminButton'
import SellerUpload from './SellerUpload'
import CartPageIcon from './CartPageIcon'
import './ButtonHandler.scss'
import SellerButton from './SellerButton'

function ButtonHandler(props) {

    const userData = useSelector((state) => state.user.userData);

    const logoutHandler = () => {
        axios.get('/api/users/logout').then((response) => {
            if (response.data.success) {
                props.history.push('/login');
            } else {
                console.log('로그아웃에 실패하였습니다');
            }
        });
    };

    const boardHandler = () => {
        if (props.history.location.pathname.substring(0, 4) === '/sns') {
            return <SNSBorder />;
        } else {
            if (userData && userData.role == 2) {
                return <SellerUpload />;
            }
        }
    };




    return (
        <div className="Buttons">
            <div className="mobile-button">
                <div>
                    {userData && !userData.isAuth && <LoginHandler />}
                    {userData && userData.isAuth && (
                        <LogoutHandler renderLogout={logoutHandler} />
                    )}
                </div>

                <div>
                    {userData && userData.isAuth && <UpdateNav />}
                    {userData && userData.role == 2 && <SellerButton />}
                </div>

                <div>
                    {userData && userData.isAuth && boardHandler()}
                </div>

                <div>
                    {userData && userData.role == 1 && <AdminButton />}
                </div>
                
            </div>
            <div className="cart">
                {userData && userData.isAuth && <CartPageIcon />}
            </div>
        </div>
    )
}

export default withRouter(ButtonHandler)
