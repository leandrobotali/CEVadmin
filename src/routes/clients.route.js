import express from 'express';
const router = express.Router();

import {clients} from '../daos/daoMySql'

//------------------------------------------
//Apis
router.get('/', clients.getClients);

router.get('/busq', clients.getClientsBusq);

router.get('/:id', clients.getClientsById);

router.post('/', clients.save);

router.put('/:id', clients.updateById);

router.delete('/:id', clientsdeleteById);

export default router;