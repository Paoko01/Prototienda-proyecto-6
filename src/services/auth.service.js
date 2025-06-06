import jwt from 'jsonwebtoken';
import { AuthError } from '../errors/TypeError.js';
import { Usuario } from '../models/Usuarios.model.js';
import { formateUserData } from '../Utils/formateUserCreate.js';
import { comparePassword, hashPassword } from '../Utils/hashPassword.js';

import { envs } from '../config/envs.config.js';

const { secretKey, jwtExpiration } = envs.auth;


export const registerService = async({ 
    nombre, 
    apellido, 
    correo, 
    telefono, 
    fecha_nacimiento, 
    password, 
    isAdmin = false
}) => {
    try {
        const hashedPassword = await hashPassword(password);

        //SOLID
        const userData = formateUserData(hashedPassword, 
            nombre, 
            apellido, 
            correo, 
            telefono, 
            fecha_nacimiento, 
            isAdmin
        );

        const user = await Usuario.create(userData);

        return user;
    } catch (error) {
        console.error('Error en registerService:', error);
        throw error;   
    }
};


//SH256 -> SMAC-SSH
export const loginService = async ({ correo, password }) => {
    try {
        const user = await Usuario.findOne({ correo });

        // Si el usuario no existe, o la contraseña no coincide, lanzamos el error 401 directamente
        // Es importante hacer la comparación solo si el usuario existe para evitar errores de user.password
        if (!user || !(await comparePassword(password, user.password))) {
            throw new AuthError('Credenciales incorrectas', 401);
        }

        // Si todo es correcto, generamos el token
        const token = jwt.sign({
            uid: user._id,
            nombre: user.nombre,
            correo: user.correo,
            isAdmin: user.isAdmin
        }, secretKey, {
            expiresIn: jwtExpiration
        });

        // Devolvemos el usuario y el token
        return [user, token];

    } catch (error) {
        // Si el error ya es una instancia de AuthError (como 'Credenciales incorrectas'),
        // lo relanzamos directamente para mantener el statusCode original.
        if (error instanceof AuthError) {
            throw error;
        }

        // Para cualquier otro error inesperado (ej. error de DB, problema con jwt.sign/verify),
        // lanzamos un error 500 general.
        console.error('Error inesperado en loginService:', error); // Loggear el error original
        throw new AuthError('Error al intentar iniciar sesión', 500, error);
    }
};


export const getAllUsersService = async() => {
    try {
        const users = await Usuario.find({ isActive: true });
        console.log(users);
        return users;
    } catch (error) {
        throw new Error('Error al intentar obtener todos los usuarios', 500, error);
    }
};