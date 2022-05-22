import Race from '../components/Race';
import RaceDetails from '../components/RaceDetails';
import React, { useEffect, useState } from "react";

import '../styles/UpcomingRaces.css';

function UpcomingRaces() {

  const restURL = "/rest/races/";
  const [races, setRaces] = useState([])
  const [show, setShow] = useState(false)
  const [detailToShow, setDetailToShow] = useState([])
  const [profileData, setProfileData] = useState([])

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
  function showDetails(detailToShow) {
    setDetailToShow(detailToShow);
    setShow(!show);
  }
  async function fetchData() {
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
        setRaces(data)
      })
  }

  useEffect(() => {
    fetchData()
    fetchUser()
  }, [])

  let raceList = [];

  races.forEach(race => {
    raceList.push(
      <Race key={race.id} data={race} user={profileData} showDetails={showDetails} />
    )
  });

  return (
    <div className="Page">
      <div className="UpcomingRaces">
        {raceList}
      </div>
      <RaceDetails onClose={showDetails} data={detailToShow} show={show} />
    </div>
  );
}

export default UpcomingRaces;
