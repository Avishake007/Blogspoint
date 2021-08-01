// Details to be filled in the signup section
const mongoose=require('mongoose');
const jwt=require('jsonwebtoken');
const bcrypt=require('bcryptjs');
const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    state:{
        type:String
    },
    city:{
        type:String
    },
    stuprof:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    confirmpassword:{
        type:String,
        required:true
    },
    tokens:[
        {
            token:{
                type:String,
                required:true
            }
        }
    ]
});
//we are hashing the password
userSchema.pre('save',async function(next){
    console.log("Hashing");
    if(this.isModified('password')){
        this.password=await bcrypt.hash(this.password,12);
        this.confirmpassword=await bcrypt.hash(this.confirmpassword,12);
    }
    next();
}) ;
// We are generating token
userSchema.methods.generateAuthToken=async function(){
    try{
        let token=jwt.sign({_id:this._id},process.env.SECRET_KEY);
        this.tokens=this.tokens.concat({token:token});
        await this.save();
        return token;
    }
    catch(err){
        console.log(err);
    }
}
const User=mongoose.model('USER',userSchema);
module.exports=User;