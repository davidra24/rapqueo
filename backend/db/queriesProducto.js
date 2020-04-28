require('dotenv/config');

const Productos = require('../models/Productos');
const Promos = require('../models/Promociones');

getAllProducts = (req, res) => {
  Productos.find().then((data) => {
    res.send(data);
  });
};

getAllProductsWithoutPromo = async (req, res) => {
  await Promos.find()
    .then(async (promos) => {
      await Productos.find().then(async (productos) => {
        let arr = [];
        for (let i = 0; i < productos.length; i++) {
          let existe = false;
          for (let j = 0; j < promos.length; j++) {
            const str1 = promos[j].producto._id.toString();
            const str2 = productos[i]._id.toString();
            if (str1.trim() === str2.trim()) {
              existe = true;
            }
          }
          if (!existe) {
            arr.push(productos[i]);
          }
        }
        res.send(arr);
      });
    })
    .catch((err) => {
      console.log(err);

      res.send({ code: 500, msg: 'Error al consultar promociones' });
    });
};

getProductWithoutCategorie = (req, res) => {
  Productos.find({ idCategoria: null }).then((data) => {
    res.send(data);
  });
};

getOneProduct = (req, res) => {
  const id = req.params.id;
  Productos.findById(id).then((data) => {
    res.send(data);
  });
};

getProductsByCategorie = (req, res) => {
  const id = req.params.id;
  Productos.find({ idCategoria: id }).then((data) => {
    res.send(data);
  });
};

postProduct = (req, res) => {
  Productos.create(req.body).then((data) => {
    res.send(data);
  });
};

pullProduct = (req, res) => {
  Productos.findByIdAndUpdate(req.params.id, req.body)
    .then((data) => {
      res.send({ code: 200, data, msg: 'Ok' });
    })
    .catch((err) => {
      res.send({ code: 500, msg: err });
    });
};

deleteProduct = (req, res) => {
  Productos.findByIdAndRemove(req.params.id).then((data) => {
    Promos.find().then(async (response) => {
      response.forEach(async (element) => {
        if (element.producto._id) {
          await Promos.findByIdAndRemove(element._id);
        }
      });
      res.send(data);
    });
  });
};

module.exports = {
  getAllProducts,
  getOneProduct,
  getProductsByCategorie,
  getProductWithoutCategorie,
  getAllProductsWithoutPromo,
  postProduct,
  pullProduct,
  deleteProduct,
};
