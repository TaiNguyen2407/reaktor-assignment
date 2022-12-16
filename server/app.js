'use strict'
const express = require('express');
const { xml2json } = require('xml-js');
const app = express();
const cors = require('cors');
// const xmlparser = require('express-xml-bodyparser');
const xml2js = require('xml2js');

const port = 3000;
// app.use(xmlparser());
app.use(cors());
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({extended: true})); //for parsing application( x- ww form-urlencoded<

app.get('/', async(req,res) => {
    const url = 'https://assignments.reaktor.com/birdnest/drones';
    const options = {
        headers:{
            method: 'GET',
            'Content-Type':'application/xml'
        }
    }
    const response = await fetch(url, options);
    const xml = await response.text();
    const parser = new xml2js.Parser({});
    const preResult = await parser.parseStringPromise(xml);
    const result = JSON.stringify(preResult, null, 2);
    res.status(201).send(result);
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`));