import { Model, DataTypes } from 'sequelize';

import sequelize from '@/config/database';
import { IWish } from '../../../types';

class Wish extends Model<IWish> {
  declare public id: string;
  public get isAssigned(): boolean {
    return this.getDataValue('isAssigned') || false;
  }

  public set isAssigned(value: boolean) {
    this.setDataValue('isAssigned', value);
  }

  public get executorId(): string | null {
    return this.getDataValue('executorId') || null;
  }

  public set executorId(value: string | null) {
    this.setDataValue('executorId', (value));
  }

  public get isReceived(): boolean {
    return this.getDataValue('isReceived') || false;
  }

  public set isReceived(value: boolean) {
    this.setDataValue('isReceived', value);
  }
}

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
    defaultValue: DataTypes.UUIDV4
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
  executorId: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  isAssigned: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  isReceived:{
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
