import '../styles/Race.css';
import React, { Component } from "react";

class Race extends Component {

    constructor(props) {
        super(props);
        this.state = {
            show: false,
            isRegistered: false,
            mycars: [],
            carOptions: [],
            carId: 0
        }
        this.renderDelete = this.renderDelete.bind(this);
        this.renderInput = this.renderInput.bind(this);
        this.renderSelect = this.renderSelect.bind(this);
        this.renderREG = this.renderREG.bind(this);
        this.fetchMyCars = this.fetchMyCars.bind(this);
    }
    renderDelete() {
        if ((this.props.data.organizor && (this.props.user.id === this.props.data.organizor.id))
            || this.props.user.id === this.props.data.organizor
            || this.props.user.role === "ADMIN") {
            return <button className='delete-button' onClick={() => {
                this.DeleteRace();
            }}>DELETE</button>
        }
        else {
            return;
        }
    }
    renderREG() {
        if (this.state.isRegistered) {
            return (<button className='reg-button' onClick={() => {
                this.Withdraw();
            }}>WITHDRAW</button>)
        }
        else {
            return (<button className='reg-button' onClick={() => {
                this.Register();
            }}>REGISTER</button>)
        }
    }
    renderInput() {
        if ((this.props.data.organizor && (this.props.user.id === this.props.data.organizor.id))
            || this.props.user.id === this.props.data.organizor
            || this.props.user.role === "ADMIN") {
            return <label htmlFor="file-input">
                SELECT FILE
                <input id="file-input" type="file" accept=".txt" onChange={e =>
                    this.handleChangeFile(e.target.files[0])} />
            </label>
        }
        else {
            return;
        }
    }
    renderSelect() {
        if (!this.state.isRegistered) {
            return (<div>
                <p>Select your car : </p>
                <select className='carClass-select' onChange={event => this.handleChangeCar(event.target.value)}>
                    {this.state.carOptions}
                </select>
            </div>)
        }

    }
    isRegistered() {
        if (!this.state.isRegistered) {
            this.props.data.results.forEach(element => {
                if ((element.user.id === this.props.user.id) ||
                    (element.user === this.props.user.id)) {
                    this.setState({ isRegistered: true })
                }
            }
            );
        }
    }
    async updateResult(res) {
        const restURL = "/rest/results/";
        await fetch(restURL, {
            method: "PUT",
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user: {
                    id: res.user.id
                },
                race: {
                    id: res.race
                },
                startPos: res.startPos,
                finishPos: res.finishPos
            })
        })
    }
    async DeleteRace() {

        const restURL = "/rest/races/" + this.props.data.id;
        await fetch(restURL, {
            method: "DELETE",
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        window.location.assign("/upcomingraces");
    }
    componentDidMount() {
        this.fetchMyCars();
        this.isRegistered();
    }
    componentDidUpdate() {
    }
    async fetchMyCars() {
        const restURL = "/rest/cars/getMyCars";
        await fetch(restURL, {
            method: "GET",
            credentials: 'include',
            headers: {
                'Accept': 'application/json'
            }
        }).then(response => {
            return response.json()
        })
            .then(data => {
                this.setState({ mycars: data })
                data.forEach(car => {
                    if (this.props.data.classes.indexOf(car.carClass) > -1) {
                        this.setState(prevState =>
                        ({ carOptions: [prevState.carOptions, <option key={car.id} value={car.id}>{car.maker} {car.model}</option>] }
                        ));
                    }
                })
                if (data[0]) {
                    this.setState({ carId: data[0].id });
                }
            })
    }
    async Register() {
        const restURL = "/rest/users/registerForRace/" + this.props.data.id + "/" + this.state.carId;
        await fetch(restURL, {
            method: "POST",
            credentials: 'include',
            headers: {
                'Accept': 'application/json'
            }
        })
        window.location.assign("/upcomingraces");
    }

    async Withdraw() {
        const restURL = "/rest/users/withdraw/" + this.props.data.id;
        await fetch(restURL, {
            method: "POST",
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
            }
        })
        window.location.assign("/upcomingraces");
    }
    downloadResFile = () => {
        console.log(this.props.data.results)
        const element = document.createElement("a");
        const file = new Blob([JSON.stringify(this.props.data.results, null, 4)], { type: 'text/plain' });
        element.href = URL.createObjectURL(file);
        element.download = "myFile.txt";
        document.body.appendChild(element); // Required for this to work in FireFox
        element.click();
    }

    handleChangeFile = (file) => {
        let fileData = new FileReader();
        fileData.onloadend = this.handleFile;
        fileData.readAsText(file);
    }
    handleChangeCar(value) {
        this.setState({ carId: value });
    }

    handleFile = (e) => {
        const content = e.target.result;
        console.log(content)
        var resultArray = JSON.parse(content);
        console.log(resultArray);
        resultArray.forEach(res => {
            this.updateResult(res);
        })
        // You can set content in state and show it in render.
    }
    render() {
        this.isRegistered()
        return (
            <div className="Race" key={this.props.data.name}>
                <p className='Name'>{this.props.data.name}</p>
                <p className="RegDrivers">Registered : {this.props.data.results.length} / {this.props.data.maxDrivers}</p>
                <p className="Circuit">Circuit : {this.props.data.circuit.name}</p>
                <p className="Date">Date of race : {this.props.data.race_date}</p>
                <p className="eorDate">End of registrations : {this.props.data.eor_date}</p>
                <this.renderSelect />
                <div className="buttons">
                    <this.renderREG />
                    <button className='details-button' onClick={() => {
                        this.props.showDetails(this.props.data);
                    }}>DETAILS</button>
                    <this.renderDelete />
                    <button onClick={this.downloadResFile}>DOWNLOAD RESULTS</button>
                </div>
                <this.renderInput />
            </div>)
    }
}

export default Race;