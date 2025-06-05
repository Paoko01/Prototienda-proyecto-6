// src/models/Tattoos.model.js

import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const printSchema = new Schema(
    {
        // NO usar "type": "object", "properties", ni "required" aquí
        // Definir los campos directamente con la sintaxis de Mongoose
        id: {
            type: String, // Tipo de Mongoose (String, Number, Date, Boolean, ObjectId, Array)
            description: "Identificador único de la reserva" // Descripción (opcional, para documentación)
            // No se recomienda si usas _id de Mongoose, si lo necesitas, asegúrate de un valor único
            // Si quieres un ID personalizado, podrías poner: default: () => new mongoose.Types.ObjectId().toString()
        },
        clienteId: {
            type: String, // O mongoose.Schema.Types.ObjectId si hace referencia a un modelo de cliente
            required: true, // Validación de Mongoose: el campo es obligatorio
            description: "ID del cliente que hace la reserva"
        },
        fecha: {
            type: Date, // Para fechas, usa el tipo Date de Mongoose
            required: true,
            description: "Fecha de la cita del tatuaje"
        },
        horaInicio: {
            type: String, // Podría ser Date si manejas horas como Date, o String si es "HH:MM"
            required: true,
            description: "Hora de inicio de la cita (ej. '14:00')"
        },
        descripcionTatuaje: {
            type: String,
            required: true,
            description: "Breve descripción de la idea o diseño del tatuaje"
        },
        tamanoEstimado: {
            type: String,
            enum: ["pequeño", "mediano", "grande", "personalizado"], // Validación enum de Mongoose
            description: "Tamaño estimado del tatuaje"
        },
        ubicacionCuerpo: {
            type: String,
            description: "Parte del cuerpo donde se realizará el tatuaje"
        },
        estado: {
            type: String,
            enum: ["pendiente", "confirmada", "cancelada", "reprogramada", "completada"],
            required: true, // Según tu JSON Schema, 'estado' era requerido
            default: "pendiente", // Puedes añadir un valor por defecto si lo deseas
            description: "Estado actual de la reserva"
        }
    },
    {
        timestamps: true // Esto añadirá campos createdAt y updatedAt automáticamente
    }
);

// Mongoose pluralizará 'Tatuaje' a 'tatuajes' para el nombre de la colección
// Si tu colección en MongoDB Compass se llama 'tattoos', entonces deberías cambiar 'Tatuaje' a 'Tattoo'
// o especificar el nombre de la colección: model('Tattoo', printSchema, 'tattoos');
export const Tattoo = model('Tatuaje', printSchema);