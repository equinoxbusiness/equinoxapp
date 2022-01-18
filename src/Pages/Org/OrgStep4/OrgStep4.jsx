import React, {useState, useEffect} from 'react';
import { getWeb3 } from '../../../helpers/currentWalletHelper';
import './OrgStep4.scss';
import MultiSig from "../../../Config/abis/MultiSigv2.json";
import GToken from "../../../Config/abis/GToken.json";
import Eq from "../../../Config/abis/EquinoxToken.json";
import AddMember from '../../../components/AddMember/AddMember';
import { connect } from "react-redux";
import * as Yup from 'yup';
import { addOrgFormData } from '../../../redux/actions';
import { Formik, Form, FieldArray } from 'formik';
import axios from 'axios';
import { AwaitingApproval, MultiSignature, ContinuePay, GasError, DuplicateError } from '../../../components/modals';
import { getMe } from '../../../services/dashboard';

const OrgStep4 = (props) => {

  const [wallets, setWallets] = useState([]);
  const [amount, setAmount] = useState("100000000000000000000");
  const eqxAdd = "0x54040960e09fb9f1dd533d4465505ba558693ad6"; // fetch this address (in this file and in org.jsx file) form pages/Config/contracts.js
  const [multiSigAdd, setMultiSigAdd] = useState("");
  const [members, addMember] = useState([{}, {}]);
  const [awaiting, setAwaiting] = useState(false);
  const [multiSign, setMultiSign] = useState(false);
  const [pay, setPay] = useState(false);
  const [gasError, setGasError] = useState(false);
  const [duplicate, setDuplicate] = useState(false);

  const OrgStep4Schema = Yup.object().shape({
    members: Yup.array().min(1).of(
      Yup.object().shape({
          wallet: Yup.string()
            .required('Wallet is required'),
          name: Yup.string()
              .required('Name is required'),
          email: Yup.string()
              .email('Email is invalid')
              .required('Email is required')
      })
    )
  });
      
  const initialValues = {
    members: [
      {
        wallet: props.walletInfo.wallet,
        name: props.orgFormdata?.deployer_name,
        email: props.orgFormdata?.email
      }
    ]
  };

  const onSubmit = (fields) => {
    props.dispatch(addOrgFormData(fields));
    deploy(fields.members);
  }

  const addNewMember = () => {
    const arr = members;
    arr.push({});
    addMember(arr);
  }

  const addOrg = (member) => {
    const skipFields = ["eqxBln"];
    const formData = new FormData();
    for (const [key, value] of Object.entries(props.orgFormdata)) {
      if (!skipFields.includes(key)) {
        if (key === 'wallet') {
          formData.append('wallet_address', value);
        } else {
          formData.append(key, value);
        }
      }
    }
    member.forEach((mem)=>{
      formData.append('member_name[]', mem.name);
      formData.append('member_wallet_address[]', mem.wallet);
      formData.append('member_email[]', mem.email);
    })
    const multisigAddress = localStorage.getItem(props.walletInfo.wallet)
    formData.append('multisig_address', multisigAddress);
    axios.post(`${process.env.REACT_APP_API_URL}/add_org`, formData)
      .then((res)=>{
        const account = sessionStorage.getItem('selected_account');
        if (account) {
            getMe(account);
        }
        props.nextStep();
      })
      .catch(err=>{
        setDuplicate(true);
      });
  }

  const deploy = async (member) => {
    
    setAwaiting(true);

    let web3 = await getWeb3();
    
    let contract = new web3.eth.Contract(MultiSig.abi); //MultiSig

    let gContract = new web3.eth.Contract(GToken.abi);
    
    let eqxContract = new web3.eth.Contract(Eq.abi, eqxAdd);

    member.forEach((mem)=>{
      wallets.push(mem.wallet);
    })
    
    try {
          // this will deploy MultiSig contract that will give _address in response
          // 100 equinox will deposited to multisig address at the end
          // multisig contract address against user wallet address should be saved to databas at this step
          // because user has deposited his 100eqx at multisig 
      
          await contract.deploy({ //multisig contract creation
              data:MultiSig.bytecode,
              arguments: [wallets, eqxAdd, amount] // constructor arguments
            }).send({from: props.walletInfo.wallet})
              .on('error', (err) => {
                console.log(err);
                setGasError(true);
              })
              .then(async (receipt) => {
                localStorage.setItem(props.walletInfo.wallet, receipt._address);
                setAwaiting(false);
                setPay(true);
                await eqxContract.methods.transfer(receipt._address, amount).send({from: props.walletInfo.wallet})
                .then(function(receipt){
                  addOrg(member);
                  console.log(receipt);
                  setPay(false);
                })
                .catch((err)=>{
                  setGasError(true);
                })
              })
              // await gContract.deploy({ // gtoken contraction creation
              //   data:GToken.bytecode,
              //   arguments: [name, symbol, decimal, totalSupply, props.walletInfo.wallet, receipt._address, ] // constructor arguments
              // })
              // .send({from: props.walletInfo.wallet})
              // .on('error', (error) => {
              //   console.log("gtoken error", error)
              // }).then((gReceipt) => {
              //   console.log('receipt', gReceipt)
      
              //   console.log('Gtoken address', gReceipt._address);
      
              // })
      
    } catch (error) {
      alert("Step error");
      setAwaiting(false);
      setPay(false);
      setGasError(true);
    }
  }

  return ( 
    <div className="OrgStep4" data-testid="OrgStep4">
      <div className="container">
        <div className="inner_card ">
          <div className="w-100">
            <div className="row mb-4">
              <div className="col-md-3"></div>
              <div className="col-md-6">
                <p>ORG 3.0 LAUNCHPAD</p>
                <h2>STEP 4</h2>
                <p className="text-primary">
                  Create MultiSig Wallet
                </p>
              </div>
            </div>
            <div className="row">
              <Formik 
                enableReinitialize={true}
                initialValues={initialValues}
                validationSchema={OrgStep4Schema}
                onSubmit={onSubmit}
              >
                {({ errors, values, touched, setValues , isValid}) => (
                  <Form>
                    <div className="col-md-1"></div>
                    <div className="col-md-10 ">
                      <div className="step4_content_max_height">
                        <FieldArray name="members">
                          {()=>(members.map((member, index)=>{
                            const memberErrors = errors.members?.length && errors.members[index] || {};
                            const memberTouched = touched.members?.length && touched.members[index] || {};
                            return <AddMember index={index} memberErrors={memberErrors} memberTouched={memberTouched} key={index}/>;
                          }))}
                        </FieldArray>
                      </div>
                      <div className="float-start">
                        <button className="next_btn" type="button" onClick={()=>props.previousStep()}>Previuos</button>
                      </div>
                      <div className="float-end mt-3">
                        <button type="button" className="next_btn me-4" onClick={()=>addNewMember()}>ADD MORE MEMBERS <i className="fa fa-sign-in ps-2" aria-hidden="true"></i></button>
                        <button type="submit" className="next_btn" disabled={!isValid}>DEPLOY <i className="fa fa-sign-in ps-2" aria-hidden="true"></i></button>
                      </div>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
            
          </div>
        </div>
      </div>
      <AwaitingApproval open={awaiting} setOpen={setAwaiting} />
      <GasError open={gasError} setOpen={setGasError} />
      <ContinuePay open={pay} setOpen={setPay} />
      <MultiSignature open={multiSign} setOpen={setMultiSign} />
      <DuplicateError open={duplicate} setOpen={setDuplicate} />
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    orgFormdata: state.orgFormdata,
  };
};

export default connect(mapStateToProps)(OrgStep4);
