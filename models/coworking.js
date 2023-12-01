module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Coworking', {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        price: {
            type: DataTypes.JSON
        },
        address: {
            type: DataTypes.JSON
        },
        superficy: {
            type: DataTypes.INTEGER
        },
        capacity: {
            type: DataTypes.INTEGER
        }
    }
    );
}