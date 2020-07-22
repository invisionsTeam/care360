window.location.href.indexOf("medication-schedule") > -1 ? $('#calendarCarousel').carousel({
    interval: false
}) : false;

$(document).ready(function () {
    $(document).on('click', '.toggelSchMed input', function () {
        if ($(this).data().val === "medication") {
            $("#scheduleWrap").fadeOut("fast");
            $("#MedicationWrap").fadeIn("fast");
        }

        if ($(this).data().val === "schedule") {
            $("#MedicationWrap").fadeOut("fast");
            $("#scheduleWrap").fadeIn("fast");
        }
    });
});