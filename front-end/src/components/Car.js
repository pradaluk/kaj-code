import React, { Component } from "react";
import '../styles/Car.css'

class Car extends Component {

    async DeleteCar() {

        const restURL = "/rest/cars/" + this.props.data.id;
        await fetch(restURL, {
            method: "DELETE",
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        window.location.assign("/garage");
    }
    componentDidMount() {
    }
    componentDidUpdate() {
    }

    render() {
        return (
            <div className="Car">
                <p className='Name'>{this.props.data.maker}</p>
                <p className='Model'>Model : {this.props.data.model}</p>
                <p className='Class'>Class : {this.props.data.carClass}</p>
                <button className='delete-button' onClick={() => { this.DeleteCar(); }}>DELETE</button>
            </div>)
    }
}

export default Car;