import React, {useState, useEffect} from 'react';

const url = 'http://127.0.0.1:5000';
//const url = 'https://fuksipassi-react.herokuapp.com';

const loginUser = async (creds) => {
    return fetch(url+'/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(creds)
    })
    .then(data => data.json())
};

const deleteUser = async (user) => {
    return fetch(url+'/signout', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user)
    })
    .then(data => data.json())
}


const fetchTasks = async (user) => {
  return fetch(url+'/tasks?jarj_id='+user.id_jarj, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  .then(data => data.json())
}


const updateTasks = async (tasks) => {  
  return fetch(url+'/update_tasks', {
    method: 'POST',
    headers : {
      'Content-Type': 'application/json',
    },
    body : JSON.stringify(tasks)
  })
  .then(data => data.json())
}

const createTask = async (task) => {
  return fetch(url+'/create_task', {
    method: 'POST',
    headers : {
      'Content-Type': 'application/json',
    },
    body : JSON.stringify(task)
  })
  .then(data => data.json())
}

const deleteTask = async (task) => {
  fetch(url+'/delete_task', {
    method: 'POST',
    headers : {
      'Content-Type': 'application/json',
    },
    body : JSON.stringify(task)
  })
}

const createRequest = async (task, user, msg) => {
  let temp = {};
  temp['task'] = task.id;
  temp['user'] = user.user_id;
  temp['jarj'] = user.id_jarj;
  temp['message'] = msg;
  return fetch(url+'/create_request', {
    method: 'POST',
    headers : {
      'Content-Type': 'application/json',
    },
    body : JSON.stringify(temp)
  })
  .then(data => data.json())
}


const approveRequests = async (user, requests) => {
  let temp = {};
  temp['requests'] = requests;
  temp['user_id'] = user.user_id;
  fetch(url+'/approve_requests', {
    method: 'POST',
    headers : {
      'Content-Type': 'application/json',
    },
    body : JSON.stringify(temp)
  })
}


const deleteRequest = async (req) => {
  let temp = {};
  temp['request_id'] = req.request_id;
  fetch(url+'/delete_request', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body : JSON.stringify(temp)
  })
}

const fetchUsers = async (user) => {
  let temp = {};
  temp['jarj_id'] = user.id_jarj;
  return fetch(url+'/setup_users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(temp)
  })
  .then(data => data.json())
}

const fetchSetupData = async (user) => {
  return fetch(url+'/data_setup', {
    method: 'POST',
    headers : {
      'Content-Type': 'application/json',
    },
    body : JSON.stringify(user)
  })
  .then(data => data.json())
}

const fetchData = async (user) => {
    return fetch(url+'/data?token='+user.user_id, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })
    .then(data => data.json())
}


const parseName = (useremail) => {
  let temp = useremail.split('@')[0];
  if (temp.includes('.')) {
    let firstName = temp.slice(0, temp.indexOf('.'));
    firstName = firstName.charAt(0).toUpperCase() + firstName.slice(1);
    let lastName = temp.slice(temp.lastIndexOf('.')+1, temp.length);
    lastName = lastName.charAt(0).toUpperCase() + lastName.slice(1);
    return firstName + ' ' + lastName;
  }
  return temp;
}


// Hook
const useWindowSize = () => {
    // Initialize state with undefined width/height so server and client renders match
    // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
    const [windowSize, setWindowSize] = useState({
      width: undefined,
      height: undefined,
    });
  
    useEffect(() => {
      // Handler to call on window resize
      function handleResize() {
        // Set window width/height to state
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      }
  
      // Add event listener
      window.addEventListener("resize", handleResize);
  
      // Call handler right away so state gets updated with initial window size
      handleResize();
  
      // Remove event listener on cleanup
      return () => window.removeEventListener("resize", handleResize);
    }, []); // Empty array ensures that effect is only run on mount
  
    return windowSize;
}

export default {loginUser, deleteUser, fetchData, useWindowSize, fetchTasks, updateTasks, createTask, deleteTask, createRequest, fetchSetupData, approveRequests, deleteRequest, fetchUsers, parseName};