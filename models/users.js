function userModel(fName,lName,email,phone,password){
    this.fName=fName;
    this.lName=lName;
    this.email=email;
    this.phone=phone;
    this.password=password;
}

userModel.prototype.getName=function(){
  return this.fName+" "+this.lName;
}

module.exports=userModel;
