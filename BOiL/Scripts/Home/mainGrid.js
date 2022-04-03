﻿var currentValue = 0;
var error = false;
var MAXEET = 0;
$(document).ready(function () {
    console.log("ready!");

    document.getElementById("addButton").addEventListener("click", function () {
        addRowToGrid();
    }, false);

    document.getElementById("processButton").addEventListener("click", function () {
        processMainGrid();
    }, false);
});

function addRowToGrid() {
    var grid = $("#mainGrid").data("kendoGrid");
    grid.addRow();
}

function processMainGrid() {
    error = false;
    var grid = $("#mainGrid").data("kendoGrid");
    grid.saveChanges();

    setTimeout(function () {
        if (!error) {
            document.getElementById("mainGridDiv").style.visibility = "hidden";
            document.getElementById("mainGridDiv").style.height = "0px";
            document.getElementById("mainGrid").style.height = "0px";
            document.getElementById("cpmGridDiv").style.visibility = "";
            $("#cpmGrid").data("kendoGrid").dataSource.read();
            setTimeout(function () {
                critialPath();
                graph();
            }, 200);
        }
    }, 500);
}

function error_handler(e) {
    error = true;
    alert(e.errors);
}

function onGridEdit(e) {
    if (e.model.Id == 0) {
        e.model.set("Id", ++currentValue);
    }
}

function critialPath() {
    var grid = $("#cpmGrid").data("kendoGrid");
    var data = grid.dataSource.data();
    var nodes = new vis.DataSet([]);
    var idsOnCritialPath = [];
    var idsOnCritialPathCount = 0;
    var maxEet = 0;

    var count = 0;
    var names = [];
    for (var i = 0; i < data.length; i++) {
        var item = data[i];
        if (item.OnCriticalPath) {
            maxEet = item.Eet;
            names.push(item.Name);
            count++;
        }
    }

    for (var i = 0; i < count + 1; i++) {
        nodes.add({ id: i, label: "", x: idsOnCritialPathCount * 100, y: 100 });
        idsOnCritialPath[idsOnCritialPathCount] = i;
        idsOnCritialPathCount++;
    }
    MAXEET = maxEet;
    console.log(MAXEET);
    document.getElementById("EetText").innerHTML = "Critical Path time: " + maxEet;

    var edges = new vis.DataSet([
    ]);


    for (var i = 1; i < idsOnCritialPathCount; i++) {
        edges.add({ from: idsOnCritialPath[i - 1], to: idsOnCritialPath[i], arrow: "to", label: names[i - 1] });
    }


    // create a network
    var container = document.getElementById('critialPath');

    // provide the data in the vis format
    var data = {
        nodes: nodes,
        edges: edges
    };
    var options = {
        edges: {
            arrows: {
                to: {
                    enabled: true,
                    type: "arrow"
                }
            }
        }
    }
    // initialize your network!
    var network = new vis.Network(container, data, options);

    document.getElementById("criticalPathText").style.visibility = ""
}

function onGridEdit(e) {
    if (e.model.Id == 0) {
        e.model.set("Id", ++currentValue);
    }
}

function graph() {
    var grid = $("#cpmGrid").data("kendoGrid");
    var data = grid.dataSource.data();
    var nodes = new vis.DataSet([]);

    for (var i = 0; i < data.length; i++) {
        var item = data[i];
        nodes.add({ id: item.Id, label: item.Id.toString() });
    }

    var edges = new vis.DataSet([
    ]);

    for (var i = 0; i < data.length; i++) {
        var item = data[i];
        for (var j = 0; j < item.SucessorsList.length; j++) {
            edges.add({ from: item.Id, to: item.SucessorsList[j], arrow: "to" });
        }
    }

    // create a network
    var container = document.getElementById('graph');

    // provide the data in the vis format
    var data = {
        nodes: nodes,
        edges: edges
    };
    var options = {
        edges: {
            arrows: {
                to: {
                    enabled: true,
                    type: "arrow"
                }
            }
        }
    }
    // initialize your network!
    var network = new vis.Network(container, data, options);

    document.getElementById("graphText").style.visibility = ""
}