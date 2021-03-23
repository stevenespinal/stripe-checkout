import React from "react";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Home from "./pages/Home";
import Result from "./pages/Result";
import Product from "./pages/Product";
import {QueryClientProvider, QueryClient} from "react-query";
import {loadStripe} from "@stripe/stripe-js/pure";
import {CartProvider} from "use-shopping-cart";
import {Toaster} from "react-hot-toast";
import Navbar from "./components/Navbar";

const queryClient = new QueryClient();
const stripePromise = loadStripe(process.env.REACT_APP_KEY);

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <CartProvider stripe={stripePromise} mode="checkout-session" currency="USD">
                <Navbar/>
                <Router>
                    <Toaster position="bottom-center"/>
                    <Switch>
                        <Route component={Home} exact path="/"/>
                        <Route component={Result} exact path="/result"/>
                        <Route component={Product} exact path="/:id"/>

                    </Switch>
                </Router>
            </CartProvider>
        </QueryClientProvider>
    );
}

export default App;
