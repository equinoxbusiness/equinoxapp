import React, { useState } from 'react';
import './AddMembers.scss';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import WithFormField from '../../../../components/WithFormField';
import { connect } from 'react-redux';
import axios from 'axios';
import { getWeb3 } from '../../../../helpers/currentWalletHelper';
import MultiSig from '../../../../Config/abis/MultiSigv2.json';
import { withRouter } from 'react-router';
import { CommonModal } from '../../../../components/modals';

const AddMemberSchema = Yup.object().shape({
  member_name: Yup.string()
    .required('Required'),
  member_wallet_address: Yup.string()
    .required('Required'),
  member_email: Yup.string()
    .required('Required')
    .email('Invalid email')
});

const AddMembers = (props:any) => {
  const {org, history} = props;

  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('Member Added Successfully');

  const addMember = async (values: any) => {
    const web3: any = await getWeb3();
    const multiSigAddr = org?.org?.multisig_address;
    const accounts = await web3.eth.getAccounts();
    const account = accounts[0];
    const contract = await new web3.eth.Contract(MultiSig.abi, multiSigAddr);
    await contract.methods.addMember(values.member_wallet_address).send({from: account})
      .on('error', (error: any) => console.log(error))
      .then((result: any) => {
        setOpen(true);
        const formData = values;
        formData.org_id = org?.org?.id;
        axios.post(`${process.env.REACT_APP_API_URL}/add_member`, formData)
        .then((res)=>{
          history.push('/dashboard/members/membercreated');
        })
        .catch(err=>{
        });
      });
  }
  return (
    <div className="AddMembers" data-testid="AddMembers">
      <div className="container">
        <div className="inner_card ">
          <div className="w-100">
            <div className="row mb-4">
              <div className="col-md-3"></div>
              <div className="col-md-6">
                <h2 className="fw-bolder">Add MultiSig Member</h2>
                <p className="font14 fw-bold color_s">
                MultiSig Members are ORG 3.0's core team members and weild equal rights for it's operations and in decision making. Member's may inititate the addition and removal instance. It needs appraval of more than 50% members for its success.
                </p>
              </div>
            </div>
            <div className="row">
              <div className="col-md-4"></div>
              <div className="col-md-4">
                <Formik
                  enableReinitialize={true}
                  initialValues={{
                    member_name: "",
                    member_wallet_address: "",
                    member_email: ""
                  }}
                  validationSchema={AddMemberSchema}
                  onSubmit={async (values) => {
                    await new Promise((r) => setTimeout(r, 500));
                    addMember(values);
                  }}
                >
                  {({ isValid, values , errors, touched}) => {
                    return (
                      <Form>
                        <WithFormField label="Wallet" name="member_wallet_address" error={errors.member_wallet_address && touched.member_wallet_address}/>
                        <WithFormField label="Full Name" name="member_name" error={errors.member_name && touched.member_name}/>
                        <WithFormField label="Email Address" name="member_email" error={errors.member_email && touched.member_email}/>
                        <p className="font12 fw-bold color_s">New Member will get an email link for updating further profile</p>
                        <div className="text-end mb-4">
                          <button className="next_btn" type="submit">ADD <i className="fa fa-sign-in ps-2" aria-hidden="true"></i></button>
                        </div>
                      </Form>
                    )}
                  }
                </Formik>
              </div>
            </div>
          </div>
        </div>
      </div>
      <CommonModal message={message} note='Please be patient till the transaction completes' note_bracket='( Do not close the tab or refresh the page )' open={open} setOpen={setOpen}/>
    </div>
  )
};

const mapStateToProps = (state: any) => {
  return {
    org: state.org
  };
};

export default connect(mapStateToProps)(withRouter(AddMembers));
