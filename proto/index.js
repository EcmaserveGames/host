/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
"use strict";

var $protobuf = require("protobufjs/minimal");

// Common aliases
var $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

$root.ecmaservegames = (function() {

    /**
     * Namespace ecmaservegames.
     * @exports ecmaservegames
     * @namespace
     */
    var ecmaservegames = {};

    ecmaservegames.host = (function() {

        /**
         * Namespace host.
         * @memberof ecmaservegames
         * @namespace
         */
        var host = {};

        host.RuleResult = (function() {

            /**
             * Properties of a RuleResult.
             * @memberof ecmaservegames.host
             * @interface IRuleResult
             * @property {string|null} [name] RuleResult name
             * @property {boolean|null} [result] RuleResult result
             */

            /**
             * Constructs a new RuleResult.
             * @memberof ecmaservegames.host
             * @classdesc Represents a RuleResult.
             * @implements IRuleResult
             * @constructor
             * @param {ecmaservegames.host.IRuleResult=} [properties] Properties to set
             */
            function RuleResult(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * RuleResult name.
             * @member {string} name
             * @memberof ecmaservegames.host.RuleResult
             * @instance
             */
            RuleResult.prototype.name = "";

            /**
             * RuleResult result.
             * @member {boolean} result
             * @memberof ecmaservegames.host.RuleResult
             * @instance
             */
            RuleResult.prototype.result = false;

            /**
             * Creates a new RuleResult instance using the specified properties.
             * @function create
             * @memberof ecmaservegames.host.RuleResult
             * @static
             * @param {ecmaservegames.host.IRuleResult=} [properties] Properties to set
             * @returns {ecmaservegames.host.RuleResult} RuleResult instance
             */
            RuleResult.create = function create(properties) {
                return new RuleResult(properties);
            };

            /**
             * Encodes the specified RuleResult message. Does not implicitly {@link ecmaservegames.host.RuleResult.verify|verify} messages.
             * @function encode
             * @memberof ecmaservegames.host.RuleResult
             * @static
             * @param {ecmaservegames.host.IRuleResult} message RuleResult message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            RuleResult.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.name != null && Object.hasOwnProperty.call(message, "name"))
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.name);
                if (message.result != null && Object.hasOwnProperty.call(message, "result"))
                    writer.uint32(/* id 2, wireType 0 =*/16).bool(message.result);
                return writer;
            };

            /**
             * Encodes the specified RuleResult message, length delimited. Does not implicitly {@link ecmaservegames.host.RuleResult.verify|verify} messages.
             * @function encodeDelimited
             * @memberof ecmaservegames.host.RuleResult
             * @static
             * @param {ecmaservegames.host.IRuleResult} message RuleResult message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            RuleResult.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a RuleResult message from the specified reader or buffer.
             * @function decode
             * @memberof ecmaservegames.host.RuleResult
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {ecmaservegames.host.RuleResult} RuleResult
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            RuleResult.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.ecmaservegames.host.RuleResult();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.name = reader.string();
                        break;
                    case 2:
                        message.result = reader.bool();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a RuleResult message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof ecmaservegames.host.RuleResult
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {ecmaservegames.host.RuleResult} RuleResult
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            RuleResult.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a RuleResult message.
             * @function verify
             * @memberof ecmaservegames.host.RuleResult
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            RuleResult.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.name != null && message.hasOwnProperty("name"))
                    if (!$util.isString(message.name))
                        return "name: string expected";
                if (message.result != null && message.hasOwnProperty("result"))
                    if (typeof message.result !== "boolean")
                        return "result: boolean expected";
                return null;
            };

            /**
             * Creates a RuleResult message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof ecmaservegames.host.RuleResult
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {ecmaservegames.host.RuleResult} RuleResult
             */
            RuleResult.fromObject = function fromObject(object) {
                if (object instanceof $root.ecmaservegames.host.RuleResult)
                    return object;
                var message = new $root.ecmaservegames.host.RuleResult();
                if (object.name != null)
                    message.name = String(object.name);
                if (object.result != null)
                    message.result = Boolean(object.result);
                return message;
            };

            /**
             * Creates a plain object from a RuleResult message. Also converts values to other types if specified.
             * @function toObject
             * @memberof ecmaservegames.host.RuleResult
             * @static
             * @param {ecmaservegames.host.RuleResult} message RuleResult
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            RuleResult.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    object.name = "";
                    object.result = false;
                }
                if (message.name != null && message.hasOwnProperty("name"))
                    object.name = message.name;
                if (message.result != null && message.hasOwnProperty("result"))
                    object.result = message.result;
                return object;
            };

            /**
             * Converts this RuleResult to JSON.
             * @function toJSON
             * @memberof ecmaservegames.host.RuleResult
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            RuleResult.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return RuleResult;
        })();

        host.ActionResponse = (function() {

            /**
             * Properties of an ActionResponse.
             * @memberof ecmaservegames.host
             * @interface IActionResponse
             * @property {boolean|null} [accepted] ActionResponse accepted
             * @property {Array.<ecmaservegames.host.IRuleResult>|null} [ruleResults] ActionResponse ruleResults
             * @property {google.protobuf.IAny|null} [action] ActionResponse action
             */

            /**
             * Constructs a new ActionResponse.
             * @memberof ecmaservegames.host
             * @classdesc Represents an ActionResponse.
             * @implements IActionResponse
             * @constructor
             * @param {ecmaservegames.host.IActionResponse=} [properties] Properties to set
             */
            function ActionResponse(properties) {
                this.ruleResults = [];
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * ActionResponse accepted.
             * @member {boolean} accepted
             * @memberof ecmaservegames.host.ActionResponse
             * @instance
             */
            ActionResponse.prototype.accepted = false;

            /**
             * ActionResponse ruleResults.
             * @member {Array.<ecmaservegames.host.IRuleResult>} ruleResults
             * @memberof ecmaservegames.host.ActionResponse
             * @instance
             */
            ActionResponse.prototype.ruleResults = $util.emptyArray;

            /**
             * ActionResponse action.
             * @member {google.protobuf.IAny|null|undefined} action
             * @memberof ecmaservegames.host.ActionResponse
             * @instance
             */
            ActionResponse.prototype.action = null;

            /**
             * Creates a new ActionResponse instance using the specified properties.
             * @function create
             * @memberof ecmaservegames.host.ActionResponse
             * @static
             * @param {ecmaservegames.host.IActionResponse=} [properties] Properties to set
             * @returns {ecmaservegames.host.ActionResponse} ActionResponse instance
             */
            ActionResponse.create = function create(properties) {
                return new ActionResponse(properties);
            };

            /**
             * Encodes the specified ActionResponse message. Does not implicitly {@link ecmaservegames.host.ActionResponse.verify|verify} messages.
             * @function encode
             * @memberof ecmaservegames.host.ActionResponse
             * @static
             * @param {ecmaservegames.host.IActionResponse} message ActionResponse message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ActionResponse.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.accepted != null && Object.hasOwnProperty.call(message, "accepted"))
                    writer.uint32(/* id 1, wireType 0 =*/8).bool(message.accepted);
                if (message.ruleResults != null && message.ruleResults.length)
                    for (var i = 0; i < message.ruleResults.length; ++i)
                        $root.ecmaservegames.host.RuleResult.encode(message.ruleResults[i], writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
                if (message.action != null && Object.hasOwnProperty.call(message, "action"))
                    $root.google.protobuf.Any.encode(message.action, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
                return writer;
            };

            /**
             * Encodes the specified ActionResponse message, length delimited. Does not implicitly {@link ecmaservegames.host.ActionResponse.verify|verify} messages.
             * @function encodeDelimited
             * @memberof ecmaservegames.host.ActionResponse
             * @static
             * @param {ecmaservegames.host.IActionResponse} message ActionResponse message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ActionResponse.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes an ActionResponse message from the specified reader or buffer.
             * @function decode
             * @memberof ecmaservegames.host.ActionResponse
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {ecmaservegames.host.ActionResponse} ActionResponse
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ActionResponse.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.ecmaservegames.host.ActionResponse();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.accepted = reader.bool();
                        break;
                    case 2:
                        if (!(message.ruleResults && message.ruleResults.length))
                            message.ruleResults = [];
                        message.ruleResults.push($root.ecmaservegames.host.RuleResult.decode(reader, reader.uint32()));
                        break;
                    case 3:
                        message.action = $root.google.protobuf.Any.decode(reader, reader.uint32());
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes an ActionResponse message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof ecmaservegames.host.ActionResponse
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {ecmaservegames.host.ActionResponse} ActionResponse
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ActionResponse.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies an ActionResponse message.
             * @function verify
             * @memberof ecmaservegames.host.ActionResponse
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            ActionResponse.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.accepted != null && message.hasOwnProperty("accepted"))
                    if (typeof message.accepted !== "boolean")
                        return "accepted: boolean expected";
                if (message.ruleResults != null && message.hasOwnProperty("ruleResults")) {
                    if (!Array.isArray(message.ruleResults))
                        return "ruleResults: array expected";
                    for (var i = 0; i < message.ruleResults.length; ++i) {
                        var error = $root.ecmaservegames.host.RuleResult.verify(message.ruleResults[i]);
                        if (error)
                            return "ruleResults." + error;
                    }
                }
                if (message.action != null && message.hasOwnProperty("action")) {
                    var error = $root.google.protobuf.Any.verify(message.action);
                    if (error)
                        return "action." + error;
                }
                return null;
            };

            /**
             * Creates an ActionResponse message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof ecmaservegames.host.ActionResponse
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {ecmaservegames.host.ActionResponse} ActionResponse
             */
            ActionResponse.fromObject = function fromObject(object) {
                if (object instanceof $root.ecmaservegames.host.ActionResponse)
                    return object;
                var message = new $root.ecmaservegames.host.ActionResponse();
                if (object.accepted != null)
                    message.accepted = Boolean(object.accepted);
                if (object.ruleResults) {
                    if (!Array.isArray(object.ruleResults))
                        throw TypeError(".ecmaservegames.host.ActionResponse.ruleResults: array expected");
                    message.ruleResults = [];
                    for (var i = 0; i < object.ruleResults.length; ++i) {
                        if (typeof object.ruleResults[i] !== "object")
                            throw TypeError(".ecmaservegames.host.ActionResponse.ruleResults: object expected");
                        message.ruleResults[i] = $root.ecmaservegames.host.RuleResult.fromObject(object.ruleResults[i]);
                    }
                }
                if (object.action != null) {
                    if (typeof object.action !== "object")
                        throw TypeError(".ecmaservegames.host.ActionResponse.action: object expected");
                    message.action = $root.google.protobuf.Any.fromObject(object.action);
                }
                return message;
            };

            /**
             * Creates a plain object from an ActionResponse message. Also converts values to other types if specified.
             * @function toObject
             * @memberof ecmaservegames.host.ActionResponse
             * @static
             * @param {ecmaservegames.host.ActionResponse} message ActionResponse
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            ActionResponse.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.arrays || options.defaults)
                    object.ruleResults = [];
                if (options.defaults) {
                    object.accepted = false;
                    object.action = null;
                }
                if (message.accepted != null && message.hasOwnProperty("accepted"))
                    object.accepted = message.accepted;
                if (message.ruleResults && message.ruleResults.length) {
                    object.ruleResults = [];
                    for (var j = 0; j < message.ruleResults.length; ++j)
                        object.ruleResults[j] = $root.ecmaservegames.host.RuleResult.toObject(message.ruleResults[j], options);
                }
                if (message.action != null && message.hasOwnProperty("action"))
                    object.action = $root.google.protobuf.Any.toObject(message.action, options);
                return object;
            };

            /**
             * Converts this ActionResponse to JSON.
             * @function toJSON
             * @memberof ecmaservegames.host.ActionResponse
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            ActionResponse.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return ActionResponse;
        })();

        return host;
    })();

    return ecmaservegames;
})();

$root.google = (function() {

    /**
     * Namespace google.
     * @exports google
     * @namespace
     */
    var google = {};

    google.protobuf = (function() {

        /**
         * Namespace protobuf.
         * @memberof google
         * @namespace
         */
        var protobuf = {};

        protobuf.Any = (function() {

            /**
             * Properties of an Any.
             * @memberof google.protobuf
             * @interface IAny
             * @property {string|null} [type_url] Any type_url
             * @property {Uint8Array|null} [value] Any value
             */

            /**
             * Constructs a new Any.
             * @memberof google.protobuf
             * @classdesc Represents an Any.
             * @implements IAny
             * @constructor
             * @param {google.protobuf.IAny=} [properties] Properties to set
             */
            function Any(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * Any type_url.
             * @member {string} type_url
             * @memberof google.protobuf.Any
             * @instance
             */
            Any.prototype.type_url = "";

            /**
             * Any value.
             * @member {Uint8Array} value
             * @memberof google.protobuf.Any
             * @instance
             */
            Any.prototype.value = $util.newBuffer([]);

            /**
             * Creates a new Any instance using the specified properties.
             * @function create
             * @memberof google.protobuf.Any
             * @static
             * @param {google.protobuf.IAny=} [properties] Properties to set
             * @returns {google.protobuf.Any} Any instance
             */
            Any.create = function create(properties) {
                return new Any(properties);
            };

            /**
             * Encodes the specified Any message. Does not implicitly {@link google.protobuf.Any.verify|verify} messages.
             * @function encode
             * @memberof google.protobuf.Any
             * @static
             * @param {google.protobuf.IAny} message Any message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Any.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.type_url != null && Object.hasOwnProperty.call(message, "type_url"))
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.type_url);
                if (message.value != null && Object.hasOwnProperty.call(message, "value"))
                    writer.uint32(/* id 2, wireType 2 =*/18).bytes(message.value);
                return writer;
            };

            /**
             * Encodes the specified Any message, length delimited. Does not implicitly {@link google.protobuf.Any.verify|verify} messages.
             * @function encodeDelimited
             * @memberof google.protobuf.Any
             * @static
             * @param {google.protobuf.IAny} message Any message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Any.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes an Any message from the specified reader or buffer.
             * @function decode
             * @memberof google.protobuf.Any
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {google.protobuf.Any} Any
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Any.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.google.protobuf.Any();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.type_url = reader.string();
                        break;
                    case 2:
                        message.value = reader.bytes();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes an Any message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof google.protobuf.Any
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {google.protobuf.Any} Any
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Any.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies an Any message.
             * @function verify
             * @memberof google.protobuf.Any
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            Any.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.type_url != null && message.hasOwnProperty("type_url"))
                    if (!$util.isString(message.type_url))
                        return "type_url: string expected";
                if (message.value != null && message.hasOwnProperty("value"))
                    if (!(message.value && typeof message.value.length === "number" || $util.isString(message.value)))
                        return "value: buffer expected";
                return null;
            };

            /**
             * Creates an Any message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof google.protobuf.Any
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {google.protobuf.Any} Any
             */
            Any.fromObject = function fromObject(object) {
                if (object instanceof $root.google.protobuf.Any)
                    return object;
                var message = new $root.google.protobuf.Any();
                if (object.type_url != null)
                    message.type_url = String(object.type_url);
                if (object.value != null)
                    if (typeof object.value === "string")
                        $util.base64.decode(object.value, message.value = $util.newBuffer($util.base64.length(object.value)), 0);
                    else if (object.value.length)
                        message.value = object.value;
                return message;
            };

            /**
             * Creates a plain object from an Any message. Also converts values to other types if specified.
             * @function toObject
             * @memberof google.protobuf.Any
             * @static
             * @param {google.protobuf.Any} message Any
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            Any.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    object.type_url = "";
                    if (options.bytes === String)
                        object.value = "";
                    else {
                        object.value = [];
                        if (options.bytes !== Array)
                            object.value = $util.newBuffer(object.value);
                    }
                }
                if (message.type_url != null && message.hasOwnProperty("type_url"))
                    object.type_url = message.type_url;
                if (message.value != null && message.hasOwnProperty("value"))
                    object.value = options.bytes === String ? $util.base64.encode(message.value, 0, message.value.length) : options.bytes === Array ? Array.prototype.slice.call(message.value) : message.value;
                return object;
            };

            /**
             * Converts this Any to JSON.
             * @function toJSON
             * @memberof google.protobuf.Any
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            Any.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return Any;
        })();

        return protobuf;
    })();

    return google;
})();

module.exports = $root;
