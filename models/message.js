const { Schema, model } = require("mongoose");

const MessageSchema = Schema(
  {
    from: {
      // acá se selecciona el id defino en la colección de usuarios
      type: Schema.Types.ObjectId,
      ref: "User",
      require: true,
    },
    to: {
      type: Schema.Types.ObjectId,
      ref: "User",
      require: true,
    },
    text: {
      type: String,
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

MessageSchema.method("toJSON", function () {
  // Se extrae todo lo que interese desde el Object
  // (...object) significa que el resto de las propiedades no seleccionadas, serán almacenadas en este objeto
  const { __v, _id, ...object } = this.toObject();
  return object;
});

module.exports = model("Message", MessageSchema);
