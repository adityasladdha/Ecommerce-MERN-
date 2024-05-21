class ApiFeatures {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }

  search() {
    if (this.queryStr.keyword) {
      const keywordQuery = {
        name: {
          $regex: this.queryStr.keyword,
          $options: "i",
        },
      };
      this.query = this.query.find(keywordQuery);
    }
    return this;
  }

  filter() {
    const queryCopy = { ...this.queryStr };
    const removeFields = ["keyword", "page", "limit"];

    removeFields.forEach((key) => delete queryCopy[key]);

    // Build the filter object
    const filter = {};
    for (const key in queryCopy) {
      if (key.includes("price") || key.includes("ratings")) {
        // Handle price and ratings separately
        const value = queryCopy[key];
        if (typeof value === "string" && value.includes("-")) {
          const [operator, operand] = value.split("-");
          if (operator === "gte" || operator === "gt") {
            filter[key] = { $gte: Number(operand) };
          } else if (operator === "lte" || operator === "lt") {
            filter[key] = { $lte: Number(operand) };
          }
        }
      } else {
        filter[key] = queryCopy[key];
      }
    }

    // Check if filter object is not empty
    if (Object.keys(filter).length > 0) {
      this.query = this.query.find(filter);
    }

    return this;
  }

  pagination(resultPerPage) {
    const currentPage = Number(this.queryStr.page) || 1;
    const skip = resultPerPage * (currentPage - 1);

    this.query = this.query.limit(resultPerPage).skip(skip);
    return this;
  }
}

module.exports = ApiFeatures;
