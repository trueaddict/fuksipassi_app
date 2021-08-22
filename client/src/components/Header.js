import React from 'react';
import Service from './Service';
import Grid from '@material-ui/core/Grid';

const Header = ({setUser, user, setCookie, theme}) => {
    const size = Service.useWindowSize();
    const direction = size.width <= 700 ? "column" : "row";
    let colunm_width = [3, 6, 1, 2];

    if (direction === "column") {
        let temp = [];
        for (let i of colunm_width) {
            temp.push(0);
        }
        colunm_width = temp;
    }

    const handleLogout = (e) => {
        setUser();
        setCookie('useremail', null, {path: '/'});
        setCookie('password', null, {path: '/'});
    }

    return (
        <div className="nav" style={theme.navBackgroundColor}>
            <Grid container spacing={3} direction={direction}>
                <Grid item xs={colunm_width[0]}>
                    <div className="header">
                        <a href={theme.website_url}><img src={theme.icon_url} alt="" className="responsive-img" style={{marginTop:'10px'}}/></a>
                    </div>
                </Grid>
                <Grid item xs={colunm_width[1]} >
                    <div className="header" style={{'textAlign':'center'}}>
                        <a href="//" className=""><h3 className="brand-logo" style={theme.navTextColor}>{theme.name}</h3></a>
                    </div>
                </Grid>
                <Grid item xs={colunm_width[2]}>
                    <div className="header" style={theme.navTextColor}>
                        {Service.parseName(user.useremail)}
                    </div>
                </Grid>
                <Grid item xs={colunm_width[3]}>
                    <div className="header">
                        <button onClick={handleLogout} className={theme.button} name="logout-submit">Kirjaudu ulos</button>
                    </div>
                </Grid>
            </Grid>
        </div>
    )
}

export default Header;