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
 * /api/price/reg:
 *   get:
 *     summary: Get price of all regions.
 *     description: Retrieve a list of prices for all regions.
 *     responses:
 *       200:
 *         description: A list of price for all regions.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 */
router.get('/reg', async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT code_region_insee code, ROUND(AVG(prix_m2)) AS price
            FROM public.surface_price sp
            GROUP BY code_region_insee
            ORDER BY code_region_insee
        `);
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Une erreur est survenue lors de la récupération des données' });
    }
});

/**
 * @swagger
 * /api/price/dep/{regId}:
 *   get:
 *     summary: Get price of all departments in region
 *     description: Retrieve a list of prices of all departments in region.
 *     parameters:
 *       - in: path
 *         name: regId
 *         schema:
 *         type: integer
 *         required: true
 *         description: The region number
 *     responses:
 *       200:
 *         description: A list of prices of all departments in region.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 */
router.get('/dep/:regId', async (req, res) => {
    try {
        const regId = req.params.regId;
        const result = await pool.query(`
            SELECT code_departement_insee code, ROUND(AVG(prix_m2)) AS price
            FROM public.surface_price sp
            WHERE code_region_insee = '${regId}'
            GROUP BY code_departement_insee
            ORDER BY code_departement_insee
        `);
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Une erreur est survenue lors de la récupération des données' });
    }
});

/**
 * @swagger
 * /api/price/city/{depId}:
 *   get:
 *     summary: Get price of all cities in department
 *     description: Retrieve a list of prices of all cities in department.
 *     parameters:
 *       - in: path
 *         name: depId
 *         schema:
 *         type: integer
 *         required: true
 *         description: The department number
 *     responses:
 *       200:
 *         description: A list of prices of all cities in department.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 */
router.get('/city/:depId', async (req, res) => {
    try {
        const depId = req.params.depId;
        const result = await pool.query(`
            SELECT code_commune_insee code, ROUND(AVG(prix_m2)) AS price
            FROM public.surface_price sp
            WHERE code_departement_insee = '${depId}'
            GROUP BY code_commune_insee
            ORDER BY code_commune_insee
        `);
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Une erreur est survenue lors de la récupération des données' });
    }
});

module.exports = router;
