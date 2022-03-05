import bcrypt from 'bcryptjs'
import db from '../models/index'
var salt = bcrypt.genSaltSync(10);

let createNewUser=async(data)=>{
    try{
        //check if email is exist
        let check =await checkUserEmail(data.email)
        if(check === true){
            return{
                errCode:1,
                errMessage:'This email is already exist'
            }
        }
        else{
            let hashUserPass= await hashPasswords(data.password)
        await db.User.create({
            email: data.email,
            password: hashUserPass,
            firstName: data.firstName,
            lastName: data.lastName,          
            role:data.role,
            image: data.image,
        }) 
        return{
            errCode:0,
            errMessage:'Successfully'
        }
        }
    }catch(e){
        return e;
    }
}

let hashPasswords=(password)=>{
    return new Promise(async(resolve, reject) =>{
        try{
            var hash=await bcrypt.hashSync(password,salt)
            resolve(hash);
        }catch(e){
            reject(e);
        }
    })
}

let checkUserEmail = async(userEmail) => {
    
        try{
            let user= await db.User.findOne({
                where : {email: userEmail}
            })
            if(user){
                return true
            }
            else{
                return false
            }
        }catch(err){
            console.log(err)
        }
    
}


let handleUserLogin=async(email,password)=>{
    try{
        let userInfo={}
        let isExist= await checkUserEmail(email)
        if(isExist){
            let user= await db.User.findOne({
               
                where:{email:email},

            })
            console.log('chek user',user)
            if(user){
                let check= await bcrypt.compareSync(password, user.password)
                                   if(check){
                                       userInfo.errCode=0;
                                       userInfo.errMessage='Success'
                                       delete user.password;
                                       userInfo.user=user;
                                   }
            }
            else{
                userInfo.errCode=3;
                userInfo.errMessage='Does not exist in the database'
            }

        }
        else{
            userInfo.errCode=2;
            userInfo.errMessage='Email does not exist'
        }
        return userInfo
    }catch(e){
        return e
    }
}

let handleCreateCategory=async(categorytype) => {
    try{
        if(!categorytype){
            return{
                errMessage:'Missing input parameters',
                errCode:1
            }
        }
        else{           
            await db.Category.create({
                categorytype:categorytype
            })
            return{
                errMessage:'Successfully created category',
                errCode:0,
            }
        }
    }catch(e){ return e}
}

let handleGetAllCategory=async()=>{
    try{
        let data=await db.Category.findAll();
        if(!data){
            return{
                errCode:2,
                errMessage:'Not found'
            }
        }
        else{
            return {
                data:data,
                errCode:0,
                errMessage:'Found'
            }
        }
    }catch(e){ return e}
}

let deleteCategory=async(id)=>{
    try{
        let category=await db.Category.findOne({
            where:{id:id,}
        })
        if(!category){
            return{
                errCode:2,
                errMessage:'Not found'
            }
        }
        else{
            await db.Category.destroy({
                where:{id:id}
            })
            return{
                errCode:0,
                errMessage:'Successfully'
            }
        }
    }catch(e){
        return e
    }
}
module.exports={createNewUser:createNewUser,handleUserLogin:handleUserLogin,
    handleCreateCategory:handleCreateCategory,handleGetAllCategory,deleteCategory}