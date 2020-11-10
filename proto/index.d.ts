import * as $protobuf from "protobufjs";
/** Namespace ecmaservegames. */
export namespace ecmaservegames {

    /** Namespace host. */
    namespace host {

        /** Properties of a RuleResult. */
        interface IRuleResult {

            /** RuleResult name */
            name?: (string|null);

            /** RuleResult result */
            result?: (boolean|null);
        }

        /** Represents a RuleResult. */
        class RuleResult implements IRuleResult {

            /**
             * Constructs a new RuleResult.
             * @param [properties] Properties to set
             */
            constructor(properties?: ecmaservegames.host.IRuleResult);

            /** RuleResult name. */
            public name: string;

            /** RuleResult result. */
            public result: boolean;

            /**
             * Creates a new RuleResult instance using the specified properties.
             * @param [properties] Properties to set
             * @returns RuleResult instance
             */
            public static create(properties?: ecmaservegames.host.IRuleResult): ecmaservegames.host.RuleResult;

            /**
             * Encodes the specified RuleResult message. Does not implicitly {@link ecmaservegames.host.RuleResult.verify|verify} messages.
             * @param message RuleResult message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: ecmaservegames.host.IRuleResult, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified RuleResult message, length delimited. Does not implicitly {@link ecmaservegames.host.RuleResult.verify|verify} messages.
             * @param message RuleResult message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: ecmaservegames.host.IRuleResult, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a RuleResult message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns RuleResult
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): ecmaservegames.host.RuleResult;

            /**
             * Decodes a RuleResult message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns RuleResult
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): ecmaservegames.host.RuleResult;

            /**
             * Verifies a RuleResult message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a RuleResult message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns RuleResult
             */
            public static fromObject(object: { [k: string]: any }): ecmaservegames.host.RuleResult;

            /**
             * Creates a plain object from a RuleResult message. Also converts values to other types if specified.
             * @param message RuleResult
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: ecmaservegames.host.RuleResult, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this RuleResult to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of an ActionResponse. */
        interface IActionResponse {

            /** ActionResponse accepted */
            accepted?: (boolean|null);

            /** ActionResponse ruleResults */
            ruleResults?: (ecmaservegames.host.IRuleResult[]|null);

            /** ActionResponse action */
            action?: (google.protobuf.IAny|null);
        }

        /** Represents an ActionResponse. */
        class ActionResponse implements IActionResponse {

            /**
             * Constructs a new ActionResponse.
             * @param [properties] Properties to set
             */
            constructor(properties?: ecmaservegames.host.IActionResponse);

            /** ActionResponse accepted. */
            public accepted: boolean;

            /** ActionResponse ruleResults. */
            public ruleResults: ecmaservegames.host.IRuleResult[];

            /** ActionResponse action. */
            public action?: (google.protobuf.IAny|null);

            /**
             * Creates a new ActionResponse instance using the specified properties.
             * @param [properties] Properties to set
             * @returns ActionResponse instance
             */
            public static create(properties?: ecmaservegames.host.IActionResponse): ecmaservegames.host.ActionResponse;

            /**
             * Encodes the specified ActionResponse message. Does not implicitly {@link ecmaservegames.host.ActionResponse.verify|verify} messages.
             * @param message ActionResponse message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: ecmaservegames.host.IActionResponse, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified ActionResponse message, length delimited. Does not implicitly {@link ecmaservegames.host.ActionResponse.verify|verify} messages.
             * @param message ActionResponse message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: ecmaservegames.host.IActionResponse, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes an ActionResponse message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns ActionResponse
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): ecmaservegames.host.ActionResponse;

            /**
             * Decodes an ActionResponse message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns ActionResponse
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): ecmaservegames.host.ActionResponse;

            /**
             * Verifies an ActionResponse message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates an ActionResponse message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns ActionResponse
             */
            public static fromObject(object: { [k: string]: any }): ecmaservegames.host.ActionResponse;

            /**
             * Creates a plain object from an ActionResponse message. Also converts values to other types if specified.
             * @param message ActionResponse
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: ecmaservegames.host.ActionResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this ActionResponse to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }
    }
}

/** Namespace google. */
export namespace google {

    /** Namespace protobuf. */
    namespace protobuf {

        /** Properties of an Any. */
        interface IAny {

            /** Any type_url */
            type_url?: (string|null);

            /** Any value */
            value?: (Uint8Array|null);
        }

        /** Represents an Any. */
        class Any implements IAny {

            /**
             * Constructs a new Any.
             * @param [properties] Properties to set
             */
            constructor(properties?: google.protobuf.IAny);

            /** Any type_url. */
            public type_url: string;

            /** Any value. */
            public value: Uint8Array;

            /**
             * Creates a new Any instance using the specified properties.
             * @param [properties] Properties to set
             * @returns Any instance
             */
            public static create(properties?: google.protobuf.IAny): google.protobuf.Any;

            /**
             * Encodes the specified Any message. Does not implicitly {@link google.protobuf.Any.verify|verify} messages.
             * @param message Any message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: google.protobuf.IAny, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified Any message, length delimited. Does not implicitly {@link google.protobuf.Any.verify|verify} messages.
             * @param message Any message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: google.protobuf.IAny, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes an Any message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns Any
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.Any;

            /**
             * Decodes an Any message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns Any
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.Any;

            /**
             * Verifies an Any message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates an Any message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns Any
             */
            public static fromObject(object: { [k: string]: any }): google.protobuf.Any;

            /**
             * Creates a plain object from an Any message. Also converts values to other types if specified.
             * @param message Any
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: google.protobuf.Any, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this Any to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }
    }
}
