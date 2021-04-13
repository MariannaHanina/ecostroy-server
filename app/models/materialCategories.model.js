module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      name: String,
      parent: String
    },
    { timestamps: true }
  );

  const MaterialCategories = mongoose.model("materialCategories", schema);
  return MaterialCategories;
};
