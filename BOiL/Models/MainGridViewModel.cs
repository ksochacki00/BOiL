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
        public int Duration { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public string Predecessors { get; set; }
        public List<int> PredecessorsList { get; set; }
        public List<int> SucessorsList { get; set; }
        public int Est { get; set; } // Earliest start time
        public int Lst { get; set; } // Latest start time
        public int Eet { get; set; } // Earliest End time
        public int Let { get; set; } // Latest End time
    }
}