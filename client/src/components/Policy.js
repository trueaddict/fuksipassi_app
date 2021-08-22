import React from 'react';
import Service from './Service';

const Policy = ({user, setUser}) => {
    const handleYes = e => {
        const new_user = Object.assign({}, user);
        new_user.isnewuser = false;
        setUser(new_user);
    }
    
    const handleNo = async e => {
        e.preventDefault();
        const temp_user = {
            user_id:user.user_id
        }
        const ret = await Service.deleteUser(temp_user);
        setUser();
    }
    
    return (
        <div>
            <div className="policy">
                <h5 className="center gray-text">Luodaanko uusi käyttäjä?</h5>
                <p className="center brand-text">Email</p>
                <p className="center gray-text">Luomalla käyttäjän hyväksyt palvelun käyttöehdot sekä <a href="/gdpr" target="_blank">rekisteri- ja tietosuojaselosteen</a></p>
                <div className="center margin-top-bottom"><button onClick={handleYes} className="btn black">Kyllä</button></div>
                <div className="center margin-top-bottom"><button onClick={handleNo} className="btn grey lighten-1">Ei</button></div>
                
            </div>
            <div className="policy-background"></div>
        </div>
    )
}

export default Policy;