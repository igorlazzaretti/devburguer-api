import * as Yup from 'yup';

class SessionController{
    async store( request, response) {

        const schema = Yup.object({
            email:Yup.string().email().required(),
            password: Yup.string().min(6).required(),
        });

        const isValid = await schema.isValid(request.body);

        if(!isValid) {
            return response.status(401).json({error: 'Make sure your email or password are correct'});
        }

        const {email, password} = request.body;

        const user = await User.findOne({
            where:{
                email,
            },
        });

        if (!user){
            return response
                .status(401)
                .json({ error: 'Make sure your email or password are correct'});
        }

        return response.json({ message: 'session'});
    }
}

export default new SessionController();