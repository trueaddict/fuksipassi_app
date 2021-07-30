import React, {useEffect, useState} from 'react';
import Service from './Service';

const SetupTasks = ({user}) => {
  const [tasks, setTasks] = useState([]);
  const [showNew, setShowNew] = useState(false);
  const [addedNew, setAddedNew] = useState(false);

  const [newNum, setNum] = useState();
  const [newType, setType] = useState();
  const [newDesc, setDesc] = useState();


  const handleChange = async (event, temp) => {
    console.log(event.target.value);
    console.log(event.target.id);
    let tempTasks = Object.assign([], tasks);

    for (let task of tempTasks) {
      if (task.id === temp.id) {
        task[event.target.id] = event.target.value;
      }
    }
    setTasks(tempTasks);
  };

  const handleDelete = async (event, temp) => {
    await Service.deleteTask(temp);
    let tempTasks = [];
    for (let task of tasks) {
      if (task.id !== temp.id) {
        tempTasks.push(task);
      }
    }
    setTasks(tempTasks);
  };

  const handleNewTask = async event => {
    setShowNew(!showNew);
    setNum();
    setType();
    setDesc();
  }

  const submitNewTask = async event => {
    event.preventDefault();
    (async () => {
      let temp = {}
      temp['num'] = newNum;
      temp['type'] = newType;
      temp['desc'] = newDesc;
      temp['jarj_id'] = user.id_jarj;
      setAddedNew(true);
      const task = await Service.createTask(temp);
      const data = await Service.fetchTasks(user);
      setTasks(data);
    })();
  };

  const handleSave = async event => {
    await Service.updateTasks(tasks);
  }

  useEffect(() => {
    (async () => {
      const data = await Service.fetchTasks(user);
      setTasks(data);
      console.log(data);
    })();
  }, []);

  return (
    <>
      <div style={{marginTop:'1rem', marginLeft:'1rem'}}>
        <button onClick={(event) => handleSave(event)} className='btn yellow darken-2' style={{marginRight:'1rem'}}>Tallenna muutokset</button>
        <button onClick={(event) => handleNewTask(event)} className='btn yellow darken-2'>Lisää tehtävä</button>
      </div>
      <div>  
        {showNew ? 
            <div className='collection'>
              <div className='collection-item'>
                <p className='center'>Uusi tehtävä</p>
                {addedNew ? <p>Uusi tehtävä lisätty!</p> : null}
                <form onSubmit={submitNewTask}>
                    <label for="num">Numero</label>
                    <input id="num" type='number' onChange={e => {setNum(e.target.value);setAddedNew(false);}}></input>
                    
                    <label for="type">Kategoria</label>
                    <input id='type' type='text' onChange={e => {setType(e.target.value);setAddedNew(false);}}></input>
                    
                    <label for="desc">Tehtävä</label>
                    <input id='desc' type='text' onChange={e => {setDesc(e.target.value);setAddedNew(false);}}></input>

                    <input class="btn yellow darken-2" type="submit" value="Lisää"/>
                </form>
              </div>
            </div>
          : null}
      </div>
      <ul className='collection'>
        {tasks !== undefined ? tasks.map(temp => (
          <li key={temp.id} className='collection-item' style={{marginBottom:'0.5rem'}}>
            <div>
              <form onChange={(event) => handleChange(event, temp)}>
                <label for="num">Numero</label>
                <input id="num" type='number' value={temp.num}></input>
                
                <label for="type">Kategoria</label>
                <input id='type' type='text' value={temp.type}></input>
                
                <label for="desc">Tehtävä</label>
                <input id='desc' type='text' value={temp.desc}></input>
              </form>
              <button onClick={(event) => handleDelete(event, temp)} className="btn-small yellow darken-2">Poista tehtävä</button>
            </div>
          </li>
        )): null}
      </ul>
    </>
  )
}

export default SetupTasks;