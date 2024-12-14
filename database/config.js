const mongoose = require("mongoose");

const dbConnection = async () => {
  // conexión y configuración a la BBDD
  try {
    await mongoose.connect(process.env.DB_CNN);
    console.log("DB Online");
  } catch (error) {
    console.log(error);
    throw new Error("Error en la base de datos - Hable con admin");
  }
};

module.exports = {
  dbConnection,
};
