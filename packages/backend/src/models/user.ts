import { Model, DataTypes } from 'sequelize';
import bcrypt from 'bcryptjs';

import sequelize from '@/config/database';
import Wish from './wish';

interface UserAttributes {
  id?: string;
  nickname: string;
  password: string;
  createdAt?: Date;
  updatedAt?: Date,
  myWishes?: Wish[];
  isAssignedWishes?: Wish[];
}

class User extends Model<UserAttributes> {
  declare public id: string;
  public readonly myWishes!: Wish[];
  public readonly isAssignedWishes!: Wish[];
  public async validatePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.getDataValue('password'));
  }
}

User.init({
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4
  },
  nickname: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'Nickname cannot be empty',
      },
      len: {
        args: [3, 50],
        msg: 'Nickname must be between 3 and 50 characters long',
      },
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'Password cannot be empty',
      },
      len: {
        args: [8, 20],
        msg: 'Password must be between 8 and 20 characters long',
      },
    },
  },
},
{
  sequelize,
  tableName: 'users',
  timestamps: true,
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
});

User.beforeCreate(async (user) => {
  if (user.password) {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
  }
});

User.prototype.validatePassword = async function (password: string): Promise<boolean> {
  return bcrypt.compare(password, this.password);
};

export default User;
