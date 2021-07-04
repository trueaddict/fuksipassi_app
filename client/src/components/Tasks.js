import React from 'react';

async function fetchData(token) {
    /*return {"login":"ok"};*/
    return fetch('http://127.0.0.1:5000/data', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(token)
    })
    .then(data => data.json())
  }

export default function Tasks({token}) {
    const data = fetchData(token.token);
    
    
    return (
        <div>
            
            <p>Etusivu</p>

        </div>
    )
}