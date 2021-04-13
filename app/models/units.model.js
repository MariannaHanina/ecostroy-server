module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      value: String,
      label: String
    },
    { timestamps: true }
  );

  const Units = mongoose.model("units", schema);
  return Units;
};
