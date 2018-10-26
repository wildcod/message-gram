const bcrypt = require('bcrypt-nodejs')

 const getSaltedPassword = (plainTextpassword,salt) => {
	return new Promise((resolve,reject)=>{
		bcrypt.hash(plainTextpassword, salt, null, function(err, hash) {
		    // Store hash in your password DB.
		    if(err){
		    	return reject(err)
		    }
		    resolve(hash)
		})
	})
}
const saltRounds = 10
 const getSalt = () => {
	return new Promise((resolve,reject)=>{
		bcrypt.genSalt(saltRounds, (err,salt)=>{
			if(err){
				reject(null)
			}
			resolve(salt)
		})
	})
}

const checkPasswordHash = (password,hash_password) => {
	return new Promise((resolve,reject)=>{
		bcrypt.compare(password,hash_password,(err,res)=>{
			if(err){
				reject(res)
			}
			resolve(res)
		})
	})
}

module.exports = {
    getSalt,
	getSaltedPassword,
	checkPasswordHash
}