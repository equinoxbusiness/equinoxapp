import React from 'react';
import './CreateICO.scss';
import { Route, Routes } from 'react-router';
import StepWizard from "react-step-wizard";
import CreateICOstep1 from './CreateICOstep1/CreateICOstep1';
import CreateICOstep2 from './CreateICOstep2/CreateICOstep2';
import CreateICOstep3 from './CreateICOstep3/CreateICOstep3';

const CreateICO = () => (
  <div className="CreateICO" data-testid="CreateICO">
    <StepWizard>
      <CreateICOstep1 />
      <CreateICOstep2 />
      <CreateICOstep3 />
    </StepWizard>
  </div>
);

export default CreateICO;
