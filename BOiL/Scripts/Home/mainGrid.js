var currentValue = 0;

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
    var grid = $("#mainGrid").data("kendoGrid");
    grid.saveChanges();

    setTimeout(function () {
        document.getElementById("mainGridDiv").style.visibility = "hidden";
        document.getElementById("mainGridDiv").style.height = "0px";
        document.getElementById("mainGrid").style.height = "0px";
        document.getElementById("cpmGridDiv").style.visibility = "";
        $("#cpmGrid").data("kendoGrid").dataSource.read();
        setTimeout(function () {
            critialPath();
        }, 200);
    }, 500);
}

function error_handler(e) {
    console.log(e);
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

    for (var i = 0; i < data.length; i++) {
        var item = data[i];
        if (item.OnCriticalPath) {
            nodes.add({ id: item.Id, label: item.Id.toString() });
            idsOnCritialPath[idsOnCritialPathCount] = item.Id;
            idsOnCritialPathCount++;
        }
    }

    var edges = new vis.DataSet([
    ]);


    for (var i = 1; i < idsOnCritialPathCount; i++) {
        edges.add({ from: idsOnCritialPath[i - 1], to: idsOnCritialPath[i] });
    }
    

    // create a network
    var container = document.getElementById('critialPath');

    // provide the data in the vis format
    var data = {
        nodes: nodes,
        edges: edges
    };
    var options = {};

    // initialize your network!
    var network = new vis.Network(container, data, options);
}