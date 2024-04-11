
import { Router } from 'express';
import { v4 } from 'uuid';

import User from './app/models/User';

const routes = new Router()


routes.get('/', async (request, response) => {
    const user = await User.create({
        id: v4(),
        name: 'Igor',
        email: 'idlazzaretti.com',
        passowrd_hash: 'hauehuehEHUe23'
    });
   return response.status(201).json(user); 
});

module.exports = routes