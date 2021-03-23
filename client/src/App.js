import React from "react";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Home from "./pages/Home";
import Result from "./pages/Result";
import Product from "./pages/Product";
import {QueryClientProvider, QueryClient} from "react-query";

const queryClient = new QueryClient();

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <Router>
                <Switch>
                    <Route component={Home} exact path="/"/>
                    <Route component={Result} exact path="/result"/>
                    <Route component={Product} exact path="/:id"/>

                </Switch>
            </Router>
        </QueryClientProvider>
    );
}

export default App;
