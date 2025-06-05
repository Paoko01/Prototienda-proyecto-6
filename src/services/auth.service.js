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

export const loginService = async({ correo, password }) => {
    try {    
        const user = await Usuario.findOne({ correo }); 
        
        const passwordMatch = await comparePassword(password, user.password);

        if(!user || !passwordMatch) {
            throw new AuthError('Credenciales incorrectas', 401);
        }

        const token = jwt.sign({
            uid: user._id,
            nombre: user.nombre,
            correo: user.correo,
            isAdmin: user.isAdmin
        }, secretKey, {
            expiresIn: jwtExpiration
        });

        return [ user, token];
    } catch (error) {
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