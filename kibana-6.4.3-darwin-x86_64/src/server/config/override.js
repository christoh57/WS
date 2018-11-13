'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (target, source) {
  const _target = (0, _utils.getFlattenedObject)(target);
  const _source = (0, _utils.getFlattenedObject)(source);
  return (0, _explode_by2.default)('.', _lodash2.default.defaults(_source, _target));
};

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _explode_by = require('./explode_by');

var _explode_by2 = _interopRequireDefault(_explode_by);

var _utils = require('../../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Licensed to Elasticsearch B.V. under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch B.V. licenses this file to you under
 * the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

module.exports = exports['default'];