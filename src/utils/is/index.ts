
export function is(val: unknown, type: string){
    return toString.call(val) === `[object ${type}]`
} 

export function isFunction<T = Function>(val: unknown): val is T {
    return is(val, "Function");
}

