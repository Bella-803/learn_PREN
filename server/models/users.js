import bcryptjs from "bcryptjs";

export default (sequelize, DataTypes) => {
  const Users = sequelize.define('Users', {
    fullName: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING
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