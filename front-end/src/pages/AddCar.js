import '../styles/AddCar.css';
import React, { Component } from "react";

class AddCar extends Component {


    constructor(props) {
        super(props);
        this.state = {
            maker: '',
            model: '',
            carClass: 'GT3'
        }
        this.addNewCar = this.addNewCar.bind(this);
    }

    async addNewCar(e) {
        e.preventDefault();
        const restURL = "/rest/cars/";
        await fetch(restURL, {
            method: "POST",
            credentials: 'include',
            headers: {
                mode: 'no-cors',
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                maker: this.state.maker,
                model: this.state.model,
                carClass: this.state.carClass
            })
        })
        window.location.assign("/garage");
    }
    handleChangeMaker(value) {
        this.setState({ maker: value });
    }
    handleChangeModel(value) {
        this.setState({ model: value });
    }
    handleChangeCarClass(value) {
        this.setState({ carClass: value });
    }
    componentDidMount() {
    }

    render() {
        return (
            <div className="AddCar">
                <h2>Add a new car</h2>
                <form onSubmit={e => this.addNewCar(e)}>
                    <div className="maker">
                        <p>Maker : </p>
                        <input type="text" value={this.state.maker}
                            className="maker-input"
                            onChange={event => this.handleChangeMaker(event.target.value)} required />
                    </div>
                    <div className="model">
                        <p>Model : </p>
                        <input type="text" value={this.state.model}
                            className="model-input"
                            onChange={event => this.handleChangeModel(event.target.value)} required />
                    </div>
                    <div>
                        Car class :
                        <select name="carClass-select" className="carClass-select"
                            onChange={event => this.handleChangeCarClass(event.target.value)} required>
                            <option value="GT3">GT3</option>
                            <option value="GT4">GT4</option>
                            <option value="LMP1">LMP1</option>
                            <option value="LMP2">LMP2</option>
                        </select>
                    </div>
                    <button type="submit" className="create-button" >Add car</button>
                </form>
            </div>
        )
    }
}

export default AddCar;