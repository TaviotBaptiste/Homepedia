const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const departmentSchema = new mongoose.Schema({}, { collection: 'department' });
const Department = mongoose.model('department', departmentSchema);

/**
 * @swagger
 * /api/departments/{reg}:
 *   get:
 *     summary: Get all departments
 *     description: Retrieve a list of all departments.
 *     parameters:
 *       - in: path
 *         name: reg
 *         schema:
 *         type: integer
 *         required: true
 *         description: The region number
 *     responses:
 *       200:
 *         description: A list of departments.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 */
router.get('/:reg', async (req, res) => {
    try {
        const departments = await Department.find({ "properties.reg": req.params.reg });
        res.json(departments);
    } catch (err) {
        res.status(500).send(err);
    }
});

module.exports = router;
