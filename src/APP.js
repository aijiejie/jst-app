import React from "react";
import {HashRouter, Route, Switch} from "react-router-dom"
import Home from "./pages/home";
import Courses from "./pages/course/courses";

export default class APP extends React.Component {

    render() {
        return <div>
            <HashRouter>
                <Switch>
                    <Route path={"/course"} component={Courses}/>
                    <Route path={"/"} component={Home}/>

                </Switch>
            </HashRouter>
        </div>
    }
}