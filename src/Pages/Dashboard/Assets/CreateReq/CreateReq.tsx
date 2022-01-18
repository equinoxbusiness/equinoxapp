import React from 'react';
import StepWizard from 'react-step-wizard';
import './CreateReq.scss';
import CreateReqStep1 from './CreateReqStep1/CreateReqStep1';
import CreateReqStep2 from './CreateReqStep2/CreateReqStep2';

const CreateReq = () => (
  <div className="CreateReq" data-testid="CreateReq">
    <StepWizard>
      <CreateReqStep1 />
      <CreateReqStep2 />
    </StepWizard>
  </div>
);

export default CreateReq;
