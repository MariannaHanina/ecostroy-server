module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      type: String,
      title: String,
      intro: String,
      text: String,
      image: String,
      content: String,
      button: {
        text: String
      }
    },
    { timestamps: true }
  );

  const Services = mongoose.model("services", schema);
  return Services;
};
