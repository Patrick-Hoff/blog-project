if(process.env.NODE_ENV == 'production'){
    module.exports = {mongoURI: 'mongodb+srv://nodejs-blog-project:u_z4n2GCfM.QmVk@project-nodejs.lbcdq3b.mongodb.net/?retryWrites=true&w=majority&appName=project-nodejs'}
}else{
    module.exports = {mongoURI: 'mongodb://localhost/blogapp'}
}