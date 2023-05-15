export const excludeField = <User, Key extends keyof User>(
    user: User,
    keys: Array<keyof User>
): Omit<User, Key> => {
    keys.forEach((key) => {
        delete user[key];
    });
    return user;
};