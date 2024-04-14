import * as Yup from 'yup';
import Category from '../models/Category';
import User from '../models/User'

class CategoryController {
    async store(request, response){
        const schema = Yup.object({
            name: Yup.string().required(),

        });

        try {
            await schema.validateSync(request.body, { abortEarly: false })
        } catch (err) {
            return response.status(400).json({ error: err.errors })
        }

        // Verifica se o usuário é admin

        const { admin: isAdmin } = await User.findByPk(request.userId)

        if (!isAdmin) {
            return response.status(401).json( { Error: 'Usuário não autorizado. Usuário não é administrador.'});
        }

        const { name } = request.body;

        const categoryExists = await Category.findOne({
            where:{
                name,
            },
        });

        if (categoryExists) { 
            return response.status(400).json({ 
                error: 'Category already exists.'
            })
        }

        const { id } = await Category.create({
            name,
        });

        return response.status(201).json({id, name});
    }



    async index(request, response){
        const categories = await Category.findAll();

       // console.log({ userId: request.userId })
        return response.json(categories);
    }
}

export default new CategoryController();