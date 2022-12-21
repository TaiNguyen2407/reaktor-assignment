const express = require("express");
const router = express.Router();

router.get('/:serialNumber', async(req, res) => {
    const response = await fetch('/:serialNumber');
    const json = await response.json();
    // res.status(201).send(result);
    console.log(json);
})


module.exports = router;