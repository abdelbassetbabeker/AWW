import bcrypt from 'bcryptjs';

const users = [
    {
        full_name: 'admin',
        email: 'admin@gmail.com',
        password: bcrypt.hashSync('admin123', 10),
        role: 'admin',
    },

]

export default users