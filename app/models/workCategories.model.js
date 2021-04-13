module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      name: String,
      parent: String
    },
    { timestamps: true }
  );

  const WorkCategories = mongoose.model("workCategories", schema);
  return WorkCategories;
};
