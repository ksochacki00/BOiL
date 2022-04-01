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
        private static string _data = "CalculatedData";
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
            TranslateStringToListInt(vms.ToList());
            vms = vms.OrderBy(x => x.Id).ToList();
            vms = Forward(vms.ToList());
            FindSuccessors(vms.ToList());
            vms = Backward(vms.ToList());
            CriticalPath(vms.ToList());
            Session[_data] = vms;
            return Json(vms.ToDataSourceResult(request));
        }

        public JsonResult GetCPMGrid([DataSourceRequest] DataSourceRequest request)
        {
            var data = Session[_data] as List<MainGridViewModel>;
            return Json(data.ToDataSourceResult(request));
        }

        void CriticalPath(List<MainGridViewModel> vms)
        {
            System.Diagnostics.Debug.WriteLine("\n          Critical Path: ");

            foreach (MainGridViewModel activity in vms)
            {
                if ((activity.Eet - activity.Let == 0) && (activity.Est - activity.Lst == 0))
                    System.Diagnostics.Debug.WriteLine("{0} ", activity.Id);
            }

            System.Diagnostics.Debug.WriteLine("\n\n         Total duration: {0}\n\n", vms[vms.Count() - 1].Eet);
        }

        private void TranslateStringToListInt(List<MainGridViewModel> vms)
        {
            foreach (MainGridViewModel item in vms)
            {
                if(item.Predecessors == null)
                {
                    item.PredecessorsList = new List<int>();
                    item.PredecessorsList.Add(-1);
                }
                else
                {
                    item.PredecessorsList = new List<int>();
                    string[] strings = item.Predecessors.Split(',');
                    foreach(var str in strings)
                    {
                        var strTrim = str.Trim();
                        item.PredecessorsList.Add(int.Parse(strTrim));
                    }
                }
            }
        }

        private void FindSuccessors(List<MainGridViewModel> vms)
        {
            foreach(var item in vms)
            {
                item.SucessorsList = new List<int>();
                var succssorsList = vms.Where(x => x.PredecessorsList.Contains(item.Id));
                foreach(var successor in succssorsList)
                {
                    item.SucessorsList.Add(successor.Id);
                }

            }
        }

        private static List<MainGridViewModel> Forward(List<MainGridViewModel> list)
        {
            list[0].Eet = list[0].Est + list[0].Duration;
            int na = list.Count();

            for (int i = 1; i < na; i++)
            {
                foreach (int intPred in list[i].PredecessorsList)
                {
                    if(intPred != -1)
                    {
                        var item = list.First(x => x.Id == intPred);
                        if (list[i].Est < item.Eet)
                        {
                            list[i].Est = item.Eet;
                        }
                            
                    }
                }

                list[i].Eet = list[i].Est + list[i].Duration;
            }

            return list;
        }
        private static List<MainGridViewModel> Backward(List<MainGridViewModel> list)
        {
            int na = list.Count();
            list[na - 1].Let = list[na - 1].Eet;
            list[na - 1].Lst = list[na - 1].Let - list[na - 1].Duration;

            for (int i = na - 2; i >= 0; i--)
            {
                foreach (int intSucc in list[i].SucessorsList)
                {
                    if(intSucc != -1)
                    {
                        var item = list.First(x => x.Id == intSucc);
                        if (list[i].Let == 0)
                        {
                            list[i].Let = item.Lst;
                        }
                        else if (list[i].Let > item.Lst)
                        {
                            list[i].Let = item.Lst;
                        }
                    }
                }

                list[i].Lst = list[i].Let - list[i].Duration;
            }

            return list;
        }
    }
}