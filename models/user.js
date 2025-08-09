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

userSchema.static("matchPassword",async function (email,password){
    const user=await this.findOne({email});
    if(!user) throw new Error('User not found!');

    const salt=user.salt;
    const hashedPassword=user.password;

    const userProvideHash = createHmac("sha256", salt)
        .update(password)
        .digest("hex");

    if(hashedPassword !==userProvideHash) throw new Error('Incorrect password!');

    return user;
})

userSchema.pre("save", function (next) {
    const user = this;
    if (!user.isModified("password")) return; //if user password is same then return

    const salt = randomBytes(16).toString();
    const hashedPassword = createHmac("sha256", salt)
        .update(user.password)
        .digest("hex");
        
        this.salt=salt;
        this.password=hashedPassword;//hashed pass couldn't be converted back to normal pass, we need to compare always hashes using salt
        
    next();
})
const User = model('user', userSchema);

export default User;