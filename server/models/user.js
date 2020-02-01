'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
      },
      firstname: {
        type: DataTypes.STRING
      },
      lastname: {
        type: DataTypes.STRING
      },
      username: {
        type: DataTypes.STRING,
        unique: {
          msg: 'This userName has been taken.'
        },
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'Empty username. The username is required.'
          }
        }
      },
      email: {
        type: DataTypes.STRING,
        unique: {
          msg: 'This email address has been taken.'
        },
        allowNull: false,
        validate: {
          isEmail: {
            msg: 'Please enter a valid email address. Example: you@gmail.com'
          }
        }
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      },
      verified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        validate: {
          isBoolean: {
            args: [true, false],
            msg: `Invalid value. The value for verified
          can only be "true" or "false"`
          }
        }
      },
      blocked: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        validate: {
          isBoolean: {
            args: [true, false],
            msg: `Invalid value. The value for blocked
          can only be "true" or "false"`
          }
        }
      },
      role: {
        type: DataTypes.STRING
      },
      imageUrl: {
        type: DataTypes.TEXT
      },
      bio: {
        type: DataTypes.TEXT
      },
      sex: {
        type: DataTypes.STRING
      },
      twitterUrl: {
        type: DataTypes.STRING
      },
      facebookUrl: {
        type: DataTypes.STRING
      },
      dateOfBirth: {
        type: DataTypes.DATE,
        validate: {
          isDate: {
            msg: 'Error: must be a valid date type'
          }
        }
      },
      emailNotification: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        unique: {
          msg: 'This username has been taken.'
        },
        validate: {
          isBoolean: {
            args: [true, false],
            msg: `Invalid value. The value for email notification
            can only be "true" or "false"`
          }
        }
      }
    },
    {}
  );
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};
