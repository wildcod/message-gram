const express = require('express');
const socketIo = require('socket.io')
const http = require('http')
const mongoose = require('mongoose')
const router = require('./routes/index')
const User = require('./models/Users')




const app = express();
let currentApp = app
const route = express.Router()
const server = http.createServer(app)
const io = socketIo(server)

app.use(express.json())
app.use(express.urlencoded({extended : true}))

mongoose.connect("mongodb+srv://learn-mongo:learn-mongo@cluster0-dszif.mongodb.net/test?retryWrites=true",{useMongoClient: true});

io.on('connection',(socket) => {
      console.log('New connection is formed' , socket.id)

      socket.on('send-message', async({message,selectedUser,_id})=> {
            const selectedUserId = selectedUser._id;
            console.log(message,selectedUser,_id)

            
            // message store in sender account
            let senderChats = { [selectedUserId] : message , date : new Date()}
            const updateSenderMessages = await User.update(
                  {_id : _id,
                  },{   
                       $push :{ data : senderChats }
                  }
            ).exec()
            // message store in receiver account
            let receiverChats = { [_id] : message ,date : new Date()}
            const updateReciverMessages = await User.update(
                  {_id : selectedUserId,
                  },{   
                       $push :{ data : receiverChats }
                  }
            ).exec() 

            const senderUserData = await User.findOne({_id : _id}).exec()
            const reciverUserData = await User.findOne({_id :selectedUserId}).exec()

            console.log('50',updateSenderMessages)
            console.log('51' ,senderUserData)
            console.log('52',updateReciverMessages)
            console.log('53' ,reciverUserData)
            io.emit('recv-mesg',message);
      })
})

// if(module.hot){
//       module.hot.accept('./server.js',()=>{
//           server.removeListener('request',currentApp)
//           server.on('request',app)
//           currentApp = app
//       })
//   }

route.use('/api/v1', router)

app.use('/', route)


server.listen(8085,() => console.log("server is start to take our message"))



