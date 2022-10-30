import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import InputPage from "./layouts/inputPage";
import MainPage from "./layouts/mainPage";

function App() {
    return (
        <BrowserRouter>
            <React.StrictMode>
                <Switch>
                    <Route path="/edit" component={InputPage} />
                    <Route path="/" exact component={MainPage} />
                    <Redirect to="/" />
                </Switch>
            </React.StrictMode>
        </BrowserRouter>
    );
}

export default App;
