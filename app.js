// Carregando módulos
const express = require('express')
const { engine } = require('express-handlebars')
const bodyParser = require('body-parser')
const app = express()
const admin = require('./routes/admin')
const path = require('path')
const mongoose = require('mongoose')
const session = require('express-session')
const flash = require('connect-flash')
require('./models/Postagem')
const Postagem = mongoose.model('postagens')
require('./models/Categoria')
const Categoria = mongoose.model('categorias')
const usuarios = require('./routes/usuario')
const passport = require('passport')
require('./config/auth')(passport)
const db = require('./config/db')

// Configurações
// Sessão
app.use(session({
    secret: 'cursodenode',
    resave: true,
    saveUninitialized: true
}))

app.use(passport.initialize())
app.use(passport.session())
app.use(flash())

// Middleware
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg')
    res.locals.error_msg = req.flash('error_msg')
    res.locals.error = req.flash('error')
    res.locals.user = req.user ? req.user.toJSON() : null;
    next()
})

// Body Parser
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
// Handlebars
app.engine('handlebars', engine({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
// Mongoose
mongoose.Promise = global.Promise
mongoose.connect(db.mongoURI)
    .then(() => {
        console.log('Conectado ao mongo com sucesso!')
    }).catch((error) => {
        console.log('Falha ao se conectar: ' + error)
    })
// Public
app.use(express.static(path.join(__dirname, 'public')))

// Rotas
app.get('/', (req, res) => {
    Postagem.find().lean().populate('categoria').sort({ data: 'desc' }).then((postagens) => {
        res.render('index', { postagens: postagens })
    }).catch((error) => {
        req.flash('error_msg', 'Houve um erro interno')
        res.redirect('/404')
    })
})

app.get('/postagem/:slug', (req, res) => {
    Postagem.findOne({ slug: req.params.slug }).lean().then((postagem) => {
        if (postagem) {
            res.render('postagem/index', { postagem: postagem })
        } else {
            req.flash('error_msg', 'Essa postagem não existe.')
            res.redirect('/')
        }
    }).catch((error) => {
        req.flash('error_msg', 'Houve um erro interno')
        res.redirect('/')
    })
})

app.get('/categorias', (req, res) => {
    Categoria.find().lean().then((categorias) => {
        res.render('categorias/index', { categorias: categorias })
    }).catch((error) => {
        req.flash('error_msg', 'Houve um erro interno ao listar as categorias')
        res.redirect('/')
    })
})

app.get('/categorias/:slug', (req, res) => {
    Categoria.findOne({ slug: req.params.slug }).lean().then((categoria) => {
        if (categoria) {
            Postagem.find({ categoria: categoria._id }).lean().then((postagens) => {
                res.render('categorias/postagens', { postagens: postagens, categoria: categoria })
            }).catch((error) => {
                req.flash('error_msg', 'Houve um erro ao listar os posts!')
                res.redirect('/')
            })
        } else {
            req.flash('error_msg', 'Esta categoria não existe')
            res.redirect('/')
        }
    }).catch((error) => {
        req.flash('error_msg', 'Houve um erro interno ao carregar a página desta categoria.')
        res.redirect('/')
    })
})

app.get('/404', (req, res) => {
    res.send('Erro 404!')
})

app.use('/admin', admin)
app.use('/usuarios', usuarios)

// Outros
const PORT = process.env.PORT || 8081
app.listen(PORT, () => {
    console.log('Servidor rodando com sucesso!')
})
