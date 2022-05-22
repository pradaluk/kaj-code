import '../styles/RaceDetails.css';
import React, { Component } from "react";

class RaceDetails extends Component {

    constructor(props) {
        super(props);
    }
    componentDidMount() {
    }
    onClose = e => {
        this.props.onClose && this.props.onClose(e);
    };
    render() {
        if (this.props.show) {
            const classesToShow = []
            Array.from(this.props.data.classes).forEach(element => {
                classesToShow.push(<p key={element}>{element}</p>)
            });
            return (
                <div className="RaceDetails">
                    <p className='Name'>{this.props.data.name}</p>
                    <p className="RegDrivers">Registered : {this.props.data.results.length} / {this.props.data.maxDrivers}</p>
                    <p className="Circuit">Circuit : {this.props.data.circuit.name}</p>
                    <p className="Date">Date of race : {this.props.data.race_date}</p>
                    <p className="eorDate">End of registrations : {this.props.data.eor_date}</p>
                    <div className="classes">
                        <p className="classes-title">Classes eligable to race : </p>
                        {classesToShow}
                    </div>
                    <button onClick={this.onClose}>CLOSE</button>
                </div>
            )
        }
        else {
            return null;
        }
    }
}

export default RaceDetails;