import React, {useEffect, useState} from 'react';
import Service from './Service';

const SetupUsers = ({user, theme}) => {
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
                <div style={{borderBottom:'2px solid #00000070'}}>
                  <p>{temp.useremail}</p>
                </div>
                
                <ul>
                  {temp.categories.map((category, index) => (
                    <li>
                      <p>{category.name}:</p><p style={{marginLeft:'1rem'}}> {category.approved_type_count} / {category.type_count} - {Math.round(category.approved_type_percent)}%</p>
                    </li>
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