class ApiFeatures {
  constructor(modelQuery, req) {
    this.modelQuery = modelQuery;
    this.req = req;
  }

  filter() {
    const excludesFields = ["page", "limit", "sort", "fields", "keyword"];
    const filteringObj = { ...this.req.query };
    excludesFields.forEach((item) => delete filteringObj[item]);

    let filteringQuery = JSON.stringify(filteringObj);
    const regExp = /\b(gt|gte|lt|lte|in)\b/g;
    filteringQuery = filteringQuery.replace(regExp, (item) => `$${item}`);
    console.log(filteringQuery);
    filteringQuery = JSON.parse(filteringQuery);
    this.modelQuery = this.modelQuery.find(filteringQuery);

    return this;
  }
  paginate(filterObeject = {}) {
    const limit = this.req.query.limit * 1 || 25;
    const page = this.req.query.page * 1 || 1;
    const skip = (page - 1) * limit;
    this.modelQuery = this.modelQuery
      .find(filterObeject)
      .skip(skip)
      .limit(limit);
    return this;
  }
  // TODO not worked
  sort() {
    if (this.req.query.sort) {
      const sortBy = this.req.query.sort.split(",").join(" ");
      this.modelQuery = this.modelQuery.sort(sortBy);
    } else {
      this.modelQuery = this.modelQuery.sort("createdAt");
    }
    return this;
  }

  fields() {
    if (this.req.query.fields) {
      const fieldsSelected = this.req.query.fields.split(",").join(" ");
      this.modelQuery = this.modelQuery.select(fieldsSelected);
    } else {
      this.modelQuery = this.modelQuery.select("-__v");
    }
    return this;
  }

  search() {
    if (this.req.query.keyword) {
      const { keyword } = this.req.query;
      const searchQuery = {};
      searchQuery.$or = [
        {
          title: { $regex: keyword, $options: "i" },
        },
        {
          description: { $regex: keyword, $options: "i" },
        },
      ];
      this.modelQuery = this.modelQuery.find(searchQuery);
    }
    return this;
  }
}
export default ApiFeatures;
