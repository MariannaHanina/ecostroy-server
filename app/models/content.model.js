module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      entity: String,
      content: mongoose.Schema.Types.Mixed
    },
    { timestamps: true }
  );

  const Content = mongoose.model("content", schema);
  return Content;
};
