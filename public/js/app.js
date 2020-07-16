$(document).ready(function () {
    $("main").load("/html/cards.html");
    $("#breadcrumbs").hide();
    populateUserName();

    $(document).on('click', '.link-diagnostic', function () {
        $("main").load("/html/diagnostics.html");
        $("#breadcrumbs").show();
        $(".link-bc-last").hide();
        $(".link-bc-secondary").show();
        $(".link-bc-secondary").text("Diagnostics");
        $(".link-bc-secondary").addClass("active");
        getFavorites();
    });

    $(document).on('click', '.link-survey, .survey-ques-2 .survey-btn-group .btn-submit', function () {
        $("main").load("/html/survey.html");
        $("#breadcrumbs").show();
        $(".link-bc-last").hide();
        $(".link-bc-secondary").show();
        $(".link-bc-secondary").text("Survey");
        $(".link-bc-secondary").addClass("active");
        getFavorites();
    });

    $(document).on('click', '.medication-schedule, #toggelSchMed .schedule', function () {
        $("main").load("/html/medication-schedule.html");
        $("#breadcrumbs").show();
        $(".link-bc-secondary").show();
        $(".link-bc-secondary").text('Medication');
        $(".link-bc-secondary").addClass("active");
        $(".link-bc-last").show();
        $(".link-bc-last").text("Schedule");
        $(".link-bc-last").addClass("active");
    });

    $(document).on('click', '.my-medication-link, #toggelSchMed .medication', function () {
        $("main").load("/html/my-medications.html");
        $("#breadcrumbs").show();
        $(".link-bc-secondary").show();
        $(".link-bc-secondary").text('Medication');
        $(".link-bc-secondary").addClass("active");
        $(".link-bc-last").show();
        $(".link-bc-last").text("My Medications");
        $(".link-bc-last").addClass("active");
    });

    $(document).on('click', '.diagnostics-schedule, #toggleDiagnostics .d-schedule', function () {
        $("main").load("/html/diagnostics_schedule.html");
        $("#breadcrumbs").show();
        $(".link-bc-secondary").show();
        $(".link-bc-secondary").html('<a href="javascript:void(0)" class="link-diagnostic">Diagnostics</a>');
        $(".link-bc-secondary").removeClass("active");
        $(".link-bc-last").show();
        $(".link-bc-last").text("Schedule");
        $(".link-bc-last").addClass("active");
        getFavorites();
    });

    $(document).on('click', '.diagnostics-view, #toggleDiagnostics .d-view', function () {
        $("main").load("/html/diagnostics_view.html");
        $("#breadcrumbs").show();
        $(".link-bc-secondary").show();
        $(".link-bc-secondary").html('<a href="javascript:void(0)" class="link-diagnostic">Diagnostics</a>');
        $(".link-bc-secondary").removeClass("active");
        $(".link-bc-last").show();
        $(".link-bc-last").text("View");
        $(".link-bc-last").addClass("active");
    });

    $(document).on('click', '.diagnostics-result, #toggleDiagnostics .d-results', function () {
        $("main").load("/html/diagnostics_result.html");
        $("#breadcrumbs").show();
        $(".link-bc-secondary").show();
        $(".link-bc-secondary").html('<a href="javascript:void(0)" class="link-diagnostic">Diagnostics</a>');
        $(".link-bc-secondary").removeClass("active");
        $(".link-bc-last").show();
        $(".link-bc-last").text("Results");
        $(".link-bc-last").addClass("active");
        getFavorites();
    });

    $(document).on('click', '.link-vitals, #toggleVitals .v-vitals', function () {
        $("main").load("/html/vitals.html");
        $("#breadcrumbs").show();
        $(".link-bc-secondary").show();
        $(".link-bc-secondary").html('<a href="javascript:void(0)" class="link-vitals">Vitals and Notes</a>');
        $(".link-bc-secondary").removeClass("active");
        $(".link-bc-last").show();
        $(".link-bc-last").text("Vitals");
        $(".link-bc-last").addClass("active");
    });

    $(document).on('click', '.diabetes-link', function () {
        $("main").load("/html/survey-diabetes.html");
        $("#breadcrumbs").show();
        $(".link-bc-secondary").show();
        $(".link-bc-secondary").html('<a href="javascript:void(0)" class="link-survey">Survey</a>');
        $(".link-bc-secondary").removeClass("active");
        $(".link-bc-last").show();
        $(".link-bc-last").text("Diabetes Management Survey");
        $(".link-bc-last").addClass("active");
    });



    $(document).on('click', '#toggleVitals .v-ancillary', function () {
        $("main").load("/html/vitals-ancillary.html");
        $("#breadcrumbs").show();
        $(".link-bc-secondary").show();
        $(".link-bc-secondary").html('<a href="javascript:void(0)" class="link-vitals">Vitals and Notes</a>');
        $(".link-bc-secondary").removeClass("active");
        $(".link-bc-last").show();
        $(".link-bc-last").text("Ancillary");
        $(".link-bc-last").addClass("active");
    });

    $(document).on('click', '#toggleVitals .v-view', function () {
        $("main").load("/html/vitals-view.html");
        $("#breadcrumbs").show();
        $(".link-bc-secondary").show();
        $(".link-bc-secondary").html('<a href="javascript:void(0)" class="link-vitals">Vitals and Notes</a>');
        $(".link-bc-secondary").removeClass("active");
        $(".link-bc-last").show();
        $(".link-bc-last").text("View");
        $(".link-bc-last").addClass("active");
    });

    $(document).on('click', '.link-home', function () {
        $("#breadcrumbs").hide();
        $("main").load("/html/cards.html");
        getFavorites();
    });

    $(document).on('click', '.showCardContent', function () {
        $(this).toggleClass("mb-0");
        $(this).next(".cardContent").slideToggle();
    });

    favoritesCheck.get();

    $(document).on('change', '.heartbox input.checkbox', function () {
        favoritesCheck.set();
    });

    $('a.logout').click(function () {
        sessionStorage.removeItem('favorites');
    });

    $(document).on('click', '.notify', function () {
        $(this).toggleClass("active");
        var notifyCount = parseInt($(".bell-counter").text());
        if ($(this).hasClass("active")) {
            notifyCount++;
        } else {
            if (notifyCount !== 0)
                notifyCount--;
            if ($(this).parents(".collapse, .cardContent").find(".notifyAll").hasClass("active")) {
                $(this).parents(".collapse, .cardContent").find(".notifyAll").toggleClass("active");
            }
        }
        if (notifyCount >= 10) {
            $(".bell-counter").css("padding", "0 2px");
        } else {
            $(".bell-counter").css("padding", "0 6px");
        }
        $(".bell-counter").text(notifyCount);
    });

    $(document).on('click', '.alert-me', function () {
        $(this).toggleClass("active");
        if (!$(this).hasClass("active")) {
            if ($(this).parents(".collapse, .cardContent").find(".checkAll").hasClass("active")) {
                $(this).parents(".collapse, .cardContent").find(".checkAll").toggleClass("active");
            }
        }
    });

    $(document).on('click', '.notifyAll', function () {
        $(this).toggleClass("active");
        var that = $(this);
        var notifyCount = parseInt($(".bell-counter").text());
        $(this).parents(".collapse, .cardContent").find(".notify").each(function () {
            if (!$(this).hasClass("active")) {
                $(this).addClass("active");
                notifyCount++;
            }
            if (!that.hasClass("active")) {
                $(this).removeClass("active");
                if (notifyCount !== 0)
                    notifyCount--;
            }
        });
        if (notifyCount >= 10) {
            $(".bell-counter").css("padding", "0 2px")
        } else {
            $(".bell-counter").css("padding", "0 6px")
        }
        $(".bell-counter").text(notifyCount);
    });

    $(document).on('click', '.checkAll', function () {
        $(this).toggleClass("active");
        var that = $(this);
        $(this).parents(".collapse, .cardContent").find(".alert-me").each(function () {
            selectAll($(this), that);
        });
    });

    function selectAll(self, that) {
        if (!self.hasClass("active")) {
            self.addClass("active");
        }

        if (!that.hasClass("active")) {
            self.removeClass("active");
        }
    }
});

