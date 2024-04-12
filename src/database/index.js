import Sequelize from 'sequelize';

import configDatabase from '../config/database';

import User from '../app/models/User';
import Product from '../app/models/Product';

const models = [User, Product];

class Database {
    constructor(){
        this.init();
    }
    init() {
        this.connection = new Sequelize(configDatabase);
        models.map((model) => model.init(this.connection));
    }
}

export default new Database();
