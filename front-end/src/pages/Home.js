
import CreateRace from '../components/CreateRace';
import AddCircuit from "../components/AddCircuit";
import { Component } from "react";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      profileData: [],
    }
    this.renderCreate = this.renderCreate.bind(this)
  }
  async checkLoggedIn() {
    let restURL = "/rest/users/isLoggedIn";
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
        this.setState({ isLoggedIn: data });
      })
  }

  componentDidMount() {
    this.checkLoggedIn()
    this.fetchUser()
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
        this.setState({ profileData: data });
      })
  }

  renderCreate() {
    console.log(this.state.profileData)
    if (this.state.profileData.role === "ADMIN" || this.state.profileData.role === "ORGANIZER") {
      return (<div><CreateRace />
        <AddCircuit /></div>);
    }
  }

  render() {
    return (
      <div>
        <h2>Welcome to the app</h2>
        <this.renderCreate />
      </div>
    );
  }

}

export default Home;