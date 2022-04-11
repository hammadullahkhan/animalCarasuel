const express = require('express');
const db = require('./services/categories.service');
const AuthService = require('./services/auth');

const router = express.Router();

/* List of Categories */
router.get('/', AuthService.authenticateToken, db.getCategories);

/* Create Category */
router.post('/', AuthService.authenticateToken, db.createCategory);

/* Update Category */
router.put('/:id', AuthService.authenticateToken, db.updateCategory);

/* Delete an Category */
router.delete('/:id', AuthService.authenticateToken, db.deleteCategory);

module.exports = router;
