const express = require('express');
const cors = require('cors');
require('dotenv').config();
const mongoose = require('mongoose');

//Swagger
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');


// Importez le fichier de route
const departmentRouter = require('./routes/department');
const regionRouter = require('./routes/region');
const citiesRouter = require('./routes/cities');
const addressRouter = require('./routes/address');
const priceRouter = require('./routes/price');
const statsRouter = require('./routes/stats');


const app = express();
const port = 3001; //Port server
const dbURI = `${process.env.MONGODB_URI}`; //Mongo String conneciton
const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API Documentation',
            version: '1.0.0',
            description: 'Documentation for your API endpoints'
        },
    },
    apis: ['./routes/*.js'], // Spécifiez les chemins vers vos fichiers de route contenant les commentaires JSDoc
};
// Initialisez Swagger
const specs = swaggerJsdoc(options);

// Utilisation du middleware CORS
app.use(cors());

mongoose.connect(dbURI)
    .then(() => console.log('Database connection successful'))
    .catch((err) => console.log('Database connection error:', err));


// Utilisez Swagger UI à l'URL /api-docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
app.use('/api/departments', departmentRouter);
app.use('/api/regions', regionRouter);
app.use('/api/cities', citiesRouter);
app.use('/api/address', addressRouter);
app.use('/api/price', priceRouter);
app.use('/api/stats', statsRouter);

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
