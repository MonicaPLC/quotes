//para base de datos
const Sequelize = require('sequelize');
const CitaModel = require('./models/cita');
// la variable tiene el nombretablaModel y (/nombredemi tabla)


// en los () va nombre base de datos, root, y clave
// crear la base de datos en power shell
const sql = new Sequelize('citasdb', 'root', '1234', {
  host: 'localhost',
  dialect: 'mysql'
});

// acá va variable con nombre de mi tabla
const Cita = CitaModel(sql, Sequelize);

//  después sincronizamos nuestro código con la base de datos
sql.sync()
.then(() => {
  console.log('Base de datos y tablas creadas');
});


// finalmente acá listamos todos los modelos que queremos exportar
module.exports = {
//nombre de la tabla creada

  Cita,
};
