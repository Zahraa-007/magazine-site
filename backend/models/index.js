'use strict';
const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const { sequelize } = require(__dirname + '/../config/db.js');

const db = {};

fs.readdirSync(__dirname)
  .filter(file => file !== 'index.js' && file.slice(-3) === '.js')
  .forEach(file => {
    const modelModule = require(path.join(__dirname, file));
    if (typeof modelModule === 'function') {
      const model = modelModule(sequelize, Sequelize.DataTypes);
      db[model.name] = model;
    } else if (modelModule.default) {
      // Handle ES modules with default export
      const model = modelModule.default(sequelize, Sequelize.DataTypes);
      db[model.name] = model;
    } else {
      // Handle ES modules with named export
      const modelClass = Object.values(modelModule)[0];
      if (modelClass && typeof modelClass === 'function') {
        modelClass.init(modelClass.rawAttributes, { sequelize, modelName: modelClass.name });
        db[modelClass.name] = modelClass;
      }
    }
  });

// Setup associations if any
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) db[modelName].associate(db);
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db; // ✅ CommonJS export
