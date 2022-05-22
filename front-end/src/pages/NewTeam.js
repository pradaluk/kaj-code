import '../styles/NewTeam.css';
import React, { Component } from "react";

class NewTeam extends Component {


    constructor(props) {
        super(props);
        this.state = {
            name: '',
            drivers: []
        }
        this.createTeam = this.createTeam.bind(this);
    }

    async createTeam(e) {
        e.preventDefault();
        console.log(this.state.circuitId)
        const restURL = "/rest/teams/";
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
                drivers: []
            })
        })
        window.location.assign("/teams");

    }
    handleChangeName(value) {
        this.setState({ name: value });
    }

    componentDidMount() {
    }

    render() {
        return (
            <div className="NewTeam">
                <h2>Create a new team</h2>
                <form onSubmit={e => this.createTeam(e)}>
                    <div className="name">
                        <p>Name : </p>
                        <input type="text" value={this.state.name}
                            className="name-input"
                            onChange={event => this.handleChangeName(event.target.value)} required />
                    </div>
                    <button type='submit' className="create-button">Create team</button>
                </form>

            </div>
        )
    }
}

export default NewTeam;