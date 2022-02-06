import {cityApi} from "../Api/api";
const isEmpty=(value)=>{
    return value.trim()==="";
}

export  const validateName=(value)=>{
    if(isEmpty(value))
    return [false,"Name field should not contain only space"];
    value=value.trim();
    if(value.length<3)
    return[false,"Length must be atleast 3"]
    if(value[0]<'A'||value>'Z')
    return [false,"Name should start with capital letter"];
    for(var i=0;i<value.length;i++){
        if(value[i]===' '){
            if(value[i+1]<'A'||value[i+1]>'Z')
            return [false,"Letter after space should be capital"];
        }
        else if(!(value[i]>='A'&&value[i]<='Z')&&!(value[i]>='a'&&value[i]<='z'))
        return [false,"There must not be any digit or special character in name"];
    }
    return [true,"Succesful"];
}
export const validateUsername=(value)=>{
    if(isEmpty(value))
    return [false,"Name field should not contain only space"];
    if(value.length<3)
    return [false,"Username must be of length 3"]
    for(var i=0;i<value.length;i++){
        if(value[i]<'a'||value[i]>'z')
        return [false,"Username must contain only lowercase alphabets"]
    }
    return [true,"Succesful"]
} 
export const validateCity=(value)=>{
    if(isEmpty(value))
    return [false,"City field should not contain only space"];
    if(value[0]<'A'||value>'Z')
    return [false,"City should start with capital letter"];
    const cityState=cityApi();
    for(var i=0;i<cityState.length;i++){
        if(cityState[i].name===value)
        return [true,"Successful"]
    }
    return [false,"Invalid City Name"]
}
export const validateState=(value,city)=>{
    if(isEmpty(value))
    return [false,"State field should not contain only space"];
    if(value[0]<'A'||value>'Z')
    return [false,"State should start with capital letter"];
    const cityState=cityApi();
    var index=-1;
    for(var i=0;i<cityState.length;i++){
        if(cityState[i].state===value&&cityState[i].name===city)
        return [true,"Successful"]
        if(cityState[i].name===city)
        index=i;
    }
    if(index===-1)
    return [false,"Invalid State Name"]
    return [false,`${city} belongs to state ${cityState[index].state}`]
}
export const validateStuProf=(value)=>{
    if(isEmpty(value))
    return [false,"Student/Professional field should not contain only space"];
    if(value==="Student"||value==="Professional")
    return [true,"Successful"]
    return [false,"Field will take either Student or Professional as input"]
    
}
export const validateEmail=(value)=>{
    if(isEmpty(value)){
        return [false,"Email field should not contain only space"];
    }
    if(value.length<3||value.length>64)
    return [false,"Email length must be between 3 and 64"]
    var indexOfAtTheRate=value.indexOf('@');
    var indexOfDot=value.indexOf('.');
    if(value[0]==='.'||value[value.length-1]==='.')
    return [false,"First and last character must not be a '.'"]
    for(var i=1;i<value.length;i++)
    {
        if(value[i]===value[i-1]&&value[i]==='.')
        return [false,"There must not be two consecutive dots"]
    }
    if(indexOfAtTheRate===-1)
    return [false,"Email must contain '@' "]
    if(indexOfDot===-1)
    return [false,"Email must contain '.'"]
    if(value[0]==='@'|| value[0]==='.')
    return [false,"Email must not start with '@ or '.'"]
   

    // if(value[indexOfDot-1]!='@')
    return [true,"Successful"]

}
export const validatePassword=(value)=>{
    if(isEmpty(value))
    return [false,"Password field should not contain only space"];
    if(value.length<8||value.length>15)
    return [false,"Password length must be between 8 and 15"]
    if(value[0]<'A'||value>'Z')
    return [false,"Password must start with capital letter"]
    var containSpecial=false;
    var containDigit=false;
    var containLower=false;
    var containUpper=false;
    for(var i=0;i<value.length;i++){
        if(value[i]>='0'&&value[i]<='9')
        containDigit=true;
        else if(value[i]>='a'&&value<='z')
        containLower=true;
        else if(value[i]>='A'&&value<='Z')
        containUpper=true;
        else 
        containSpecial=true;
    }
    if(containDigit===false)
    return [false,"Password should contain atleast one digit"]
    if(containLower===false)
    return [false,"Password should contain atleast one Lower Case character"]
    if(containUpper===false)
    return [false,"Password should contain atleast one Upper Case character"]
    if(containSpecial===false)
    return [false,"Password should contain atleast one special character"]
    return [true,"Successful"]
}
export const validateConfirmPassword=(value,password)=>{
    var isValid=validatePassword(password);
    if(!isValid[0]){
        return [false,"First resolve the error/s of password"]
    }      
    if(value!==password)
    return [false,"Passwords are not equal"]
    return [true,"Successful"]   
}