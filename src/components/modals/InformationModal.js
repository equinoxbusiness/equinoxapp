import { useEffect, useRef } from "react";
import "./style.css";
import Logo from "../../assets/favicon@2x.png";
const GasError = ({ open, setOpen, title, desc, desc2 }) => {
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
      className={`custom-modal gas-error   ${
        open ? "active" : ""
      } font-poppins`}
    >
      <div className="custom-modal-content-wrapper">
        <div className="container">
          <div className="custom-modal-wrapper text-center" ref={modalRef}>
            <div className="mb-2">
              <img src={Logo} alt="" className="w-10" />
            </div>
            <h1 className="font-semibold mb-2">{title}</h1>
            <p className="text-lg text-black md:mx-20  font-medium">{desc}</p>
            <p className="text-black text-sm font-normal my-4">{desc2}</p>
            <div className="inform-btn">
              <button
                className="py-2.5 px-12  rounded-full bg-blue-500"
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

export default GasError;
