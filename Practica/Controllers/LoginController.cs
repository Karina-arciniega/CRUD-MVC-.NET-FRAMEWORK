using Newtonsoft.Json;
using Practica.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text.RegularExpressions;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;

namespace Practica.Controllers
{
    public class LoginController : Controller
    {
        // GET: Index
        public ActionResult Index()
        {
            return View();
        }

        /*Iniciar sesión*/
        public async Task<ActionResult> comprobarUsuario(string correo, string contrasena)
        {
            bool respuesta = false;

            try
            {
                using (ApiEntities db = new ApiEntities())
                {
                    var existe = (from p in db.T_Usuarios
                                  where p.Correo == correo && p.Contrasena == contrasena && p.estado == "1"
                                  select p);

                    if (existe.ToList().Count > 0)
                    {
                        // var result = await httpResponse.Content.ReadAsStringAsync();
                        var result = JsonConvert.SerializeObject(existe.ToList());
                        var use = JsonConvert.DeserializeObject<List<User>>(result);

                        string u = use[0].nombre;
                        string tt = use[0].rol;
                        string c = use[0].correo;

                        u = Regex.Replace(u.Normalize(NormalizationForm.FormD), @"[^a-zA-z0-9 ]+", "");

                        HttpCookie cookie = new HttpCookie("user", u);
                        cookie.Expires = DateTime.Now.AddHours(1);
                        HttpContext.Response.Cookies.Add(cookie);

                        HttpCookie cookie2 = new HttpCookie("tipo", tt);
                        cookie2.Expires = DateTime.Now.AddHours(1);
                        HttpContext.Response.Cookies.Add(cookie2);

                        HttpCookie cookie3 = new HttpCookie("correo", c);
                        cookie3.Expires = DateTime.Now.AddHours(1);
                        HttpContext.Response.Cookies.Add(cookie3);

                        Session["user"] = u;

                        string response = "1";

                        return Content(response);

                    }
                    else
                    {
                        return Content("");
                    }
                }
            }
            catch (Exception)
            {

                throw;
                return Content("");
            }
        }

        /*Cerrar sesión*/
        public void Cerrar()
        {
            HttpCookie cookie2 = new HttpCookie("user");
            cookie2.Expires = DateTime.Now.AddDays(-1);
            HttpContext.Response.Cookies.Add(cookie2);

            HttpCookie cookie = new HttpCookie("tipo");
            cookie.Expires = DateTime.Now.AddDays(-1);
            HttpContext.Response.Cookies.Add(cookie);


            HttpCookie cookie3 = new HttpCookie("correo");
            cookie3.Expires = DateTime.Now.AddDays(-1);
            HttpContext.Response.Cookies.Add(cookie3);

            HttpContext.Response.AppendHeader("Cache-Control", "no-store");
            HttpContext.Response.Cache.SetCacheability(HttpCacheability.NoCache);
            HttpContext.Response.Cache.SetExpires(DateTime.Now.AddSeconds(-1));
            HttpContext.Response.Cache.SetNoStore();

            HttpContext.Session.Clear();
            HttpContext.Response.Redirect("~/Login/Index");

        }
    }
}