using BOiL.Models;
using Kendo.Mvc.Extensions;
using Kendo.Mvc.UI;
using Microsoft.Ajax.Utilities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace BOiL.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }

        public ActionResult ReadNothing([DataSourceRequest] DataSourceRequest request)
        {
            return Json(new List<MainGridViewModel>().ToDataSourceResult(request));
        }

        public ActionResult ProcessMainGrid([DataSourceRequest] DataSourceRequest request, [Bind(Prefix = "models")] IEnumerable<MainGridViewModel> vms)
        {
            //Tutaj dostajecie modele z grida i dalej cos z nimi robicie

            //a potem ja bede to wyswietlal w jakims popupie czy cos

            return Json(vms.ToDataSourceResult(request));
        }
    }
}