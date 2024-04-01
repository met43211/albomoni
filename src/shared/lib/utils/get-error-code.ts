export const getErrorCode = (error: string) => error.split(': ').at(-1);
