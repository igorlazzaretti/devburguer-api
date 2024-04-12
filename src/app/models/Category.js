import Sequelize, { Model } from "sequelize";

class Category extends Model {
    static init(sequelize) {
        super.init(
            {
            name: Sequelize.STRING,
            },  
                {
            sequelize,
        }
    ) 
    return this;
  }

  //Associação do Product com o Category:
  static associate(models){
    this.belongsTo(models.Category, {
        foreignKey: 'category_id',
        as: 'category',
        
    });

  }
}
export default Category;