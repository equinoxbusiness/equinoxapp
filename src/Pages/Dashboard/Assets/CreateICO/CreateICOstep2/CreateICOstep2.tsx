import {useState} from 'react';
import './CreateICOstep2.scss';
import { getWeb3 } from '../../../../../helpers/currentWalletHelper';
import MultiSig from "../../../../../Config/abis/MultiSigv2.json";
import Ico from "../../../../../Config/abis/EquinoxIco.json";
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { addIcoFormData } from '../../../../../redux/actions';
import WithFormField from '../../../../../components/WithFormField';
import { connect } from 'react-redux';
import axios from 'axios';
import { AwaitingApproval, MultiSignature, ContinuePay, GasError, DuplicateError } from '../../../../../components/modals';

const CreateICOStep2Schema = Yup.object().shape({
  start_date: Yup.date()
    .required('Required'),
  end_date: Yup.date()
    .required('Required'),
  offer_price: Yup.number().required('Required'),
  soft_cap: Yup.number().required('Required'),
  hard_cap: Yup.number().required('Required')
});

const CreateICOstep2 = (props: any) => {
  const {org, icoFormdata} = props;
  const [tokenAmount, setTokenAmount] = useState(10000);//amount of gtoken to sell in ico
  const [minBuy, setMinBuy] = useState(10); // min amount a uer should buy
  const [awaiting, setAwaiting] = useState(false);
  const [gasError, setGasError] = useState(false);
  let multiSigAddr:any; // multisig contract address
  let gTokenAddr: any;
  let account:any;
  let web3: any;
  const setInfo = async () => {
    web3 = await getWeb3();
    let accounts = await web3.eth.getAccounts();
    account = accounts[0];
    //multiSigAddr = localStorage.getItem(account);
    gTokenAddr = localStorage.getItem(`${account}-gtokne`);
    console.log('gtoken', gTokenAddr);
    if (!gTokenAddr) {
      gTokenAddr = "0x4c410fe56357e93f189FA489E6508f168d87A662";
    }
  }


  const deploy = async (values: any) => {
    setAwaiting(true);
    await setInfo();
    const startTime = new Date(values.start_date).getTime() / 1000;
    const endTime = new Date(values.end_date).getTime() / 1000;
    const rate = values.offer_price;
    const softCap = values.soft_cap;
    const hardCap = values.hard_cap;
    multiSigAddr = org?.org?.multisig_address;
    let icoContract: any = await new web3.eth.Contract(Ico.abi); 
    const dexAdd = "0x9Ac64Cc6e4415144C455BD8E4837Fea55603e5c3"; // fetch this address (in this file and in org.jsx file) form pages/Config/contracts.js
    await icoContract.deploy({
        data: Ico.bytecode,
        arguments:[gTokenAddr, multiSigAddr, startTime, endTime, rate.toString(), softCap, hardCap, dexAdd]
      })
      .send({from: account})
      .on('error', (err: any) => {
        console.log(err)
        setGasError(true);
      })
      .then( async (receipt: any) => {
          let icoAddr = receipt._address;
          const contract = await new web3.eth.Contract(MultiSig.abi, multiSigAddr);
          await contract.methods.submitProposal(1000, icoFormdata.supply, gTokenAddr, icoAddr).send({from: account})
            .on('error', (error: any) => {
              console.log(error);
              setGasError(true);
            })
            .then((result: any) => {
              console.log(result);
              setAwaiting(false);
              localStorage.setItem(`${account}-ico`, icoAddr);
              addIco(values);
              props.dispatch(addIcoFormData(values));
            });
          
          // await multiSigContract.methods.transferGtoken(tokenAmount, receipt._address)
          // .send({from: account})
          // .on('error', console.log)
          // .then((result: any) => {
          //   console.log('send token to ico', result);
          // })
      })  

  }

  const addIco = (values: any) => {
    if (props.org && props.org.project && props.org.project.length) {
      const skipFields: any = [];
      const formData: any = new FormData();
      formData.append('project_id', props.org.project[0].id);
      const data = {
        ...props.icoFormdata,
        ...values
      }
      for (const [key, value] of Object.entries(data)) {
        if (!skipFields.includes(key)) {
          formData.append(key, value);
        }
      }
      const gTokenAddr = localStorage.getItem(`${account}-ico`);
      formData.append('ico_address', gTokenAddr);
      
      axios.post(`${process.env.REACT_APP_API_URL}/add_ico`, formData)
        .then((res)=>{
          console.log(res);
          props.nextStep();
        });
    }
  }

  const handleBlur = (e: any, setFieldValue: any, values: any, setFieldError: any, setFieldTouched: any) => {
    if (!/^[0-9]+$/.test(values.soft_cap)) {
      setFieldTouched('soft_cap', 'true');
      setFieldError('soft_cap', 'Not an number');
    } else {
      setFieldValue('hard_cap', values.soft_cap*2)
    }
  }

  return (
    <div className="CreateICOstep2" data-testid="CreateICOstep2">
      <div className="container">
        <div className="inner_card ">
          <div className="w-100">
            <div className="row mb-4">
              <div className="col-md-3"></div>
              <div className="col-md-6">
                <p>CREATE ICO</p>
                <h2 className="fw-bolder">Step 2</h2>
              </div>
            </div>
            <div className="row">
              <div className="col-md-4"></div>
              <div className="col-md-4">
                <Formik
                  enableReinitialize={true}
                  initialValues={{
                    start_date: "",
                    end_date: "",
                    offer_price: "",
                    soft_cap: "",
                    hard_cap: ""
                  }}
                  validationSchema={CreateICOStep2Schema}
                  onSubmit={async (values) => {
                    console.log(values)
                    await new Promise((r) => setTimeout(r, 500));
                    deploy(values);
                  }}
                >
                  {({ isValid, values , errors, touched, setFieldValue, setFieldError, setFieldTouched}) => {
                    return (
                      <Form>
                        <WithFormField label="Start date" name="start_date" error={errors.start_date && touched.start_date} type="date" max={values.end_date}/>
                        <WithFormField label="End date" name="end_date" error={errors.end_date && touched.end_date} type="date" min={values.start_date}/>
                        <WithFormField label="Offer Price" name="offer_price" error={errors.offer_price && touched.offer_price} type="number"/>
                        <WithFormField label="Soft Cap" name="soft_cap" error={errors.soft_cap && touched.soft_cap} type="number" onBlur={(e: any)=>handleBlur(e, setFieldValue, values, setFieldError, setFieldTouched)}/>
                        <WithFormField label="Hard Cap" name="hard_cap" error={errors.hard_cap && touched.hard_cap} type="number" disabled={true}/>
                        <div className="text-end mb-4">
                          <button className="next_btn" type="submit">Deploy <i className="fa fa-sign-in ps-2" aria-hidden="true"></i></button>
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
      <AwaitingApproval open={awaiting} setOpen={setAwaiting} />
      <GasError open={gasError} setOpen={setGasError} />
    </div>
  )
}

const mapStateToProps = (state: any) => {
  return {
    org: state.org,
    icoFormdata: state.icoFormdata
  };
};

export default connect(mapStateToProps)(CreateICOstep2);
