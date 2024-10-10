export const isString = (value: any): value is string => 'string' === typeof value;

export const isArray = (value: any): value is Array<any> => Array.isArray(value);
