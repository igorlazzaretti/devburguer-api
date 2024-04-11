
import { Router } from 'express'

import User from './app/models/user';

const routes = new Router()


routes.get('/', async (request, response) => {
    const user = await User.create({
        name: 'Igor',
        email: 'idlazzaretti.com',
        passowrd_hash: 'hauehuehEHUe23'
    });
   return response.status(201).json(user); 
});

module.exports = routes