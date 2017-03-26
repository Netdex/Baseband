jQuery.fn.outerHTML = function () {
    return jQuery('<div />').append(this.eq(0).clone()).html();
};

/**
 * JavaScript Client Detection
 * (C) viazenetti GmbH (Christian Ludwig)
 */
(function (window) {
    {
        var unknown = '-';

        // screen
        var screenSize = '';
        if (screen.width) {
            width = (screen.width) ? screen.width : '';
            height = (screen.height) ? screen.height : '';
            screenSize += '' + width + " x " + height;
        }

        // browser
        var nVer = navigator.appVersion;
        var nAgt = navigator.userAgent;
        var browser = navigator.appName;
        var version = '' + parseFloat(navigator.appVersion);
        var majorVersion = parseInt(navigator.appVersion, 10);
        var nameOffset, verOffset, ix;

        // Opera
        if ((verOffset = nAgt.indexOf('Opera')) != -1) {
            browser = 'Opera';
            version = nAgt.substring(verOffset + 6);
            if ((verOffset = nAgt.indexOf('Version')) != -1) {
                version = nAgt.substring(verOffset + 8);
            }
        }
        // Opera Next
        if ((verOffset = nAgt.indexOf('OPR')) != -1) {
            browser = 'Opera';
            version = nAgt.substring(verOffset + 4);
        }
        // Edge
        else if ((verOffset = nAgt.indexOf('Edge')) != -1) {
            browser = 'Microsoft Edge';
            version = nAgt.substring(verOffset + 5);
        }
        // MSIE
        else if ((verOffset = nAgt.indexOf('MSIE')) != -1) {
            browser = 'Microsoft Internet Explorer';
            version = nAgt.substring(verOffset + 5);
        }
        // Chrome
        else if ((verOffset = nAgt.indexOf('Chrome')) != -1) {
            browser = 'Chrome';
            version = nAgt.substring(verOffset + 7);
        }
        // Safari
        else if ((verOffset = nAgt.indexOf('Safari')) != -1) {
            browser = 'Safari';
            version = nAgt.substring(verOffset + 7);
            if ((verOffset = nAgt.indexOf('Version')) != -1) {
                version = nAgt.substring(verOffset + 8);
            }
        }
        // Firefox
        else if ((verOffset = nAgt.indexOf('Firefox')) != -1) {
            browser = 'Firefox';
            version = nAgt.substring(verOffset + 8);
        }
        // MSIE 11+
        else if (nAgt.indexOf('Trident/') != -1) {
            browser = 'Microsoft Internet Explorer';
            version = nAgt.substring(nAgt.indexOf('rv:') + 3);
        }
        // Other browsers
        else if ((nameOffset = nAgt.lastIndexOf(' ') + 1) < (verOffset = nAgt.lastIndexOf('/'))) {
            browser = nAgt.substring(nameOffset, verOffset);
            version = nAgt.substring(verOffset + 1);
            if (browser.toLowerCase() == browser.toUpperCase()) {
                browser = navigator.appName;
            }
        }
        // trim the version string
        if ((ix = version.indexOf(';')) != -1) version = version.substring(0, ix);
        if ((ix = version.indexOf(' ')) != -1) version = version.substring(0, ix);
        if ((ix = version.indexOf(')')) != -1) version = version.substring(0, ix);

        majorVersion = parseInt('' + version, 10);
        if (isNaN(majorVersion)) {
            version = '' + parseFloat(navigator.appVersion);
            majorVersion = parseInt(navigator.appVersion, 10);
        }

        // mobile version
        var mobile = /Mobile|mini|Fennec|Android|iP(ad|od|hone)/.test(nVer);

        // cookie
        var cookieEnabled = (navigator.cookieEnabled) ? true : false;

        if (typeof navigator.cookieEnabled == 'undefined' && !cookieEnabled) {
            document.cookie = 'testcookie';
            cookieEnabled = (document.cookie.indexOf('testcookie') != -1) ? true : false;
        }

        // system
        var os = unknown;
        var clientStrings = [
            {s: 'Windows 10', r: /(Windows 10.0|Windows NT 10.0)/},
            {s: 'Windows 8.1', r: /(Windows 8.1|Windows NT 6.3)/},
            {s: 'Windows 8', r: /(Windows 8|Windows NT 6.2)/},
            {s: 'Windows 7', r: /(Windows 7|Windows NT 6.1)/},
            {s: 'Windows Vista', r: /Windows NT 6.0/},
            {s: 'Windows Server 2003', r: /Windows NT 5.2/},
            {s: 'Windows XP', r: /(Windows NT 5.1|Windows XP)/},
            {s: 'Windows 2000', r: /(Windows NT 5.0|Windows 2000)/},
            {s: 'Windows ME', r: /(Win 9x 4.90|Windows ME)/},
            {s: 'Windows 98', r: /(Windows 98|Win98)/},
            {s: 'Windows 95', r: /(Windows 95|Win95|Windows_95)/},
            {s: 'Windows NT 4.0', r: /(Windows NT 4.0|WinNT4.0|WinNT|Windows NT)/},
            {s: 'Windows CE', r: /Windows CE/},
            {s: 'Windows 3.11', r: /Win16/},
            {s: 'Android', r: /Android/},
            {s: 'Open BSD', r: /OpenBSD/},
            {s: 'Sun OS', r: /SunOS/},
            {s: 'Linux', r: /(Linux|X11)/},
            {s: 'iOS', r: /(iPhone|iPad|iPod)/},
            {s: 'Mac OS X', r: /Mac OS X/},
            {s: 'Mac OS', r: /(MacPPC|MacIntel|Mac_PowerPC|Macintosh)/},
            {s: 'QNX', r: /QNX/},
            {s: 'UNIX', r: /UNIX/},
            {s: 'BeOS', r: /BeOS/},
            {s: 'OS/2', r: /OS\/2/},
            {s: 'Search Bot', r: /(nuhk|Googlebot|Yammybot|Openbot|Slurp|MSNBot|Ask Jeeves\/Teoma|ia_archiver)/}
        ];
        for (var id in clientStrings) {
            var cs = clientStrings[id];
            if (cs.r.test(nAgt)) {
                os = cs.s;
                break;
            }
        }

        var osVersion = unknown;

        if (/Windows/.test(os)) {
            osVersion = /Windows (.*)/.exec(os)[1];
            os = 'Windows';
        }

        switch (os) {
            case 'Mac OS X':
                osVersion = /Mac OS X (10[\.\_\d]+)/.exec(nAgt)[1];
                break;

            case 'Android':
                osVersion = /Android ([\.\_\d]+)/.exec(nAgt)[1];
                break;

            case 'iOS':
                osVersion = /OS (\d+)_(\d+)_?(\d+)?/.exec(nVer);
                osVersion = osVersion[1] + '.' + osVersion[2] + '.' + (osVersion[3] | 0);
                break;
        }

        // flash (you'll need to include swfobject)
        /* script src="//ajax.googleapis.com/ajax/libs/swfobject/2.2/swfobject.js" */
        var flashVersion = 'no check';
        if (typeof swfobject != 'undefined') {
            var fv = swfobject.getFlashPlayerVersion();
            if (fv.major > 0) {
                flashVersion = fv.major + '.' + fv.minor + ' r' + fv.release;
            }
            else {
                flashVersion = unknown;
            }
        }
    }

    window.jscd = {
        screen: screenSize,
        browser: browser,
        browserVersion: version,
        browserMajorVersion: majorVersion,
        mobile: mobile,
        os: os,
        osVersion: osVersion,
        cookies: cookieEnabled,
        flashVersion: flashVersion
    };
}(this));

