import React, {useEffect, useState} from 'react';
import Service from './Service';

const SetupTasks = ({user}) => {
  const [tasks, setTasks] = useState([]);
  const [types, setTypes] = useState(new Map());
  const [showNew, setShowNew] = useState(false);
  const [showNewType, setShowNewType] = useState(false);
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

  const handleTypeEdit = async event => {
    console.log(event.target.name);
    console.log(event.target.value);
    
    let tempTasks = Object.assign({}, tasks);
    let orderNum = tempTasks[event.target.name];
    tempTasks.delete(event.target.name);

    tempTasks[event.target.value] = orderNum;

    setTypes(tempTasks);
  }

  const handleSave = async event => {
    await Service.updateTasks(tasks);
  }

  useEffect(() => {
    (async () => {
      const data = await Service.fetchTasks(user);
      console.log(data);
      setTasks(data);
      const tempTypes = new Map();
      for (let task of data.sort((a,b) => { return a.type_order > b.type_order })) {
        tempTypes.set(task.type, task.type_order);
      }
      setTypes(tempTypes);
    })();
  }, []);

  return (
    <>
      <div style={{marginTop:'1rem', marginLeft:'1rem'}}>
        <button onClick={(event) => handleSave(event)} className='btn yellow darken-2' style={{marginRight:'1rem'}}>Tallenna muutokset</button>
        <button onClick={(event) => handleNewTask(event)} className='btn yellow darken-2'>Lisää tehtävä</button>
        <button onClick={(event) => setShowNewType(!showNewType)} className='btn yellow darken-2' style={{marginLeft:'1rem'}}>Lisää kategoria</button>
      </div>
      {showNewType ? 
        <div className='collection'>
          <div className='collection-item'>
            { types !== undefined ? Array.from(types).map(([key, temp], index) => (
              <div className='row'>
                <div className='col s2'>
                  <input type='number' defaultValue={temp}></input>
                </div>
                <div className='col s10'>
                  <input type='text' defaultValue={key} name={key} onChange={(event) => handleTypeEdit(event)}></input>
                </div>
              </div>
            )) : null}
            <div className='row'>
              <div className='col s2'>
                <input type='number'></input>
              </div>
              <div className='col s10'>
                <input type='text'></input>
              </div>
            </div>
          </div>
        </div> : null}      
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
      <h4 className='center'>Tehtävät</h4>
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