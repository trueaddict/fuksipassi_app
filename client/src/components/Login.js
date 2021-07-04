import React, {useState} from 'react';

async function loginUser(creds) {
    /*return {"login":"ok"};*/
    return fetch('http://127.0.0.1:5000/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(creds)
    })
    .then(data => data.json())
}

export default function Login({ setToken, id_jarj }) {
    const [useremail, setEmail] = useState();
    const [password, setPassword] = useState();

    const onSubmit = async e => {
        e.preventDefault();
        const user = {
            useremail: useremail,
            password: password,
            id_jarj: id_jarj
        }
        const tokenData = await loginUser(user);
        setToken(tokenData);
    }

    return (
        <div>
            <div class="nav">
              <div class="row">
                <div class="center">
                    <div class="col s12 m2 brand-site">
                        <a href="https://www.syrinx.fi"><img src="./static/img/syrinx_logo.png" alt="" class="responsive-img"/></a>
                    </div>
                    <div class="col s12 m4 offset-m2">
                        <a href="" class=""><h3 class="brand-text brand-logo">Syrinx Fuksipassi</h3></a>
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
            <form class="kuittaus" onSubmit={onSubmit}>
                <input type="email" name="useremail" placeholder="Sähköposti" pattern=".*@student.jyu.fi" required onChange={e => setEmail(e.target.value)} />{' '}
                <input type="password" name="password" placeholder="Ainejärjestön Salasana" id="password" required onChange={e => setPassword(e.target.value)} />{' '}
                <div class="center">
                    <input class="btn yellow darken-2" type="submit" value="Kirjaudu"/>
                </div>
            </form>
        </div>
    )
}