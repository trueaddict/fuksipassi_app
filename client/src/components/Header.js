import React from 'react';
import Service from './Service';
import Grid from '@material-ui/core/Grid';

const Header = ({setUser, user}) => {
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
    }

    return (
        <div className="nav">
            <Grid container spacing={3} direction={direction}>
                <Grid item xs={colunm_width[0]}>
                    <div className="header">
                        <a href="https://www.syrinx.fi"><img src="https://www.syrinx.fi/wp-content/uploads/2019/02/copy-syrinx_logoGreenBackgroundveryYellowWithText.png" alt="" className="responsive-img"/></a>
                    </div>
                </Grid>
                <Grid item xs={colunm_width[1]} >
                    <div className="header">
                        <a href="//" className=""><h3 className="brand-text brand-logo">Syrinx Fuksipassi</h3></a>
                    </div>
                </Grid>
                <Grid item xs={colunm_width[2]}>
                    <div className="header">
                        {Service.parseName(user.useremail)}
                    </div>
                </Grid>
                <Grid item xs={colunm_width[3]}>
                    <div className="header">
                        <button onClick={handleLogout} className="btn-small logout-btn yellow darken-2" name="logout-submit">Kirjaudu ulos</button>
                    </div>
                </Grid>
            </Grid>
        </div>
    )
}

export default Header;