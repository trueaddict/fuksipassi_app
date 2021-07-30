import React, {useEffect, useState} from 'react';
import Service from './Service';
import Task from './Task';
import Grid from '@material-ui/core/Grid';

const Tasks = ({user}) => {
    const [open, setOpen] = useState();
    const [tasks, setTasks] = useState([]);
    const size = Service.useWindowSize();
    
    const handleClick = (event, key) => {
        event.preventDefault();
        const tempOpen = Object.assign({}, open);
        tempOpen[key] = !tempOpen[key];
        setOpen(tempOpen);
    }

    useEffect(() => {
       (async () => {
            const data = await Service.fetchData(user);
            setTasks(data.tehtavat);
            console.log(data)
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

    let keys = Object.keys(tasks);

    return (
        <div className="container">
            <h4 className="center gray-text" >Tehtävät</h4>
            {keys.length > 0 ? keys.map((key) => (
                
                <div className="">
                    <button className={`accordion ${open[key] ? 'active' : ''}`} type="button" onClick={(event) => handleClick(event, key)}>
                        <h5>{key}</h5>
                        <br></br>
                        <h6>{tasks[key]['suoritettu']} / {tasks[key]['kpl']}</h6>
                    </button>
                    <div className={`panel ${open[key] ? 'show' : ''}`}>
                    <Grid container spacing={2} direction={direction}>
                        {tasks[key]['tehtavat'].length > 0 ? tasks[key]['tehtavat'].map((task) => (
                            <Grid key={task.id} item xs={width}>
                                <Task task={task} user={user}/>
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