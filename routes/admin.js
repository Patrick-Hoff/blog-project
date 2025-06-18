const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
require('../models/Categoria')
const Categoria = mongoose.model('categorias')
require('../models/Postagem')
const Postagem = mongoose.model('postagens')
const {eAdmin} = require('../helpers/eAdmin')
require('../models/Usuario')
const Usuario = mongoose.model('usuarios')

router.get('/', eAdmin, (req, res) => {
    Usuario.find().lean()
    .then((usuario) => {
        res.render('admin/index', {usuarios: usuario})
    }).catch((error) => {
        console.log(error)
    })
})



router.get('/categorias', eAdmin, (req, res) => {
    Categoria.find().sort({ date: 'desc' }).lean()
        .then((categoria) => {
            res.render('admin/categorias', { categoria })
        }).catch((error) => {
            console.log('erro')
        })
})

router.get('/categorias/add', eAdmin, (req, res) => {
    res.render('admin/addcategorias')
})

router.post('/categorias/nova', eAdmin, (req, res) => {

    var erros = [];

    if (!req.body.nome || typeof req.body.nome === 'undefined' || req.body.nome === null) {
        erros.push({ texto: 'Nome inválido' });
    }

    if (!req.body.slug || typeof req.body.slug === 'undefined' || req.body.slug === null) {
        erros.push({ texto: 'Slug inválido' });
    }

    if (req.body.nome.length < 3) {
        erros.push({ texto: 'Nome da categoria muito curto.' });
    }

    if (erros.length > 0) {
        res.render('admin/addcategorias', {
            erros: erros
        })
    } else {
        const novaCategoria = {
            nome: req.body.nome,
            slug: req.body.slug
        }

        new Categoria(novaCategoria).save()
            .then(() => {
                req.flash('success_msg', 'Categoria criada com sucesso')
                res.redirect('/admin/categorias')
            })
            .catch((error) => {
                req.flash('error_msg', 'Houve um erro ao salvar a categoria, tente novamente!')
                res.redirect('/admin')
            })
    }


})

router.get('/categorias/edit/:id', eAdmin, (req, res) => {
    Categoria.findOne({ _id: req.params.id }).lean()
        .then((categoria) => {
            res.render('admin/editcategorias', { categoria: categoria })
        }).catch((error) => {
            req.flash('error_msg', 'Esta categoria não existe')
            res.redirect('/admin/categorias')
        })
})

router.post('/categorias/edit', eAdmin, (req, res) => {
    Categoria.findOne({ _id: req.body.id })
        .then((categoria) => {
            categoria.nome = req.body.nome
            categoria.slug = req.body.slug

            categoria.save().then(() => {
                req.flash('success_msg', 'Categoria editada com sucesso!')
                res.redirect('/admin/categorias')
            }).catch((error) => {
                req.flash('error_msg', 'Houve um erro interno ao salvar a edição da categoria.')
                res.redirect('/admin/categorias')
            })

        }).catch((error) => {
            req.flash('error_msg', 'Houve um erro ao editar a categoria')
            res.redirect('/admin/categorias')
        })
})

router.post('/categorias/deletar', eAdmin, (req, res) => {
    Categoria.deleteOne({ _id: req.body.id }).then(() => {
        req.flash('success_msg', 'Categoria deletada com sucesso!')
        res.redirect('/admin/categorias')
    }).catch((error) => {
        req.flash('error_msg', 'Houve um erro ao deletar a categoria')
        res.redirect('/admin/categorias')
    })
})

router.get('/postagens', eAdmin, (req, res) => {

    Postagem.find().populate('categoria').lean().sort({ data: 'desc' })
        .then((postagens) => {
            console.log(postagens)
            res.render('admin/postagens', { postagens: postagens })
        }).catch((error) => {
            req.flash('error_msg', 'Houve um erro ao litar a postagem.')
            res.redirect('/admin')
        })

})

router.get('/postagens/add', eAdmin, (req, res) => {
    Categoria.find().lean().then((categoria) => {
        res.render('admin/addpostagem', { categorias: categoria })
    }).catch((error) => {
        req.flash('Error_msg', 'Houve um erro ao carregar o formulario')
        res.redirect('/admin')
    })
})

router.post('/postagens/nova', eAdmin, (req, res) => {

    var erros = []

    if (req.body.categoria == '0') {
        erros.push({ texto: 'Categoria inválida, registre uma categoria.' })
    }

    if (erros.length > 0) {
        res.render('admin/addpostagem', { erros: erros })
    } else {
        const novaPostagem = {
            titulo: req.body.titulo,
            descrição: req.body.descrição,
            conteudo: req.body.conteudo,
            categoria: req.body.categoria,
            slug: req.body.slug
        }

        new Postagem(novaPostagem).save().then(() => {
            req.flash('success_msg', 'Postagem criada com sucesso!')
            res.redirect('/admin/postagens')
        }).catch((error) => {
            req.flash('error_msg', 'Houve um erro durante o salvamento da postagem.')
            res.redirect('/admin/postagens')
        })

    }

})

router.get('/postagens/edit/:id', eAdmin, (req, res) => {

    Postagem.findOne({ _id: req.params.id }).lean().then((postagem) => {

        Categoria.find().lean().then((categorias) => {
            res.render('admin/editpostagens', {categorias: categorias, postagem: postagem})
        }).catch((error) => {
            req.flash('error_msg', 'Houve um erro ao listar as categorias.')
            res.redirect('/admin/postagens')
        })

    }).catch((error) => {
        req.flash('error_msg', 'Houve um erro ao carregar o formulario de edição.')
        res.redirect('/admin/postagens')
    })

})

router.post('/postagem/edit', eAdmin, (req, res) => {

    Postagem.findOne({_id: req.body.id}).then((postagem) => {

        postagem.titulo = req.body.titulo,
        postagem.slug = req.body.slug,
        postagem.descrição = req.body.descrição
        postagem.conteudo = req.body.conteudo,
        postagem.categoria = req.body.categoria

        postagem.save().then(() => {
            req.flash('success_msg', 'Postagem editada com sucesso!')
            res.redirect('/admin/postagens')
        }).catch((error) => {
            req.flash('error_msg', 'Erro interno!')
            res.redirect('/admin/postagens')
        })

    }).catch((error) => {
        req.flash('error_msg', 'Houve um erro ao salvar a edição.')
        res.redirect('/admin/postagens')
    })

})

router.get('/postagens/deletar/:id', eAdmin, (req,res) => {
    Postagem.deleteOne({_id: req.params.id}).then(() => {
        req.flash('success_msg', 'Postagem deletada com sucesso!')
        res.redirect('/admin/postagens')
    }).catch((error) => {
        req.flash('error_msg', 'Houve um erro interno.')
        res.redirect('admin/postagens')
    })
})


router.post('/update-roles', (req, res) => {
  const roles = req.body.roles;

  const updates = Object.entries(roles).map(([id, value]) => {
    const isAdmin = value === '1';
    return Usuario.findByIdAndUpdate(id, { eAdmin: isAdmin });
  });

  Promise.all(updates)
    .then(() => {
      req.flash('success_msg', 'Permissões atualizadas com sucesso!');
      res.redirect('/admin');
    })
    .catch((error) => {
      console.error(error);
      req.flash('error_msg', 'Houve um erro interno ao salvar a alteração');
      res.redirect('/admin');
    });
});


module.exports = router
