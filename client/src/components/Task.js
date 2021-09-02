import React, {useEffect, useState} from 'react';
import Service from './Service';

const Task = ({task, user, theme}) => {
    const [message, setMessage] = useState();
    const [sended, setSended] = useState();
    const [approved, setApproved] = useState();

    const sendRequest = async event => {
        event.preventDefault();
        Service.createRequest(task, user, message);
        setSended(true);
    }

    useEffect(() => {
        setSended(task.lahetetty);
        setApproved(task.suoritettu);
    }, []);

    return (
        <div className="card z-depth-0">
            <div className="card-content center">
                <h6>Tehtävä {task.num}</h6>
                <h5>{task.kuvaus}</h5>
            </div>
            <div className="card-action center">
                {sended & !approved ? <button className="btn brand-text grey">Lähetetty</button> :
                 approved ? <button className="btn brand-text btn-suoritettu">Suoritettu</button>:
                <form onSubmit={sendRequest}>
                    <input type="text" placeholder="Viesti / Tutorin nimi" onChange={e => setMessage(e.target.value)}/>
                    <button type="submit" className={theme.button}>Lähetä</button>
                </form>  }
                
            </div>
        </div>
    )
}

export default Task;