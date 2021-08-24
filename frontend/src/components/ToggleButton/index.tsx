import React from 'react';
import './style.css';

const ToggleButton = () =>{
    return(
        <div>
            <div className="toggleBtn">
               <div className="chkContainer">
                  <input type="checkbox" className="chk"/>
                  
                  <label className="chkLbl"></label>
               </div>
            </div>
        </div>
    )
}


export default ToggleButton;