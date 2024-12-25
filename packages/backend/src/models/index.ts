import Wish from './wish';
import User from './user';


User.hasMany(Wish, { foreignKey: 'authorId', as: 'myWishes' });
User.hasMany(Wish, { foreignKey: 'executorId', as: 'assignedWishes' });

Wish.belongsTo(User, { foreignKey: 'authorId', as: 'author' });
Wish.belongsTo(User, { foreignKey: 'executorId', as: 'executor' });

export { User, Wish };
