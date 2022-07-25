export const handlerPath = (context: string) => {
  const path = `${context.split(process.cwd())[1].substring(1).replace(/\\/g, '/')}`.split('/');
  const lastChunk = 'handlers.' + path.pop();
  return [...path, lastChunk].join('/');
};
