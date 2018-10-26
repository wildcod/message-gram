const User = require('../models/Users')
const getSalt = require('../utils/authFunc').getSalt
const getSaltedPassword = require('../utils/authFunc').getSaltedPassword
const checkPasswordHash = require('../utils/authFunc').checkPasswordHash

 
const signup = async(req,res) => {
   
    try{
        const {username,name,password} = req.body

        const user = await User.findOne({username}).exec()

        if(user){
            return res.status(401).json({success:false, message:'This email is already registered. Please login.'})
        }

        const salt = await getSalt()
        const saltedPassword = await getSaltedPassword(password,salt)

        const newUser = new User({
            username,
            password : saltedPassword,
            name
        })

        const savedUser = await newUser.save()
        if(!savedUser){
            return res.status(400).json({ success:false, message:'Unfortunately, your account could not be created. Please try again.' })
        }

        res.status(201).json({
            success:true,
            message:'Account created successfully. A confirmation mail has been sent to your email account.'
        })
    }catch(e){
       console.log(e)
       return res.status(500).json({ success:false, message:'Unfortunately, your account could not be created. Please try again.' })
   }
} 


 const login = async(req,res) => {

    try{
     const {UserName:username, password} = req.body
     console.log(username)
     const user = await User.findOne({username}).exec()

     if(!user){
         return res.status(401).json({
              success : false,
              message : 'invalid username'
          })
     }

    

     const {username:db_username, password:hashed_password, name:name,_id} = user 
     
     console.log(user)

     const isPasswordCorrect = await checkPasswordHash(password,hashed_password)


     if(!isPasswordCorrect) {
        return res.status(401).json({
             success : false,
             message : 'invalid password'
         })
     }

     const updateUser = await User.updateOne(
        { username },
        { $set:{
                active:true
            }
        }
    ).exec()
    if(!updateUser){
        throw('user not updated')
    }

     return res.status(200).json({
         success : true,
         message : 'logged in',
         user : {
             username,
             name,
             _id
         }
     })

    }catch(e){
        return res.status(500).json({
            success : false,
            message : e
        })
    }


     
}

const clearAuth = async(req,res) => {

    try{
        const {username} = req.body
        
        const updateUser = await User.updateOne(
            { username },
            { $set:{
                    active:false
                }
            }
        ).exec()
        console.log(updateUser)
        if(updateUser.nModified === 0){
            return res.status(400).json({
                success : false,
                message : 'not logged out'
            })
        }

        return res.status(200).json({
            success : true,
            message : 'logged out'
        })


    }catch(e){
        return res.status(500).json({
            success : false,
            message : e
        })
    }

}

 const activeUsers = async(req,res) => {
     
    
    try{
           const allActiveUsers = await User.find({active : true},{name : 1}).exec()
           
           console.log(allActiveUsers)

           if(!allActiveUsers){
            return res.status(401).json({
                success : false,
                message : 'No active user'
            })  
           }

           return res.status(201).json({
               success : true,
               message : 'some active users available',
               users : {
                   allActiveUsers
               }
           })

           
           

      }catch(e){
        return res.status(500).json({
            success : false,
            message : e
        })
      }
}

 const chatMessage = async(req,res) => {
    try{
        const {_id} = req.body
        console.log(_id)
        const chat = await User.find(
            {_id},
            {
                data : 1
            }
            ).limit(20)
        
        console.log('185',chat)

        if(!chat){
            return res.status(401).json({
                success : false,
                message : 'No such user'
            })
        }

        return res.status(201).json({
            success : true,
            message : 'get some chatting',
            data : chat
        })

    }catch(e){
        console.log(e)
    }
}

module.exports = {
    signup,
    login,
    activeUsers,
    clearAuth,
    chatMessage
}
