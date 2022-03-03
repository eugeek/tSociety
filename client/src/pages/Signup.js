import NavBar from '../components/navbar';
import {Link} from 'react-router-dom';
import {useState} from "react";
import axios from "axios";

const Signup = () => {
    const [username, setUsername] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const register = async (e) => {
        e.preventDefault();
        await axios
            .post('http://localhost:3080/api/register', {
                username: username,
                email: email,
                password: password
            })
            .then(res => console.log(res));
    };

    return (
        <>
            <NavBar />
            <div className="container sigcont center-block">
                <form onSubmit={register}>
                    <h3 className="text-center">Регистрация</h3>
                    <div className="form-group">
                        <label>Имя</label>
                        <input type="text" className="form-control" placeholder="Введите ваше имя"
                               onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label>Email</label>
                        <input type="email" className="form-control" placeholder="Введите вашу почту"
                               onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label>Пароль</label>
                        <input type="password" className="form-control" placeholder="Введите ваш пароль"
                               onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="btn btn-primary btn-block">Зарегистрироваться</button>
                    <p className="forgot-password text-right">
                        Уже зарегистрированы? <Link to="/login">Войти</Link>
                    </p>
                </form>
            </div>
        </>
    );
};

export default Signup;