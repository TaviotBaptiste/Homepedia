const express = require('express');
const router = express.Router();
const { Pool } = require('pg');

// Configuration de la connexion à PostgreSQL
const pool = new Pool({
    user: 'epitech',
    host: '75.119.129.138',
    database: 'homepediadb',
    password: 'cifxec-capcux-3rahvU',
    port: 5432
});

/**
 * @swagger
 * /api/stats/{cityId}:
 *   get:
 *     summary: Get stats of a city
 *     description: Retrieve a list of stats of a city.
 *     parameters:
 *       - in: path
 *         name: cityId
 *         schema:
 *         type: string
 *         required: true
 *         description: The city number
 *     responses:
 *       200:
 *         description: A list of stats of a city.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 */
router.get('/:cityId', async (req, res) => {
    try {
        const cityId = req.params.cityId;
        const result = await pool.query(`
            SELECT nb_habitant, age_moyen, pop_active 
            FROM bdd.v_commune_2023 st 
            WHERE st.libelle = '${cityId}';
        `);
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Une erreur est survenue lors de la récupération des données' });
    }
});

module.exports = router;