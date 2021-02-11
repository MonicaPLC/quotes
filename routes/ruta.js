const{Router} =require('express')
const router=Router();
// este comando requiere nombre de mi tabla.
const {Cita}=require('../db')

//crear variable para guardar las citas que escribirá el usuario.
// esta variable debo iterarla en la vista citas.
const quotes=[
  {author:"Jonh Lenon",  quote:"Haz el amor y no la guerra"},
  {author:"Bob Marley",  quote:"El dinero no puede comprar la vida"},
 ]

router.get("/", function (req, res){	// en la ruta / veo el formulario.
   res.render('formulario'); 
});

// en la ruta /quotes
router.get('/quotes', async (req, res) => {
  // busca todas las citas ingresadas.
  const cita = await Cita.findAll();

  let mensaje=req.flash("mensaje");
  console.log(mensaje)

  res.render('citas', {citas:cita, mensaje:mensaje})
  // muestra la variable quotes que ahora se llama cita con todas las citas ingresadas.
});

// guardar citas y mostrarla en la ruta quotes
router.post('/quotes', async function(req, res){
  const new_cita= await Cita.create({
    author: req.body.author,
    quote: req.body.quote
    //crear autor y cita.
   });
 //redirigir al formulario.
  res.redirect("/")
});

// borrar por id
router.get("/delete/:id", async (req, res) => { //ruta borrar
  const borrar= await Cita.findByPk(req.params.id)
  await borrar.destroy(); 
  req.flash("mensaje", `La cita ${borrar.quote} fue eliminado con éxito.`) 
  // el mensaje lo introduzco en la vista formulario
  res.redirect("/quotes")       
  });

//también puedo hacerlo así pero tengo que tener una vista que mostrar al eliminar.
 // router.get("/delete/:id", async (req, res) => { //ruta borrar
   // const borrar= await Cita.findByPk(req.params.id)
   // await borrar.destroy();  
   // res.render("eliminar", {citas:cita.name})       
   // });
  
   // guardar las cita editada y mostrar todas las citas
  router.post('/update/:id', async function(req, res){
  const update= await Cita.findByPk(req.params.id)
  console.log(update)
  console.log(req.body.author)
  console.log(req.body.quote)
   update.author= req.body.author;
   update.quote= req.body.quote;
   //crear autor y cita
   await update.save();
   //guardar  
   console.log("guardado")

    req.flash("mensaje", `La cita ${update.quote} fue actualizada con éxito.`) 
     res.redirect("/quotes")
    });
//mostrar formulario para editar
router.get('/update/:id', async function(req, res){
  const update= await Cita.findByPk(req.params.id)

  let mensaje=req.flash("mensaje");
  console.log(mensaje)
   
res.render('editar', {cita:update, mensaje:mensaje})
});


module.exports=router;

