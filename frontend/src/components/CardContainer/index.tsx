import React from 'react';
import './style.css';

const CardContainer = () =>{
    return(
        <div className="px-8 py-24  ">
            <div className="flex  overflow-x-auto  no-scrollbar overscroll-auto card-big-screen" >
                <div className="flex-none max-w-md max-w-xs inline-block hover:shadow-xl py-12 px-12 my-2 mx-2 card1 shadow-lg rounded-lg  align-middle ">
                    <div className="font-18 text-white py-1">Community driven business initialive</div>
                    <div className="text-white font-36 font-bold card-title">There are lot more you can do <span className="text-yellow-400">onchain</span></div>
                    <button className="text-white  card-btn1  font-semibold py-1 px-2 rounded font-18">CREATE ORGANISATION</button>
                </div>

                <div className="flex-none max-w-md inline-block hover:shadow-xl py-12 px-12 my-2 mx-2 card2 shadow-lg rounded-lg  align-middle ">
                    <div className="font-18 text-white py-1">Manage projects, transparantly</div>
                    <div className="text-white font-36 font-bold card-title">Extending <span className="text-yellow-400">DAO</span> based Governence structure</div>
                    <button className="text-white  card-btn2  font-semibold py-1 px-3 rounded font-18">CREATE ORGANISATION</button>
                </div>

                <div className="flex-none max-w-md inline-block hover:shadow-xl  py-12 px-12 my-2 mx-2 card3 shadow-lg rounded-lg  align-middle ">
                    <div className="font-18 text-white py-1">Tokanized decision making</div>
                    <div className="text-white font-36 font-bold card-title">A decisive with design <span className="text-gray-900">operation</span></div>
                    <button className="text-white  card-btn3  font-semibold py-1 px-3 rounded font-18">CREATE ORGANISATION</button>
                </div>

                <div className="flex-none max-w-md inline-block hover:shadow-xl py-12 px-12 my-2 mx-2 card4 shadow-lg rounded-lg  align-middle ">
                    <div className="font-18 text-white py-1">Create, import, Buy, Sell and put on Trade</div>
                    <div className="text-white font-36 font-bold card-title">All <span className="text-blue-200">powerful</span> governence tokens</div>
                    <button className="text-white  card-btn2  font-semibold py-1 px-3 rounded font-18">CREATE ORGANISATION</button>
                </div>

                <div className="flex-none max-w-md inline-block hover:shadow-xl  py-12 px-12 my-2 mx-2 card5 shadow-lg rounded-lg  align-middle ">
                    <div className="font-18 text-white py-1">Access web applications to manage projects</div>
                    <div className="text-white font-36 font-bold card-title">Tools to <span className="text-gray-800">manage</span> onchain projects</div>
                    <button className="text-white  card-btn3  font-semibold py-1 px-3 rounded font-18">CREATE ORGANISATION</button>
                </div>
            </div>

            <div className="card-mobile-screen">
                <div className="object-fill inline-block hover:shadow-xl py-12 px-12 my-2 mx-2 card4 shadow-lg rounded-lg  align-middle ">
                    <div className="font-18 text-white py-1">Create, import, Buy, Sell and put on Trade</div>
                    <div className="text-white font-36 font-bold card-title">All <span className="text-blue-200">powerful</span> governence tokens</div>
                    <button className="text-white  card-btn2  font-semibold py-1 px-3 rounded font-18">CREATE ORGANISATION</button>
                </div>

                <div className="object-fill inline-block hover:shadow-xl  py-12 px-12 my-2 mx-2 card5 shadow-lg rounded-lg  align-middle ">
                    <div className="font-18 text-white py-1">Access web applications to manage projects</div>
                    <div className="text-white font-36 font-bold card-title">Tools to <span className="text-gray-800">manage</span> onchain projects</div>
                    <button className="text-white  card-btn3  font-semibold py-1 px-3 rounded font-18">CREATE ORGANISATION</button>
                </div>

                <div className="object-fill  inline-block hover:shadow-xl  py-12 px-12 my-2 mx-2 card3 shadow-lg rounded-lg  align-middle ">
                    <div className="font-18 text-white py-1">Tokanized decision making</div>
                    <div className="text-white font-36 font-bold card-title">A decisive with design <span className="text-gray-900">operation</span></div>
                    <button className="text-white  card-btn3  font-semibold py-1 px-3 rounded font-18">CREATE ORGANISATION</button>
                </div>

                <div className="object-fill  inline-block hover:shadow-xl py-12 px-12 my-2 mx-2 card4 shadow-lg rounded-lg  align-middle ">
                    <div className="font-18 text-white py-1">Create, import, Buy, Sell and put on Trade</div>
                    <div className="text-white font-36 font-bold card-title">All <span className="text-blue-200">powerful</span> governence tokens</div>
                    <button className="text-white  card-btn2  font-semibold py-1 px-3 rounded font-18">CREATE ORGANISATION</button>
                </div>

                <div className="object-fill inline-block hover:shadow-xl  py-12 px-12 my-2 mx-2 card5 shadow-lg rounded-lg  align-middle ">
                    <div className="font-18 text-white py-1">Access web applications to manage projects</div>
                    <div className="text-white font-36 font-bold card-title">Tools to <span className="text-gray-800">manage</span> onchain projects</div>
                    <button className="text-white  card-btn3  font-semibold py-1 px-3 rounded font-18">CREATE ORGANISATION</button>
                </div>
            </div>
        </div>
    )
}


export default CardContainer;