import React from 'react';
import Container1 from './Container1';
import Container2 from './Container2';
import Container3 from './Container3';
import Navbar from './Navbar';

const Home = () => {
  return (
    <>
      <Navbar />
      <div className='container-fluid'>
        <div className='d-flex' style={{ height: '100vh' }}>
          {/* Left Column - Container1 */}
          <div 
            className='col-lg-3 col-md-4 d-none d-sm-block' 
            style={{ overflowY: 'auto', padding: '0 5px' }}
          >
            <Container1 />
          </div>

          {/* Middle Column - Container2 */}
          <div 
            className='col-lg-6 col-md-8 col-sm-7 col-12' 
            style={{ overflowY: 'auto', padding: '0 5px' }}
          >
            <Container2 />
          </div>

          {/* Right Column - Container3 */}
          <div 
            className='col-lg-3 d-none d-lg-block' 
            style={{ overflowY: 'auto', padding: '0 5px' }}
          >
            <Container3 />
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
