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
}

function error_handler(e) {
    console.log(e);
}

function onGridEdit(e) {
    if (e.model.isNew()) {
        e.model.set("Id", ++currentValue);
    }
}