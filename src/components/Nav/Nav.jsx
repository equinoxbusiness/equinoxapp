import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import Logo from "../../assets/images/equinox_logo.png";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdClose } from "react-icons/io";
import Accountmodal from "../header/Accountmodal";

// const Nav = () => {
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [isChecked, setIsChecked] = useState(false);
//   return (
//     <nav id="navbar">
//       <div className="logo">
//         <Link to="/">
//           <img src={Logo} alt="company name" />{" "}
//         </Link>
//       </div>
//       <div className="mobile">
//         <GiHamburgerMenu
//           className="hamburger"
//           onClick={() => setMenuOpen(!menuOpen)}
//         />

//         <div className={`overlay ${menuOpen ? "active" : ""}`}>
//           <ul className="menu-item">
//             <li>
//               <Link to="/">Home</Link>
//             </li>
//             <li>
//               <Link to="/buy-eqx">Buy EQX</Link>
//             </li>
//             <li>
//               <Link to="/enterprice-dex">Enterprise DEX</Link>
//             </li>
//             <li>
//               <Link to="/access-org">Access ORG 3.0</Link>
//             </li>
//             <li>
//               <Link to="/about-eqx">About EQX</Link>
//             </li>
//             <li>
//               {/* <div className="button-switch ml-30">
//                 <input
//                   type="checkbox"
//                   id="switch-blue-mobile"
//                   className="switch"
//                   checked={isChecked}
//                   onChange={() => setIsChecked(!isChecked)}
//                 />
//                 <label htmlFor="switch-blue-mobile" className="lbl-off">
//                   Off&nbsp;Wallet
//                 </label>
//                 <label htmlFor="switch-blue-mobile" className="lbl-on">
//                   On&nbsp;Wallet
//                 </label>
//               </div> */}
//             </li>
//           </ul>
//         </div>
//       </div>
//       <ul className="desktop">
//         <li>
//           <Link to="/">Home</Link>
//         </li>
//         <li>
//           <Link to="/buy-eqx">Buy EQX</Link>
//         </li>
//         <li>
//           <Link to="/enterprice-dex">Enterprise DEX</Link>
//         </li>
//         <li>
//           <Link to="/access-org">Access ORG 3.0</Link>
//         </li>
//         <li>
//           <Link to="/about-eqx">About EQX</Link>
//         </li>
//       </ul>
//       <Accountmodal/>
//       {/* <div className="button-switch desktop">
//         <input
//           type="checkbox"
//           id="switch-blue"
//           className="switch"
//           checked={isChecked}
//           // defaultChecked
//           onChange={() => setIsChecked(!isChecked)}
//         />
//         <label htmlFor="switch-blue" className="lbl-off">
//           Off&nbsp;Wallet
//         </label>
//         <label htmlFor="switch-blue" className="lbl-on">
//           On&nbsp;Wallet
//         </label>
//       </div> */}
//     </nav>
//   );
// };

// export default Nav;

const Nav = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  // const [isChecked, setIsChecked] = useState(false);

  const menuRef = useRef(null);

  useEffect(() => {
    document.addEventListener("click", handleClick, true);
    return () => {
      document.removeEventListener("click", handleClick, true);
    };
  }, [menuRef]);

  const handleClick = (e) => {
    if (menuRef.current && !menuRef.current.contains(e.target)) {
      setMenuOpen(false);
    }
  };

  return (
    <nav id="navbar">
      <div className="logo">
        <Link to="/">
          <img src={Logo} alt="company name" />{" "}
          {/* <span>company {isChecked ? "name" : ""}</span> */}
        </Link>
      </div>
      <div className="mobile">
        <GiHamburgerMenu
          className="hamburger"
          onClick={() => setMenuOpen(true)}
        />

        <div ref={menuRef} className={`overlay ${menuOpen ? "active" : ""}`}>
          <div className="closeBtn">
            <IoMdClose onClick={() => setMenuOpen(false)} />
          </div>
          <ul className="menu-item">
            <li onClick={() => setMenuOpen(false)}>
              <Link to="/">Home</Link>
            </li>
            {/*<li onClick={() => setMenuOpen(false)}>
              <Link to="/buy-eqx">Buy EQX</Link>
            </li>*/}
            <li onClick={() => setMenuOpen(false)}>
              <Link to="/enterprice-dex">Enterprise DEX</Link>
            </li>
            <li onClick={() => setMenuOpen(false)}>
              <Link to="/access-org">Access ORG 3.0</Link>
            </li>
            <li onClick={() => setMenuOpen(false)}>
              <Link to="/icos">ICOs</Link>
            </li>
            <li onClick={() => setMenuOpen(false)}>
              <Link to="/buy-icos">Buy ICOs</Link>
            </li>
            <li onClick={() => setMenuOpen(false)}>
              <a href="https://equinox.business/" target="_blank">
                About EQX
              </a>
            </li>
            <li>
              <Accountmodal mobile={true} />
            </li>
          </ul>
        </div>
      </div>
      <ul className="desktop my-auto">
        <li>
          <Link to="/">Home</Link>
        </li>
        {/*<li>
          <Link to="/buy-eqx">Buy EQX</Link>
        </li>*/}
        <li>
          <Link to="/enterprice-dex">Enterprise DEX</Link>
        </li>
        <li>
          <Link to="/access-org">Access ORG 3.0</Link>
        </li>
        <li>
          <Link to="/icos">ICOs</Link>
        </li>
        <li>
          <Link to="/buy-icos">Buy ICOs</Link>
        </li>
        <li>
          <a href="https://equinox.business/" target="_blank">
            About EQX
          </a>
        </li>
      </ul>
      <Accountmodal mobile={false} />
      {/* <div className="button-switch desktop">
        <input
          type="checkbox"
          id="switch-blue"
          className="switch"
          checked={isChecked}
          // defaultChecked
          onChange={() => setIsChecked(!isChecked)}
        />
        <label htmlFor="switch-blue" className="lbl-off">
          Off&nbsp;Wallet
        </label>
        <label htmlFor="switch-blue" className="lbl-on">
          On&nbsp;Wallet
        </label>
      </div> */}
    </nav>
  );
};

export default Nav;
