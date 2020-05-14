import { ResolverType } from "./types";

function resultContainer<R>(initialValue?: R) {
  let value: R = initialValue as R;
  let error: Error;
  const resolvers: ResolverType[] = [];

  const result = {
    get current() {
      if (error) {
        throw error;
      }
      return value;
    },
    get error() {
      return error;
    },
  };

  function updateResult(val?: R, err?: Error) {
    value = val ? val : value;
    error = err ? err : error;
    resolvers.splice(0, resolvers.length).forEach((resolve) => resolve());
  }

  return {
    result,
    setValue: (val: R) => updateResult(val),
    setError: (err: Error) => updateResult(undefined, err),
    addResolver: (resolver: ResolverType) => {
      resolvers.push(resolver);
    },
  };
}

export default resultContainer;
