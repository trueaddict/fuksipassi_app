import React, {useState, useEffect} from 'react';
import Service from './Service';

const Login = ({ setUser, id_jarj, setCookie, cookies, theme }) => {
    const [useremail, setEmail] = useState();
    const [password, setPassword] = useState();
    const [errors, setErrors] = useState();

    const onSubmit = async e => {
        e.preventDefault();
        const user = {
            useremail: useremail,
            password: password,
            id_jarj: id_jarj
        }
        const temp_user = await Service.loginUser(user);
        if (temp_user.user_id) {
            setUser(temp_user);
            setCookie('useremail', user.useremail, {path: '/'});
            setCookie('password', user.password, {path: '/'});
        } else {
            setErrors(true);
        }
    }

    useEffect(() => {
        (async () => {
            let email = cookies.useremail;
            let password = cookies.password;
            if (email != null && password != null) {
                const user = {
                    useremail: email,
                    password: password,
                    id_jarj: id_jarj
                }
                const temp_user = await Service.loginUser(user);
                if (temp_user.user_id) {
                    setUser(temp_user);
                }
            }
        })();
    }, []);


    return (
        <div>
            <style>{'body {background-color:'+theme.bodyBackgroundColor+';'}</style>
            <div class="nav" style={theme.navBackgroundColor}>
              <div class="row">
                <div class="center">
                    <div class="col s12 m2 brand-site">
                        
                    </div>
                    <div class="col s12 m4 offset-m2">
                        <a href="//" class=""><h3 class="brand-logo" style={theme.navTextColor}>{theme.name}</h3></a>
                    </div>
                </div>
              </div>
            </div>
            <div class="center brand-text">
                <h4>Kirjaudu</h4>
                <p>Anna isamail (yliopiston JYU) sähköposti pitkässä muodossa</p>
                <p>Esim.</p>
                <p><i>kalle.h.ankka@student.jyu.fi</i></p>
            </div>
            {errors === true && <p class="center error">Väärä sähköposti tai salasana!</p>}
            <form className="kuittaus" onSubmit={onSubmit} style={theme.accentBackgroundColor}>
                <input type="email" name="useremail" placeholder="Sähköposti" pattern=".*@student.jyu.fi" required onChange={e => setEmail(e.target.value)} />{' '}
                <input type="password" name="password" placeholder="Ainejärjestön Salasana" id="password" required onChange={e => setPassword(e.target.value)} />{' '}
                <div class="center">
                    <input className={theme.button} type="submit" value="Kirjaudu"/>
                </div>
            </form>
        </div>
    )
}

export default Login;