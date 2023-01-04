import React from 'react';
import { MDBFooter, MDBContainer, MDBRow, MDBCol, MDBIcon } from 'mdb-react-ui-kit';

export default function Waad() {
  return (
    <MDBFooter style={{position:"absolute",
        left:"0",
        bottom:"0",
        right:"0",}} bgColor='light' className='text-center text-lg-start text-black'>
      <div className='text-center p-4' style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}>
         <a className='text-reset fw-bold' href='https://giphy.com/gifs/hacktiv8-code-error-laptop-Ll22OhMLAlVDb8UQWe/fullscreen'>
        ARCANE 
        </a>
      </div>
    </MDBFooter>
  );
}