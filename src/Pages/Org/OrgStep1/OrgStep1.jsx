import React, { useState, useEffect } from 'react';
import './OrgStep1.scss';
import 'font-awesome/css/font-awesome.min.css';
import WithFormField from '../../../components/WithFormField';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { addOrgFormData } from '../../../redux/actions';
import { connect } from "react-redux";

const OrgStep1Schema = Yup.object().shape({
  wallet: Yup.string()
    .required('Required'),
  eqxBln: Yup.number()
    .required('Required')
    .test(
      'Enough Fund',
      'ERROR: required',
      (value) => value > 0
    ),
  deployer_name: Yup.string().required('Required'),
});

const OrgStep1 = (props) => {
  return (
    <div className="OrgStep1" data-testid="OrgStep1">
      <div className="container">
        <div className="inner_card ">
          <div className="w-100">
            <div className="row mb-4">
              <div className="col-md-3"></div>
              <div className="col-md-6">
                <p>ORG 3.0 LAUNCHPAD</p>
                <h2>CREATE ORG 3.0</h2>
                <p>
                  ORG 3.0 are 'Operations and resource group' on Binance Smart Chain. You must hold 100 EQX to deploy and access ORG 3.0 Ecosystem. Read <span className="text-primary">Docs</span> for requirements.
                </p>
              </div>
            </div>
            <div className="row">
              <div className="col-md-4"></div>
              <div className="col-md-4">
                <Formik
                  enableReinitialize={true}
                  initialValues={{
                    wallet: props.walletInfo.wallet,
                    eqxBln: props.walletInfo.eqxBln,
                    deployer_name: '',
                  }}
                  validationSchema={OrgStep1Schema}
                  onSubmit={async (values) => {
                    await new Promise((r) => setTimeout(r, 500));
                    props.dispatch(addOrgFormData(values));
                    props.nextStep();
                  }}
                >
                  {({ isValid, errors, touched }) => (
                    <Form>
                      <WithFormField label="Wallet" name="wallet" disabled={true} error={errors.wallet && touched.wallet} />
                      <WithFormField label="EQX Balance (Need to hold 100 EQX all the time)" name="eqxBln" disabled={true} error={errors.eqxBln && touched.eqxBln} />
                      <WithFormField label="Deployer's Full Name (You)" name="deployer_name" error={errors.deployer_name && touched.deployer_name} />
                      <div className="text-end ">
                        <button type="submit" className="next_btn" disabled={!isValid}>NEXT <i className="fa fa-sign-in ps-2" aria-hidden="true"></i></button>
                      </div>
                    </Form>
                  )}
                </Formik>
              </div>
            </div>
            <div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default connect()(OrgStep1);
