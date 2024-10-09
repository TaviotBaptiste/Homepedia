const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const regionSchema = new mongoose.Schema({}, { collection: 'region' });
const Region = mongoose.model('Region', regionSchema);

/**
 * @swagger
 * /api/regions:
 *   get:
 *     summary: Get all regions
 *     description: Retrieve a list of all regions.
 *     responses:
 *       200:
 *         description: A list of regions.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 */
router.get('/', async (req, res) => {
    try {
        const regions = await Region.find();
        res.json(regions).value;
    } catch (err) {
        res.status(500).send(err);
    }
});

module.exports = router;