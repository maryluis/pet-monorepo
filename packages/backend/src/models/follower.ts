import { Model, DataTypes } from 'sequelize';

import sequelize from '@/config/database';

interface FollowerAttributes {
  followerId: string;
  followedId: string;
  nickname: string;
}

class Follower extends Model<FollowerAttributes> {
}

Follower.init({
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4
  },
  followerId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  followedId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  nickname: {
    type: DataTypes.STRING,
    allowNull: true,
  },
},
{
  sequelize,
  tableName: 'followers',
  indexes: [
    {
      unique: true,
      fields: ['followerId', 'followedId'],
    },
  ],
});

export default Follower;
