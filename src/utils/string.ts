const getMissingParamsMessage = (object: object) => {
  const params: { [key: string]: any } = { ...object };
  return Object.keys(params)
    .map((key) => {
      const value = params[key];
      if (!value) return undefined;
      if (Array.isArray(value) && value.length === 0) return undefined;
      return key;
    })
    .filter((param) => !param)
    .join(",");
};

export { getMissingParamsMessage };
