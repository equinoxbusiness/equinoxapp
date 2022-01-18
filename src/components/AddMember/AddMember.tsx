import React from 'react';
import WithFormField from '../WithFormField';
import './AddMember.scss';

const AddMember: React.FC<any> = (props) => {
  const { index, memberErrors, memberTouched } = props;
  return (
    <div className="AddMember row" data-testid="AddMember">
      <div className="col-md-6">
        <WithFormField label={ `Wallet ${index+1}`} name={`members.${index}.wallet`} error={memberErrors.wallet && memberTouched.wallet}/>
      </div>
      <div className="col-md-3">
        <WithFormField label="Deployer's name" name={`members.${index}.name`} error={memberErrors.name && memberTouched.name}/>
      </div>
      <div className="col-md-3">
        <WithFormField label="Email ID" name={`members.${index}.email`} error={memberErrors.email && memberTouched.email}/>
      </div>
    </div>
  )
};

export default AddMember;
