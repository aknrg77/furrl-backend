const express = require('express');
const routes = express.Router();
const {createTicket, updateTicket,assignTicket, getTicket, getAllTicket, markAsDone} = require('../controllers/tickets')
const {validateCreateTicketBody, validateUpdateTicketBody, validateAssignTicketBody, validateMarkAsDone} = require('../middleware/tickets');
const {setUser} = require('../middleware/users');

routes.post('/new',setUser, validateCreateTicketBody, createTicket);
routes.patch('/:id',setUser, validateUpdateTicketBody, updateTicket);
routes.post('/assign/:id',setUser, validateAssignTicketBody, assignTicket);
routes.post('/done/:id',setUser, validateMarkAsDone, markAsDone);
routes.get('/all', getAllTicket);
routes.get('/', getTicket);

module.exports = routes;