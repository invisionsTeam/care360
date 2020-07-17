$(document).on('click', '.survey-ques-1 input', function () {
    $(".survey-ques-1 .survey-btn-group .btn-next").removeAttr("disabled");
    $(".progress .progress-bar").removeClass("progress-width-0");
    $(".progress .progress-bar").css("width", "50%");
    $(".progress .progress-bar span").text("50%");
    $(".status-text .ques-answered").text("1");
});

$(document).on('click', '.survey-ques-1 .survey-btn-group .btn-next', function () {
    $(".survey-q-1").hide();
    $(".survey-q-2").css("display", "flex");
    $(".progress .progress-bar").removeClass("progress-width-0");
    if ($('.survey-ques-2 input[name="optradio2"]').is(':checked')) {
        $(".survey-ques-2 .survey-btn-group .btn-submit").removeAttr("disabled");
        $(".progress .progress-bar").css("width", "100%");
        $(".progress .progress-bar span").text("100%");
        $(".status-text .ques-answered").text("2");
    }
    else {
        $(".survey-ques-2 .survey-btn-group .btn-submit").attr("disabled");
        $(".progress .progress-bar").css("width", "50%");
        $(".progress .progress-bar span").text("50%");
        $(".status-text .ques-answered").text("1");
    }
});

$(document).on('click', '.survey-ques-2 input', function () {
    $(".survey-ques-2 .survey-btn-group .btn-submit").removeAttr("disabled");   
    $(".progress .progress-bar").removeClass("progress-width-0");
    $(".progress .progress-bar").css("width", "100%");
    $(".progress .progress-bar span").text("100%");
    $(".status-text .ques-answered").text("2");
});

$(document).on('click', '.survey-ques-2 .survey-btn-group .btn-back', function () {
    $(".survey-q-2").hide();
    $(".survey-q-1").css("display", "flex");
    $(".progress .progress-bar").removeClass("progress-width-0");
    $(".progress .progress-bar").css("width", "50%");
    $(".progress .progress-bar span").text("50%");
    $(".status-text .ques-answered").text("1");
});

