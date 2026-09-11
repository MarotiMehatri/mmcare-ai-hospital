export const setNoStore = (res) => {
  res.set("Cache-Control", "no-store");
};

export const setShortPublicCache = (res) => {
  res.set("Cache-Control", "public, max-age=300");
};
