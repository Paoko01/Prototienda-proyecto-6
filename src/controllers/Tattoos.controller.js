import { getAllTattoosService, getTattoosByIdService, createReservaTattooService, updateReservaTattooService, deleteReservaTattooService } from '../services/Tattoos.service.js';
import { response } from '../Utils/templates/response.template.js';


export const getAllTattoos = async(req, res, next) => {
    try {
        const poleras = await getAllTattoosService();
        response(res, poleras, 200, 'Tatuajes encontrados con éxito');
    } catch (error) {
        next(error);
    }
};

export const getTattoosById = async(req, res, next) => {
    try {
        const { id } = req.params;
        const polera = await getTattoosByIdService(id);
        response(
            res,
            polera,
            200,
            `Tatuaje con el id: ${id} encontrada con éxito`,
        );
    } catch (error) {
        next(error);
    }
};



export const createReservaTattoo = async(req, res, next) => {
    try {
        const newReservaTattooData = req.body;
        console.log('Datos recibidos en el controlador (req.body):', newReservaTattooData);
        const reservas = await createReservaTattooService(newReservaTattooData);
        console.log('Documento creado por el servicio (en controlador):', reservas); // <-- Asegúrate de que usas la variable que recibe el await
        response(res, reservas, 201, 'Reserva creada con éxito');
    } catch (error) {
        next(error);
    }
};




export const updateReservaTattoo = async(req, res, next) => {
    try {
        const { id } = req.params;
        const updateData = req.body
        const reservaActualizada = await updateReservaTattooService(id, updateData);

        if (!reservaActualizada) {
            return response(res, null, 404, 'No se pudo actualizar ya que la reserva no se encuentra')
        }
        response(res, reservas, 200, 'Reserva creada con éxito');
    } catch (error) {
        next(error);
    }
};


export const deleteReservaTattoo = async(req, res, next) => {
    try {
        const reservas = await deleteReservaTattooService();
        response(res, reservas, 204, 'Reserva creada con éxito');
    } catch (error) {
        next(error);
    }
};