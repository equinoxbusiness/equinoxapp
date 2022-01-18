import { useEffect, useRef } from "react";
import "./style.css";
import Logo from "../../assets/favicon@2x.png";
const GToken = ({ open, setOpen }) => {
  const modalRef = useRef();

  useEffect(() => {
    const handler = (e) => {
      if (!modalRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className={`custom-modal approval   ${open ? "active" : ""} font-poppins`}
    >
      <div className="custom-modal-content-wrapper">
        <div className="container">
          <div className="custom-modal-wrapper text-center" ref={modalRef}>
            <div className="mb-2 text-start">
              <img src={Logo} alt="" className="w-10 logo_icon" />
            </div>
            <h1 className="font-semibold text-dark mb-2">G-Token contract is successfully created</h1>
            <p className="text-lg text-black md:mx-20  font-medium">
                Check the transaction & contract address
            </p>
            <p className="text-black text-sm font-normal my-4 font-12">
                Check the transaction & contract address
            </p>
            <div className="inform-btn">
              <button
                className="py-2.5 px-12 ok_btn rounded-full bg-blue-500"
                onClick={() => setOpen(false)}
              >
                Ok
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GToken;
