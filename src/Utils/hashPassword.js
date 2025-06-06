import bcrypt from 'bcrypt';
import { envs } from '../config/envs.config.js';
import { AuthError } from '../errors/TypeError.js';


const { saltRounds } = envs.auth;

export const hashPassword = async(password) => {
    try {
        const hashedPassword = await bcrypt.hash(password, Number(saltRounds));
        return hashedPassword;
    } catch (error) {
        throw new AuthError('Error al intentar hashear la contraseña', 500, error);
    }
};


export const comparePassword = async(plainPassword, hashedPassword) => {
    try {
        console.log('Plain password received:', plainPassword); // Lo que se envía del login
        console.log('Hashed password from DB:', hashedPassword); // Lo que se obtiene de la DB
        return await bcrypt.compare(plainPassword, hashedPassword);
    } catch (error) {
        throw new AuthError('Error al intentar comparar la contraseña', 500, error);
    }
};