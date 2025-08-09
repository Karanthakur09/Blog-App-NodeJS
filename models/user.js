import { model, Schema } from "mongoose";
import { createHmac, randomBytes } from 'crypto'
const userSchema = new Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    salt: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    profileImageURL: {
        type: String,
        default: '/images/default.png'
    },
    role: {
        type: String,
        enum: ["ADMIN", "USER"],
        default: "USER"
    }
}, { timestamps: true });

userSchema.pre("save", function (next) {
    const user = this;
    if (!user.isModified("password")) return; //if user password is same then return

    const salt = randomBytes(16).toString();
    const hashedPassword = createHmac("sha256", salt)
        .update(user.password)
        .digest("hex");
        
        this.salt=salt;
        this.password=this.hashedPassword;
        
    next();
})
const User = model('user', userSchema);

export default User;