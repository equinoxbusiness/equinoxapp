import { Footer, Nav } from "./../../";
import { Home, BuyEQX, AboutEqx, AccessOrg, EnterpriceDex, Org } from "./../../../Pages";
import { Switch, Route } from "react-router-dom";
import { connect } from "react-redux";
import ICOs from "../../../Pages/ICOs/ICOs";
import BuyICOs from "../../../Pages/BuyICOs/BuyICOs";
import Home1 from "../../../Pages/Home/home1";
import Home2 from "../../../Pages/Home/home2";

const PublicLayout = (props) => {
    return (
        <>
            <Nav/>
            <Switch>
                <Route path="/about-eqx">
                    <AboutEqx />
                </Route>
                <Route path="/access-org">
                    <Home2 />
                </Route>
                <Route path="/enterprice-dex">
                    <EnterpriceDex />
                </Route>
                <Route path="/buy-eqx">
                    <BuyEQX />
                </Route>
                <Route path="/org">
                    <Org />
                </Route>
                <Route path="/icos">
                    <ICOs />
                </Route>
                <Route path="/buy-icos">
                    <BuyICOs />
                </Route>
                <Route path="/" exact>
                    <Home1 />
                </Route> 


                <Route path="/home" exact>
                    <Home />
                </Route> 
                <Route path="/acc-org" exact>
                    <AccessOrg />
                </Route>  
                
                      
            </Switch>
            <Footer/>
        </>
    )
}

const mapStateToProps = (state) => {
    return {
    };
};
  
export default connect(mapStateToProps)(PublicLayout);
