import User from "../models/User";

const exists = async (userId: string) => User.exists({ userId });

export { exists };
