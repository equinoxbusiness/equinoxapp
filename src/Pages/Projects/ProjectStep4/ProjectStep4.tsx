import React, {useEffect, useState} from 'react';
import './ProjectStep4.scss';
import { getWeb3 } from '../../../helpers/currentWalletHelper';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { addProjectFormData } from '../../../redux/actions';
import { connect } from "react-redux";
import WithFormField from '../../../components/WithFormField';

const ProjectStep4Schema = Yup.object().shape({
  token_name: Yup.string()
    .required('Required'),
  token_ticker: Yup.string()
    .required('Required'),
  fixed_supply: Yup.number().required('Required'),
  deployer_wallet_address_id: Yup.string().required('Required'),
});

const ProjectStep4 = (props:any) => {
  const { projectFormdata } = props;

  const [account, setAccount] = useState('');
  
  const setWallet = async () => {
    let web3:any = await getWeb3();
    let accounts = await web3.eth.getAccounts();
    setAccount(accounts[0])
  }

  useEffect(() => {
    setWallet();
  })

  const handleBlur = (e: any, setFieldValue: any, values: any, setFieldError: any, setFieldTouched: any) => {
    if (!/^[0-9]+$/.test(values.fixed_supply)) {
      setFieldTouched('fixed_supply', 'true');
      setFieldError('fixed_supply', 'Not an number');
    } else if (values.fixed_supply%1000000000 !== 0) {
      setFieldValue('fixed_supply', values.fixed_supply*1000000000)
    }
  }

  return (
  <div className="ProjectStep4" data-testid="ProjectStep4">
    <div className="container">
      <div className="inner_card ">
        <div className="w-100">
          <div className="row mb-4">
            <div className="col-md-3"></div>
            <div className="col-md-6">
              <p>PROJECT LAUNCHER</p>
              <h2>STEP 4</h2>
              <p className="text-primary">
                Create Governance Token
              </p>
            </div>
          </div>
          <div className="row">
            <div className="col-md-4"></div>
            <div className="col-md-4">
              <Formik
                enableReinitialize={true}
                initialValues={{
                  deployer_wallet_address_id: account,
                  token_name: projectFormdata?.token_name,
                  token_ticker: projectFormdata?.token_ticker,
                  fixed_supply: projectFormdata?.fixed_supply
                }}
                validationSchema={ProjectStep4Schema}
                onSubmit={async (values) => {
                  await new Promise((r) => setTimeout(r, 500));
                  props.dispatch(addProjectFormData(values));
                  props.nextStep();
                }}
              >
                {({ isValid, errors, touched, setFieldValue, values, setFieldError, setFieldTouched }) => (
                  <Form>
                    <WithFormField label="Deployer Address" name="deployer_wallet_address_id" error={errors.deployer_wallet_address_id && touched.deployer_wallet_address_id} disabled={true}/>
                    <WithFormField label="Token Name" name="token_name" error={errors.token_name && touched.token_name}/>
                    <WithFormField label="Token Ticker" name="token_ticker" error={errors.token_ticker && touched.token_ticker}/>
                    <WithFormField label="Fixed Supply ( Add 9 decimals after your total supply, as contract is 9 decimals )" name="fixed_supply" error={errors.fixed_supply && touched.fixed_supply} type="number"/>
                    <div className="float-start">
                      <button className="next_btn" type="button" onClick={()=>props.previousStep()}>Previuos</button>
                    </div>
                    <div className="float-end ">
                      <button className="next_btn" type="submit" disabled={!isValid}>Next</button>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
};

const mapStateToProps = (state: any) => {
  return {
    projectFormdata: state.projectFormdata
  };
};

export default connect(mapStateToProps)(ProjectStep4);
