export const resolveQueryContext = (ref) => {
  if (!ref) {
    return {};
  } else {
    return {
      headers: { 'Prismic-ref': ref },
    };
  }
};
