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

        
        const { filename: path } = request.file
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
            path,
        });

        return response.status(201).json({id, name});
    }
    
    // Update das Categorias
    async update(request, response){
        const schema = Yup.object({
            name: Yup.string(),
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

        // Qual é a categoria que estamos fazendo o update?
        const { id } = request.params

        const categoryExists = await Category.findByPk(id);

        if (!categoryExists){
            return reesponse.status(400).json({ error: 'Make sure your category ID is correct.'})
        }
        
        // Path Opcional
        let path = null
        if (request.file) {
            path = request.file.filename
        }

        const { name } = request.body;

        //verificamos se n existe o path nem name, retorna-se 200


        if (name) { 
          const categoryNameExists = await Category.findOne({
            where:{
                name,
            },
          });

          if (categoryNameExists && categoryNameExists.id != +id ) { 
            return response.status(400).json({ 
                error: 'Category already exists.'
            })
          }     
        }

        await Category.update({
            name,
            path,
        }, {
            where: {
                id,
            }
        });

        // const { id } = await Category.create({
        //     name,
        //     path,
        // });

        return response.status(200).json({/*id, name*/});
    }

    async index(request, response){
        const categories = await Category.findAll();

       // console.log({ userId: request.userId })
        return response.json(categories);
    }
}

export default new CategoryController();