/*! Copyright Elasticsearch B.V. and/or license to Elasticsearch B.V. under one or more contributor license agreements
 * Licensed under the Elastic License; you may not use this file except in compliance with the Elastic License. */
webpackJsonp([7],{4040:function(module,exports,__webpack_require__){"use strict";__webpack_require__(150);__webpack_require__(153);__webpack_require__(154);__webpack_require__(155);__webpack_require__(156);__webpack_require__(157);__webpack_require__(158);__webpack_require__(159);__webpack_require__(160);__webpack_require__(161);__webpack_require__(162);__webpack_require__(163);__webpack_require__(164);__webpack_require__(165);__webpack_require__(166);__webpack_require__(167);__webpack_require__(168);__webpack_require__(169);__webpack_require__(170);__webpack_require__(171);__webpack_require__(172);__webpack_require__(173);__webpack_require__(174);__webpack_require__(175);__webpack_require__(176);__webpack_require__(177);__webpack_require__(178);__webpack_require__(179);__webpack_require__(180);__webpack_require__(181);__webpack_require__(182);__webpack_require__(183);__webpack_require__(184);__webpack_require__(185);__webpack_require__(186);__webpack_require__(187);__webpack_require__(188);__webpack_require__(189);__webpack_require__(190);__webpack_require__(191);__webpack_require__(192);__webpack_require__(193);__webpack_require__(194);__webpack_require__(195);__webpack_require__(196);__webpack_require__(197);__webpack_require__(198);__webpack_require__(199);__webpack_require__(200);__webpack_require__(201);__webpack_require__(202);__webpack_require__(123);__webpack_require__(203);__webpack_require__(204);__webpack_require__(205);__webpack_require__(206);__webpack_require__(207);__webpack_require__(208);__webpack_require__(209);__webpack_require__(210);__webpack_require__(211);__webpack_require__(212);__webpack_require__(213);__webpack_require__(214);__webpack_require__(215);__webpack_require__(216);__webpack_require__(217);__webpack_require__(218);__webpack_require__(219);__webpack_require__(220);__webpack_require__(221);__webpack_require__(222);__webpack_require__(223);__webpack_require__(224);__webpack_require__(225);__webpack_require__(226);__webpack_require__(227);__webpack_require__(228);__webpack_require__(229);__webpack_require__(230);__webpack_require__(231);__webpack_require__(232);__webpack_require__(233);__webpack_require__(234);__webpack_require__(235);__webpack_require__(236);__webpack_require__(237);__webpack_require__(238);__webpack_require__(239);__webpack_require__(240);var _kibanaCore__=__webpack_require__(241);new _kibanaCore__.CoreSystem({injectedMetadata:JSON.parse(document.querySelector("kbn-injected-metadata").getAttribute("data")),rootDomElement:document.body,requireLegacyFiles:function requireLegacyFiles(){__webpack_require__(4041)}}).start()},4041:function(module,exports,__webpack_require__){"use strict";var _lodash=__webpack_require__(1);var _lodash2=_interopRequireDefault(_lodash);var _notify=__webpack_require__(9);__webpack_require__(425);__webpack_require__(4042);__webpack_require__(4045);var _modules=__webpack_require__(2);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}var chrome=__webpack_require__(8).setRootTemplate(__webpack_require__(4046)).setRootController("ui",function($http,buildNum,buildSha){var ui=this;ui.loading=false;ui.buildInfo={num:buildNum,sha:buildSha.substr(0,8)};ui.refresh=function(){ui.loading=true;return $http.get(chrome.addBasePath("/api/status")).then(function(resp){if(ui.fetchError){ui.fetchError.clear();ui.fetchError=null}var data=resp.data;var metrics=data.metrics;metrics&&(ui.metrics=[{name:"Heap Total",value:_lodash2.default.get(metrics,"process.memory.heap.size_limit"),type:"byte"},{name:"Heap Used",value:_lodash2.default.get(metrics,"process.memory.heap.used_in_bytes"),type:"byte"},{name:"Load",value:[_lodash2.default.get(metrics,"os.load.1m"),_lodash2.default.get(metrics,"os.load.5m"),_lodash2.default.get(metrics,"os.load.15m")],type:"float"},{name:"Response Time Avg",value:_lodash2.default.get(metrics,"response_times.avg_in_millis"),type:"ms"},{name:"Response Time Max",value:_lodash2.default.get(metrics,"response_times.max_in_millis"),type:"ms"},{name:"Requests Per Second",value:1e3*_lodash2.default.get(metrics,"requests.total")/_lodash2.default.get(metrics,"collection_interval_in_millis")}]);ui.name=data.name;ui.statuses=data.status.statuses;var overall=data.status.overall;if(!ui.serverState||ui.serverState!==overall.state){ui.serverState=overall.state;ui.serverStateMessage=overall.title}}).catch(function(){if(ui.fetchError)return;ui.fetchError=_notify.notify.error("Failed to request server ui. Perhaps your server is down?");ui.metrics=ui.statuses=ui.overall=null}).then(function(){ui.loading=false})};ui.refresh()});_modules.uiModules.get("kibana").config(function(appSwitcherEnsureNavigationProvider){appSwitcherEnsureNavigationProvider.forceNavigation(true)})},4042:function(module,exports,__webpack_require__){"use strict";var _format_number=__webpack_require__(4043);var _format_number2=_interopRequireDefault(_format_number);var _modules=__webpack_require__(2);var _status_page_metric=__webpack_require__(4044);var _status_page_metric2=_interopRequireDefault(_status_page_metric);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}_modules.uiModules.get("kibana",[]).filter("statusMetric",function(){return function(input,type){var metrics=[].concat(input);return metrics.map(function(metric){return(0,_format_number2.default)(metric,type)}).join(", ")}}).directive("statusPageMetric",function(){return{restrict:"E",template:_status_page_metric2.default,scope:{metric:"="},controllerAs:"metric"}})},4043:function(module,exports,__webpack_require__){"use strict";Object.defineProperty(exports,"__esModule",{value:true});exports.default=formatNumber;var _moment=__webpack_require__(10);var _moment2=_interopRequireDefault(_moment);var _numeral=__webpack_require__(554);var _numeral2=_interopRequireDefault(_numeral);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}function formatNumber(num,which){var format="0.00";var postfix="";switch(which){case"time":return(0,_moment2.default)(num).format("HH:mm:ss");case"byte":format+=" b";break;case"ms":postfix=" ms";break;case"integer":format="0"}return(0,_numeral2.default)(num).format(format)+postfix}module.exports=exports["default"]},4044:function(module,exports){module.exports='<div class="status_metric_wrapper col-md-4">\n  <div class="content">\n    <h3 class="title">{{ metric.name }}</h3>\n    <h4 class="average">{{ metric.value | statusMetric: metric.type}}</h4>\n  </div>\n</div>\n'},4045:function(module,exports){},4046:function(module,exports){module.exports='<div data-test-subj="statusPageContainer" class="container overall_state_default overall_state_{{ui.serverState}}">\n  <header>\n    <h1>\n      Status: <span class="overall_state_color">{{ ui.serverStateMessage }}</span>\n      <i class="fa overall_state_color state_icon" />\n      <span class="pull-right">\n        {{ ui.name }}\n      </span>\n    </h1>\n  </header>\n\n  <div class="row metrics_wrapper">\n    <div ng-repeat="metric in ui.metrics">\n      <status-page-metric metric="metric"></status-page-metric>\n    </div>\n  </div>\n\n  <div class="row statuses_wrapper">\n    <h3>Status Breakdown</h3>\n\n    <div ng-if="!ui.statuses && ui.loading" class="statuses_loading">\n      <span class="spinner"></span>\n    </div>\n\n    <h4 ng-if="!ui.statuses && !ui.loading" class="statuses_missing">\n      No status information available\n    </h4>\n\n    <table class="statuses" data-test-subj="statusBreakdown" ng-if="ui.statuses">\n      <tr class="row">\n        <th class="col-xs-4" scope="col">ID</th>\n        <th class="col-xs-8" scope="col">Status</th>\n      </tr>\n      <tr\n        ng-repeat="status in ui.statuses"\n        class="status status_state_default status_state_{{status.state}} row">\n\n        <td class="col-xs-4 status_id">{{status.id}}</td>\n        <td class="col-xs-8 status_message">\n          <i class="fa status_state_color status_state_icon" />\n          {{status.message}}\n        </td>\n      </tr>\n    </table>\n  </div>\n\n  <footer class="row">\n    <div class="col-xs-12 text-right build-info">\n      Build {{::ui.buildInfo.num}}, Commit SHA {{::ui.buildInfo.sha}}\n    </div>\n  </footer>\n</div>\n'}},[4040]);