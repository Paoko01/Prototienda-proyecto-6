// src/middlewares/auth.middleware.js
import jwt from 'jsonwebtoken';
import { envs } from '../config/envs.config.js';
import { AuthError } from '../errors/TypeError.js';

const { secretKey } = envs.auth;

export const authMiddleware = (req, res, next) => {
    try {
        const { authorization } = req.headers;

        // PASO CLAVE: Verificar si la cabecera 'authorization' existe
        if (!authorization) {
            // Si no hay cabecera de autorización, lanzamos un error de falta de token.
            throw new AuthError('Token no proporcionado', 401);
        }

        // Ahora que sabemos que authorization existe, podemos usar startsWith de forma segura.
        // También podemos refinar la verificación del formato del token.
        const token = authorization.startsWith('Bearer ')
            ? authorization.slice(7)
            : null;

        // Si el token no tiene el prefijo 'Bearer ' o no se pudo extraer, es un formato inválido.
        if (!token) {
            throw new AuthError('Formato de token inválido. Debe ser "Bearer <token>"', 401);
        }

        // Verificar y decodificar el token
        const decoded = jwt.verify(token, secretKey);
        req.user = decoded;

        next();
    } catch (error) {
        // Mejorar el manejo de errores para ser más específico con JWT
        if (error.name === 'JsonWebTokenError') {
            // Error específico de JWT (malformado, firma inválida)
            throw new AuthError(`Token JWT inválido: ${error.message}`, 401);
        }
        if (error.name === 'TokenExpiredError') {
            // Error específico de token expirado
            throw new AuthError('Token JWT expirado', 401);
        }
        // Para cualquier otro error (incluido el TypeError original que ahora debería ser evitado)
        // Usamos un 500 si es un error inesperado, pero para errores de autenticación, 401 es más apropiado.
        console.error('Error inesperado en authMiddleware:', error);
        throw new AuthError('Error de autenticación inesperado', 500, error);
    }
};