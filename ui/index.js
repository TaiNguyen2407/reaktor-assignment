'use strict'


const url = 'http://localhost:3000';
const test = document.querySelector('.test');

const nestOriginX = 250000;
const nestOriginY = 250000;
const nestRadius = 100000;

// const fetchData = setInterval(async() => {
//     const response = await fetch(url + '/drones');
//         const xml = await response.text();
//         const result = JSON.parse(xml);
//         let count = 0;
//         let violated = [];
//         const drones = result.report.capture[0].drone;
//         drones.forEach(drone => {
//             const droneSerialNumber = drone.serialNumber;
//             const droneX = drone.positionX;
//             const droneY = drone.positionY;

//             const violatedDroneDiv = document.createElement('div');
//             const violatedDrones = document.createElement('h4');
            

//             const droneDistance = Math.sqrt((Math.pow((nestOriginX - droneX),2)) + (Math.pow((nestOriginY - droneY),2)));


//             if (droneDistance <= nestRadius){
//                 violatedDrones.innerHTML = 'Drone number: ' + droneSerialNumber + ' and Distance to nest: ' + roundNumber(droneDistance, 2);
//                 fetchPilotInfo(droneSerialNumber);
//                 count++;
//             }

//             violatedDroneDiv.appendChild(violatedDrones);
//             test.appendChild(violatedDroneDiv);
//         });   
// }, 2000);

// const fetchData = async() => {
//         const response = await fetch(url + '/drones');
//         const xml = await response.text();
//         const result = JSON.parse(xml);
//         let count = 0;
//         let violated = [];
//         const drones = result.report.capture[0].drone;
//         drones.forEach(drone => {
//             const droneSerialNumber = drone.serialNumber;
//             const droneX = drone.positionX;
//             const droneY = drone.positionY;

//             const violatedDroneDiv = document.createElement('div');
//             const violatedDrones = document.createElement('p');
            

//             const droneDistance = Math.sqrt((Math.pow((nestOriginX - droneX),2)) + (Math.pow((nestOriginY - droneY),2)));


//             if (droneDistance <= nestRadius){
//                 violatedDrones.innerHTML = 'Drone number:' + droneSerialNumber + ' \n and Distance to nest: ' + roundNumber(droneDistance, 2);
//                 fetchPilotInfo(droneSerialNumber);
//                 count++;
//             }

//             violatedDroneDiv.appendChild(violatedDrones);
//             test.appendChild(violatedDroneDiv);
//         });   
        
// }

// fetchData;

const fetchPilotInfo = async(serialNumber) => {
    const response = await fetch(url + '/pilots/' + serialNumber);
    const pilot = await response.json();

    //Create HTML with DOM element
    const pilotInfo = document.createElement('div');
    const pilotName = document.createElement('p');
    const pilotEmail = document.createElement('p');
    const pilotPhoneNumber = document.createElement('p');
    const pilotSerial = document.createElement('h4');


    //Assign values to HTML elements
    pilotSerial.innerHTML = 'Serial Number: ' + serialNumber;
    pilotName.innerHTML = 'pilot name: ' + pilot.firstName + ' ' + pilot.lastName;
    pilotEmail.innerHTML = 'pilot email: ' + pilot.email;
    pilotPhoneNumber.innerHTML = 'pilot phone number: ' + pilot.phoneNumber;

    

    //Append elements to parent div
    pilotInfo.appendChild(pilotSerial);
    pilotInfo.appendChild(pilotName);
    pilotInfo.appendChild(pilotEmail);
    pilotInfo.appendChild(pilotPhoneNumber);
    test.append(pilotInfo);
}




//Function to round up distance value to 2 decimals and to meters.
const roundNumber = (value, decimals) => {
    return Number(Math.round(value/1000 + 'e' + decimals) + 'e-' + decimals) + 'm';
}


