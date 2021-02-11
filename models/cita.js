module.exports = (sql, type) => {
  // crear tabla
  return sql.define('cita', {
// id queda fijo

    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
// aquí van los campos
    author: type.STRING,
    quote: type.STRING,
   
  });
}
