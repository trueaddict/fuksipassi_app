import React, {useEffect, useState} from 'react';
import Service from './Service';

const SetupTasks = ({user}) => {
  const [tasks, setTasks] = useState([]);
  const [types, setTypes] = useState(new Map());
  const [showNew, setShowNew] = useState(false);
  const [showNewType, setShowNewType] = useState(false);
  const [addedNew, setAddedNew] = useState(false);

  const [type, setNewType] = useState('');

  const [newNum, setNum] = useState();
  const [newType, setType] = useState();
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
      await Service.createTask(temp);
      const data = await Service.fetchTasks(user);
      setTasks(data);
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
  }

  useEffect(() => {
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
              <div key={temp}>
                <form onSubmit={(event => handleTypeEdit(event, key))}>
                  {key}. 
                  <div className='input-field inline'>
                    <input type='text' defaultValue={temp}></input>
                  </div>
                  <button type='submit' className='btn-floating yellow darken-2' style={{marginLeft:'1rem'}}><i class="material-icons">save</i></button>
                  <button onClick={(event) => handleTypeRemove(event, key)} className='btn-floating yellow darken-2' style={{marginLeft:'1rem'}}><i class="material-icons">clear</i></button>
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
              <button onClick={(event) => handleTypeNew(event, Array.from(types).length+1)} className='btn yellow darken-2' style={{marginLeft:'1rem'}}>Lisää</button>
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
                    
                    <label>Kategoria</label>
                    <div className='input-field'>
                      <select onChange={e => {setType(e.target.value);setAddedNew(false);}}>
                        {types !== undefined ? Array.from(types).map(([key, temp], index) => (
                          <option value={temp}>{temp}</option>
                        )): null}
                      </select>
                    </div>
                    
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
                
                
                <label>Kategoria</label>
                <div className='input-field'>
                  <select value={temp.type_order} id='type'>
                    {types !== undefined ? Array.from(types).map(([key, temp], index) => (
                      <option value={key}>{temp}</option>
                    )): null}
                  </select>
                </div>
                                
                
                
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