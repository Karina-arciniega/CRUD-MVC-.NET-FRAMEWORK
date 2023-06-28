using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Practica.Models
{
    public class User
    {
        public string nombre { get; set; }
        public string rol { get; set; }
        public string correo { get; set; }
        public string edad { get; set; }
        public string curp { get; set; }
        public string genero { get; set; }

        public string contrasena { get; set; }
        public int id { get; set; }

        public string estado { get; set; }
    }
}