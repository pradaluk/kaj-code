import React, { useEffect, useState } from "react";
import Car from '../components/Car.js'
import '../styles/Team.css'
function Teams() {
    const [cars, setCars] = useState([])

    const fetchData = () => {
        let restURL = "/rest/cars/getMyCars";
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
                setCars(data)
            })
    }

    useEffect(() => {
        fetchData()
    }, [])

    let carList = [];
    cars.forEach(car => {
        carList.push(
            <Car key={car.id} data={car} />
        )
    });
    return (
        <div className="Page">
            <div className="Cars">
                <a href="/newCar">NEW CAR</a>
                {carList}
            </div>
        </div>
    );
}

export default Teams;
