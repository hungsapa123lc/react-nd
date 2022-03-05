import db from '../models/index'
import emailService from './emailService'
let handleUploadStatus=async(data)=>{
    try{
        if(!data.categoryId || !data.contentHtml){
            return{
                errCode:1,
                errMessage:'Missing Input Parameters'
            }
        }
        else{
            let status =  await db.Status.create({
                userId:data.userId,
                categoryId:data.categoryId,
                contentHtml:data.contentHtml,
                contentMarkdown:data.contentMarkdown,
                files:data.files,
                image:data.image
            })
            let user=  await db.User.findOne({
                where:{id:data.userId },
                attributes:{exclude:['password']},

            })
            let Qa= await db.User.findAll({
                where:{role:'QA Manager'},
                attributes:{exclude:['password']},
            })


                await emailService.sendSimpleEmail({
                    id:data.userId,
                    data:Qa
                })
            
            
            return{
                errCode:0,
                errMessage:'Successfully',
                data:status
            }
        }
    }catch(e){
        return e
    }
}
module.exports={handleUploadStatus}