var favorites = [];

function populateUserName() {
    var email = getCookieValue("user");
    var username = email.split("@")[0];
    var firstname = username.split(".")[0];
    var lastname = username.split(".")[1];
    var fullname = "John Doe";
    if (firstname !== undefined && firstname !== "") {
        fullname = firstname;
        if (lastname !== undefined && lastname !== "") {
            fullname = fullname + " " + lastname;
        }
    }
    $(".user-name").text(fullname);
    if (email !== undefined && email !== "" && email.includes("@")) {
        $(".user-email").text(email);
    } else {
        $(".user-email").text("john.doe@example.com");
    }
}

function getCookieValue(a) {
    var b = document.cookie.match('(^|;)\\s*' + a + '\\s*=\\s*([^;]+)');
    return b ? b.pop() : '';
}

var favoritesCheck = {
    set: function () {
        $('.heartbox input[type=checkbox]').each(function () {
            favorites.push({ id: this.id, value: this.checked });
        });
        sessionStorage.favorites = JSON.stringify(favorites);
    },
    get: function () {
        if (sessionStorage.favorites != undefined) {
            // Get the existing values out of sessionStorage
            favorites = JSON.parse(sessionStorage.favorites);
            for (var i = 0; i < favorites.length; i++) {
                $('#' + favorites[i].id).prop('checked', favorites[i].value);
            }
        }
    }
}

function getFavorites() {
    setTimeout(() => {
        favoritesCheck.get();
    }, 100);
}
