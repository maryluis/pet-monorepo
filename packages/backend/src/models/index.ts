import Wish from './wish';
import User from './user';
import Follower from './follower';


User.hasMany(Wish, { foreignKey: 'authorId', as: 'myWishes' });
User.hasMany(Wish, { foreignKey: 'executorId', as: 'assignedWishes' });
User.hasMany(Follower, { foreignKey: 'followedId', as: 'followers' });
User.hasMany(Follower, { foreignKey: 'followerId', as: 'subscribers' });

Follower.belongsTo(User, { foreignKey: 'followerId', as: 'follower' });
Follower.belongsTo(User, { foreignKey: 'followedId', as: 'followed' });

Wish.belongsTo(User, { foreignKey: 'authorId', as: 'author' });
Wish.belongsTo(User, { foreignKey: 'executorId', as: 'executor' });

export { User, Wish, Follower };
