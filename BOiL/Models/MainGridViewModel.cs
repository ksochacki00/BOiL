using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace BOiL.Models
{
    public class MainGridViewModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public double Duration { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public string Predecessors { get; set; }
    }
}