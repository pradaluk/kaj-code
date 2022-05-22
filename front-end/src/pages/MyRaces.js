import React, { useEffect, useState } from "react";
import Result from "../components/Result";
function MyRaces() {
    const [myResults, setMyResults] = useState([])

    const fetchResults = () => {
        let restURL = "/rest/results/myResults/";
        fetch(restURL, {
            method: "GET",
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(response => {
                return response.json()
            })
            .then(data => {
                setMyResults(data)
            })
    }
    useEffect(() => {
        fetchResults()
    }, [])

    let resList = [];
    Array.from(myResults).forEach(res => {
        resList.push(
            <Result key={res.id} data={res} />
        )
    });
    return (
        <div className="Page">
            <h2>My Races</h2>
            <div className="MyResults">
                {resList}
            </div>
        </div>
    );
}

export default MyRaces;
