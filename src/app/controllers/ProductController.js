import * as Yup from 'yup';
import Product from '../models/Product';
import Category from '../models/Category';
import User from '../models/User';

class ProductController {
    async store(request, response){
        const schema = Yup.object({
            name: Yup.string().required(),
            price: Yup.number().required(),
            category_id: Yup.number().required(),
            offer: Yup.boolean(),
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

        const { name, price, category_id, offer } = request.body 

        const product = await Product.create({
            name,
            price,
            category_id,
            path,
            offer,
        });

        return response.status(201).json(product);
    };

      async index(request, response){
        const products = await Product.findAll({
            include: [
                {
                    model: Category,
                    as: 'category',
                    attributes: [ 'id', 'name']
                }
            ]
        });

       // console.log({ userId: request.userId })
        return response.json(products);
    }



    // Update Store
    async update(request, response){
        const schema = Yup.object({
            name: Yup.string(),
            price: Yup.number(),
            category_id: Yup.number(),
            offer: Yup.boolean(),
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
        };
        // de qual produto será o update
        const { id } = request.params;
        const findProduct = await Product.findByPk(id);
        if(!findProduct){
            return response.status(400).json({ error: 'Make sure your product ID is correct!'})
        };
        // deixa o arquivo opcional
        let path 
        if (request.file) {
            path = request.file.filename
        }

        const { name, price, category_id, offer } = request.body;

        // juntamente com o path passamos essas informacoes = onde o id for
        await Product.update({
            name,
            price,
            category_id,
            path,
            offer,
        }, {
            where: {
                id,
            }
        });

        return response.status(200).json();
    }
}

export default new ProductController();