const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {type: String, require: true},
    email: {type: String, require: true, unique: true},
    password: {type: String, require: true},
    isActive: {type: Boolean},
})

const User = mongoose.model("User", userSchema);

// export default User
module.exports = User;



// Remember classes?
// mongoose creates a class for you
// and returns it when you call mongoose.model();
// class User {
//    constructor( name) {
//     this.name = name;
//    }
// }
// const a = new User("Alice");
// console.log(a.name)
// const b = new User("Bob");
// console.log(b.name)