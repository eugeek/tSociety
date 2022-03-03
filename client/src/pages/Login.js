import NavBar from '../components/navbar';
import {useState} from "react";
import axios from "axios";

const Login = () => {
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();

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

    return (
        <>
            <NavBar />
            <div className="container sigcont center-block">
                <form onSubmit={userLogin}>
                    <h3 className="text-center">Вход</h3>
                    <div className="form-group">
                        <label>Логин</label>
                        <input type="text" className="form-control" placeholder="Введите ваш логин"
                               value={username}
                               onChange={(e) => setUsername(e.currentTarget.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label>Пароль</label>
                        <input type="password" className="form-control" placeholder="Введите ваш пароль"
                               value={password}
                               onChange={(e) => setPassword(e.currentTarget.value)}
                        />
                    </div>
                    <button type='submit' className="btn btn-primary btn-block">Войти</button>
                </form>
                    <p className="forgot-password text-right">
                        Забыли свой пароль? <a href="/">Восстановить</a>
                    </p>
            </div>
        </>
    );
};

export default Login;