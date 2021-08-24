import React from 'react';
import { ChevronDoubleRightIcon } from "@heroicons/react/outline";
import './style.css'
// import tw from '../../assets/tw.png';

const Footer = () => {
    return(
        <footer
        className="text-xs font-bold text-white text-gray-700  grid  mt-36 md:grid-cols-3  xs-grid-cols-1 gap-4  py-6">
          <div className="flex mx-w-md">
            <span className="my-auto font-extrabold font-14 ml-0">COPYRIGHT &#169; 2021 EQUINOXAPP BUSINESS</span>
          </div>
          <div className="flex mx-w-md  text-center ">
             <span className="my-auto  font-extrabold font-14">COPYRIGHT &#169; 2021 EQUINOXAPP BUSINESS <span className="my-auto  font-extrabold  font-20 text-gray-100">name@youmail.com</span></span>
          </div>
          <div className=" flex mx-w-md  justify-end ">
            <div className="" style={{wordWrap: 'break-word'}}>
             <span className="my-auto font-extrabold font-14 ">SUBSCRIBE</span>
             <ChevronDoubleRightIcon className="h-6 inline-block my-auto font-extrabold" aria-hidden="true" />
             <div className="inline-block">
                 <div className="footer-ico">
                   <a href="#"><i className="fa fa-twitter fa-2x"></i></a>
                 </div>
                 <div className="footer-ico">
                   <a href="#"><i className="fa fa-paper-plane-o fa-2x"></i></a>
                 </div>
                 <div className="footer-ico">
                   <a href="#"><i className="fa fa-at fa-2x"></i></a>
                 </div>
                 <div className="footer-ico">
                   <a href="#"><i className="fa fa-github  fa-2x"></i></a>
                 </div>
             </div>
             </div>
          </div>
        </footer>
        
    )
}

export default Footer;