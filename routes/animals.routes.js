const express = require('express');
const db = require('./services/animals.service');
const AuthService = require('./services/auth');

const router = express.Router();

/* List of Animals */
router.get('/', AuthService.authenticateToken, db.getAnimals);

/* Single Animal */
router.get('/:id', AuthService.authenticateToken, db.getAnimalById);

/* Add an Animal */
router.post('/', AuthService.authenticateToken, db.createAnimal);

/* Update an Animal */
router.put('/:id', AuthService.authenticateToken, db.updateAnimal);

/* Delete an Animal */
router.delete('/:id', AuthService.authenticateToken, db.deleteAnimal);

module.exports = router;
