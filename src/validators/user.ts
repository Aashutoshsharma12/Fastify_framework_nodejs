import { required } from "joi";

const add_userSchema = {
    body: {
        type: "object",
        required: ["name", "email", "role"],
        properties: {
            name: { type: "string", minLength: 3 },
            email: { type: "string", format: "email" },
            role: { type: "string", enum: ['user', 'company'] },
            phoneNumber: {
                type: "string",
                minLength: 4,
                maxLength: 10,
                pattern: "^[0-9]+$" // Ensures only numeric values are allowed
            },
            countryCode: {
                type: "string",
                minLength: 1,
                maxLength: 5, // Adjust based on actual country code length
                pattern: "^[+]?[0-9]+$" // Allows numbers with an optional leading '+'
            }
        },
        dependencies: {
            phoneNumber: ["countryCode"], // If phone exists, countryCode is required
            countryCode: ["phoneNumber"], // If countryCode exists, phone is required
        },
    },
};
// Schema for validating request parameters and query string
const getUserSchema = {
    params: {
        type: "object",
        required: ["id"],
        properties: {
            id: {
                type: "string",
                pattern: "^[a-fA-F0-9]{24}$",// Ensures it matches a valid MongoDB ObjectId
                errorMessage: {
                    type: "ID must be a string.",
                    pattern: "Invalid MongoDB ObjectId format. Must be 24 hex characters."
                }
            }
        }
    },
    errorMessage: {
        required: {
            id: "User ID is required.",
        }
    }
    // querystring: {
    //     type: "object",
    //     required: ["status"],
    //     properties: {
    //         status: { type: "string", enum: ["active", "inactive"] }, // Must be 'active' or 'inactive'
    //     },
    // },
};
const listUserSchema = {
    querystring: {
        type: "object",
        required: ["status"],
        properties: {
            status: {
                type: "boolean",
                errorMessage: {
                    type: "status must be a boolean.",
                    pattern: "Status Key is required"
                }
            }
        }
    },
    errorMessage: {
        required: {
            status: "status Key is required.",
        }
    }
};
export {
    add_userSchema,
    getUserSchema,
    listUserSchema
}