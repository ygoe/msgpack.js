/**
 * Serializes a value to a MessagePack byte array.
 * @param data The value to serialize. This can be a scalar, array or object.
 * @param multiple Indicates whether multiple values in data are concatenated to multiple MessagePack arrays.
 */
export function serialize(data: any, multiple: boolean = false): Uint8Array;

/**
 * Deserializes a MessagePack byte array to a value.
 * @param array The MessagePack byte array to deserialize.
 * @param multiple Indicates whether multiple concatenated MessagePack arrays are returned as an array.
 */
export function deserialize(array: Uint8Array | ArrayBuffer | [], multiple: boolean = false): any;

export { serialize as encode };
export { deserialize as decode };
