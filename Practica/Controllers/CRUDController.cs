using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Reflection;
using System.Text.RegularExpressions;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;
using Practica.Models;
using System.Web.UI.WebControls;

namespace Practica.Controllers
{
    public class CRUDController : Controller
    {
        

        /*Retornar la vista de about*/
        public ActionResult Index()
        {
            /*Comprueba si exise la cookie*/
            if (Request.Cookies["user"] != null)
            {
                return View();
            }
            else
            {
                return RedirectToAction("Login");
            }   
          
        }

        /*Obtener tipos de usuarios*/
        [HttpGet]
        public JsonResult getTipos()
        {
            List<TipoUser> lst = new List<TipoUser>();

            using (ApiEntities db1 = new ApiEntities())
            {

                lst = (from p in db1.TipoUsers
                       select p).ToList();

            }
            return Json(lst, JsonRequestBehavior.AllowGet);
        }

        /*Registra y actualiza usuarios*/
        public async Task<Boolean> Registrar(T_Usuarios user)
        {
            bool respuesta = false;

            using (ApiEntities db = new ApiEntities())
            {
                var existe = (from p in db.T_Usuarios
                              where p.Id == user.Id
                              select p);

                if (existe.ToList().Count > 0)
                {

                   
                        var user1 = (from a in db.T_Usuarios where a.Id == user.Id select a).FirstOrDefault();

                        user1.Nombre = user.Nombre;
                        user1.Correo = user.Correo;
                        user1.Edad = user.Edad;
                        user1.CURP = user.CURP;
                        user1.Genero = user.Genero;
                        user1.Rol = user.Rol;
                        user1.Contrasena = user.Contrasena;
                        //user1.estado = user.estado;
                       db.SaveChanges();


                    return respuesta = true;
                }
                else
                {

                    db.T_Usuarios.Add(user);
                    db.SaveChanges();
                    return respuesta = true;
                }
            }

        }

        /*Obtener usuarios*/
        [HttpGet]
        public JsonResult ListarUsuarios()
        {
            List<T_Usuarios> lst = new List<T_Usuarios>();

            try
            {
                using (ApiEntities db1 = new ApiEntities())
                {

                    lst = (from p in db1.T_Usuarios
                           select p).ToList();
                }
            }
            catch (Exception E)
            {
                var x = E.Message;
                throw;
            }
            return Json(new { data = lst }, JsonRequestBehavior.AllowGet);
        }

        /*Eliminar usuarios*/
        [HttpGet]
        public JsonResult EliminarUsuario(int id)
        {
            bool respuesta = false;
           
            try
            {
                T_Usuarios oPersona = new T_Usuarios();

                //using (ApiEntities db = new ApiEntities())
                //{

                //    oPersona = (from p in db.T_Usuarios.Where(x => x.Id == id)
                //                select p).FirstOrDefault();

                //    db.T_Usuarios.Remove(oPersona);
                //    db.SaveChanges();
                //    respuesta = true;
                //}

                using (ApiEntities db = new ApiEntities())
                {
                    var user = (from a in db.T_Usuarios where a.Id == id select a).FirstOrDefault();

                    user.estado = "0";


                    db.SaveChanges();
                }

                respuesta = true;
            }
            catch(Exception ex)
            {
                respuesta = false;      
            }
            return Json(new { resultado = respuesta }, JsonRequestBehavior.AllowGet);
        }

       
    }
}