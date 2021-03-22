import React from "react";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Home from "./pages/Home";
import Result from "./pages/Result";
import Product from "./pages/Product";

function App() {
    return (
        <Router>
            <Switch>
                <Route component={Home} exact path="/"/>
                <Route component={Result} exact path="/result"/>
                <Route component={Product} exact path="/:id"/>

            </Switch>
        </Router>
    );
}

export default App;
