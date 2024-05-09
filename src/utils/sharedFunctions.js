//retutn full image url in response only and not save in db

const chackImage = (doc) => {
  if (doc.image) {
    const appModeEnv =
      process.env.NODE_ENV == "production"
        ? process.env.PROD_BADED_URL
        : process.env.DEV_BADED_URL;
    const imageURL = `${appModeEnv}/uploads/${doc.image}`;
    doc.image = imageURL;
  }
  if (doc.images) {
    const imageList = [];
    doc.images.forEach((image) => {
      const imageURL = `${process.env.slug}/uploads/${image}`;
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
