import UpcomingRaces from '../pages/UpcomingRaces';
import Home from '../pages/Home';
import '../styles/Navbar.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import React, { useEffect, useState } from "react";
import MyProfile from '../pages/MyProfile';
import Teams from '../pages/Teams';
import NewTeam from '../pages/NewTeam';
import LoginSingUp from '../pages/LoginSignUp';
import AddCar from '../pages/AddCar';
import Garage from '../pages/Garage';
import MyRaces from '../pages/MyRaces';

const Navbar
    = () => {

        const [isLoggedIn, setIsLoggedIn] = useState(false)
        const [menuClass, setmenuClass] = useState("none")

        async function checkLoggedIn() {
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
                    setIsLoggedIn(data);
                })
        }
        useEffect(() => {
            checkLoggedIn();
        }, [])


        function showMenu(){
            if(menuClass === "none"){
                setmenuClass("show-menu");
            }
            else{
                setmenuClass("hide-menu");
            }
        }

        if (isLoggedIn) {
            return (
                <Router>
                    <div className="Navbar">
                        <div className="links">
                            <Link to="/">Home</Link>
                            <Link to="/upcomingRaces">Upcoming Races</Link>
                            <Link to="/myraces">My Races</Link>
                            <Link to="/teams">Teams</Link>
                            <Link to="/garage">Garage</Link>
                            <Link to="/myprofile">My Profile</Link>
                        </div>
                    </div>
                    <div className="navContain">
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/upcomingraces" element={<UpcomingRaces />} />
                            <Route path="/myprofile" element={<MyProfile />} />
                            <Route path="/teams" element={<Teams />} />
                            <Route path="/newTeam" element={<NewTeam />} />
                            <Route path="/newCar" element={<AddCar />} />
                            <Route path="/garage" element={<Garage />} />
                            <Route path="/myraces" element={<MyRaces />} />
                        </Routes>
                    </div>
                </Router>
            );
        } else {
            return (
                <Router>
                    <div className="Navbar">
                        <div className="links">
                            <Link to="/">Home</Link>
                            <Link to="/upcomingRaces">Upcoming Races</Link>
                            <Link to="/teams">Teams</Link>
                            <Link to="/login">Login/SignUp</Link>
                        </div>
                    </div>
                    <div className="navContain">
                        <Routes>
                            <Route exact path="/" element={<Home />} />
                            <Route path="/upcomingraces" element={<UpcomingRaces />} />
                            <Route path="/teams" element={<Teams />} />
                            <Route path="/newTeam" element={<NewTeam />} />
                            <Route path="/login" element={<LoginSingUp />} />
                            <Route path="/myraces" element={<MyRaces />} />
                            <Route path="/myprofile" element={<MyProfile />} />
                        </Routes>
                    </div>
                </Router>
            );
        }

    }

export default Navbar;
