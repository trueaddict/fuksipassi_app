import React from 'react';
import Service from './Service';

const Policy = ({token, setToken}) => {
    const handleYes = e => {
        const new_token = Object.assign({}, token);
        new_token.isnewuser = false;
        setToken(new_token);
    }
    
    const handleNo = async e => {
        e.preventDefault();
        const user = {
            user_id:token.token
        }
        const ret = await Service.deleteUser(user);
        setToken();
    }
    
    return (
        <div>
            <div className="policy">
                <h5 className="center gray-text">Luodaanko uusi käyttäjä?</h5>
                <p className="center brand-text">Email</p>
                <p className="center gray-text">Luomalla käyttäjän hyväksyt palvelun käyttöehdot sekä <a href="./gdpr">rekisteri- ja tietosuojaselosteen</a></p>
                <div className="center margin-top-bottom"><button onClick={handleYes} className="btn green-syrinx">Kyllä</button></div>
                <div className="center margin-top-bottom"><button onClick={handleNo} className="btn yellow darken-2">Ei</button></div>
                
            </div>
            <div className="policy-background"></div>
        </div>
    )
}

export default Policy;