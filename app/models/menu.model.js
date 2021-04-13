module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      title: String,
      path: String,
      items: Array
    },
    { timestamps: true }
  );

  const Menu = mongoose.model("menu", schema);
  return Menu;
};
