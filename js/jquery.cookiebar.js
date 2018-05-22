! function(a) {
  a.cookieBar = function(b, c) {
    if ("cookies" == b) var d = "cookies";
    else if ("set" == b) var d = "set";
    else var d = !1;
    var e = {
        message: "We use cookies to track usage and preferences.",
        acceptButton: !0,
        acceptText: "I Understand",
        acceptFunction: function(a) {
          "enabled" != a && "accepted" != a && (window.location = window.location.href)
        },
        declineButton: !1,
        declineText: "Disable Cookies",
        declineFunction: function(a) {
          "enabled" != a && "accepted" != a || (window.location = window.location.href)
        },
        policyButton: !1,
        policyText: "Privacy Policy",
        policyURL: "/privacy-policy/",
        autoEnable: !0,
        acceptOnContinue: !1,
        acceptOnScroll: !1,
        acceptAnyClick: !1,
        expireDays: 365,
        renewOnVisit: !1,
        forceShow: !1,
        effect: "slide",
        element: "body",
        append: !1,
        fixed: !1,
        bottom: !1,
        zindex: "",
        domain: String(window.location.hostname),
        referrer: String(document.referrer)
      },
      b = a.extend(e, b),
      f = new Date;
    f.setTime(f.getTime() + 864e5 * b.expireDays), f = f.toGMTString();
    var h, j, g = "cb-enabled={value}; expires=" + f + "; path=/",
      i = "",
      k = document.cookie.split("; ");
    for (h = 0; h < k.length; h++) j = k[h].split("="), "cb-enabled" == j[0] && (i = j[1]);
    if ("" == i && "cookies" != d && b.autoEnable ? (i = "enabled", document.cookie = g.replace("{value}", "enabled")) : "accepted" != i && "declined" != i || "cookies" == d || !b.renewOnVisit || (document.cookie = g.replace("{value}", i)), b.acceptOnContinue && b.referrer.indexOf(b.domain) >= 0 && String(window.location.href).indexOf(b.policyURL) == -1 && "cookies" != d && "set" != d && "accepted" != i && "declined" != i && (d = "set", c = "accepted"), "cookies" == d) return "enabled" == i || "accepted" == i;
    if ("set" == d && ("accepted" == c || "declined" == c)) return document.cookie = g.replace("{value}", c), "accepted" == c;
    var l = b.message.replace("{policy_url}", b.policyURL);
    if (b.acceptButton) var m = '<a href="" class="btn cb-enable">' + b.acceptText + "</a>";
    else var m = "";
    if (b.declineButton) var n = '<a href="" class="btn cb-disable">' + b.declineText + "</a>";
    else var n = "";
    if (b.policyButton) var o = '<br><span>Per maggiori informazioni leggi la nostra <a href="' + b.policyURL + '" class="cb-policy">' + b.policyText + "</a></span>";
    else var o = "";
    if (b.fixed)
      if (1 == b.bottom) var p = ' class="fixed bottom"';
      else if (2 == b.bottom) var p = ' class="fixed popup"';
    else var p = ' class="fixed"';
    else var p = "";
    if ("" != b.zindex) var q = ' style="z-index:' + b.zindex + ';"';
    else var q = "";
    (b.forceShow || "enabled" == i || "" == i) && (b.append ? a(b.element).append('<div id="cookie-bar"' + p + q + "><p>" + l + o + "</p><div>" + m + n + "</div></div>") : a(b.element).prepend('<div id="cookie-bar"' + p + q + "><p>" + l + o + "</p><div>" + m + n + "</div></div>"));
    var r = function(c) {
        b.acceptOnScroll && a(document).off("scroll"), "function" == typeof c && c(i), "slide" == b.effect ? a("#cookie-bar").slideUp(300, function() {
          a("#cookie-bar").remove()
        }) : "fade" == b.effect ? a("#cookie-bar").fadeOut(300, function() {
          a("#cookie-bar").remove()
        }) : a("#cookie-bar").hide(0, function() {
          a("#cookie-bar").remove()
        }), a(document).unbind("click", u)
      },
      s = function() {
        document.cookie = g.replace("{value}", "accepted"), r(b.acceptFunction)
      },
      t = function() {
        var a = new Date;
        for (a.setTime(a.getTime() - 864e6), a = a.toGMTString(), k = document.cookie.split("; "), h = 0; h < k.length; h++) j = k[h].split("="), j[0].indexOf("_") >= 0 ? document.cookie = j[0] + "=0; expires=" + a + "; domain=" + b.domain.replace("www", "") + "; path=/" : document.cookie = j[0] + "=0; expires=" + a + "; path=/";
        document.cookie = g.replace("{value}", "declined"), r(b.declineFunction)
      },
      u = function(b) {
        a(b.target).hasClass("cb-policy") || s()
      };
    if (a("#cookie-bar .cb-enable").click(function() {
        return s(), !1
      }), a("#cookie-bar .cb-disable").click(function() {
        return t(), !1
      }), b.acceptOnScroll) {
      var w, x, v = a(document).scrollTop();
      a(document).on("scroll", function() {
        w = a(document).scrollTop(), x = w > v ? w - v : v - w, x >= Math.round(b.acceptOnScroll) && s()
      })
    }
    b.acceptAnyClick && a(document).bind("click", u)
  }
}(jQuery);
