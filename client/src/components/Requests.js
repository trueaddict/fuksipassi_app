import React, {useEffect, useState} from 'react';


function genDemoData() {
    const demoData = {
        kuitattavat : [
    
        ]
    };
    for (let index = 0; index < 10; index++) {
        demoData.kuitattavat.push({name:'Nimi Sukunimit'+index});  
    }
    return demoData;
}

const Requests = ({user}) => {
    const [row, setRow] = useState();
    const [demoData, setData] = useState();

    useEffect(() => {
        setData(genDemoData());
    }, []);
    

    const handleClick = (event, newRow) => {
        if (row === newRow) {
            setRow();    
        } else {
            setRow(newRow);
        }
    }

    const tabStyle = {
        color:'rgba(0, 0, 0, 1)',
        width: '100%',
        margin: 'auto'
        
    }

    return (
        <>
            <div>
                <ul>
                    {demoData !== undefined ? demoData.kuitattavat.map((temp, index) => (
                        <li key={index}>
                            <div className="collapsible-header" onClick={(event) => handleClick(event, index)}> {temp.name}</div>
                            <div className={`${row===index ? 'collapsible-body' : 'hidden'} `} >
                                <form>
                                    <div>
                                        <button className="btn-small kuittaa-btn" style={{backgroundColor:'#fbc02d'}}>Kuittaa valitut</button>
                                    </div>
                                    <div>
                                        <ul>
                                            <li>Tehtävä 1</li>
                                            <li>Tehtävä 2</li>
                                        </ul>
                                    </div>
                                </form>
                            </div>
                        </li>
                    )) : null} 
                </ul>
            </div>
            
        </>
    )
}

export default Requests;