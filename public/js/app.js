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

    $(document).on('click', '.link-survey, .survey-ques-2 .survey-btn-group .btn-submit, .survey-ques-1 .survey-btn-group .btn-cancel', function () {
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
        $(this).next(".cardContent").slideToggle(200);
        setTimeout(() => {
            notificationCheck.get();
        }, 200);
    });

    favoritesCheck.get();

    $(document).on('change', '.heartbox input.checkbox', function () {
        favoritesCheck.set();
    });

    $('a.logout').click(function () {
        sessionStorage.removeItem('favorites');
        sessionStorage.removeItem('notifications');
        sessionStorage.removeItem('medicationNotifications');
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
        setHomeNotification();
    });

    $(document).on('click', '.alert-me', function () {
        $(this).toggleClass("active");
        if (!$(this).hasClass("active")) {
            if ($(this).parents(".collapse, .cardContent").find(".checkAll").hasClass("active")) {
                $(this).parents(".collapse, .cardContent").find(".checkAll").toggleClass("active");
            }
        }
        setHomeNotification();
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
        setHomeNotification();
    });

    $(document).on('click', '.checkAll', function () {
        $(this).toggleClass("active");
        var that = $(this);
        $(this).parents(".collapse, .cardContent").find(".alert-me").each(function () {
            selectAll($(this), that);
        });
        setHomeNotification();
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
var medicationNotifications = [];

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

var notificationCheck = {
    set: function () {
        var notifications = [];
        sessionStorage.removeItem('notifications');
        $('.cardContent .card-body:not(.med-alert-info)').each(function () {
            var notifyID = $(this).find('.action span.notify').attr('id'),
                notifyVal = $(this).find('.action span.notify').hasClass('active'),
                checkID = $(this).find('.action span.alert-me').attr('id'),
                checkVal = $(this).find('.action span.alert-me').hasClass('active');
            notifications.push({ id: notifyID, value: notifyVal });
            notifications.push({ id: checkID, value: checkVal });
        });
        $('.cardContent .card-body.med-alert-info').each(function () {
            notifications.push({ id: $(this).find('.action span.notifyAll').attr('id'), value: $(this).find('.action span.notifyAll').hasClass('active') });
            notifications.push({ id: $(this).find('.action span.checkAll').attr('id'), value: $(this).find('.action span.checkAll').hasClass('active') });
        });
        sessionStorage.notifications = JSON.stringify(notifications);
    },
    get: function () {
        if (sessionStorage.notifications != undefined) {
            // Get the existing values out of sessionStorage
            notifications = JSON.parse(sessionStorage.notifications);
            for (var i = 0; i < notifications.length; i++) {
                $('.cardContent .card-body:not(.med-alert-info)').each(function () {
                    if ($(this).find('.action span.notify').attr('id') === notifications[i].id && notifications[i].value) {
                        $('#' + notifications[i].id).addClass('active');
                    }
                    if ($(this).find('.action span.alert-me').attr('id') === notifications[i].id && notifications[i].value) {
                        $('#' + notifications[i].id).addClass('active');
                    }
                });
                $('.cardContent .card-body.med-alert-info').each(function () {
                    if ($(this).find('.action span.notifyAll').attr('id') === notifications[i].id && notifications[i].value) {
                        $('#' + notifications[i].id).addClass('active');
                    }
                    if ($(this).find('.action span.checkAll').attr('id') === notifications[i].id && notifications[i].value) {
                        $('#' + notifications[i].id).addClass('active');
                    }
                });
            }
        }
    }
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

var medicationNotify = {
    set: function () {
        //  sessionStorage.removeItem('medicationNotifications');
        $('#scheduleAccordion .card-body:not(.mb-1)').each(function () {
            var notifyID = $(this).find('.action span.notify').attr('id'),
                notifyVal = $(this).find('.action span.notify').hasClass('active'),
                checkID = $(this).find('.action span.alert-me').attr('id'),
                checkVal = $(this).find('.action span.alert-me').hasClass('active');
            var notifyIndex = medicationNotifications.indexOf(notifyID);
            if (notifyVal) {
                if (notifyIndex == -1)
                    medicationNotifications.push(notifyID);
            } else {
                if (notifyIndex > -1)
                    medicationNotifications.splice(notifyIndex, 1);
            }
            var checkIndex = medicationNotifications.indexOf(checkID);
            if (checkVal) {
                if (checkIndex == -1)
                    medicationNotifications.push(checkID);
            } else {
                if (checkIndex > -1)
                    medicationNotifications.splice(checkIndex, 1);
            }
        });
        $('#scheduleAccordion .card-body.mb-1').each(function () {
            var notifyAllID = $(this).find('.action span.notifyAll').attr('id'),
                notifyAllVal = $(this).find('.action span.notifyAll').hasClass('active'),
                checkAllID = $(this).find('.action span.checkAll').attr('id'),
                checkAllVal = $(this).find('.action span.checkAll').hasClass('active');
            var notifyAllIndex = medicationNotifications.indexOf(notifyAllID);
            if (notifyAllVal) {
                if (notifyAllIndex == -1)
                    medicationNotifications.push(notifyAllID);
            } else {
                if (notifyAllIndex > -1)
                    medicationNotifications.splice(notifyAllIndex, 1);
            }
            var checkAllIndex = medicationNotifications.indexOf(checkAllID);
            if (checkAllVal) {
                if (checkAllIndex == -1)
                    medicationNotifications.push(checkAllID);
            } else {
                if (checkAllIndex > -1)
                    medicationNotifications.splice(checkAllIndex, 1);
            }
        });
        sessionStorage.medicationNotifications = JSON.stringify(medicationNotifications);
    },
    get: function () {
        if (sessionStorage.medicationNotifications != undefined) {
            // Get the existing values out of sessionStorage
            medicationNotifications = JSON.parse(sessionStorage.medicationNotifications);
            for (var i = 0; i < medicationNotifications.length; i++) {
                $('#scheduleAccordion .card-body:not(.mb-1)').each(function () {
                    if ($(this).find('.action span.notify').attr('id') === medicationNotifications[i]) {
                        $('#' + medicationNotifications[i]).addClass('active');
                    }
                    if ($(this).find('.action span.alert-me').attr('id') === medicationNotifications[i]) {
                        $('#' + medicationNotifications[i]).addClass('active');
                    }
                });
                $('#scheduleAccordion .card-body.mb-1').each(function () {
                    if ($(this).find('.action span.notifyAll').attr('id') === medicationNotifications[i]) {
                        $('#' + medicationNotifications[i]).addClass('active');
                    }
                    if ($(this).find('.action span.checkAll').attr('id') === medicationNotifications[i]) {
                        $('#' + medicationNotifications[i]).addClass('active');
                    }
                });
            }
        }
    }
}

function setHomeNotification() {
    if ($('.cardContent').is(':visible')) {
        notificationCheck.set();
    }
    if ($("#scheduleAccordion").is(":visible")) {
        medicationNotify.set();
    }
}