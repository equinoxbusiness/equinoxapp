import React from 'react';
import './style.css';

const Card = () =>{
    return(
        <div className="max-w-sm  py-12 px-12 card shadow-lg rounded  align-middle">
            <div className="text-xs text-white py-1">Community driven business initialive</div>
            <div className="text-white text-2xl font-bold card-title">There are lot more you can do</div>
            <button className="text-white  card-btn text-xs font-bold py-1 px-2 rounded">CREATE ORGANISATION</button>
            {/* bg-gradient-to-r from-red-500 to-yellow-500 */}
        </div>
    )
}


export default Card;