
const mongoose = require('mongoose'); 
const Schema = mongoose.Schema; 
  
let mailForm = new Schema({ 
  serial:{
    type:String
  },
  name: { 
    type: String 
  }, 
  subject: { 
    type: String 
  }, 
  body: { 
    type: String 
  } 
}, { 
    collection: 'inbox'
  }) 
  
  module.exports = mongoose.model('MailForm', mailForm);