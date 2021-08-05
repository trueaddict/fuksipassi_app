import React, {useEffect, useState} from 'react';
import Service from './Service';

const SetupTasks = ({user, theme}) => {
  const [tasks, setTasks] = useState([]);
  const [types, setTypes] = useState(new Map());
  const [showNew, setShowNew] = useState(false);
  const [showNewType, setShowNewType] = useState(false);
  const [addedNew, setAddedNew] = useState(false);

  const [type, setNewType] = useState('');

  const [newNum, setNum] = useState();
  const [newType, setType] = useState(1);
  const [newDesc, setDesc] = useState();


  const handleChange = async (event, temp) => {
    console.log(event.target.value);
    console.log(event.target.id);
    let tempTasks = Object.assign([], tasks);

    for (let task of tempTasks) {
      if (task.id === temp.id) {
        if (event.target.id === 'type') {
          task[event.target.id] = types.get(parseInt(event.target.value));
          task['type_order'] = parseInt(event.target.value);
        } else {
          task[event.target.id] = event.target.value;
        }
      }
    }
    console.log(tempTasks);
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
    setType(1);
    setDesc();
  }

  const submitNewTask = async event => {
    event.preventDefault();
    (async () => {
      let temp = {}
      temp['num'] = parseInt(newNum);
      temp['type'] = types.get(parseInt(newType));
      temp['typeOrder'] = parseInt(newType);
      temp['desc'] = newDesc;
      temp['jarj_id'] = user.id_jarj;
      setAddedNew(true);
      console.log(temp);
      await Service.createTask(temp);
      await init();
    })();
  };

  const handleTypeEdit = async (event, key) => {
    event.preventDefault();
    console.log(event.target[0].value);
    
    let tempTypes = new Map(types);

    tempTypes.set(key, event.target[0].value);

    console.log(tempTypes);

    let tempTasks = Object.assign([], tasks);
    console.log(tempTasks);

    for (let task of tempTasks) {
      task.type = tempTypes.get(task.type_order);
    }
    setTasks(tempTasks);
    setTypes(tempTypes);
  }

  const handleTypeNew = async (event, nextIndex) => {
    if (type === '') return;
    
    let tempTypes = new Map(types);
    tempTypes.set(nextIndex, type);

    console.log(tempTypes);
    setTypes(tempTypes);
    setNewType('');
  }

  const handleTypeRemove = async (event, key) => {
    let tempTypes = new Map(types);

    tempTypes.delete(key);
    console.log(tempTypes);
    setTypes(new Map());
    let tempNewTypes = new Map();
    let i = 1;
    for (let entry of tempTypes.entries()) {
      console.log(entry);
      tempNewTypes.set(i, entry[1]);
      i++;
    }
    console.log(tempNewTypes);
    setTypes(tempNewTypes);
  }

  const handleSave = async event => {
    await Service.updateTasks(tasks);
    await init();
  }

  const init = async => {
    (async () => {
      const data = await Service.fetchTasks(user);
      let tempData = Object.assign([], data);
      tempData.sort((a,b) => { return a.num > b.num })
      console.log(tempData);
      setTasks(tempData);
      const tempTypes = new Map();
      for (let task of data.sort((a,b) => { return a.type_order > b.type_order })) {
        tempTypes.set(task.type_order, task.type);
      }
      setTypes(tempTypes);
    })();
  }

  useEffect(() => {
    init();
  }, []);

  return (
    <>
      <div style={{margin:'1rem', 'paddingBottom':'1rem' , 'overflow-x':'auto','whiteSpace':'nowrap'}}>
        <button onClick={(event) => handleSave(event)} className={theme.button} style={{marginRight:'1rem'}}>Tallenna muutokset</button>
        <button onClick={(event) => handleNewTask(event)} className={theme.button}>Lisää tehtävä</button>
        <button onClick={(event) => setShowNewType(!showNewType)} className={theme.button} style={{marginLeft:'1rem'}}>Lisää kategoria</button>
      </div>
      {showNewType ? 
        <div className='collection'>
          <div className='collection-item' style={{width:'100%', 'padding':'0rem 0rem 0rem 1rem'}}>
            { types !== undefined ? Array.from(types).map(([key, temp], index) => (
              <div key={temp}>
                <form onSubmit={(event => handleTypeEdit(event, key))}>
                  {key}. 
                  <div className='input-field inline'>
                    <input type='text' defaultValue={temp}></input>
                  </div>
                  <button type='submit' className={`btn-floating `+ theme.button} style={{marginLeft:'1rem'}}><i class="material-icons">save</i></button>
                  <button onClick={(event) => handleTypeRemove(event, key)} className={`btn-floating `+theme.button} style={{marginLeft:'1rem'}}><i class="material-icons">clear</i></button>
                </form>
              </div>
            )) : null}
            <div style={{borderTop: '2px solid #c4c4c4'}}>
              <div className='center'>
                <p>Lisää kategoria</p>
              </div>
              {Array.from(types).length+1}. 
              <div className='input-field inline'>
                <input type='text' value={type} onChange={(event) => setNewType(event.target.value)}></input>
              </div>
              <button onClick={(event) => handleTypeNew(event, Array.from(types).length+1)} className={theme.button} style={{marginLeft:'1rem'}}>Lisää</button>
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
                    <input id="num" type='number' required onChange={e => {setNum(parseInt(e.target.value));setAddedNew(false);}}></input>
                    
                    <label>Kategoria</label>
                    <div className='input-field'>
                      <select defaultValue={1} required onChange={e => {setType(e.target.value);setAddedNew(false);}}>
                        {types !== undefined ? Array.from(types).map(([key, temp], index) => (
                          <option value={parseInt(key)}>{temp}</option>
                        )): null}
                      </select>
                    </div>
                    
                    <label for="desc">Tehtävä</label>
                    <input id='desc' type='text' required onChange={e => {setDesc(e.target.value);setAddedNew(false);}}></input>
                    <input className={theme.button} type="submit" value="Lisää"/>
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
                <input id="num" type='number' defaultValue={parseInt(temp.num)}></input>
                
                
                <label>Kategoria</label>
                <div className='input-field'>
                  <select defaultValue={temp.type_order} id='type'>
                    {types !== undefined ? Array.from(types).map(([key, temp], index) => (
                      <option value={key}>{temp}</option>
                    )): null}
                  </select>
                </div>
                                
                
                
                <label for="desc">Tehtävä</label>
                <input id='desc' type='text' defaultValue={temp.desc}></input>
              </form>
              <button onClick={(event) => handleDelete(event, temp)} className={theme.button}>Poista tehtävä</button>
            </div>
          </li>
        )): null}
      </ul>
    </>
  )
}

export default SetupTasks;