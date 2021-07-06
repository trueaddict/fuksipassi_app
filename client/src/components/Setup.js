import React, {useState} from 'react';
import Service from './Service';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Requests from './Requests';


function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`full-width-tab-${index}`}
        {...other}
      >
        {value === index && (
            <>{children}</>
        )}
      </div>
    );
}

const useStyles = makeStyles({
    primary : {
        color: 'black'
    }
});

const Setup = ({user}) => {
    const [value, setValue] = useState(0);
    const classes = useStyles();
    const size = Service.useWindowSize();
    const contentWidth = size.width <= 700 ? "100%" : "75%";

    const handleTabChange = (event, newValue) => {
        setValue(newValue);
    }

    return (
        <>
            <div style={{width: contentWidth, margin: 'auto'}}>
                <Tabs value={value} onChange={handleTabChange} textColor="primary" indicatorColor="primary" TabIndicatorProps={{style:{background:'black', 'text-color':'black'}}} variant="fullWidth" centered>
                    <Tab label="Pyynnöt" style={{color:'rgba(0, 0, 0, 0.7)'}}></Tab>
                    <Tab label="Tehtävät" style={{color:'rgba(0, 0, 0, 0.7)'}}></Tab>
                    <Tab label="Käyttäjät" style={{color:'rgba(0, 0, 0, 0.7)'}}></Tab>
                </Tabs>
            
                <TabPanel value={value} index={0}>
                    <Requests/>
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <div>
                        <p>Tehtävät</p>
                    </div>
                </TabPanel>
                <TabPanel value={value} index={2}>
                    <div>
                        <p>Käyttäjät</p>
                    </div>
                </TabPanel>
            </div>
            
        </>
    )
}

export default Setup;