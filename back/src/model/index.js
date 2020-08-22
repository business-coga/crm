const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = mongoose.Types.ObjectId

const Accounts = mongoose.model('accounts', new Schema({
    username : {type : String, unique : true, trim : true},
    password : {type : String},
    name : {type : String, trim : true},
    email : {type : String, trim : true},
    isEmployee : {type : Number},
    isCustomer : {type : Number},
    isVendor : {type : Number},
    createBy : {type : ObjectId},
    createDate : {type : Date, default : Date.now},
})) 

const Tickets = mongoose.model('ticket', new Schema({
    code : {type : String, unique : true, trim : true},
    customerName : {type : String, trim : true},
    phone : {type : String, trim : true},
    description : {type : String, trim : true},
    value : {type : String, trim : true},
    valid : {type : String, trim : true},
    activeDate : {type : Date},
}))





mongoose.connect('mongodb+srv://sa:123@crm1.ykw1x.azure.mongodb.net/crm', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify : false
}, (err) => {
    if (err)
        throw err
    console.log('MongoDB connected!')
})


module.exports = {Tickets,Accounts}