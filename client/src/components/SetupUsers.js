import React, {useEffect, useState} from 'react';
import Service from './Service';

const SetupUsers = ({user}) => {
  const [row, setRow] = useState();
  const [data, setData] = useState();

  useEffect(() => {
    (async () => {
      const data = await Service.fetchUsers(user);
      console.log(data);
      setData(data);
    })();
  }, []);

  const handleClick = (event, newRow) => {
    if (row === newRow) {
        setRow();    
    } else {
        setRow(newRow);
    }
  }

  return (
    <>
      <div>
        <ul>
          {data !== undefined ? data.map((temp, index) => (
            <li key={index}>
              <div className='collapsible-header' onClick={(event) => handleClick(event, index)}>{Service.parseName(temp.useremail)} - {temp.approved_task_count} / {temp.task_count}</div>
              <div className={`${row===index ? 'collapsible-body' : 'hidden'}`} style={{backgroundColor:'#4f4f4f4a'}}>
                <ul>
                  {Object.keys(temp.categories).map((category, index) => (
                    <li>
                      <p>{category}:</p><p style={{marginLeft:'1rem'}}> {temp.categories[category].approved_type_count} / {temp.categories[category].type_count} - {temp.categories[category].approved_type_percent}%</p></li>
                  ))}
                </ul>
              </div>
            </li>
          )) : null}
        </ul>
      </div>
    </>
  )
}

export default SetupUsers;