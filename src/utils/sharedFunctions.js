//retutn full image url in response only and not save in db

const chackImage = (doc) => {
  const appModeEnv =
    process.env.NODE_ENV == "production"
      ? process.env.PROD_BADED_URL
      : process.env.DEV_BADED_URL;
  if (doc.image) {
    const imageURL = `${appModeEnv}/uploads/${doc.image}`;
    doc.image = imageURL;
  }
  if (doc.images) {
    const imageList = [];
    doc.images.forEach((image) => {
      const imageURL = `${appModeEnv}/uploads/${image}`;
      imageList.push(imageURL);
    });

    doc.images = imageList;
  }
};

export const fullImageURL = (model) => {
  model.post("save", (doc) => {
    chackImage(doc);
  });

  model.post("init", (doc) => {
    chackImage(doc);
  });
};
