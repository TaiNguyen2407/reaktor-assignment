'use strict'
const express = require('express');
const app = express();
const cors = require('cors');
const xml2js = require('xml2js');

const port = 3000;


app.use(cors());
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({extended: true})); //for parsing application( x- ww form-urlencoded<

const url = 'https://assignments.reaktor.com/birdnest';

app.get('/drones', async(req,res) => {
    const response = await fetch(url + '/drones');
    const xml = await response.text();
    const parser = new xml2js.Parser({});
    const preResult = await parser.parseStringPromise(xml);
    const result = JSON.stringify(preResult, null, 2);
    res.status(201).send(result);
})


app.get('/pilots/:serialNumber', async(req,res) => {
    const response = await fetch(url + '/pilots/' + req.params.serialNumber);
    const json = await response.json();
    res.status(201).send(json);
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`));