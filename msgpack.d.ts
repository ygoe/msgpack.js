/**
 * Serializes a value to a MessagePack byte array.
 * @param data The value to serialize. This can be a scalar, array or object
 */
export function serialize(data: any): Uint8Array;

/**
 * Deserializes a MessagePack byte array to a value.
 * @param array The MessagePack byte array to deserialize.
 */
export function deserialize(array: Uint8Array | ArrayBuffer | []): any;

export { serialize as encode };
export { deserialize as decode };
