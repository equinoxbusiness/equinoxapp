import "./assets/css/App.css";
import { Switch, Route } from "react-router-dom";
import { Home, BuyEQX, AboutEqx, AccessOrg, EnterpriceDex } from "./Pages";
import { Footer, Nav } from "./components/";
import { Router } from "react-router";
import history from "./routerHistory";

function App() {
  return (
    <Router history={history}>
      <Nav />
      <Switch>
        <Route path="/about-eqx">
          <AboutEqx />
        </Route>
        <Route path="/access-org">
          <AccessOrg />
        </Route>
        <Route path="/enterprice-dex">
          <EnterpriceDex />
        </Route>
        <Route path="/buy-eqx">
          <BuyEQX />
        </Route>
        <Route path="/" exact>
          <Home />
        </Route>
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
