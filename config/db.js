if(process.env.NODE_ENV == 'production'){
    module.exports = {mongoURI: 'mongodb+srv://patrickhoffmanncampos:2qKNF3ui1E35BW95@project-nodejs.lbcdq3b.mongodb.net/?retryWrites=true&w=majority&appName=project-nodejs'}
}else{
    module.exports = {mongoURI: 'mongodb://localhost/blogapp'}
}