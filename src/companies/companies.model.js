import { Schema, model } from "mongoose";

const companiesSchema = Schema({

    nameCompany:{
        type: String,
        required: true,
        maxLength: [25, "Name cannot exceed 25 characters"],
        unique:true
    },
    description:{
        type: String,
        required: [true, "Description is required"],
        maxLength: [255, "Description cannot exceed 255 characters"],
    },
    address:{
        type: String,
        required: [true, "Address is required"]
    },
    email:{
        type: String,
        required: [true, "Email is required"],
        unique: true
    },
    phone:{
        type: String,
        required: [true, "Phone is required"],
        minLength: 8,
        maxLength: 8,
        unique: true
    },
    impactLevel:{
        type: String,
        required: true,
        enum: ["HIGH","MEDIUM","LOW"]
    },
    category:{
        type: String,
        required: true,
    },
    trayectory:{
        type: Number
    },
    Foundation:{
        type: Date,
        required: true,
        set: (value) => {
            return new Date(value.getFullYear(), value.getMonth(), value.getDate());
        }
    },
},{
    timestamps: true,
    versionKey: false
});

export default model('Companies', companiesSchema);
