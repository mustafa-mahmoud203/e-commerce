//retutn full image url in response only and not save in db

const chackImage = (doc) => {
  if (doc.image) {
    const imageURL = `${process.env.DEV_BADED_URL}/uploads/${doc.image}`;
    doc.image = imageURL;
  }
  if (doc.images) {
    const imageList = [];
    doc.images.forEach((image) => {
      const imageURL = `${process.env.DEV_BADED_URL}/uploads/${image}`;
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
