const express = require('express');
const cors = require('cors');
require("dotenv").config();

const authRoutes = require('./routes/authRoutes');
const datasetRoutes = require('./routes/datasetRoutes');
const recordRoutes = require('./routes/recordRoutes');
const queriesRoutes = require('./routes/queriesRoutes');

const swaggerDocs = require('./swagger');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/datasets', datasetRoutes);
app.use('/records', recordRoutes);
app.use('/queries', queriesRoutes);

swaggerDocs(app);

module.exports = app;