//    alert(
//        'OS: ' + jscd.os +' '+ jscd.osVersion + '\n' +
//        'Browser: ' + jscd.browser +' '+ jscd.browserMajorVersion +
//        ' (' + jscd.browserVersion + ')\n' +
//        'Mobile: ' + jscd.mobile + '\n' +
//        'Flash: ' + jscd.flashVersion + '\n' +
//        'Cookies: ' + jscd.cookies + '\n' +
//        'Screen Size: ' + jscd.screen + '\n\n' +
//        'Full User Agent: ' + navigator.userAgent
//    );

function init() {

}

function fade_intro(callback) {
    $("#div_introduction").velocity("fadeOut", {delay: 1000, duration: 500, complete: callback});
}

function discern_os(callback) {
    var os = jscd.os;
    if (os != "Windows") {
        $("#div_not_windows").velocity("fadeIn", {duration: 500});
    }
    else {
        $("#div_windows").velocity("fadeIn", {duration: 500});
    }
    $("#btn_terms_accept").on('click', function (e) {
        $("#div_windows").velocity("fadeOut", {duration: 500, complete: callback});
    });
}

function begin_poll(callback) {
    $("#div_polling").velocity("fadeIn", {duration: 500});
    poll(function (data) {
        callback(data);
    });
}

