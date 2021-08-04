import React, {useEffect, useState} from 'react';
import Service from './Service';
import Task from './Task';
import Grid from '@material-ui/core/Grid';

const Tasks = ({user, theme}) => {
    const [open, setOpen] = useState();
    const [tasks, setTasks] = useState([]);
    const size = Service.useWindowSize();
    
    const handleClick = (event, key) => {
        event.preventDefault();
        const tempOpen = Object.assign({}, open);
        tempOpen[key] = !tempOpen[key];
        setOpen(tempOpen);
    }

    const orderKeys = (tasks) => {
        let keys = [];
        for (let key of Object.keys(tasks)) {
            keys.push({'name':key, 'orderNum':tasks[key].orderNum});
        }
        keys.sort((a,b) => { return a.orderNum > b.orderNum });
        return keys;
    }

    useEffect(() => {
       (async () => {
            const data = await Service.fetchData(user);
            console.log(data);
            setTasks(data.tehtavat);
            console.log(tasks);
       })();
       let falses = {}
        for (let key of Object.keys(tasks)) {
            falses[key] = false;
        }
        setOpen(falses);
    }, []);


    const direction = size.width <= 700 ? "column" : "row";
    const width = size.width <= 700 ? 12 : 6;

    let keys = orderKeys(tasks);

    return (
        <div className="container">
            <style>
                {'body {background-color:'+theme.bodyBackgroundColor+';'}
            </style>
            <h4 className="center gray-text" >Tehtävät</h4>
            {keys.length > 0 ? keys.map((key) => (
                
                <div className="" style={{wordWrap: 'break-word'}}>
                    <button className={`accordion ${open[key.name] ? 'active' : ''}`} type="button" onClick={(event) => handleClick(event, key.name)} style={theme.taskButton}>
                        <h5>{key.name}</h5>
                        <br></br>
                        <h6>{tasks[key.name]['suoritettu']} / {tasks[key.name]['kpl']}</h6>
                    </button>
                    <div className={`panel ${open[key.name] ? 'show' : ''}`}>
                    <Grid container spacing={2} direction={direction}>
                        {tasks[key.name]['tehtavat'].length > 0 ? tasks[key.name]['tehtavat'].map((task) => (
                            <Grid key={task.id} item xs={width}>
                                <Task task={task} user={user} theme={theme}/>
                            </Grid>
                        )) : null}
                    </Grid>
                    </div>
                </div>
            

            )): null}
        </div>
    )
}

export default Tasks;