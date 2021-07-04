import React, {useState, useEffect} from 'react';

const url = 'http://127.0.0.1:5000';

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


const fetchData = async (token) => {
    return fetch(url+'/data?token='+token.token, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })
    .then(data => data.json())
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

export default {loginUser, deleteUser, fetchData, useWindowSize};