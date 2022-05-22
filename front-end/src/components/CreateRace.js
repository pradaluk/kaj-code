import '../styles/CreateRace.css';
import React, { Component } from "react";

class CreateRace extends Component {


    constructor(props) {
        super(props);
        this.state = {
            name: "",
            circuitId: "",
            date: "",
            eorDate: "",
            classes: [],
            maxDrivers: "",
            fetchedCircuits: [],
            circuitOptions: [],
            profiledata: [],
            classes: []
        }
        this.createRace = this.createRace.bind(this);
    }
    async fetchUser() {
        let restURL = "/rest/users/current";
        await fetch(restURL, {
            method: "GET",
            credentials: 'include',
            headers: {
                mode: 'no-cors',
                'Content-Type': 'application/json',
            }
        })
            .then(response => {
                return response.json()
            })
            .then(data => {
                this.setState({ profiledata: data });
            })
    }
    async fetchCircuits() {
        const restURL = "/rest/circuits/";
        await fetch(restURL, {
            headers: {
                mode: 'no-cors',
                'Content-Type': 'application/json'
            }
        }).then(response => {
            return response.json()
        }).then(data => {

            data.forEach(circuit => {
                this.setState(prevState =>
                ({ circuitOptions: [prevState.circuitOptions, <option key={circuit.id} value={circuit.id}>{circuit.name} - {circuit.location}</ option>] }
                ));
            })
            if (data[0]) {
                this.setState({ circuitId: data[0].id });
            }
        })

    }
    async createRace(e) {
        e.preventDefault();
        const restURL = "/rest/races/";
        await fetch(restURL, {
            method: "POST",
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: this.state.name,
                maxDrivers: this.state.maxDrivers,
                race_date: this.state.date,
                eor_date: this.state.eorDate,
                classes: this.state.classes,
                organizor: {
                    id: this.state.profiledata.id
                },
                circuit: {
                    id: this.state.circuitId
                }
            })
        }).then(response => {
            if (response.status === 201) {
                window.alert("Race created");
            }
            else {
                window.alert("Something went wrong.")
            }
        })
    }
    handleChangeName(value) {
        this.setState({ name: value });
    }
    handleChangeCircuit(value) {
        this.setState({ circuitId: value });
    }
    handleChangeDate(value) {
        this.setState({ date: value });
    }
    handleChangeEorDate(value) {
        this.setState({ eorDate: value });
    }
    handleChangeMaxDrivers(value) {
        this.setState({ maxDrivers: value });
    }
    handleChangeClasses(target) {
        if (target.checked) {
            this.state.classes.push(target.value);
        }
        else {
            for (var i = 0; i < this.state.classes.length; i++) {
                if (this.state.classes[i] === target.value) {
                    this.state.classes.splice(i, 1);
                }
            }
        }
        console.log(this.state.classes)
    };
    componentDidMount() {
        this.fetchCircuits();
        this.fetchUser();
    }

    render() {
        return (
            <div className="CreateRace">
                <h2>Create a new race</h2>
                <form className='race-form' onSubmit={e => this.createRace(e)}>
                    <div className="name">
                        <p>Name : </p>
                        <input type="text" value={this.state.name}
                            className="name-input"
                            onChange={event => this.handleChangeName(event.target.value)} required />
                    </div>
                    <div className="circuit">
                        <p>Circuit : </p>
                        <select name="circuit-select" className="circuit-select"
                            onChange={event => this.handleChangeCircuit(event.target.value)}>
                            {this.state.circuitOptions}
                        </select>
                    </div>
                    <div className="date">
                        <p>Date : </p>
                        <input type="date" value={this.state.date}
                            className="date-input"
                            onChange={event => this.handleChangeDate(event.target.value)} required />
                    </div>
                    <div className="eorDate">
                        <p>End of registrations : </p>
                        <input type="date" value={this.state.eorDate}
                            className="eorDate-input"
                            onChange={event => this.handleChangeEorDate(event.target.value)} required />
                    </div>
                    <div className="maxDrivers">
                        <p>Max drivers : </p>
                        <input type="number" value={this.state.maxDrivers}
                            className="maxDrivers-input"
                            onChange={event => this.handleChangeMaxDrivers(event.target.value)} required />
                    </div>
                    <div className="classes">
                        <p>Select classes : </p>
                        <input type="checkbox" value={'GT3'} onChange={event => this.handleChangeClasses(event.target)} />GT3
                        <input type="checkbox" value={'GT4'} onChange={event => this.handleChangeClasses(event.target)} />GT4
                        <input type="checkbox" value={'LMP2'} onChange={event => this.handleChangeClasses(event.target)} />LMP2
                        <input type="checkbox" value={'LMP1'} onChange={event => this.handleChangeClasses(event.target)} />LMP1
                    </div>
                    <button type="submit" className="create-button" >Create race</button>
                </form>
            </div>
        )
    }
}

export default CreateRace;