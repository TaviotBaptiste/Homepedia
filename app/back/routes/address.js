const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Définir le schéma de la collection address
const addressSchema = new mongoose.Schema({
    key: String,
    label: String,
    lat: Number,
    lon: Number,
    location: {
        type: { type: String, default: 'Point' },
        coordinates: [Number]
    }
}, { collection: 'address' });

addressSchema.pre('save', function(next) {
    this.location = {
        type: 'Point',
        coordinates: [this.lon, this.lat]
    };
    next();
});

const Address = mongoose.model('Address', addressSchema);

// Créer un index géospatial 2dsphere sur le champ location
Address.createIndexes({ location: '2dsphere' });

/**
 * @swagger
 * /api/address:
 *   get:
 *     summary: Get addresses around a coordinate
 *     description: Retrieve a list of addresses around a given coordinate.
 *     parameters:
 *       - in: query
 *         name: lat
 *         schema:
 *           type: number
 *         required: true
 *         description: The latitude
 *       - in: query
 *         name: lon
 *         schema:
 *           type: number
 *         required: true
 *         description: The longitude
 *     responses:
 *       200:
 *         description: A list of addresses.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 */
router.get('/', async (req, res) => {
    const { lat, lon } = req.query;
    if (!lat || !lon) {
        return res.status(400).send("Latitude and Longitude are required");
    }
    try {
        const addresses = await Address.find({
            location: {
                $near: {
                    $geometry: {
                        type: "Point",
                        coordinates: [parseFloat(lon), parseFloat(lat)]
                    },
                    $maxDistance: 5000 // 5 km radius
                }
            }
        });
        res.json(addresses);
    } catch (err) {
        res.status(500).send(err);
    }
});

module.exports = router;
