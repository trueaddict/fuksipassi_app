import React from 'react';

const Task = ({task}) => {
    return (
        <div className="card z-depth-0">
            <div className="card-content center">
                <h6>Tehtävä {task.num}</h6>
                <h5>{task.kuvaus}</h5>
            </div>
            <div className="card-action center">
                {task.lahetetty & task.suoritettu ? <button className="btn brand-text grey">Lähetetty</button> :
                 task.suoritettu ? <button className="btn brand-text btn-suoritettu">Suoritettu</button>:
                <form>
                    <input className="hide" name="id"/><input type="text" placeholder="Viesti / Tutorin nimi" name="message" id="1973" className="perusopinnot"/>
                    <button type="submit" className="btn brand-text yellow darken-2">Lähetä</button>
                </form>  }
                
            </div>
        </div>
    )
}

export default Task;