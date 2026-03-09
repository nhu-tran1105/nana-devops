import express from 'express';
import * as Controllers from '../controllers/Controllers.js';

const router = express.Router();

router.get('/projects', (req, res) => Controllers.getAllItems(req, res, 'nana'));
router.post('/projects', (req, res) => Controllers.createItem(req, res, 'nana'));
router.put('/projects/:id', (req, res) => Controllers.updateItem(req, res, 'nana'));
router.delete('/projects/:id', (req, res) => Controllers.deleteItem(req, res, 'nana'));

export default router;