export default(sequelize, DataTypes) => {
  const Products = sequelize.define('Products', {
    businessId:
     {
        type : DataTypes.INTEGER,
     },
    productName:
    {
        type : DataTypes.STRING,
        allowNull: {
          args: false,
          msg: "Product name is required"
        } 
    },
    price:
    {
        type : DataTypes.FLOAT,
        allowNull: {
            args: false,
            msg: "Price is required"
        }
    },
    category:
    {
        type :  DataTypes.STRING,
        allowNull: {
            args: false,
            msg: "Category is required"
        }
    }

  }, {});
  Products.associate = function(models) {
    // associations can be defined here
    Products.belongsTo(models.Businesses, {
      as: "Product",
      foreignKey: "businessId",
      onDelete: "CASCADE"
    });
  };
  return Products;
}