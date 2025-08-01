import express from 'express';
import { mongoDB } from './config/db';
import app from './app';

mongoDB();

const PORT = process.env.PORT || 3000;
console.log("PORT :" , PORT);

app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));