const getMissingParamsMessage = (...props: any[]) => {
  const params: { [key: string]: any } = { ...props };
  return Object.keys(params)
    .map((key) => {
      const value = params[key];
      if (!value) return undefined;
      if (Array.isArray(value)) return value.length > 0;
      return key;
    })
    .filter((param) => param)
    .join(",");
};

export { getMissingParamsMessage };
