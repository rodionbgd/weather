!function(){var t={757:function(t,e,n){t.exports=n(666)},666:function(t){var e=function(t){"use strict";var e,n=Object.prototype,r=n.hasOwnProperty,o="function"==typeof Symbol?Symbol:{},i=o.iterator||"@@iterator",a=o.asyncIterator||"@@asyncIterator",c=o.toStringTag||"@@toStringTag";function l(t,e,n){return Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}),t[e]}try{l({},"")}catch(t){l=function(t,e,n){return t[e]=n}}function u(t,e,n,r){var o=e&&e.prototype instanceof m?e:m,i=Object.create(o.prototype),a=new B(r||[]);return i._invoke=function(t,e,n){var r=d;return function(o,i){if(r===p)throw new Error("Generator is already running");if(r===h){if("throw"===o)throw i;return C()}for(n.method=o,n.arg=i;;){var a=n.delegate;if(a){var c=S(a,n);if(c){if(c===g)continue;return c}}if("next"===n.method)n.sent=n._sent=n.arg;else if("throw"===n.method){if(r===d)throw r=h,n.arg;n.dispatchException(n.arg)}else"return"===n.method&&n.abrupt("return",n.arg);r=p;var l=s(t,e,n);if("normal"===l.type){if(r=n.done?h:f,l.arg===g)continue;return{value:l.arg,done:n.done}}"throw"===l.type&&(r=h,n.method="throw",n.arg=l.arg)}}}(t,n,a),i}function s(t,e,n){try{return{type:"normal",arg:t.call(e,n)}}catch(t){return{type:"throw",arg:t}}}t.wrap=u;var d="suspendedStart",f="suspendedYield",p="executing",h="completed",g={};function m(){}function y(){}function v(){}var w={};l(w,i,(function(){return this}));var E=Object.getPrototypeOf,_=E&&E(E(k([])));_&&_!==n&&r.call(_,i)&&(w=_);var L=v.prototype=m.prototype=Object.create(w);function x(t){["next","throw","return"].forEach((function(e){l(t,e,(function(t){return this._invoke(e,t)}))}))}function b(t,e){function n(o,i,a,c){var l=s(t[o],t,i);if("throw"!==l.type){var u=l.arg,d=u.value;return d&&"object"==typeof d&&r.call(d,"__await")?e.resolve(d.__await).then((function(t){n("next",t,a,c)}),(function(t){n("throw",t,a,c)})):e.resolve(d).then((function(t){u.value=t,a(u)}),(function(t){return n("throw",t,a,c)}))}c(l.arg)}var o;this._invoke=function(t,r){function i(){return new e((function(e,o){n(t,r,e,o)}))}return o=o?o.then(i,i):i()}}function S(t,n){var r=t.iterator[n.method];if(r===e){if(n.delegate=null,"throw"===n.method){if(t.iterator.return&&(n.method="return",n.arg=e,S(t,n),"throw"===n.method))return g;n.method="throw",n.arg=new TypeError("The iterator does not provide a 'throw' method")}return g}var o=s(r,t.iterator,n.arg);if("throw"===o.type)return n.method="throw",n.arg=o.arg,n.delegate=null,g;var i=o.arg;return i?i.done?(n[t.resultName]=i.value,n.next=t.nextLoc,"return"!==n.method&&(n.method="next",n.arg=e),n.delegate=null,g):i:(n.method="throw",n.arg=new TypeError("iterator result is not an object"),n.delegate=null,g)}function O(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function j(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function B(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(O,this),this.reset(!0)}function k(t){if(t){var n=t[i];if(n)return n.call(t);if("function"==typeof t.next)return t;if(!isNaN(t.length)){var o=-1,a=function n(){for(;++o<t.length;)if(r.call(t,o))return n.value=t[o],n.done=!1,n;return n.value=e,n.done=!0,n};return a.next=a}}return{next:C}}function C(){return{value:e,done:!0}}return y.prototype=v,l(L,"constructor",v),l(v,"constructor",y),y.displayName=l(v,c,"GeneratorFunction"),t.isGeneratorFunction=function(t){var e="function"==typeof t&&t.constructor;return!!e&&(e===y||"GeneratorFunction"===(e.displayName||e.name))},t.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,v):(t.__proto__=v,l(t,c,"GeneratorFunction")),t.prototype=Object.create(L),t},t.awrap=function(t){return{__await:t}},x(b.prototype),l(b.prototype,a,(function(){return this})),t.AsyncIterator=b,t.async=function(e,n,r,o,i){void 0===i&&(i=Promise);var a=new b(u(e,n,r,o),i);return t.isGeneratorFunction(n)?a:a.next().then((function(t){return t.done?t.value:a.next()}))},x(L),l(L,c,"Generator"),l(L,i,(function(){return this})),l(L,"toString",(function(){return"[object Generator]"})),t.keys=function(t){var e=[];for(var n in t)e.push(n);return e.reverse(),function n(){for(;e.length;){var r=e.pop();if(r in t)return n.value=r,n.done=!1,n}return n.done=!0,n}},t.values=k,B.prototype={constructor:B,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=e,this.done=!1,this.delegate=null,this.method="next",this.arg=e,this.tryEntries.forEach(j),!t)for(var n in this)"t"===n.charAt(0)&&r.call(this,n)&&!isNaN(+n.slice(1))&&(this[n]=e)},stop:function(){this.done=!0;var t=this.tryEntries[0].completion;if("throw"===t.type)throw t.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var n=this;function o(r,o){return c.type="throw",c.arg=t,n.next=r,o&&(n.method="next",n.arg=e),!!o}for(var i=this.tryEntries.length-1;i>=0;--i){var a=this.tryEntries[i],c=a.completion;if("root"===a.tryLoc)return o("end");if(a.tryLoc<=this.prev){var l=r.call(a,"catchLoc"),u=r.call(a,"finallyLoc");if(l&&u){if(this.prev<a.catchLoc)return o(a.catchLoc,!0);if(this.prev<a.finallyLoc)return o(a.finallyLoc)}else if(l){if(this.prev<a.catchLoc)return o(a.catchLoc,!0)}else{if(!u)throw new Error("try statement without catch or finally");if(this.prev<a.finallyLoc)return o(a.finallyLoc)}}}},abrupt:function(t,e){for(var n=this.tryEntries.length-1;n>=0;--n){var o=this.tryEntries[n];if(o.tryLoc<=this.prev&&r.call(o,"finallyLoc")&&this.prev<o.finallyLoc){var i=o;break}}i&&("break"===t||"continue"===t)&&i.tryLoc<=e&&e<=i.finallyLoc&&(i=null);var a=i?i.completion:{};return a.type=t,a.arg=e,i?(this.method="next",this.next=i.finallyLoc,g):this.complete(a)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),g},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var n=this.tryEntries[e];if(n.finallyLoc===t)return this.complete(n.completion,n.afterLoc),j(n),g}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var n=this.tryEntries[e];if(n.tryLoc===t){var r=n.completion;if("throw"===r.type){var o=r.arg;j(n)}return o}}throw new Error("illegal catch attempt")},delegateYield:function(t,n,r){return this.delegate={iterator:k(t),resultName:n,nextLoc:r},"next"===this.method&&(this.arg=e),g}},t}(t.exports);try{regeneratorRuntime=e}catch(t){"object"==typeof globalThis?globalThis.regeneratorRuntime=e:Function("r","regeneratorRuntime = r")(e)}}},e={};function n(r){var o=e[r];if(void 0!==o)return o.exports;var i=e[r]={exports:{}};return t[r](i,i.exports,n),i.exports}n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,{a:e}),e},n.d=function(t,e){for(var r in e)n.o(e,r)&&!n.o(t,r)&&Object.defineProperty(t,r,{enumerable:!0,get:e[r]})},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},function(){"use strict";var t=0;function e(e){var n=e.elem;!function(){for(var t="",r=1;r<25;r+=1)t+='<div class="wrap">\n                                    <p>'.concat(new Date(1e3*e.data[r].dt).getHours(),":00</p>"),e.data[r].pop>.45?t+="<p>".concat((100*e.data[r].pop).toFixed(),"%</p>"):t+="<p>&nbsp;</p>",t+='<img src="./icons/'.concat(e.data[r].weather[0].icon,'_icon.png" alt="">\n                       <p>').concat((e.data[r].temp-272).toFixed(0),"°</p>\n                                </div>");var o=document.createElement("section");o.dataset.city=n.dataset.city,o.classList.add("slider"),o.id="slider",o.insertAdjacentHTML("afterbegin",t),document.body.insertAdjacentElement("afterbegin",o);var i=n.getBoundingClientRect(),a=i.left+(i.width-o.offsetWidth)/2,c=i.top+window.pageYOffset-o.offsetHeight-5;a+o.offsetWidth>window.innerWidth&&(a=window.innerWidth-o.offsetWidth-5),c<5&&(c=5),o.style.left="".concat(a,"px"),o.style.top="".concat(c,"px")}();var r=document.getElementById("slider");if(r){var o=r.getBoundingClientRect(),i=r.offsetLeft,a=o.right;r.addEventListener("selectstart",(function(t){return t.preventDefault()})),r.addEventListener("dragstart",(function(t){return t.preventDefault()})),r.addEventListener("pointerdown",(function(e){if(e.target.closest("div")){var n=r.querySelectorAll("div"),o=e.pageX,c=0,l=0;t=e.clientX-n[0].getBoundingClientRect().left+i+r.clientLeft,document.addEventListener("pointermove",s),document.addEventListener("pointerup",(function t(){document.removeEventListener("pointermove",s),document.addEventListener("pointerup",t)})),u(e.pageX)}function u(e){c<l&&n[n.length-1].getBoundingClientRect().right<a||c>l&&n[0].getBoundingClientRect().left>i||(l=c,n.forEach((function(n){n.style.left="".concat(e-t,"px")})))}function s(t){c=t.pageX-o,u(t.pageX)}})),this.remove=function(){var t=document.getElementById("slider");t&&t.parentNode.removeChild(t)},this.sliderElem=r}}function r(t,e,n,r,o,i,a){try{var c=t[i](a),l=c.value}catch(t){return void n(t)}c.done?e(l):Promise.resolve(l).then(r,o)}function o(t){return function(){var e=this,n=arguments;return new Promise((function(o,i){var a=t.apply(e,n);function c(t){r(a,o,i,c,l,"next",t)}function l(t){r(a,o,i,c,l,"throw",t)}c(void 0)}))}}var i,a,c,l=n(757),u=n.n(l),s=document.getElementById("current-city"),d=document.getElementById("current-city-img"),f=document.getElementById("current-city-wind"),p=document.getElementById("current-city-weather"),h=document.getElementById("current-city-celsius"),g=document.getElementById("current-city-pressure"),m=document.getElementById("current-city-humidity"),y=document.getElementById("current-city-sunset"),v=document.getElementById("current-city-sunrise"),w=document.getElementById("day"),E=document.getElementById("loading"),_=document.getElementById("search"),L=document.getElementById("search-button"),x=document.getElementById("city-list"),b=document.getElementById("map"),S=document.getElementById("search-form"),O="",j="5df917b322441cc9e193178bf51efa31",B=60*(new Date).getTimezoneOffset();function k(t){t<=0?E.style.display="none":(E.style.opacity=t,setTimeout((function(){k(t-.1)}),200))}function C(t){if(t){s.textContent=t.name;var e=t.current.weather[0].icon;d.src="./icons/".concat(e,"_icon.png");var n,r,o=(n=t.current.wind_deg,(r=["north","north-north-east","north-east","east-north-east","east","east-south-east","south-east","south-south-east","south","south-south-west","south-west","west-south-west","west","west-north-west","north-west","north-north-west"])[Math.floor((n+11)/(360/r.length))%r.length]);f.children[0].src="./icons/wind/icons8-".concat(o,"-80.png");var i=o.split("-").map((function(t){switch(t[0]){case"n":return"С";case"s":return"Ю";case"w":return"З";case"e":return"В";default:return""}})).join("");f.children[1].innerHTML="".concat(t.current.wind_speed.toFixed(1)," м/с ").concat(i),w.textContent=(new Date).toLocaleDateString("ru-RU",{month:"long",day:"numeric",hour:"numeric",minute:"numeric"}),p.textContent=t.current.weather[0].description[0].toUpperCase()+t.current.weather[0].description.substr(1),h.textContent="".concat((t.current.temp-272).toFixed(1),"°C"),g.textContent="".concat((t.current.pressure/1.36).toFixed(1)," мм рт. ст."),m.textContent="".concat(t.current.humidity," %");var a={hour:new Date(1e3*(t.current.sunrise+t.timezone_offset+B)).getHours(),minute:new Date(1e3*(t.current.sunrise+t.timezone_offset+B)).getMinutes()},c={hour:new Date(1e3*(t.current.sunset+t.timezone_offset+B)).getHours(),minute:new Date(1e3*(t.current.sunset+t.timezone_offset+B)).getMinutes()};v.textContent="".concat("0".concat(a.hour).slice(-2),":").concat("0".concat(a.minute).slice(-2)),y.textContent="".concat("0".concat(c.hour).slice(-2),":").concat("0".concat(c.minute).slice(-2))}}function I(){var t,e=!1;Array.from(document.querySelectorAll(".city_list__name")).filter((function(n){Object.prototype.hasOwnProperty.call(localStorage,n.innerHTML)&&n.innerHTML===s.textContent&&(e=!0,t=n)})),localStorage[s.textContent]=JSON.stringify(c);var n='<article class="city_list__profile" data-city="'.concat(c.name,'">\n                        <h4 class="city_list__name">').concat(c.name,'</h4>\n                        <img src="').concat(d.src,'" alt="" class="city_list__picture">\n                        <span class="city_list__value">').concat((c.hourly[0].temp-272).toFixed(),"&deg/").concat((c.hourly[12].temp-272).toFixed(),"&deg</span>\n                    </article>");return Object.keys(localStorage).length&&(document.querySelector(".city_list").style.display="flex"),Object.keys(localStorage).length>5&&(x.firstElementChild.remove(),delete localStorage[Object.keys(localStorage)[0]]),e&&t?(t.parentNode.insertAdjacentHTML("afterend",n),t.parentNode.remove(),!1):(x.insertAdjacentHTML("beforeend",n),!0)}function T(t,e){if(i)return i.setLatLng([t.latitude,t.longitude]),void i.bindPopup('<h4 class="marker">'.concat(e,"</h4>"),{closeButton:!1}).openPopup();b.style.overflow="visible",(i=window.WE.marker([t.latitude,t.longitude]).addTo(a)).bindPopup('<h4 class="marker">'.concat(e,"</h4>"),{closeButton:!1}).openPopup()}function P(t){a&&(a.fitBounds([[t.latitude-90,t.longitude-90],[t.latitude+90,t.longitude+90]]),a.panInsideBounds([[t.latitude-89,t.longitude-89],[t.latitude+89,t.longitude+89]],{heading:1,tilt:0,duration:1.5}))}function D(t,e){return N.apply(this,arguments)}function N(){return N=o(u().mark((function t(e,n){var r,o,i=arguments;return u().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return r=i.length>2&&void 0!==i[2]?i[2]:1,d.src="icons/load.gif",t.next=4,fetch("https://api.openweathermap.org/data/2.5/onecall"+"?lat=".concat(e.latitude,"&lon=").concat(e.longitude)+"&exclude=minutely,daily,alerts&lang=ru&appid=".concat(j));case 4:return o=t.sent,t.next=7,o.json();case 7:(c=t.sent).name=n,C(c),I(),c.name!==O&&r&&(P(e),T(e,c.name)),O=c.name;case 13:case"end":return t.stop()}}),t)}))),N.apply(this,arguments)}function W(t){(new window.google.maps.Geocoder).geocode({address:t},(function(e,n){t&&(n===window.google.maps.GeocoderStatus.OK?D({latitude:e[0].geometry.location.lat(),longitude:e[0].geometry.location.lng()},e[0].address_components[0].long_name):alert("Неправильный город"),_&&(_.value="",_.blur(),_.focus(),L.style.display="none"))}))}window.googleAutoComplete=function(){_.value="";var t=!1,e=new window.google.maps.places.Autocomplete(_,{fields:["formatted_address","geometry","name"],strictBounds:!1,types:["(cities)"]});_.addEventListener("input",(function(){_.value?L.style.display="flex":L.style.display="none"})),S.addEventListener("keydown",(function(e){_.value&&"Enter"===e.key&&(W(_.value),t=!0)})),L.addEventListener("click",(function(){_.value&&(W(_.value),t=!0)})),e.addListener("place_changed",(function(){_.value&&(t?t=!t:W(_.value))}))};var A,F=document.querySelector(".header__title"),z=document.createElement("script");z.type="text/javascript",z.src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCFgn8EeO8dUIZuqg7AD-lnG_Yc5jCT4Ek&libraries=places&callback=googleAutoComplete",document.body.append(z),document.addEventListener("DOMContentLoaded",(function(){k(1),localStorage.length>5&&localStorage.clear();var t={latitude:55.7558,longitude:37.6173},e="Москва",n=window.WE.tileLayer("https://webglearth.github.io/webglearth2-offline/{z}/{x}/{y}.jpg",{tileSize:1024,bounds:[[-90,-180],[90,180]],minZoom:0,maxZoom:1,tms:!0});Object.keys(localStorage).forEach((function(e,r){t={latitude:JSON.parse(localStorage[e]).lat,longitude:JSON.parse(localStorage[e]).lon},r>localStorage.length-2&&(a=window.WE.map("map",{center:[t.latitude,t.longitude],zoom:1,tilting:!0,scrollWheelZoom:!0}),n.addTo(a),a.setView([t.latitude,t.longitude],1)),D(t,e,r>localStorage.length-2)})),localStorage.length||(navigator.geolocation?navigator.geolocation.getCurrentPosition((function(t){a=window.WE.map("map",{center:[t.coords.latitude,t.coords.longitude],zoom:1,tilting:!0,scrollWheelZoom:!0}),n.addTo(a),a.setView([t.coords.latitude,t.coords.longitude],1),function(t){var e=new window.google.maps.LatLng(t.latitude,t.longitude);(new window.google.maps.Geocoder).geocode({latLng:e},(function(e,n){if(n===window.google.maps.GeocoderStatus.OK&&e[1]){for(var r,o,i,a=null,c=null,l=null,u=0,s=e.length;u<s;u+=1){var d=e[u];if(c||"locality"!==d.types[0]){if(c||l||"administrative_area_level_1"!==d.types[0])a||"country"!==d.types[0]||(a=d.address_components[0].long_name);else for(r=0,o=d.address_components.length;r<o;r+=1)if("administrative_area_level_1"===(i=d.address_components[r]).types[0]){l=i.long_name;break}}else for(r=0,o=d.address_components.length;r<o;r+=1)if("locality"===(i=d.address_components[r]).types[0]){c=i.long_name;break}if(c&&a)break}c&&D(t,c)}}))}(t.coords)}),(function(){a=window.WE.map("map",{center:[t.latitude,t.longitude],zoom:1,dragging:!0,scrollWheelZoom:!0}),n.addTo(a),a.setView([t.latitude,t.longitude],1),D(t,e)})):(a=window.WE.map("map",{center:[t.latitude,t.longitude],zoom:1,dragging:!0,scrollWheelZoom:!0}),n.addTo(a),a.setView([t.latitude,t.longitude],1),D(t,e)))})),document.addEventListener("pointerdown",(function(t){var n=t.target.closest(".city_list__profile");if(n){var r=!1;A&&(A.remove(),A.sliderElem.dataset.city===n.dataset.city&&(r=!0,A=null));var o=n.getBoundingClientRect(),i=t.clientX,a=t.pageX;n.style="",n.style.position="relative",n.style.zIndex=1e3;var c=function(t){n.style.left="".concat(t.pageX-i,"px"),n.style.opacity=1-2*Math.abs((o.left-n.getBoundingClientRect().left)/(o.left-o.width/2))};document.addEventListener("pointermove",c),document.addEventListener("pointerup",(function t(e){if(document.removeEventListener("pointermove",c),document.removeEventListener("pointerup",t),Math.abs(a-e.clientX)>o.width/2)return Object.prototype.hasOwnProperty.call(localStorage,n.dataset.city)&&delete localStorage[n.dataset.city],Object.keys(localStorage).length||(document.querySelector(".city_list").style.display="none"),A&&A.remove(),void n.remove();n.style.transition="left 0.5s, opacity 0.5s",n.style.left="".concat(0,"px"),n.style.opacity=1,n.style=""})),n.addEventListener("dragstart",(function(t){return t.preventDefault()})),n.addEventListener("contextmenu",(function(t){return t.preventDefault()})),r||(A=new e({elem:n,data:JSON.parse(localStorage[n.dataset.city]).hourly}))}else!n&&A&&t.target.closest(".slider")!==A.sliderElem&&(A&&A.remove(),A=null)})),document.body.addEventListener("selectstart",(function(t){return t.preventDefault()})),S.addEventListener("submit",(function(t){return t.preventDefault()})),F.addEventListener("pointerenter",(function(){F.querySelector("img").src="icons/header_over_icon.png"})),F.addEventListener("pointerleave",(function(){F.querySelector("img").src="icons/header_out_icon.png"})),F.addEventListener("click",(function(){c&&D({latitude:c.lat,longitude:c.lon},c.name)}))}()}();