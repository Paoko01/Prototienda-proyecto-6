import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const printSchema = new Schema(
    {
        
  "type": "object",
  "properties": {
    "id": { "type": "string", "description": "Identificador único de la reserva" },
    "clienteId": { "type": "string", "description": "ID del cliente que hace la reserva" },
    "fecha": { "type": "string", "format": "date", "description": "Fecha de la cita del tatuaje" },
    "horaInicio": { "type": "string", "format": "time", "description": "Hora de inicio de la cita (ej. '14:00')" },
    "descripcionTatuaje": { "type": "string", "description": "Breve descripción de la idea o diseño del tatuaje" },
    "tamanoEstimado": { "type": "string", "enum": ["pequeño", "mediano", "grande", "personalizado"], "description": "Tamaño estimado del tatuaje" },
    "ubicacionCuerpo": { "type": "string", "description": "Parte del cuerpo donde se realizará el tatuaje" },
    //"depositoPagado": { "type": "boolean", "description": "¿Se ha pagado el depósito de la reserva?" },
    //"montoDeposito": { "type": "number", "format": "float", "description": "Monto del depósito pagado" },
    "estado": { "type": "string", "enum": ["pendiente", "confirmada", "cancelada", "reprogramada", "completada"], "description": "Estado actual de la reserva" },
    //"notasAdicionales": { "type": "string", "description": "Cualquier nota adicional del cliente o artista" }
  },
  "required": [
    "clienteId",
    "fecha",
    "horaInicio",
    "descripcionTatuaje",
    "estado"
  ]
    },
)

export const Tattoo = model('Tatuaje', printSchema);

