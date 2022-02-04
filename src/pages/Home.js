import React from 'react';
import Navbar from '../comp2/navbar';
import BarChart  from '../comp2/barchart';
function Home() {
  return (
    <>
    <Navbar />
    <div className='home'>
 <center><h1 style={{color:"white"}}>DASHBOARD</h1></center>
 <BarChart/>
 
    </div>

    
    </>
  );
}

export default Home;