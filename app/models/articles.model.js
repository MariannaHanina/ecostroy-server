module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      type: String,
      title: String,
      intro: String,
      text: String,
      button: {
        text: String
      },
      video: String,
      image: String,
      content: String
    },
    { timestamps: true }
  );

  const Articles = mongoose.model("articles", schema);
  return Articles;
};
