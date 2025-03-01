import { hash  } from "argon2";
import User from "./user.model.js"

export const admimDefaul = async () => {
    try {
        const admin = await User.findOne({ role: "ADMIN_ROLE" });

        if (!admin) {
        await User.create({
            username: "Sperez",
            email: "sperez@gmail.com",
            password: await hash("1Aa/", 10), 
            role: "ADMIN_ROLE",
            });
        } else {
        }
    } catch (err) {
    }
};