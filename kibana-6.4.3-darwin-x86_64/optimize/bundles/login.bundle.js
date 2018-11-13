/*! Copyright Elasticsearch B.V. and/or license to Elasticsearch B.V. under one or more contributor license agreements
 * Licensed under the Elastic License; you may not use this file except in compliance with the Elastic License. */
webpackJsonp([8],{4442:function(module,exports,__webpack_require__){"use strict";__webpack_require__(150);__webpack_require__(153);__webpack_require__(154);__webpack_require__(155);__webpack_require__(156);__webpack_require__(157);__webpack_require__(158);__webpack_require__(159);__webpack_require__(160);__webpack_require__(161);__webpack_require__(162);__webpack_require__(163);__webpack_require__(164);__webpack_require__(165);__webpack_require__(166);__webpack_require__(167);__webpack_require__(168);__webpack_require__(169);__webpack_require__(170);__webpack_require__(171);__webpack_require__(172);__webpack_require__(173);__webpack_require__(174);__webpack_require__(175);__webpack_require__(176);__webpack_require__(177);__webpack_require__(178);__webpack_require__(179);__webpack_require__(180);__webpack_require__(181);__webpack_require__(182);__webpack_require__(183);__webpack_require__(184);__webpack_require__(185);__webpack_require__(186);__webpack_require__(187);__webpack_require__(188);__webpack_require__(189);__webpack_require__(190);__webpack_require__(191);__webpack_require__(192);__webpack_require__(193);__webpack_require__(194);__webpack_require__(195);__webpack_require__(196);__webpack_require__(197);__webpack_require__(198);__webpack_require__(199);__webpack_require__(200);__webpack_require__(201);__webpack_require__(202);__webpack_require__(123);__webpack_require__(203);__webpack_require__(204);__webpack_require__(205);__webpack_require__(206);__webpack_require__(207);__webpack_require__(208);__webpack_require__(209);__webpack_require__(210);__webpack_require__(211);__webpack_require__(212);__webpack_require__(213);__webpack_require__(214);__webpack_require__(215);__webpack_require__(216);__webpack_require__(217);__webpack_require__(218);__webpack_require__(219);__webpack_require__(220);__webpack_require__(221);__webpack_require__(222);__webpack_require__(223);__webpack_require__(224);__webpack_require__(225);__webpack_require__(226);__webpack_require__(227);__webpack_require__(228);__webpack_require__(229);__webpack_require__(230);__webpack_require__(231);__webpack_require__(232);__webpack_require__(233);__webpack_require__(234);__webpack_require__(235);__webpack_require__(236);__webpack_require__(237);__webpack_require__(238);__webpack_require__(239);__webpack_require__(240);var _kibanaCore__=__webpack_require__(241);new _kibanaCore__.CoreSystem({injectedMetadata:JSON.parse(document.querySelector("kbn-injected-metadata").getAttribute("data")),rootDomElement:document.body,requireLegacyFiles:function requireLegacyFiles(){__webpack_require__(4443)}}).start()},4443:function(module,exports,__webpack_require__){"use strict";__webpack_require__(4444)},4444:function(module,exports,__webpack_require__){"use strict";var _url=__webpack_require__(66);var _lodash=__webpack_require__(1);__webpack_require__(425);__webpack_require__(4445);var _chrome=__webpack_require__(8);var _chrome2=_interopRequireDefault(_chrome);var _parse_next=__webpack_require__(4446);var _login=__webpack_require__(4447);var _login2=_interopRequireDefault(_login);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}var messageMap={SESSION_EXPIRED:"Your session has expired. Please log in again."};_chrome2.default.setVisible(false).setRootTemplate(_login2.default).setRootController("login",function($http,$window,secureCookies,loginState){var basePath=_chrome2.default.getBasePath();var next=(0,_parse_next.parseNext)($window.location.href,basePath);var isSecure=!!$window.location.protocol.match(/^https/);var self=this;function setupScope(){self.layout=loginState.layout;self.allowLogin=loginState.allowLogin;self.loginMessage=loginState.loginMessage;self.infoMessage=(0,_lodash.get)(messageMap,(0,_url.parse)($window.location.href,true).query.msg);self.isDisabled=!isSecure&&secureCookies;self.isLoading=false;self.submit=function(username,password){self.isLoading=true;self.error=false;$http.post("./api/security/v1/login",{username:username,password:password}).then(function(){return $window.location.href=next},function(){setupScope();self.error=true;self.isLoading=false})}}setupScope()})},4445:function(module,exports){},4446:function(module,exports,__webpack_require__){"use strict";Object.defineProperty(exports,"__esModule",{value:true});exports.parseNext=parseNext;var _url=__webpack_require__(66);function parseNext(href){var basePath=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"";var _parse=(0,_url.parse)(href,true),query=_parse.query,hash=_parse.hash;if(!query.next)return basePath+"/";var _parse2=(0,_url.parse)(query.next,false,true),protocol=_parse2.protocol,hostname=_parse2.hostname,port=_parse2.port,pathname=_parse2.pathname;if(null!==protocol||null!==hostname||null!==port)return basePath+"/";if(!String(pathname).startsWith(basePath))return basePath+"/";return query.next+(hash||"")}},4447:function(module,exports){module.exports='<div class="container" ng-class="{error: !!login.error}">\n  <div class="logo-container">\n    <div class="kibanaWelcomeLogo"></div>\n  </div>\n\n  <div class="form-container" ng-if="login.layout === \'form\'">\n    <form class="login-form" ng-submit="login.submit(username, password)">\n      <div ng-show="login.error" class="form-group error-message">\n        <label class="control-label" data-test-subj="loginErrorMessage" >Oops! Error. Try again.</label>\n      </div>\n\n      <div ng-if="login.infoMessage" class="form-group error-message">\n        <label class="control-label">{{login.infoMessage}}</label>\n      </div>\n\n      <div ng-if="!login.allowLogin" class="form-group error-message">\n        <label class="control-label">{{login.loginMessage}}</label>\n      </div>\n\n      <div ng-if="login.isDisabled" class="form-group error-message">\n        <label class="control-label">Logging in requires a secure connection. Please contact your administrator.</label>\n      </div>\n\n      <div class="form-group inner-addon left-addon">\n        <i class="fa fa-user fa-lg fa-fw"></i>\n        <input type="text" ng-disabled="login.isDisabled || !login.allowLogin" ng-model="username" class="form-control" id="username" placeholder="Username" autofocus data-test-subj="loginUsername" />\n      </div>\n\n      <div class="form-group inner-addon left-addon">\n        <i class="fa fa-lock fa-lg fa-fw"></i>\n        <input type="password" ng-disabled="login.isDisabled|| !login.allowLogin" ng-model="password" class="form-control" id="password" placeholder="Password" data-test-subj="loginPassword"/>\n      </div>\n\n      <div class="form-group">\n        <button\n          type="submit"\n          ng-disabled="login.isDisabled || !login.allowLogin || !username || !password || login.isLoading"\n          class="kuiButton kuiButton--primary kuiButton--fullWidth"\n          data-test-subj="loginSubmit"\n        >\n          Log in\n        </button>\n      </div>\n    </form>\n  </div>\n\n  <div class="euiText loginErrorEsUnavailable" ng-if="login.layout === \'error-es-unavailable\'">\n    <p class="euiTitle euiTitle--medium euiTextColor euiTextColor--danger">Cannot connect to the Elasticsearch cluster currently configured for Kibana.</p>\n    <p>Refer to the Kibana logs for more details and refresh to try again.</p>\n  </div>\n\n  <div class="euiText loginErrorXpackUnavailable" ng-if="login.layout === \'error-xpack-unavailable\'">\n    <p class="euiTitle euiTitle--small">It appears you\'re running the oss-only distribution of Elasticsearch.</p>\n    <p class="euiTitle euiTitle--small">To use the full set of free features in this distribution of Kibana, please update Elasticsearch to the <a href="https://www.elastic.co/downloads/elasticsearch">default distribution</a>.</p>\n    <p>Refresh to try again.</p>\n  </div>\n\n</div>\n'}},[4442]);