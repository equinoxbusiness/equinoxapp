import {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import { getAddress } from '../../../../helpers/addressHelper';
import { getWeb3 } from '../../../../helpers/currentWalletHelper';
import multiSigv2Abi from './../../../../Config/abis/MultiSigv2.json';
import contracts from './../../../../Config/contracts';
import './AssetsMain.scss';
import { connect } from 'react-redux';
import axios from 'axios';
import { CommonModal } from '../../../../components/modals';

const AssetsMain = (props: any) => {
  const {org} = props;
  let web3: any;

  const [proposals, setProposals] = useState([]);
  const [signers, setSigners] = useState([]);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('Remove Member Proposal Finalized...');
  
  useEffect(()=>{
    if (org) {
      getProposals();
      getSigners();
    }
  }, [org]);

  const getProposals = async () => {
    let web3: any = await getWeb3();
    let multiSigAddr = org?.org?.multisig_address;
    const contract = await new web3.eth.Contract(multiSigv2Abi.abi, multiSigAddr);
    const returnvalue = await contract.methods.listProposals().call();
    setProposals(returnvalue);
  }

  const getSigners = async () => {
    let web3: any = await getWeb3();
    let multiSigAddr = org?.org?.multisig_address;
    const contract = await new web3.eth.Contract(multiSigv2Abi.abi, multiSigAddr);
    const returnvalue = await contract.methods.listRemoveMembers().call();
    console.log(returnvalue, '--rmov---')
    setSigners(returnvalue);
  }

  const approve = async (index: any) => {
    let web3: any = await getWeb3();
    let accounts = await web3.eth.getAccounts();
    let account = accounts[0];
    let multiSigAddr = org?.org?.multisig_address;
    const contract = await new web3.eth.Contract(multiSigv2Abi.abi, multiSigAddr);
    await contract.methods.hasRemoveMemberProposalSigned(index, ).send({from: account})
      .on('error', (error: any) => {
        console.log(error)
      })
      .then((result: any) => {
        console.log(result);
      });
  }

  const approveRemoveMember = async (index: any, member: any) => {
    let web3: any = await getWeb3();
    let accounts = await web3.eth.getAccounts();
    let account = accounts[0];
    let multiSigAddr = org?.org?.multisig_address;
    const contract = await new web3.eth.Contract(multiSigv2Abi.abi, multiSigAddr);
    await contract.methods.signRemoveMemberProposal(index).send({from: account})
      .on('error', (error: any) => {
        console.log(error)
      })
      .then((result: any) => {
        setMessage('Remove Member Proposal Approved...');
        setOpen(true);
        setTimeout(()=> {
          setOpen(false);
        }, 5000)
        console.log(result)
      });
  }
  const finalize = async (index: any, to: any) => {
    let web3: any = await getWeb3();
    let accounts = await web3.eth.getAccounts();
    let account = accounts[0];
    let multiSigAddr = org?.org?.multisig_address;
    const contract = await new web3.eth.Contract(multiSigv2Abi.abi, multiSigAddr);
    await contract.methods.finalizeProposal(index, to).send({from: account})
      .on('error', (error: any) => {
        console.log(error)
      })
      .then((result: any) => {
        console.log(result);
        getProposals()
      });
  }

  const finalizeRemoveMember = async (index: any, to: any) => {
    let web3: any = await getWeb3();
    let accounts = await web3.eth.getAccounts();
    let account = accounts[0];
    let multiSigAddr = org?.org?.multisig_address;
    const contract = await new web3.eth.Contract(multiSigv2Abi.abi, multiSigAddr);
    await contract.methods.removeWalletMember(index).send({from: account})
      .on('error', (error: any) => {
        console.log(error)
      })
      .then((result: any) => {
        console.log(result);
        const formData: any = new FormData();
        formData.append('wallet_address', to.member);
        axios.post(`${process.env.REACT_APP_API_URL}/remove_member`, formData)
        .then((res)=>{
          setMessage('Remove Member Proposal Approved...');
          setOpen(true);
          setTimeout(()=> {
            setOpen(false);
          }, 5000)
          console.log(res);
          getSigners()
        });
        
      });
  }

  return (
    <div className="AssetsMain" data-testid="AssetsMain">
      <div className="container">
        <div className="mt-5 ">
          <ul className="nav nav-tabs justify-content-center" id="myTab" role="tablist">
            <li className="nav-item" role="presentation">
              <button className="nav-link active" id="all-tab" data-bs-toggle="tab" data-bs-target="#all" type="button" role="tab" aria-controls="all" aria-selected="true">All</button>
            </li>
            <li className="nav-item" role="presentation">
              <button className="nav-link" id="fresh-tab" data-bs-toggle="tab" data-bs-target="#fresh" type="button" role="tab" aria-controls="fresh" aria-selected="false">Fresh</button>
            </li>
            <li className="nav-item" role="presentation">
              <button className="nav-link" id="at-tab" data-bs-toggle="tab" data-bs-target="#at" type="button" role="tab" aria-controls="at" aria-selected="false">At IDO</button>
            </li>

            <li className="nav-item" role="presentation">
              <button className="nav-link" id="allreq-tab" data-bs-toggle="tab" data-bs-target="#allreq" type="button" role="tab" aria-controls="allreq" aria-selected="false">All Requests</button>
            </li>
            <li className="nav-item" role="presentation">
              <button className="nav-link" id="pendreq-tab" data-bs-toggle="tab" data-bs-target="#pendreq" type="button" role="tab" aria-controls="pendreq" aria-selected="false">Pending Requests</button>
            </li>
            <li className="nav-item" role="presentation">
              <button className="nav-link" id="memremove-tab" data-bs-toggle="tab" data-bs-target="#memremove" type="button" role="tab" aria-controls="memremove" aria-selected="false">Member Remove Requests</button>
            </li>
            <li className="nav-item" role="presentation">
            <button className="nav-link" id="crenewreq-tab" data-bs-toggle="tab" data-bs-target="#crenewreq" type="button" role="tab" aria-controls="crenewreq" aria-selected="false"> <Link className="createreqbtn" to="assets/createreq">Create New Request</Link></button>
            </li>
          </ul>
          <div className="tab-content" id="myTabContent">
            <div className="tab-pane fade show active" id="all" role="tabpanel" aria-labelledby="all-tab">
              <div className="row">
                <div className="col-md-4 col-sm-6 all_cardsec_height mt-2">
                  {org && org.project && org.project.length && org.project.map((pro: any)=>{
                    return (
                      <div className="assets_all_card mb-4">
                        <h6>{pro.project_name}</h6>
                        <p className="font12 mb-1 text-truncate">{pro.gtoken_address}</p>
                        <div className="row">
                          <div className="col-3 text-nowrap font12">
                            Total Supply
                          </div>
                          <div className="col-3 text-nowrap font12 text-end fw-bold">
                            {pro.fixed_supply}
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-3 text-nowrap font12">
                            Available
                          </div>
                          <div className="col-3 text-nowrap font12 text-end fw-bold">
                            95500000
                          </div>
                        </div>
                        <div className="d-flex justify-content-between all_assets_action flex-wrap">
                          <div className="text-nowrap font12 fw-bold"><Link to={'/dashboard/assets/createico'} className={org?.ico && org.ico.length ? 'disabled-link' : ''}>CREATE/MANAGE ICO</Link></div>
                          <div className="text-nowrap font12 fw-bold">CREATE IDO</div>
                          <div className="text-nowrap font12 fw-bold">APPROVE/INITIATE REQUESTS</div>
                        </div>
                      </div>
                    )
                  })}
                </div>
                {/*<div className="col-md-4 col-sm-6 mt-2">
                  <div className="crypto_cardsec_height mb-5">
                    <div className="crypto_card">
                      <div className="crypto_card_head mb-2">
                        <div>
                          <p className="mb-1 fw-bold font12">Crypto Asset Value</p>
                          <h5 className="fw-bold usdvalue">1000.27 USD <span>1.87 BNB</span></h5>
                        </div>
                      </div>
                      <div className="crpto_card_content mb-2 d-flex justify-content-between font12 fw-bold">
                        <div>
                          BTC
                        </div>
                        <div className="color_p">
                          0.03
                        </div>
                        <div>
                          Send/Recieve
                        </div>
                      </div>
                      <div className="crpto_card_content mb-2 d-flex justify-content-between font12 fw-bold">
                        <div>
                          ETC
                        </div>
                        <div className="color_p">
                          0.03
                        </div>
                        <div>
                          Send/Recieve
                        </div>
                      </div>
                      <div className="crpto_card_content mb-2 d-flex justify-content-between font12 fw-bold">
                        <div>
                          BNH
                        </div>
                        <div className="color_p">
                          0.03
                        </div>
                        <div>
                          Send/Recieve
                        </div>
                      </div>
                      <div className="crpto_card_content mb-2 d-flex justify-content-between font12 fw-bold">
                        <div>
                          ETH
                        </div>
                        <div className="color_p">
                          0.03
                        </div>
                        <div>
                          Send/Recieve
                        </div>
                      </div>
                      <div className="crpto_card_content mb-2 d-flex justify-content-between font12 fw-bold">
                        <div>
                          BNC
                        </div>
                        <div className="color_p">
                          0.03
                        </div>
                        <div>
                          Send/Recieve
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="crypto_cardsec_height">
                    <div className="crypto_card">
                      <div className="crypto_card_head mb-2">
                        <div>
                          <p className="mb-1 fw-bold font12">Crypto Asset Value</p>
                          <h5 className="fw-bold usdvalue">1000.27 USD <span>1.87 BNB</span></h5>
                        </div>
                      </div>
                      <div className="crpto_card_content mb-2 d-flex justify-content-between font12 fw-bold">
                        <div>
                          BTC
                        </div>
                        <div className="color_p">
                          0.03
                        </div>
                        <div>
                          Send/Recieve
                        </div>
                      </div>
                      <div className="crpto_card_content mb-2 d-flex justify-content-between font12 fw-bold">
                        <div>
                          ETC
                        </div>
                        <div className="color_p">
                          0.03
                        </div>
                        <div>
                          Send/Recieve
                        </div>
                      </div>
                      <div className="crpto_card_content mb-2 d-flex justify-content-between font12 fw-bold">
                        <div>
                          BNH
                        </div>
                        <div className="color_p">
                          0.03
                        </div>
                        <div>
                          Send/Recieve
                        </div>
                      </div>
                      <div className="crpto_card_content mb-2 d-flex justify-content-between font12 fw-bold">
                        <div>
                          ETH
                        </div>
                        <div className="color_p">
                          0.03
                        </div>
                        <div>
                          Send/Recieve
                        </div>
                      </div>
                      <div className="crpto_card_content mb-2 d-flex justify-content-between font12 fw-bold">
                        <div>
                          BNC
                        </div>
                        <div className="color_p">
                          0.03
                        </div>
                        <div>
                          Send/Recieve
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-4 col-sm-6 mt-2">
                  <div className="crypto_cardsec_height mb-5">
                    <div className="crypto_card">
                      <div className="crypto_card_head mb-2">
                        <div>
                          <p className="mb-1 fw-bold font12">Crypto Asset Value</p>
                          <h5 className="fw-bold usdvalue">1000.27 USD <span>1.87 BNB</span></h5>
                        </div>
                      </div>
                      <div className="crpto_card_content mb-2 d-flex justify-content-between font12 fw-bold">
                        <div>
                          BTC
                        </div>
                        <div className="color_p">
                          0.03
                        </div>
                        <div>
                          Send/Recieve
                        </div>
                      </div>
                      <div className="crpto_card_content mb-2 d-flex justify-content-between font12 fw-bold">
                        <div>
                          ETC
                        </div>
                        <div className="color_p">
                          0.03
                        </div>
                        <div>
                          Send/Recieve
                        </div>
                      </div>
                      <div className="crpto_card_content mb-2 d-flex justify-content-between font12 fw-bold">
                        <div>
                          BNH
                        </div>
                        <div className="color_p">
                          0.03
                        </div>
                        <div>
                          Send/Recieve
                        </div>
                      </div>
                      <div className="crpto_card_content mb-2 d-flex justify-content-between font12 fw-bold">
                        <div>
                          ETH
                        </div>
                        <div className="color_p">
                          0.03
                        </div>
                        <div>
                          Send/Recieve
                        </div>
                      </div>
                      <div className="crpto_card_content mb-2 d-flex justify-content-between font12 fw-bold">
                        <div>
                          BNC
                        </div>
                        <div className="color_p">
                          0.03
                        </div>
                        <div>
                          Send/Recieve
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="crypto_cardsec_height">
                    <div className="total_value_card">
                      <div className="font14">
                        Total Asset Value
                      </div>
                      <h4 className="fw-bold color_p">1000.27 USD </h4>
                      <p className="fw-bold">
                        1.87 BNB
                      </p>
                    </div>
                  </div>
                </div>*/}
              </div>
            </div>
            <div className="tab-pane fade" id="fresh" role="tabpanel" aria-labelledby="fresh-tab">fresh</div>
            <div className="tab-pane fade" id="at" role="tabpanel" aria-labelledby="at-tab">at</div>
            <div className="tab-pane fade" id="allreq" role="tabpanel" aria-labelledby="allreq-tab">
              <div className="table-responsive all_req_table">
                <table>
                  {proposals.length > 0 && proposals.map((pro: any, index)=>{
                    return (
                      <tr>
                        <td className="tdfirst">BTC</td>
                        <td>Reciever: <span className="color_p text-truncate">{pro.to}</span></td>
                        <td>Amount: <span className="color_p"> {pro.tokenAmount} BTC</span></td>
                        <td>
                          {!pro.finalized && <span onClick={()=>approve(index)} className="approve">Approve</span>}
                          {pro.finalized && <span onClick={()=>approve(index)} className="approved">Approved</span>}
                        </td>
                        <td className="disabled">Disapprove</td>
                        <td>
                          Time Remains:  <span className="color_p">3 Days</span>
                        </td>
                        <td className="tdlast">
                          {!pro.finalized && <button className="btn btn-primary finalize-btn" onClick={()=>finalize(index, pro.to)}>Finalize</button>}
                        </td>
                      </tr>
                    )
                  })}
                </table>

              </div>
            </div>
            <div className="tab-pane fade" id="memremove" role="tabpanel" aria-labelledby="allreq-tab">
              <div className="table-responsive all_req_table">
                <table>
                  {signers.length > 0 && signers.map((pro: any, index)=>{
                    return (
                      <tr>
                        <td>Wallet Address: <span className="color_p text-truncate">{pro.member}</span></td>
                        <td>
                          {!pro.finalized && <span onClick={()=>approveRemoveMember(index, pro.member)} className="approve">Approve</span>}
                          {pro.finalized && <span onClick={()=>{}} className="approved">Approved</span>}
                        </td>
                        <td className="disabled">Disapprove</td>
                        <td className="tdlast">
                          {!pro.finalized  && <button className="btn btn-primary finalize-btn" onClick={()=>finalizeRemoveMember(index, pro)}>Finalize</button>}
                        </td>
                      </tr>
                    )
                  })}
                </table>

              </div>
            </div>
            <div className="tab-pane fade" id="at" role="tabpanel" aria-labelledby="ar-tab">at</div>
            <div className="tab-pane fade" id="at" role="tabpanel" aria-labelledby="ar-tab">at</div>
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


export default connect(mapStateToProps)(AssetsMain);
