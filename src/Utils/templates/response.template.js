export const response = (res, data, statusCode, message) => {
    console.log('Datos recibidos por response.template.js:', data);
    res.status(statusCode).json({
        message: message || 'Petición procesada con éxito',
        statusCode,
        data: data
    });
};