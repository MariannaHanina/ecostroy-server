module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      username: String,
      email: String,
      password: String,
      roles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "roles"
      }
    ]
    }
  );

  const Users = mongoose.model("users", schema);
  return Users;
};
