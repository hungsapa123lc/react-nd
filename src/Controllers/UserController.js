import userService from '../services/userService'
class UserControllers{
    handleUploadStatus=async(req, res)=>{
        let data=await userService.handleUploadStatus(req.body)
        return res.status(200).json(data)
    }
    
}

module.exports = new UserControllers;