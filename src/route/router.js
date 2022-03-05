import express from 'express';
import UserController from '../Controllers/UserController'
import AdminQaController from '../Controllers/AdminQaController'
let router = express.Router();
let initWebRoute=(app)=>{
    router.post('/api/create-new-user',AdminQaController.CreateANewUser);
    router.post('/api/login',AdminQaController.handleLogin)
    router.post('/api/create-new-category',AdminQaController.handleCreateCategory)
    router.post('/api/save-user-status',AdminQaController.handleSaveUserStatus)
    router.get('/api/get-all-category',AdminQaController.handleGetAllCategory)
    router.post('/api/upload-status',UserController.handleUploadStatus)
    router.delete('/api/delete-category',AdminQaController.handleDeleteCategory)
    return app.use('/',router);
}

export default initWebRoute;