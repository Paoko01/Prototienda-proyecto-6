import { Tattoo } from '../models/Tattoos.model.js';
import { CustomError } from "../errors/CustomError.js";

export const getAllTattoosService = async () => {
    try {
        const tattoos = await Tattoo.find().select('-__v');
        return tattoos;
    } catch (error) {
        console.error('Error en getAllTattoosService: ', error);
        throw new CustomError('Error al obtener los tatuajes', 500, error.message);
    };
};

export const getTattoosByIdService = async (id) => { // <-- Solo recibe el ID
    try {
        const tattoo = await Tattoo.findById(id).select('-__v'); // Cambia el nombre a singular aquí
        if (!tattoo) {
            throw new CustomError('Tatuaje no encontrado', 404); // Error si no se encuentra
        }
        return tattoo; // <-- Simplemente devuelve los datos
    } catch (error) {
        console.error('Error en getTatuajeByIdService:', error);
        // Si el ID tiene un formato incorrecto de MongoDB, Mongoose lanzará un CastError
        if (error.name === 'CastError') {
            throw new CustomError('Formato de ID de tatuaje inválido', 400);
        }
        throw new CustomError('Error al obtener el tatuaje por ID', 500, error.message); // Lanza un error
    }
};



// 1. Servicio para crear una reserva de tatuaje
export const createReservaTattooService = async (newReservaTattooData) => {
    // 1. Validar que los datos existan
    if (!newReservaTattooData || typeof newReservaTattooData !== 'object') {
        throw new BadRequestError('Datos de reserva de tatuaje no proporcionados o inválidos.');
    }

    // 2. Mongoose automáticamente gestiona los IDs (_id), no necesitas uuidv4 si usas _id
    // Si realmente necesitas un 'id' custom como string, asegúrate de añadirlo al esquema
    // y podrías generarlo aquí si lo necesitas.
    // const customId = uuidv4(); // Si usas un campo 'id' string en tu modelo

    // 3. Crear una nueva instancia del modelo de Mongoose
    try {
        const newReservaTattoo = new Tattoo(newReservaTattooData);

        // 4. Mongoose valida según el esquema, no necesitas un loop manual de propiedades.
        //    Los valores por defecto y los 'required' se manejan en el propio esquema de Mongoose.
        //    Aquí Mongoose aplicará las reglas del esquema (tipos, required, enums, defaults).

        // 5. Guardar la reserva en la base de datos
        const savedReserva = await newReservaTattoo.save();
        return savedReserva;
    } catch (error) {
        console.error('Error al crear la reserva de tatuaje:', error);
        // Manejo de errores de validación de Mongoose
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(val => val.message);
            throw new BadRequestError(`Error de validación al crear la reserva: ${messages.join(', ')}`);
        }
        throw new CustomError('Error al crear la reserva de tatuaje', 500, 'No se pudo guardar la reserva en la base de datos.');
    }
};

// 2. Servicio para actualizar una reserva de tatuaje
export const updateReservaTattooService = async (id, updateData) => {
    if (!updateData || typeof updateData !== 'object') {
        throw new BadRequestError('Datos de actualización no proporcionados o inválidos.');
    }

    try {
        // Mongoose encuentra y actualiza el documento. { new: true } retorna el documento actualizado.
        // { runValidators: true } asegura que las validaciones del esquema se ejecuten en la actualización.
        const updatedReserva = await Tattoo.findByIdAndUpdate(
            id,
            updateData,
            { new: true, runValidators: true }
        );

        if (!updatedReserva) {
            throw new NotFoundError(`Reserva de tatuaje con ID ${id} no encontrada para actualizar.`);
        }
        return updatedReserva;
    } catch (error) {
        console.error(`Error al actualizar la reserva de tatuaje con ID ${id}:`, error);
        if (error.name === 'CastError') {
            throw new BadRequestError(`ID de reserva inválido: ${id}.`);
        }
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(val => val.message);
            throw new BadRequestError(`Error de validación al actualizar la reserva: ${messages.join(', ')}`);
        }
        throw new CustomError('Error al actualizar la reserva de tatuaje', 500, 'No se pudo actualizar la reserva en la base de datos.');
    }
};

// 3. Servicio para eliminar una reserva de tatuaje
export const deleteReservaTattooService = async (id) => {
    try {
        const deletedReserva = await Tattoo.findByIdAndDelete(id);

        if (!deletedReserva) {
            throw new NotFoundError(`Reserva de tatuaje con ID ${id} no encontrada para eliminar.`);
        }
        return true; // Retornar true si se eliminó exitosamente
    } catch (error) {
        console.error(`Error al eliminar la reserva de tatuaje con ID ${id}:`, error);
        if (error.name === 'CastError') {
            throw new BadRequestError(`ID de reserva inválido: ${id}.`);
        }
        throw new CustomError('Error al eliminar la reserva de tatuaje', 500, 'No se pudo eliminar la reserva de la base de datos.');
    }
};