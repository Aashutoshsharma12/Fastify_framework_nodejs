"use strict";
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    role: { type: String, default: "user" }, //user,company
    name: { type: String, required: true }, // Company Name
    email: { type: String, default: "", trim: true, lowercase: true },
    countryCode: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    address: { type: String, required: true },
    password: { type: String, required: true },
    isVerified: { type: Boolean, default: false },
    isDelete: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true }
}, {
    timestamps: true,
    versionKey: false,
});
const userModel = (0, mongoose_1.model)("user", userSchema);
module.exports = userModel;
