import Sequelize, { Model } from "sequelize";

class Product extends Model {
    static init(sequelize) {
        super.init({
            name: Sequelize.STRING,
            price: Sequelize.INTEGER,
            path: Sequelize.STRING,
            url: {
                type:Sequelize.VIRTUAL,
                get() {
                    return `http://localhost:3001/product-file/${this.path}`
                },
            },  
        },
        {
            sequelize,
        }
    ) 
    return this;
  }
}
export default Product;