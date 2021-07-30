import { Grid } from '@material-ui/core';
import React, {useEffect, useState} from 'react';
import Service from './Service';

const Requests = ({user}) => {
    const [row, setRow] = useState();
    const [data, setData] = useState();

    useEffect(() => {
        (async () => {
            const data = await Service.fetchSetupData(user);
            console.log(data);
            setData(data);
        })();
    }, []);
    

    const handleSubmit = async (event, temp) => {
        event.preventDefault();
        let reqToSubmit = [];
        for (let i of data) {
            if (i.user_id === temp.user_id) {
                for (let j of i.requests) {
                    if (j.checked) {
                        reqToSubmit.push(j);
                    }
                }
            }
        }
        await Service.approveRequests(user, reqToSubmit);
        (async () => {
            const data = await Service.fetchSetupData(user);
            console.log(data);
            setData(data);
        })();
    }

    const handleChange = async (event, temp, req) => {
        console.log(temp);
        console.log(req);
        console.log(event.target.checked);

        let tempData = Object.assign([], data);
        for (let i of tempData) {
            if (i.user_id === temp.user_id) {
                for (let j of i.requests) {
                    if (j.request_id === req.request_id) {
                        j.checked = !j.checked;
                    }
                }
            }
        }
        setData(tempData);
    }

    const handleReject = async (req) => {
        (async () => {
            await Service.deleteRequest(req);
            const data = await Service.fetchSetupData(user);
            console.log(data);
            setData(data);
        })();
    }

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
                        temp.requests.length > 0 ? 
                        <li key={index}>
                            <div className="collapsible-header" onClick={(event) => handleClick(event, index)}> {Service.parseName(temp.useremail)}</div>
                            <div className={`${row===index ? 'collapsible-body' : 'hidden'} `} style={{backgroundColor:'#4f4f4f4a'}} >
                                <form onSubmit={(event) => handleSubmit(event, temp)}>
                                    <div>
                                        <button className="btn-small kuittaa-btn" style={{backgroundColor:'#fbc02d'}}>Kuittaa valitut</button>
                                    </div>
                                    <div>
                                        <ul>
                                            {temp.requests.map((req, index) => (
                                                <li key={index}>
                                                    <div style={{marginTop:'1rem'}}>
                                                        <Grid container spacing={3}>
                                                            <Grid item xs={9}>
                                                                <div>
                                                                    <label className="brand-text">
                                                                        <input type="checkbox" className='yellow-checkbox' checked={req.checked} onChange={(event) => handleChange(event, temp, req)}/>
                                                                        <span className="margin-bottom">{req.task_desc}</span>
                                                                        <div className="small-margin-left font-13" style={{marginLeft:'3rem'}}>{req.req_text}</div>
                                                                    </label>
                                                                </div>
                                                            </Grid>
                                                            <Grid item xs={3}>
                                                                <button className='btn-small grey' onClick={(event) => handleReject(req)}>Hylkää</button>
                                                            </Grid>
                                                        </Grid>
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </form>
                            </div>
                        </li>
                    : null)) : null} 
                </ul>
            </div>
        </>
    )
}

export default Requests;