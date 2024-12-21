const { Schema, model } = require("mongoose");

const UserSchema = Schema({
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
    unique: true,
  },
  password: {
    type: String,
    require: true,
  },
  online: {
    type: Boolean,
    default: false,
  },
});

UserSchema.method('toJSON', function () {
    // Se extrae todo lo que interese desde el Object
    // (...object) significa que el resto de las propiedades no seleccionadas, serán almacenadas en este objeto
    const {__v, _id, password, ...object} = this.toObject();
    // Se renombra _id por uid
    object.uid = _id;
    return object;
})

module.exports = model("User", UserSchema);
