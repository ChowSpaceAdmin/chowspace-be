const path = require('path');
const mongoose = require('mongoose');
const validator = require('validator');
const config = require('../server/config');
const Hasher = require('../services/Hasher');
const ValidationError = require('../errors/ValidationError');
const AuthenticationError = require('../errors/AuthenticationError');
const ModelNotFoundError = require('../errors/ModelNotFoundError');
const TokenGenerator = require('../services/TokenGenerator');

const IMAGE_REGEX = /\.(jpe?g|png)$/i;
const MAX_FILE_SIZE = 2097152;

// Profile
const profileSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        maxlength: [25, 'Name must be no more than 25 characters.']
    },
    image: {
        type: String,
        default: config.DEFAULT_PROFILE_IMG
    },
    telephones: [{
        type: String,
        trim: true,
        maxlength: [25, 'Telephone must be no more than 25 characters.'],
        validate: {
            validator: /^[0-9-]+$/,
            message: props => `${props.value} is not a valid telephone number.`
        }
    }]
}, {
    _id: false,
    storeSubdocValidationError: false
});

// Account
const accountSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
        maxlength: [50, 'Email must be no more than 50 characters.'],
        validate: {
            validator: (v) => validator.isEmail(v),
            message: props => `${props.value} is not a valid email.`
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: [8, 'Password must be at least 8 characters long.']
    },
    isVerified: {
        type: Boolean,
        required: true,
        default: false
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default:false
    },
    isActive: {
        type: Boolean,
        required: true,
        default: true
    },
    profile: {
        type: profileSchema,
        required: true
    }
}, {
    useNestedStrict: true,
    timestamps: true
});

// Account Statics
accountSchema.statics.createUser = async function(email, password, name) {
    const user = await this.create({
        email,
        password,
        profile: {
            name
        }
    });
    return user;
};

accountSchema.statics.findByCredentials = async function(email, password) {
    const user = await this.findOne({
        email
    });

    if (!user) throw new AuthenticationError('Invalid Credentials.');

    const isPassword = await user.isPassword(password);
    if (!isPassword) throw new AuthenticationError('Invalid Credentials.');

    return user;
};

accountSchema.statics.findByAccountId = async function(id) {
    let user;
    try {
        user = await this.findById(id);
    } catch(err) {
        if (err.name === 'CastError') throw new ModelNotFoundError('Account Not Found.');
        else throw err;
    }

    if (!user) throw new ModelNotFoundError('Account Not Found.');

    return user;
};

accountSchema.statics.isValidImage = function(bufferFile) {
    const extension = path.extname(bufferFile.originalname);
    return (extension.match(IMAGE_REGEX) && bufferFile.size < MAX_FILE_SIZE);
};

// Account Methods
accountSchema.methods.getAccountInfo = function() {
    return {
        id: this.id,
        isVerified: this.isVerified,
        email: this.email,
        name: this.profile.name,
        image: this.profile.image,
        telephones: this.profile.telephones
    };
};

accountSchema.methods.getProfileInfo = function() {
    return {
        id: this.id,
        name: this.profile.name,
        image: this.profile.image,
        telephones: this.profile.telephones
    };
};

accountSchema.methods.genTokens = async function() {
    const promise1 = TokenGenerator.createToken({
        typ: TokenGenerator.ACCESS,
        adm: this.isAdmin,
        ver: this.isVerified,
        act: this.isActive
    }, this.id);
    const promise2 = TokenGenerator.createToken({
        typ: TokenGenerator.REFRESH
    }, this.id);

    const values = await Promise.all([promise1 , promise2]);
    const access = values[0];
    const refresh = values[1];
    const accessExp = TokenGenerator.decode(access).exp;
    const refreshExp = TokenGenerator.decode(refresh).exp;

    return {
        access,
        accessExp,
        refresh,
        refreshExp
    };
};

accountSchema.methods.isPassword = async function(password) {
    const result = await Hasher.isHash(password, this.password);
    return result;
};

accountSchema.methods.setPassword = async function(old, password) {
    const isPassword = await this.isPassword(old, this.password);
    if (!isPassword) throw new AuthenticationError('Invalid Credentials.');

    this.password = password;
    await this.save();
};

accountSchema.methods.disableAccount = async function() {
    this.isActive = false;
    await this.save();
};

accountSchema.methods.updateProfile = async function(name, telephones, image) {
    if (name) this.profile.name = name;
    if (telephones) this.profile.telephones = telephones;
    if (image) this.profile.image = image;
    await this.save();
};

// Account Hooks
accountSchema.pre('save', async function()  {
    if (this.isModified('password')) {
        this.password = await Hasher.hash(this.password);
    }
});

accountSchema.post('save', function(error, doc, next) {
    if (error.name === 'MongoError' && error.code === 11000) {
        next(new ValidationError('Email Already Exists.', 'email'));
    } else {
        next(error);
    }
});

const Account = mongoose.model('Account', accountSchema);

module.exports = Account;
