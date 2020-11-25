module.exports = (sequelize, Sequelize) => {
    const Todo = sequelize.define("Todo", {
        title: {
            type: Sequelize.STRING,
            allowNull: false
            // primaryKey: true
        },

        done: {
            type: Sequelize.BOOLEAN,
            allowNull: false
        }
    });

    return Todo;
};