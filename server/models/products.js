export default(sequelize, DataTypes) => {
  const Products = sequelize.define('Products', {
    businessId:
     {
        type : DataTypes.INTEGER,
     },
    productName:
    {
        type : DataTypes.STRING, 
    },
    price:
    {
        type : DataTypes.FLOAT,
    },
    category:
    {
        type :  DataTypes.STRING 
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