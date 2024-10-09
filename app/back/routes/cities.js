const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const citySchema = new mongoose.Schema({}, { collection: 'cities' });
const City = mongoose.model('City', citySchema);

/**
 * @swagger
 * /api/cities/{dep}:
 *   get:
 *     summary: Get all cities for a given dep
 *     description: Retrieve a list of all cities for a given dep.
 *     parameters:
 *       - in: path
 *         name: dep
 *         schema:
 *           type: string
 *         required: true
 *         description: The departement code
 *     responses:
 *       200:
 *         description: A list of cities.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 */
router.get('/:dep', async (req, res) => {
    try {
        const cities = await City.find({ "properties.dep": req.params.dep });
        res.json(cities);
    } catch (err) {
        res.status(500).send(err);
    }
});

module.exports = router;
