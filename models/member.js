import mongoose from 'mongoose;'
const { Schema } = mongoose;

const memberSchema = new Schema({
    email: {type: String},
    password: {type: String},
    username: {type: String},
    age: {type: Number},
});

const Member = mongoose('member', memberSchema);
export default Member;