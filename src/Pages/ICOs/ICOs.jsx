import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAddress } from '../../helpers/addressHelper';
import { getWeb3 } from '../../helpers/currentWalletHelper';
import multiSigv2Abi from '../../Config/abis/MultiSigv2.json';
import contracts from '../../Config/contracts';
import { connect } from 'react-redux';
import { getIcos } from '../../services/dashboard';
import companyLogo from '../../assets/images/logo.png';
const ICOs = (props) => {
  const { ico } = props;
  console.log(ico)

  useEffect(() => {
    getIcos();
  }, []);

  return (
    <div className="buy-icos" data-testid="BuyICOs">
      <div className="container">
        <div className="mt-5 ">
          <div className="tab-pane fade show active" id="all" role="tabpanel" aria-labelledby="all-tab">
            <div className="row">
            {ico && ico.length && ico.map(i=>{
                return (
                <div className='col-md-3 col-sm-6 '>
                  <div className='icocard'>
                    <div><img src={i.token_logo} className="icons" alt=""/></div>
                    <div>Name : {i.token_name}</div>
                    <div>Symbol : DEF</div>
                    <div>Total Supply : {i.fixed_supply}</div>
                    <div>ICO Supply : {i.supply}</div>
                    <div>Offer price : {i.offer_price} BNB</div>
                    <div>Softcap : {i.soft_cap} BNB</div>
                    <div className='mb-2'>Hardcap : {i.hard_cap} BNB</div>
                    <Link to="/buy-icos"><button>Buy token</button></Link>
                  </div>
                </div>
                )
              })}
              {/* {ico && ico.length && ico.map(i=>{
                return (
                  // <div className="assets_all_card mb-4 me-4 col-md-4 col-sm-6 mt-2 text-center">
                  //   <h6>Equinox (EQX)</h6>
                  //   <div className="row justify-content-center">
                  //     <div className="col-4 text-nowrap font12 text-start">
                  //       Start Date
                  //     </div>
                  //     <div className="col-6 text-nowrap font12 text-end">
                  //       {i.start_date}
                  //     </div>
                  //   </div>
                  //   <div className="row justify-content-center">
                  //     <div className="col-4 text-nowrap font12 text-start">
                  //       End Date
                  //     </div>
                  //     <div className="col-6 text-nowrap font12 text-end">
                  //       {i.end_date}
                  //     </div>
                  //   </div>
                  //   <div className="row justify-content-center">
                  //     <div className="col-4 text-nowrap font12 text-start">
                  //       Offer Price
                  //     </div>
                  //     <div className="col-6 text-nowrap font12 text-end">
                  //       {i.offer_price}
                  //     </div>
                  //   </div>
                  //   <div className="row justify-content-center">
                  //     <div className="col-4 text-nowrap font12 text-start">
                  //       Total Supply
                  //     </div>
                  //     <div className="col-6 text-nowrap font12 text-end">
                  //       100000000
                  //     </div>
                  //   </div>
                  //   <div className="row justify-content-center">
                  //     <div className="col-4 text-nowrap font12 text-start">
                  //       ICO supply
                  //     </div>
                  //     <div className="col-6 text-nowrap font12 text-end">
                  //       {i.supply}
                  //     </div>
                  //   </div>
                  //   <div className="d-flex justify-content-center all_assets_action flex-wrap mt-3">
                  //     <div className="text-nowrap font12 fw-bold" role="button">BUY ICO</div>
                  //   </div>
                  // </div>
                )
              })} */}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};

const mapStateToProps = (state) => {
  return {
    account: state.account,
    ico: state.ico
  };
};

export default connect(mapStateToProps)(ICOs);
