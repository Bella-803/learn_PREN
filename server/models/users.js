import bcryptjs from "bcryptjs";

export default (sequelize, DataTypes) => {
  const Users = sequelize.define('Users', {
    fullName: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: {
        args: false,
        msg: "please enter your password"
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: {
        args: false,
        msg: "please enter your email"
      },
      unique: {
        args: true,
        msg: "Email already exists"
      }
    },
  }, {
    hooks: {
      beforeCreate: async (user) => {
          user.password = await bcryptjs.hashSync(user.password,10)
      }
    }
  });
  Users.associate = function(models) {
    // associations can be defined here
    Users.hasMany(models.Businesses, {
      foreignKey: "userId",
      onDelete: "CASCADE"
    });
  };
  return Users;
};

