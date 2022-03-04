import NavBar from '../components/navbar';
import {useState} from "react";
import axios from "axios";
import GoogleLogin from "react-google-login";
import { Navigate } from 'react-router-dom';

const Login = () => {
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();

    const [loginData, setLoginData] = useState(
        localStorage.getItem('loginData')
            ? JSON.parse(localStorage.getItem('loginData'))
            : null
    );

    const userLogin = async (e) => {
        e.preventDefault();

        const res = await axios
            .post('http://localhost:3080/api/login', {
                username: username,
                password: password
            });
        if(res.data.message){
            console.log(res.data.message);
        }
    };

    const handleLoginGoogle = async (googleData) => {
        const res = await axios
            .post('http://localhost:3080/api/google', {
                token: googleData.tokenId
            });
        setLoginData(res.data);
        localStorage.setItem('loginData', JSON.stringify(res.data));
    };

    return (
        <>
            <NavBar />
            <div className="container sigcont center-block">
                {
                    loginData ? <Navigate to="/" /> : <></>
                }
                <form onSubmit={userLogin}>
                    <h3 className="text-center">Вход</h3>
                    <div className="form-group">
                        <label>Логин</label>
                        <input type="text" className="form-control" placeholder="Введите ваш логин"
                               value={username}
                               onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label>Пароль</label>
                        <input type="password" className="form-control" placeholder="Введите ваш пароль"
                               value={password}
                               onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button type='submit' className="btn btn-primary btn-block">Войти</button>
                </form>
                    <p className="forgot-password text-right">
                        Забыли свой пароль? <a href="/">Восстановить</a>
                    </p>
                <GoogleLogin
                    clientId={'208628736762-vv7ut1a8tac1n36a787bdp4sajrbr0l3.apps.googleusercontent.com'}
                    buttonText="Sign in with Google"
                    className="ct-button ct-button--secondary"
                    onSuccess={handleLoginGoogle}
                    onFailure={handleLoginGoogle}
                    cookiePolicy="single_host_origin"
                />
            </div>
        </>
    );
};

export default Login;