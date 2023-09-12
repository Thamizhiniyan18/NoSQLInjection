import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) next();
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  return this.password === enteredPassword ? true : false;
};

const User = mongoose.model("User", userSchema);

export default User;
