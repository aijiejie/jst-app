import React from "react";

 export default class Course extends React.Component{
    render() {
        return(

                    <li>
                        <a href="#">
                            <img src= {this.props.src} alt=" "/>
                            <div className="title">{this.props.title}</div>
                            <div className="intro">{this.props.intro}</div>
                        </a>
                    </li>
        )
    }
}