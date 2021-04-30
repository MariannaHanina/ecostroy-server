module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      name: String
    }
  );

  const Roles = mongoose.model("roles", schema);
  return Roles;
};