function poll(callback) {
    $.ajax({
        type: 'GET',
        url: "http://localhost:19247/data",
        dataType: "json",
        async: true,
        success: function (data) {
            $("#div_polling").velocity("fadeOut", {
                duration: 500, complete: function () {
                    callback(data);
                }
            });
        },
        error: function (xhr, textStatus, errorThrown) {
            console.log(xhr, textStatus, errorThrown);
            setTimeout(function () {
                poll(callback);
            }, 500);
        }
    });
}

function generate_info_block(datum) {
    var col = "danger";
    if (datum.Score > 80)
        col = "primary";
    else if (datum.Score > 60)
        col = "success";
    else if (datum.Score > 40)
        col = "warning";

    var unit = $(
        "<div class='panel panel-default panel-" + col + "'>" +
        "   <div class='panel-heading'>" +
        "       <h3><b>" + datum.Name + "</b></h3>" +
        "   </div>" +
        "   <div class='panel-body'>" +
        "       <div class='row'>" +
        "           <div class='col-md-6'>" +
        "       <p><b>What is this?</b>" +
        "       " + datum.Details + "</p>" +
        "</div><div class='col-md-6'>" +
        "       <p><b>What about me?</b>" +
        "       " + datum.NextSteps + "</p>" +
        "           </div>" +
        "       <div class='col-md-12'>" +
        "       <div class='progress progress-striped'>" +
        "       <div class='progress-bar progress-bar-" + col + "' style='width: "+ datum.score +"%'>" +
        "                  </div>" +
        "               </div>" +
        "           </div>" +
        "       </div>" +
        "   </div>" +
        "</div>");
    return unit;

}
function display_info(data, callback) {
    $("#pre_information").text(JSON.stringify(data));
    $("#div_information").velocity("fadeIn", {duration: 500, complete: callback});
    var loc = $("#div_block_location");
    for (var i = 0; i < data.modules.length; i++) {
        var unit = generate_info_block(data.modules[i]);
        unit.appendTo(loc);
    }
}

function download(callback) {
    $("#div_download").velocity("fadeIn", {duration: 500});
    $("#btn_download").on('click', function () {
        $("#div_download").velocity("fadeOut", {duration: 500, complete: callback});
    });
}

$(function () {
    init();
    // $("#div_introduction").velocity("fadeOut", {delay: 0, duration: 0});
    // $("#div_download").velocity("fadeIn", {delay: 0, duration: 0});
    fade_intro(function () {
        discern_os(function () {
            download(function () {
                begin_poll(function (data) {
                    display_info(data, function () {

                    });
                });
            });
        });
    });
});