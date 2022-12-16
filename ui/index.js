'use strict'


const url = 'http://localhost:3000';
const test = document.querySelector('.test');

const nestOriginX = 250000;
const nestOriginY = 250000;
const nestRadius = 100000;

const fetchData = async() => {
        const options = {
            headers:{
                method: 'GET',
                'Content-Type':'application/xml'
            }
        }
        const response = await fetch(url, options);
        const xml = await response.text();
        // const result = JSON.stringify(xml, null, 2);
        // console.log(xml);
        const result = JSON.parse(xml);
        const resultArray = result.report.capture[0].drone;
        resultArray.forEach(drone => {
            const droneSerialNumber = drone.serialNumber;
            const droneX = drone.positionX;
            const droneY = drone.positionY;


            const droneDiv = document.createElement('div');
            const serialNumber = document.createElement('h3');
            const xCoords = document.createElement('p');
            const yCoords = document.createElement('p');

            serialNumber.innerHTML = 'Drone Serial Number: ' +  droneSerialNumber;
            xCoords.innerHTML = 'X Coords: ' + droneX;
            yCoords.innerHTML = 'Y Coords: ' + droneY;

            const droneViolated = Math.sqrt((Math.pow((nestOriginX - droneX),2)) + (Math.pow((nestOriginY - droneY),2)));


            if (droneViolated < nestRadius){
                console.log('Drone violated: ', droneViolated);
            }

            console.log(Math.sqrt((Math.pow((nestOriginX - droneX),2)) + (Math.pow((nestOriginY - droneY),2))));

            droneDiv.appendChild(serialNumber);
            droneDiv.appendChild(xCoords);
            droneDiv.appendChild(yCoords);
            test.append(droneDiv);
        });
}





fetchData();
