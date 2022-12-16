'use strict'


const url = 'http://localhost:3000';
const test = document.querySelector('.test');



const fetchData = async() => {
        const options = {
            headers:{
                method: 'GET',
                'Content-Type':'application/xml'
            }
        }
        const response = await fetch(url, options);
        const xml = await response.text();
        // console.log(xml);
        test.append(xml);
        console.log(xml.includes('<drone>'));
}





fetchData();
