import React, { Component } from "react";
import "../styles/JoinRequest.css"

class JoinRequest extends Component {

    constructor(props) {
        super(props);
        this.Accept = this.Accept.bind(this);
    }
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
    Accept() {
        const restURL = "/rest/memberships/" + this.props.team.id + "/requests";
        fetch(restURL, {
            method: "PUT",
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: this.props.data.id,
                status: "ACCEPTED"
            })
        })
        window.location.assign("/teams");
    }
    Deny() {
        const restURL = "/rest/memberships/" + this.props.team.id + "/requests";
        fetch(restURL, {
            method: "PUT",
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: this.props.data.id,
                status: "REJECTED"
            })
        })
        window.location.assign("/teams");
    }
    render() {
        return (
            <div className="JoinRequest">
                <p className="user">{this.props.data.user.firstName} {this.props.data.user.lastName} : </p>
                <p className='Message'>{this.props.data.message}</p>
                <button className="accept" onClick={this.Accept}>ACCEPT</button>
                <button className="accept" onClick={this.Deny}>DENY</button>
            </div>)
    }
}

export default JoinRequest;