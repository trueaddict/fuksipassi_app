import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';

export default function Header() {
    const size = useWindowSize();
    
    const direction = size.width <= 450 ? "column" : "row";

    return (
        <div className="nav">
            <Grid container spacing={3} direction={direction}>
                <Grid item xs>
                    <div className="center">
                        <a href="https://www.syrinx.fi"><img src="https://www.syrinx.fi/wp-content/uploads/2019/02/copy-syrinx_logoGreenBackgroundveryYellowWithText.png" alt="" class="responsive-img"/></a>
                    </div>
                </Grid>
                <Grid item xs >
                    <div className="center">
                        <a href="" class=""><h3 class="brand-text brand-logo">Syrinx Fuksipassi</h3></a>
                    </div>
                </Grid>
                <Grid item xs>
                    <p>Kolmas</p>
                </Grid>
            </Grid>
        </div>
    )
}

// Hook
function useWindowSize() {
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