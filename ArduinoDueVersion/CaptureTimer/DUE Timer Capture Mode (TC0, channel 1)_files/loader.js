var ArduinoGeo=ArduinoGeo||function(){var e=function(e){var n=" "+document.cookie,t=n.indexOf(" "+e+"=");if(-1===t)n=null;else{t=n.indexOf("=",t)+1;var r=n.indexOf(";",t);-1===r&&(r=n.length),n=unescape(n.substring(t,r))}return n}("georestriction_selection");return{get:function(){return e}}}(),createSites=["create","devices","cloud","test_hf"],ArduinoAuthHelper=ArduinoAuthHelper||function(){var n,t=!1,r={},o={},i={},e={init:function(){n=jQuery.Deferred()},authURL:"https://auth.arduino.cc/",getToken:function(){return n.then(function(e){return e?e.token:null})},setToken:function(e){t=!!e,n.resolve(e)},getProfile:function(){return r},setProfile:function(e){r=e},getConsents:function(){return o},setConsents:function(e){o=e},setOptions:function(e){i=e},getOptions:function(){return i},requiredConsents:function(){return!o.privacy||!o.terms_and_conditions},setLoggedOut:function(){e.setToken(null)},isLoggedIn:function(){return t}};return e}(),AlgoliaHelper=AlgoliaHelper||function(){var n=void 0;return{init:function(e){n=e},getAlgoliaSearch:function(){return n}}}(),ArduinoHeaderAndFooter=ArduinoHeaderAndFooter||function(){var u="https://cdn.arduino.cc/header-footer/28xiz7ejyb",l="https://store.arduino.cc";"usa"===ArduinoGeo.get()&&(l="https://store.arduino.cc/usa");var d=ArduinoAuthHelper.authURL;return function(t){ArduinoAuthHelper.setOptions(t);var r=["header","footer","newsletter-modal"];t.parts&&(r=t.parts);var o="en";t.lang&&(o=t.lang);var e,n=-1!==r.indexOf("create-nav");return new Promise(function(e,n){return"undefined"==typeof jQuery?e(i("https://code.jquery.com/jquery-3.3.1.min.js")):e()}).then(function(){var e;(e=document.createElement("script")).type="text/javascript",e.src="//consent.trustarc.com/notice?domain=arduino.com&c=teconsent&text=true&pcookie",e.async=!0,e.crossOrigin=!0,jQuery("head").append(e),t.algoliaSearch&&AlgoliaHelper.init(t.algoliaSearch)}).then(function(){ArduinoAuthHelper.init()}).then(function(){jQuery.get(u+"/create-nav-images/icons.svg",function(e){var n=document.createElement("div");n.className="icons",n.style.display="none",n.innerHTML=(new XMLSerializer).serializeToString(e.documentElement),document.body.insertBefore(n,document.body.childNodes[0])});for(var e=[],n=0;n<r.length;n++)e.push(c(r[n],o));return Promise.all(e)}).then(function(){var i=u+"/"+o+"/privacy-modal.html";0===jQuery("#consent-modal-container").length&&jQuery("body").append('<div id="consent-modal-container"></div>');var e=new Promise(function(r,o){jQuery("#consent-modal-container").load(i,function(e,n,t){return"success"!==n?o("failure to inject "+i):r("imported "+i)})});return Promise.resolve(e)}).then(function(){for(var e=[],n=0;n<r.length;n++)e.push(a(u+"/css/"+r[n]+".css"));return e.push(a(u+"/css/privacy-modal.css")),Promise.all(e)}).then(function(){for(var e=[],n=0;n<r.length;n++)e.push(i(u+"/js/"+r[n]+".js"));return"default"===t.auth&&e.push(i(u+"/login.js")),Promise.all(e)}).then(function(){return"default"===t.auth?(t.authOptions.logoutURI||(t.authOptions.logoutURI=d+"logout"),t.authUri||(t.authUri=d+"login"),s(n,new Oauth2(t.authOptions))):"custom"===t.auth?s(n,t.authOptions):(-1!==d.indexOf(window.location.hostname)&&(e="loggedout",ArduinoAuthHelper.setLoggedOut(),jQuery(".login-button").show(),jQuery(".login-button").find("a").attr("href","/login")),Promise.resolve(e))}).then(f).then(function(){return t.langSelector&&jQuery(".language-selector").show(),n?jQuery("#ino-create-nav").show():jQuery(".main-nav").show(),Promise.resolve(e)})};function i(o){return new Promise(function(e,n){var t=document.getElementsByTagName("head")[0],r=document.createElement("script");r.src=o,r.onload=r.onreadystatechange=e,r.onabort=r.onerror=n,t.appendChild(r)})}function a(o){return new Promise(function(e,n){var t=document.getElementsByTagName("head")[0],r=document.createElement("link");r.rel="stylesheet",r.href=o,r.onload=r.onreadystatechange=e,r.onabort=r.onerror=e,t.insertBefore(r,t.firstChild)})}function c(e,n){return new Promise(function(r,o){var i=u+"/"+n+"/"+e+".html";jQuery.ajaxSetup({timeout:5e4}),jQuery("#"+e).load(i,function(e,n,t){return"success"!==n?o("failure to inject "+i):r("imported "+i)})})}function s(e,t){var r,o,i,u,a,c=t.token;r=o=jQuery(".login-button");var s=jQuery(".logout");return a=e?(i=jQuery(".user-profile .userpic"),u=jQuery(".user-profile .default"),jQuery(".user-profile")):(o=jQuery(".login-button a"),i=jQuery(".profile img.user"),u=jQuery(".profile svg.default"),jQuery(".auth-required")),t.token().then(function(e){var n;return ArduinoAuthHelper.setToken(e),n=e.token,jQuery.ajax({url:"https://forum.arduino.cc/index.php?api&pm&json",headers:{Authorization:"Bearer "+n},success:function(e){0<e.data&&(jQuery(".profile .badge").html(e.data),jQuery(".profile .badge").show())},error:function(e){console.error(e)}}),function(t){var e=sessionStorage.getItem("oauth_clientId"),r="public";-1<createSites.indexOf(e)&&(r+=",private");return new Promise(function(n,e){jQuery.ajax({url:d+"v1/users/byID/me?scopes="+r,success:function(e){n(e)},headers:{Authorization:"Bearer "+t},error:e})})}(e.token)}).then(function(e){ArduinoAuthHelper.setProfile(e),r.hide();var n=e.public.avatar;return i.attr("src",n),u.hide(),i.show(),n||(u.show(),i.hide()),i.on("error",function(){u.show(),i.hide()}),a.show(),s.on("click",function(e){if(e.preventDefault(),"function"==typeof t.logout)t.logout();else{var n=window.location.href;window.location.replace(d+"logout?redirect_uri="+n)}}),Promise.resolve(c)}).catch(function(e){if("inside iframe"!==e){ArduinoAuthHelper.setLoggedOut();var n=t.redirectURI();return"function"==typeof t.login?o.on("click",function(e){e.preventDefault(),t.login()}):o.attr("href",n),r.show(),a.hide(),-1!==l.indexOf(window.location.hostname)&&jQuery(".main-nav").find(".cart-dropdown-trigger").show(),Promise.resolve(n)}})}function f(){return new Promise(function(n,t){var e=window.location.href;return"https://www.arduino.cc/en/Main/PrivacyPolicy"===e||"https://www.arduino.cc/en/Main/TermsOfService"===e?n(""):ArduinoAuthHelper.isLoggedIn()?ArduinoAuthHelper.getToken().then(function(e){return jQuery("#privacy-and-terms-modal").removeAttr("style"),jQuery.ajax({url:"https://api2.arduino.cc/consent/v1/approval/byUser/me",success:function(e){ArduinoAuthHelper.setConsents(e),ArduinoAuthHelper.requiredConsents()?(jQuery("#privacy-and-terms-modal").addClass("open"),jQuery("body").addClass("consent-modal-open"),n(i(u+"/js/privacy-modal.js"))):n(e)},headers:{Authorization:"Bearer "+e},error:t})}):n("")})}}();!function(e){function r(){}function i(e){if("object"!=typeof this)throw new TypeError("Promises must be constructed via new");if("function"!=typeof e)throw new TypeError("not a function");this._state=0,this._handled=!1,this._value=void 0,this._deferreds=[],l(e,this)}function o(t,r){for(;3===t._state;)t=t._value;return 0===t._state?void t._deferreds.push(r):(t._handled=!0,void i._immediateFn(function(){var e=1===t._state?r.onFulfilled:r.onRejected;if(null!==e){var n;try{n=e(t._value)}catch(e){return void a(r.promise,e)}u(r.promise,n)}else(1===t._state?u:a)(r.promise,t._value)}))}function u(n,e){try{if(e===n)throw new TypeError("A promise cannot be resolved with itself.");if(e&&("object"==typeof e||"function"==typeof e)){var t=e.then;if(e instanceof i)return n._state=3,n._value=e,void c(n);if("function"==typeof t)return void l((r=t,o=e,function(){r.apply(o,arguments)}),n)}n._state=1,n._value=e,c(n)}catch(e){a(n,e)}var r,o}function a(e,n){e._state=2,e._value=n,c(e)}function c(e){2===e._state&&0===e._deferreds.length&&i._immediateFn(function(){e._handled||i._unhandledRejectionFn(e._value)});for(var n=0,t=e._deferreds.length;n<t;n++)o(e,e._deferreds[n]);e._deferreds=null}function s(e,n,t){this.onFulfilled="function"==typeof e?e:null,this.onRejected="function"==typeof n?n:null,this.promise=t}function l(e,n){var t=!1;try{e(function(e){t||(t=!0,u(n,e))},function(e){t||(t=!0,a(n,e))})}catch(e){if(t)return;t=!0,a(n,e)}}var n=setTimeout;i.prototype.catch=function(e){return this.then(null,e)},i.prototype.then=function(e,n){var t=new this.constructor(r);return o(this,new s(e,n,t)),t},i.all=function(e){var a=Array.prototype.slice.call(e);return new i(function(r,o){function i(n,e){try{if(e&&("object"==typeof e||"function"==typeof e)){var t=e.then;if("function"==typeof t)return void t.call(e,function(e){i(n,e)},o)}a[n]=e,0==--u&&r(a)}catch(e){o(e)}}if(0===a.length)return r([]);for(var u=a.length,e=0;e<a.length;e++)i(e,a[e])})},i.resolve=function(n){return n&&"object"==typeof n&&n.constructor===i?n:new i(function(e){e(n)})},i.reject=function(t){return new i(function(e,n){n(t)})},i.race=function(o){return new i(function(e,n){for(var t=0,r=o.length;t<r;t++)o[t].then(e,n)})},i._immediateFn="function"==typeof setImmediate&&function(e){setImmediate(e)}||function(e){n(e,0)},i._unhandledRejectionFn=function(e){"undefined"!=typeof console&&console&&console.warn("Possible Unhandled Promise Rejection:",e)},i._setImmediateFn=function(e){i._immediateFn=e},i._setUnhandledRejectionFn=function(e){i._unhandledRejectionFn=e},"undefined"!=typeof module&&module.exports?module.exports=i:e.Promise||(e.Promise=i)}(this);