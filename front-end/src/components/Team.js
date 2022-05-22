import '../styles/Team.css';
import React, { Component } from "react";

class Team extends Component {

    constructor(props) {
        super(props);
        this.renderDelete = this.renderDelete.bind(this);
        this.renderJoin = this.renderJoin.bind(this);
        this.joinTeam = this.joinTeam.bind(this);
        this.leaveTeam = this.leaveTeam.bind(this);
        this.state = {
            message: "",
            drivers: []
        }
    }

    renderDelete() {
        if (((this.props.user.id === this.props.data.teamOwner.id))
            || this.props.user.id === this.props.data.teamOwner
            || this.props.user.role === "ADMIN") {
            return <button className='delete-button' onClick={() => {
                this.DeleteTeam();
            }}>DELETE</button>
        }
        else {
            return;
        }
    }
    leaveTeam() {
        const restURL = "/rest/memberships/" + this.props.data.id + "/leave";
        fetch(restURL, {
            method: "DELETE",
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        window.location.assign("/teams");
    }
    renderJoin() {
        var elements = <div><p>Message for the join request : </p><input type="text" value={this.state.message} onChange={event => this.handleChangeMessage(event.target.value)} /><button className='join-button' onClick={this.joinTeam}>JOIN TEAM</button></div>;
        if (this.props.user.id === this.props.data.teamOwner.id) {
            elements = null;
        }
        this.props.data.memberships.forEach(mem => {
            if (mem.user === this.props.user.id && mem.status === 'ACTIVE') {
                elements = <button className='leave-button' onClick={this.leaveTeam}>LEAVE TEAM</button>;
            }
        })
        return elements;
    }
    async DeleteTeam() {

        const restURL = "/rest/teams/" + this.props.data.id;
        await fetch(restURL, {
            method: "DELETE",
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        window.location.assign("/teams");
    }
    componentDidMount() {
        let driversList = []
        this.props.data.memberships.forEach(element => {
            if (element.status === 'ACTIVE') {
                driversList.push(<p key={element.user.id}>{element.user.firstName} {element.user.lastName}</p>)
            }
        });
        this.setState({ drivers: driversList })
    }
    Register = () => {
        return;
    }
    async joinTeam() {
        const restURL = "/rest/memberships/" + this.props.data.id + "/join";
        await fetch(restURL, {
            method: "PUT",
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                message: this.state.message
            })
        }).then(response => {
            if (response.status === "200") {
                window.alert("Request was sent.")
            }
        })
        window.location.assign("/teams");

    }

    handleChangeMessage(value) {
        this.setState({ message: value });
    }
    render() {
        return (
            <div className="Team">
                <p className='Name'>{this.props.data.name}</p>
                <div className="Drivers">Drivers :</div>

                {this.state.drivers}
                <this.renderDelete />
                <this.renderJoin />
            </div>)
    }
}

export default Team;