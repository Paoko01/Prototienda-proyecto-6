// src/models/Tattoos.model.js

import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const printSchema = new Schema(
    {
        id: {
            type: String,
            description: "Identificador único de la reserva" 
            // No recomendable en caso de usar el _id de Mongoose :b
            // Para un ID personalizado: default: () => new mongoose.Types.ObjectId().toString()
        },
        clienteId: {
            type: String, // O mongoose.Schema.Types.ObjectId si hace referencia a un modelo de cliente
            required: true, // Validación de Mongoose: el campo es obligatorio
            description: "ID del cliente que hace la reserva"
        },
        fecha: {
            type: Date, // Para fechas, usar el tipo Date de Mongoose
            required: true,
            description: "Fecha de la cita del tatuaje"
        },
        horaInicio: {
            type: String, // Podría ser Date, o String si es "HH:MM"
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
            required: true, 
            default: "pendiente", 
            description: "Estado actual de la reserva"
        }
    },
    {
        timestamps: true // Esto añade campos createdAt y updatedAt automáticamente
    }
);

export const Tattoo = model('Tatuaje', printSchema);