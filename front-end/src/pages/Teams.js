import React, { useEffect, useState } from "react";

import '../styles/Teams.css';
import Team from "../components/Team";
import JoinRequest from "../components/JoinRequest";

function Teams() {
    const [teams, setTeams] = useState([])
    const [profileData, setProfileData] = useState([])
    const [myTeam, setMyTeam] = useState([])

    async function fetchUser() {
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
                setProfileData(data);
            })
    }
    async function fetchMyTeam() {
        let restURL = "/rest/teams/myTeam";
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
                setMyTeam(data);
            })
    }

    async function fetchData() {
        let restURL = "/rest/teams/";
        await fetch(restURL, {
            headers: {
                method: "GET",
                'Content-Type': 'application/json',
            }
        })
            .then(response => {
                return response.json()
            })
            .then(data => {
                setTeams(data)
            })
    }

    useEffect(() => {
        fetchMyTeam()
        fetchData()
        fetchUser()
    }, [])



    function renderMyTeam() {
        if (myTeam.id != null) {
            let joinRequests = []
            if (myTeam.teamOwner.id === profileData.id) {
                myTeam.joinRequests.forEach(req => {
                    if (req.status === "PENDING") {
                        joinRequests.push(<JoinRequest key={req.id} data={req} team={myTeam} />)
                    }

                })
            }

            let members = []
            myTeam.memberships.forEach(mem => {
                if (mem.status === 'ACTIVE') {
                    members.push(<p key={mem.membershipId.membership_userid}>{mem.user.firstName} {mem.user.lastName}</p>)
                }
            })
            return (
                <div className="myTeam">
                    <h2>My team</h2>
                    <div className="Team">
                        <p className="Name">
                            Name : {myTeam.name}
                        </p>
                        <p className="MyTeammMebers">
                            Members :
                        </p>
                        {members}
                        <p className="MyTeammRequests">
                            Join requests :
                        </p>
                        {joinRequests}
                    </div>

                </div>

            )
        }
    }

    let teamList = [];
    teams.forEach(team => {
        teamList.push(
            <Team key={team.id} data={team} user={profileData} />
        )
    });
    return (
        <div className="Page">
            <div className="Teams">
                <a href="/newTeam">NEW TEAM</a>
                {renderMyTeam()}
                <h2>All teams</h2>
                {teamList}
            </div>
        </div>
    );
}

export default Teams;
