import { Model, DataTypes } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';

import sequelize from '@/config/database';
import { IWish } from '../../../types';

class Wish extends Model<IWish> {}

Wish.init({
  authorId: {
    type: DataTypes.UUID,
    references: {
      model: 'User',
      key: 'id',
    },
    allowNull: false,
  },
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: uuidv4(),
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'Title cannot be empty',
      },
      len: {
        args: [3, 100],
        msg: 'Title must be between 3 and 100 characters long',
      },
    },
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  assigned: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  is_received:{
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  }
},
{
  sequelize,
  tableName: 'wishes',
  timestamps: true,
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
});

export default Wish;
