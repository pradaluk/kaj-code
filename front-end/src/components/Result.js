import React, { Component } from "react";
import "../styles/Result.css"
class Result extends Component {

    constructor(props) {
        super(props);
        this.state = {
        }
    }


    componentDidMount() {

    }

    render() {
        return (
            <div className="Result">
                <p className="raceName">
                    Race : {this.props.data.race.name}
                </p>
                <p className="race_date">
                    Race date : {this.props.data.race.race_date}
                </p>
                <p className="car">
                    Car : {this.props.data.car.maker} {this.props.data.car.model}
                </p>
                <p className="startPos">
                    Started : {this.props.data.startPos}
                </p>
                <p className="finishPos">
                    Finished : {this.props.data.finishPos}
                </p>
            </div>)
    }
}

export default Result;