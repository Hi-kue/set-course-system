type AnyFunction = (...args: any[]) => any;

const compose = <T>(...functions: AnyFunction[]) => (initialValue: T) => {
    return functions.reduceRight(async (promise, fn) => {
        const value = await promise;
        return fn(value);
    }, Promise.resolve(initialValue));
};


export {
    compose
};