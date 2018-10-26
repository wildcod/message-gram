const mongoose = require('mongoose')
mongoose.Promise = global.Promise

// const Messages = new mongoose.Schema({
//     _id : false,
//     pack_id : {
//         type : String,
//         trim : true
//     },
//     mesg : [String]
// }) 

const UserSchema = new mongoose.Schema({
    username : {
        type : String,
        trim: true,
        required:true,
        lowercase:true,
        unique:true,
        index:true
    },
    password : {
        type: String,
        trim:true,
        required:true
    },
    name : {
        type : String,
        trim:true,
        required:true
    },
    data : {
        type : Array,
        default:[]
    },
    socketId : {
         type:String,
         trim : true
    },
    active : {
        type:Boolean,
        default : false
    }
})

const User = mongoose.model('User',UserSchema)

module.exports = User