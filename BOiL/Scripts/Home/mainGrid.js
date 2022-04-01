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