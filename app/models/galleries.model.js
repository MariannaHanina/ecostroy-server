module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      title: String,
      text: String,
      image: String,
      images: Array
    },
    { timestamps: true }
  );

  const Galleries = mongoose.model("galleries", schema);
  return Galleries;
};
