import React from 'react';
import './ProposalStep3.scss';

const ProposalStep3 = () => (
  <div className="ProposalStep3" data-testid="ProposalStep3">
    <div className="finish_prosal">
      <h2 className="fw-bold">PROPOSAL SAVED</h2>
      <div className="d-flex justify-content-center">
        <button className="photo_cap_btn me-4" data-bs-dismiss="modal">CLOSE WINDOW</button>
        <button className="photo_cap_btn" data-bs-dismiss="modal">PUBLISH NOW</button>
      </div>
    </div>
  </div>
);

export default ProposalStep3;
