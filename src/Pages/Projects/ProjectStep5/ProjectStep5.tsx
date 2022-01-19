import React, {useState, useEffect} from 'react';
import { getWeb3 } from '../../../helpers/currentWalletHelper';
import './ProjectStep5.scss';
import { Field } from 'formik';
import MultiSig from "../../../Config/abis/MultiSigv2.json";
import GToken from "../../../Config/abis/GToken.json";
import Eq from "../../../Config/abis/EquinoxToken.json";
import { connect } from "react-redux";
import axios from 'axios';
import { authereum } from 'web3modal/dist/providers/connectors';
import { AwaitingApproval, GToken as GTokenModel, ContinuePay, GasError } from '../../../components/modals';
import { getProjects } from '../../../services/dashboard';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { addProjectFormData } from '../../../redux/actions';

const ProjectStep5Schema = Yup.object().shape({
  token_logo: Yup.mixed()
  .required('Required'),
  whitepaper: Yup.mixed()
    .required('Required'),
  incorporation: Yup.mixed(),
  other_doc: Yup.mixed()
});

const ProjectStep5 = (props: any) => {

  const [decimal, setDecimal] = useState(9); 
  const [amount, setAmount] = useState("100000000000000000000");
  const eqxAdd = "0x54040960e09fb9f1dd533d4465505ba558693ad6";
  const [awaiting, setAwaiting] = useState(false);
  const [gTokenModel, setGTokenModel] = useState(false);
  const [pay, setPay] = useState(false);
  const [gasError, setGasError] = useState(false);
  const deploy = async (values: any) => {
    setAwaiting(true);
    let web3: any = await getWeb3();
    let contract: any = new web3.eth.Contract(GToken.abi, eqxAdd);
    let accounts = await web3.eth.getAccounts();
    let multiSig = localStorage.getItem(accounts[0]);
    await contract.deploy({
      data:GToken.bytecode,
      arguments:[props.projectFormdata?.token_name, props.projectFormdata?.token_ticker, decimal, props.projectFormdata?.fixed_supply*1000000000, accounts[0], props.org.org.multisig_address]
    })
    .send({from: accounts[0]})
    .on('error', (err: any)=>{
      console.log(err);
      setAwaiting(false);
      setGasError(true);
    })
    .then(async (receipt: any) =>{
      localStorage.setItem(`${accounts[0]}-gtokne`, receipt._address);
      let GTokenIns = new web3.eth.Contract(GToken.abi, receipt._address);
      let balance = await GTokenIns.methods.balanceOf(accounts[0]).call();
      setAwaiting(false);
      setPay(true);
      await GTokenIns.methods.transfer(props.org.org.multisig_address, balance).send({from: accounts[0]})
        .on('error', (err: any)=>{
          setPay(false);
          setGasError(true);
        })
        .then((receipt: any) => {
          setPay(false);
          setGTokenModel(true);
          console.log(receipt) // send to next step
          addProject(values);
        })
    })

  }

  const addProject = async (values: any) => {
    if (props.auth && props.auth.org_id) {
      const skipFields: any = [];
      const formData: any = new FormData();
      formData.append('org_id', props.auth.org_id);
      formData.append('whitepaper', values.whitepaper);
      formData.append('incorporation', values.incorporation);
      formData.append('other_doc', values.other_doc);
      for (const [key, value] of Object.entries(props.projectFormdata)) {
        if (!skipFields.includes(key)) {
          formData.append(key, value);
        }
      }
      let web3: any = await getWeb3();
      let accounts = await web3.eth.getAccounts();
      const gTokenAddr = localStorage.getItem(`${accounts[0]}-gtokne`);
      formData.append('gtoken_address', gTokenAddr);
      
      axios.post(`${process.env.REACT_APP_API_URL}/add_project`, formData)
        .then((res)=>{
          getProjects(res.data.project_id);
          props.nextStep();
        });
    }
  }

  return (
    <div className="ProjectStep5" data-testid="ProjectStep5">
      <div className="container">
        <div className="inner_card ">
          <div className="w-100">
            <div className="row mb-4">
              <div className="col-md-3"></div>
              <div className="col-md-6">
                <p>PROJECT LAUNCHER</p>
                <h2>STEP 5</h2>
                <p className="text-primary">
                  Upload Docs
                </p>
              </div>
            </div>
            <div className="row">
              <div className="col-md-4"></div>
              <div className="col-md-4">
                <Formik
                  enableReinitialize={true}
                  initialValues={{
                    token_logo: "",
                    whitepaper: "",
                    incorporation: "",
                    other_doc: ""
                  }}
                  validationSchema={ProjectStep5Schema}
                  onSubmit={async (values) => {
                    await new Promise((r) => setTimeout(r, 500));
                    props.dispatch(addProjectFormData(values));
                    deploy(values);
                  }}
                >
                  {({ isValid, errors, touched, setFieldValue, values, setFieldError, setFieldTouched }) => (
                    <Form>
                    <div className="with-form-field">
                      <div className="text-start">
                        <label htmlFor="token_logo" className="form-label" title="token_logo">Token Logo</label>
                      </div>
                      <input id="token_logo" name="token_logo" type="file" onChange={(event) => { setFieldValue("token_logo", event.currentTarget.files ? event.currentTarget.files[0] : ''); }} className="form-input bg-white" />
                    </div>
                    <div className="with-form-field">
                      <div className="text-start">
                        <label htmlFor="whitepaper" className="form-label" title="whitepaper">Whitepaper (Less than 2 MB, In PDF format)</label>
                      </div>
                      <input id="whitepaper" name="whitepaper" type="file" onChange={(event) => { setFieldValue("whitepaper", event.currentTarget.files ? event.currentTarget.files[0] : ''); }} className="form-input bg-white" />
                    </div>
                    <div className="with-form-field">
                      <div className="text-start">
                        <label htmlFor="incorporation" className="form-label" title="incorporation">Incorporation Certificate (If Applicable)</label>
                      </div>
                      <input id="incorporation" name="incorporation" type="file" onChange={(event) => { setFieldValue("incorporation", event.currentTarget.files ? event.currentTarget.files[0] : ''); }} className="form-input bg-white" />
                    </div>
                    <div className="with-form-field">
                      <div className="text-start">
                        <label htmlFor="other_doc" className="form-label" title="other_doc">Other Doc (If any)</label>
                      </div>
                      <input id="other_doc" name="other_doc" type="file" onChange={(event) => { setFieldValue("other_doc", event.currentTarget.files ? event.currentTarget.files[0] : ''); }} className="form-input bg-white" />
                    </div>
                    <div className="float-start">
                      <button className="next_btn" type="button" onClick={()=>props.previousStep()}>Previuos</button>
                    </div>
                    <div className="float-end ">
                        <button className="next_btn" type="submit">DEPLOY</button>
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
      <AwaitingApproval open={awaiting} setOpen={setAwaiting} />
      <GasError open={gasError} setOpen={setGasError} />
      <ContinuePay open={pay} setOpen={setPay} />
      <GTokenModel open={gTokenModel} setOpen={setGTokenModel} />
    </div>
  )
}

const mapStateToProps = (state: any) => {
  return {
    account: state.account,
    projectFormdata: state.projectFormdata,
    auth: state.auth,
    org: state.org
  };
};

export default connect(mapStateToProps)(ProjectStep5);
