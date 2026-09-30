// src/components/Footer/LegalModals.jsx
import { useState } from "react";
import { Overlay } from "../Overlay";
import Datenschutz from "./Datenschutz";
import Impressum from "./Impressum";

const LegalModals = () => {
  const [openDS, setOpenDS] = useState(false);
  const [openImp, setOpenImp] = useState(false);

  return (
    <>
      <li className="laws-item" onClick={() => setOpenDS(true)}>
        <span className="laws-p">Datenschutz</span>
      </li>
      <li className="laws-item" onClick={() => setOpenImp(true)}>
        <span className="laws-p">Impressum</span>
      </li>
      {openDS && (
        <Overlay handleClose={() => setOpenDS(false)}>
          <Datenschutz />
        </Overlay>
      )}
      {openImp && (
        <Overlay handleClose={() => setOpenImp(false)}>
          <Impressum />
        </Overlay>
      )}
    </>
  );
};

export default LegalModals;
