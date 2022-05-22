import React, { Component } from "react";
import '../styles/AddCircuit.css';

class AddCircuit extends Component {


    constructor(props) {
        super(props);
        this.state = {
            name: "",
            location: ""
        }
        this.addCircuit = this.addCircuit.bind(this);
    }

    async addCircuit(e) {
        e.preventDefault();
        const restURL = "/rest/circuits/";
        await fetch(restURL, {
            method: "POST",
            credentials: 'include',
            headers: {
                mode: 'no-cors',
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: this.state.name,
                location: this.state.location
            })
        }).then(response => {
            if (response.status === 201) {
                window.alert("Circuit added.");
                window.location.assign("/");
            }
            else {
                window.alert("Something went wrong.");
                window.location.assign("/");
            }
        })
    }
    handleChangeName(value) {
        this.setState({ name: value });
    }
    handleChangeLocation(value) {
        this.setState({ location: value });
    }
    componentDidMount() {
    }

    render() {
        return (
            <div className="AddCircuit">
                <h2>Add a new circuit</h2>
                <form onSubmit={e => this.addCircuit(e)}>
                    <div className="name">
                        <p>Name : </p>
                        <input type="text" value={this.state.name}
                            className="name-input"
                            onChange={event => this.handleChangeName(event.target.value)} required />
                    </div>
                    <div className="location">
                        <p>Location : </p>
                        <input type="text" value={this.state.location}
                            className="location-input"
                            onChange={event => this.handleChangeLocation(event.target.value)} required />
                    </div>
                    <button type="submit" className="create-button" >Add circuit</button>
                </form>

            </div>
        )
    }
}

export default AddCircuit;