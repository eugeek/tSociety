import NavBar from '../components/navbar';

const Login = () => {
    return (
        <>
            <NavBar />
            <div className="container sigcont center-block">
                <form>
                    <h3 className="text-center">Вход</h3>
                    <div className="form-group">
                        <label>Email</label>
                        <input type="email" className="form-control" placeholder="Введите вашу почту" />
                    </div>
                    <div className="form-group">
                        <label>Пароль</label>
                        <input type="password" className="form-control" placeholder="Введите ваш пароль" />
                    </div>
                    <button type="submit" className="btn btn-primary btn-block">Войти</button>
                    <p className="forgot-password text-right">
                        Забыли свой пароль? <a href="#">Восстановить</a>
                    </p>
                </form>
            </div>
        </>
    );
};

export default Login;