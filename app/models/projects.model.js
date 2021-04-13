module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      type: String,
      title: String,
      image: String,
      area: Number,
      size: Number,
      floors: Number,
      price: Number,
      description: String,
      base_sets_description: String,
      additional_sets_description: String,
      request_description: String,
      images: Array
    },
    { timestamps: true }
  );

  const Projects = mongoose.model("projects", schema);
  return Projects;
};
