import NavBar from '../components/navbar';
import {Link} from 'react-router-dom';

const Signup = () => {
    return (
        <>
            <NavBar />
            <div className="container sigcont center-block">
                <form>
                    <h3 className="text-center">Регистрация</h3>
                    <div className="form-group">
                        <label>Имя</label>
                        <input type="text" className="form-control" placeholder="Введите ваше имя" />
                    </div>
                    <div className="form-group">
                        <label>Email</label>
                        <input type="email" className="form-control" placeholder="Введите вашу почту" />
                    </div>
                    <div className="form-group">
                        <label>Пароль</label>
                        <input type="password" className="form-control" placeholder="Введите ваш пароль" />
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