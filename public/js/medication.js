var medicationData, calendarInput;

$(document).ready(function () {
    showMedicationList();
});

$(document).on('click', '.carousel-item li', function () {
    calendarInput = $(this).data('date');
    sortJsonByTime(calendarInput);
});

$(document).on('click', '#medicationList', function () {
    showMedicationList();
});

$(document).on('click', '#addMedication', function () {
    var newData = medicationData;
    var toDo = {
        "name": $("#medicationName option:selected").val(),
        "dose": $("#medicationDose option:selected").val(),
        "frequency": $("#medicationFrequency option:selected").val(),
        "suggestedTime": $("#medicationTime").val(),
        "startDate": $("#medicationStartDate").val(),
        "endDate": $("#medicationEndDate").val(),
        "shape": $("input[name='medicineType']:checked").val() !== undefined ? $("input[name='medicineType']:checked").val() : "",
        "color": $("input[name='medicinColor']:checked").val() !== undefined ?$("input[name='medicinColor']:checked").val() : "",
        "notes": $("#medicationNotes").val()
    };
    newData.medication.push(toDo);
    updateJson(newData);
    $("#medicationName option[value='default']").attr("selected", true);
    $("#medicationDose option[value='default']").attr("selected", true);
    $("#medicationFrequency option[value='default']").attr("selected", true);
    $("#medicationTime").val("");
    $("#medicationStartDate").val("");
    $("#medicationEndDate").val("");
    $("#medicationNotes").val("");

    $("#myMedicationAdd").addClass("collapsed");
    $("#collapseTwoamo").removeClass("show");

});

$(document).on('click', '.medication-delete', function () {
    var currentMedication = $(this).parents(".card-body").data("medication");
    var medicationArray = medicationData;
    jQuery.each(medicationArray.medication, function (i, val) {
        if (val.name === currentMedication) // delete index
        {
            medicationArray.medication.splice(i, 1);
            return false;
        }
    });
    updateJson(medicationArray);
    showMedicationList();
});

function updateJson(updatedData) {
    $.ajax({
        type: 'POST',
        data: JSON.stringify(updatedData),
        contentType: 'application/json',
        url: '/add-tasks',
        success: function (data) {
            console.log('success');
            console.log(JSON.stringify(newData));
        }
    });
}

function showMedicationList() {
    $.ajax({
        type: 'GET',
        dataType: 'json',
        url: 'json/medication.json',
        success: function (data) {
            var medicationlist = "";
            medicationData = data;
            $.each(data.medication, function (key, value) {
                if (value.name !== "default") {
                    var mediNotes = value.notes !== "" ? ", " + value.notes : value.notes;
                    medicationlist = medicationlist + '<div class="card-body" data-medication="' + value.name + '"><div class="row"><div class="col-1 col-sm-2 icon ' + value.color + '"><div class="' + value.shape + '"></div></div>' +
                        '<div class="col-7 col-sm-6 info"><h6>' + value.name + ' ' + value.dose + '</h6>' +
                        '<p>' + value.frequency + mediNotes + '</p></div>' +
                        '<div class="col-4 col-sm-4 action"><div class="align-center">' +
                        '<span class="medication-delete"></span><span class="edit"></span></div></div></div></div>';
                }
            });
            $('#collapseOneamo').html(medicationlist);
            var defaultDate = $(".carousel-item li.active").data("date");
            sortJsonByTime(defaultDate);
        }
    });
}

function sortJsonByTime(calendarInput) {
    var i = 1;
    var groupBy = function (xs, key) {
        return xs.reduce(function (rv, x) {
            (rv[x[key]] = rv[x[key]] || []).push(x);
            return rv;
        }, {});
    };
    var groupedByTime = groupBy(medicationData.medication, 'suggestedTime');
    var mediSchedule = '';

    for (var key in groupedByTime) {
        if (groupedByTime.hasOwnProperty(key) && key !== "") {
            var mediList = '', headingId, accordionId;
            $.each(groupedByTime[key], function (key, value) {
                var medStartDate = value.startDate;
                var medEndDate = value.endDate;
                var calDateFormat = calendarInput !== undefined ? calendarInput.split("-") : '';
                var calendarDate = calDateFormat[1] + "/" + calDateFormat[0] + "/" + calDateFormat[2];

                medStartDate = new Date(medStartDate);
                medEndDate = new Date(medEndDate);
                calendarDate = new Date(calendarDate);

                if (calendarDate.getTime() <= medEndDate.getTime()
                    && calendarDate.getTime() >= medStartDate.getTime()) {
                    var mediNotes = value.notes !== "" ? ", " + value.notes : value.notes;
                    mediList = mediList + '<div class="card-body"><div class="row"><div class="col-1 col-sm-2 icon ' + value.color + '"><div class="' + value.shape + '"></div></div>' +
                        '<div class="col-7 col-sm-6 info"><h6>' + value.name + ' ' + value.dose + '</h6>' +
                        '<p>' + value.frequency + mediNotes + '</p></div>' +
                        '<div class="col-4 col-sm-4 action"><div class="align-center">' +
                        '<span class="notify"></span><span class="alert-me"></span></div></div></div></div>';
                }

            });
            if (mediList !== "") {
                headingId = "heading" + i;
                accordionId = "collapse" + i;
                mediSchedule = mediSchedule + '<div class="card"><div class="card-header" id="' + headingId + '">' +
                    '<h5 class="mb-0"><button class="btn btn-link collapsed" data-toggle="collapse" data-target="#' + accordionId + '" aria-expanded="true" aria-controls="' + accordionId + '">' +
                    '<img src="../images/schedule/accordian-medication.svg" width="40" alt="medication"/> Medication at ' +
                    key + '</button></h5></div>' +
                    '<div id="' + accordionId + '" class="collapse" aria-labelledby="' + headingId + '" data-parent="#scheduleAccordion">' +
                    '<div class="card-body mb-1"><div class="row border-0"><div class="col-12 col-sm-12 action select-all"><span class="notifyAll"><br>' +
                    '<p>ALL</p></span><span class="checkAll"><br><p>ALL</p></span></div></div></div>' + mediList + '</div></div>';
                i = i + 1;
            }
            $("#scheduleAccordion").html(mediSchedule);

            $("#scheduleAccordion #heading1 .btn").removeClass("collapsed");
            $("#scheduleAccordion #collapse1").addClass("show");
        }
    }
}