import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';
import * as validator from "validator";
import TimestampInterface from "../interface/TimestampInterface";

const {SALT_FACTOR} = process.env;

export interface UserInterface extends TimestampInterface{
    email?: String,
    username?: String,
    password?: String,
    image?: String
}

export interface UserType extends UserInterface, mongoose.Document {
    // Methods
    hashPassword: (password: String) => Promise<String>;
    verifyPassword: (candidatePassword: String) => Promise<String>;
}

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        validate: (email: string) => {
            return validator.isEmail(email);
        }
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        select: false,
        validate: (password: string) => {
            return validator.isLength(password, {
                min: 8,
                max: 32
            });
        },
    },
    image: {
        type: String,
        required: false,
        default: ''
    }
}, { timestamps: true });

UserSchema.methods = {
    hashPassword: (password: String) => {
        return bcrypt.hash(password, 10);
    },
    verifyPassword: function(candidatePassword: string) {
        let model: UserType = this;

        let password = model.password as string;
        return bcrypt.compare(candidatePassword, password);
    }
};

UserSchema.pre<UserType>('save', function (next) {
    if (!this.isModified('password'))
        return next();

    this.hashPassword(this.password).then(value => {
        this.password = value;
        next();
    });
});

UserSchema.pre<UserType>('update', function (next) {
    if (!this.isModified('password'))
        return next();

    this.hashPassword(this.password).then(value => {
        this.password = value;
        next();
    })
});

export const UserModel = mongoose.model<UserType>('User', UserSchema);