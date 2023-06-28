using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Practica.Models
{
    public class TUsuarios
    {

        public string Nombre { get; set; }
        public string Correo { get; set; }
        public string Edad { get; set; }
        public string CURP { get; set; }
        public string Genero { get; set; }
        public string Rol { get; set; }
        public int Id { get; set; }
        public string Contrasena { get; set; }
        public string estado { get; set; }
    }
}