const createTransparentImage = (): HTMLImageElement => {
  const transparentImage = new Image();
  transparentImage.src =
    "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";
  return transparentImage;
};

export default createTransparentImage;
