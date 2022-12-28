'use strict'


const url = 'http://localhost:3000';

const main = document.querySelector('.main');

// Declare global constant variable which are nest location and nest radius
const nestOriginX = 250000;
const nestOriginY = 250000;
const nestRadius = 100000;
let droneArr = [];
let distinctDroneArr = [];

// Function to fetch drone data, display whichever drone is in violated zone, and display pilots information
// Set interval is to let data fetched every 2 seconds
const fetchData = setInterval(async() => {
    // Data fetch from XML file and turns into JSON
    const response = await fetch(url + '/drones');
    const xml = await response.text();
    const result = JSON.parse(xml);
    
    const drones = result.report.capture[0].drone;
    drones.forEach(drone => {
        const droneSerialNumber = drone.serialNumber;
        const droneX = drone.positionX;
        const droneY = drone.positionY;

        // Create HTML element with DOM
        const violatedDroneDiv = document.createElement('div');
        const violatedDrones = document.createElement('h4');
            
        // Function to calculate distance of every drone appears on the list to the nest
        const droneDistance = Math.sqrt((Math.pow((nestOriginX - droneX),2)) + (Math.pow((nestOriginY - droneY),2)));

        // If distance is smaller or equal to nest radius, which is 100 meters
        // Display violated drone serial numbers, distance and pilot information on HTML page
        if (droneDistance <= nestRadius){
            // Adding violated drones serial number to drone array
            droneArr.push(droneSerialNumber.toString());
            droneArr.forEach(item => {
                // Pick from drone array only distinct value of drone serial number 
                if(distinctDroneArr.indexOf(item) < 0){
                    // If yes, push the distinct drone serial number to the new array - distinctDroneArr
                    distinctDroneArr.push(item);
                    // Then set DOM element content with new values from distinctDroneArr
                    // As a result, index.html will only show drone serial number and its pilot information once
                    violatedDrones.innerHTML = 'Drone number: ' + item + ' and Distance to nest: ' + roundNumber(droneDistance, 2);
                    // Fetch pilot info with drone serial number from distinctDroneArr
                    fetchPilotInfo(item);
                }
            })
        }

        // Append HTML element to its parents
        violatedDroneDiv.appendChild(violatedDrones);
        main.appendChild(violatedDroneDiv);

        localStorage.setItem('drones', violatedDrones.innerHTML);

        // Violated drones serial number and distance will disappear after 10 mins = 600 seconds
        setTimeout(() => {
            localStorage.removeItem('drones');
            violatedDroneDiv.innerHTML = localStorage.getItem('drones');
        },600000);
    });   
}, 2000);



// Function to fetch pilot data according to drone serial number
const fetchPilotInfo = async(serialNumber) => {
    // Fetch data as JSON file
    const response = await fetch(url + '/pilots/' + serialNumber);
    const pilot = await response.json();

    // Create HTML with DOM element
    const pilotInfo = document.createElement('div');
    const pilotName = document.createElement('p');
    const pilotEmail = document.createElement('p');
    const pilotPhoneNumber = document.createElement('p');
    const pilotSerial = document.createElement('h4');


    // Assign values to HTML elements
    pilotSerial.innerHTML = 'Serial Number: ' + serialNumber;
    pilotName.innerHTML = 'pilot name: ' + pilot.firstName + ' ' + pilot.lastName;
    pilotEmail.innerHTML = 'pilot email: ' + pilot.email;
    pilotPhoneNumber.innerHTML = 'pilot phone number: ' + pilot.phoneNumber;

    

    // Append elements to parent div
    pilotInfo.appendChild(pilotSerial);
    pilotInfo.appendChild(pilotName);
    pilotInfo.appendChild(pilotEmail);
    pilotInfo.appendChild(pilotPhoneNumber);
    main.append(pilotInfo);

    localStorage.setItem('pilots', pilotInfo);

    // Pilot information will disappear after 10 mins = 600 seconds
    setTimeout(() => {
        localStorage.removeItem('pilots');
        pilotInfo.innerHTML = localStorage.getItem('pilots');
    },600000);
}




//Function to round up distance value to 2 decimals and to meters.
const roundNumber = (value, decimals) => {
    return Number(Math.round(value/1000 + 'e' + decimals) + 'e-' + decimals) + 'm';
}

