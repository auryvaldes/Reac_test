var express = require('express');
var axios = require('axios');
const {
  json
} = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', async function (req, resp, next) {
  try {
    console.log(req.query.query);
    const res = await axios.get(`https://api.mercadolibre.com/sites/MLA/search?q=${req.query.query}`);
    if (!res) {
      console.error(`Ha ocurrido un error en la llamada`);
    }
    const response = {
      author: {
        name: 'Aury',
        lastname: 'Valdes'
      },
      categories: [],
      items: []
    };
    if (res.data && res.data.available_filters) {
      const categories = res.data.available_filters.find(f => f.id === 'category');
      if (categories && categories.values) response.categories = categories.values.map(c => c.name);
    }
    if (res.data && res.data.results) {
      let items = res.data.results.map(r => {
        return {
          id: r.id,
          title: r.title,
          price: {
            currency: r.currency_id,
            amount: r.price,
            decimals: 0
          },
          picture: r.thumbnail,
          condition: r.condition,
          free_shipping: r.shipping.free_shipping
        }
      });
      response.items = items;
    }
    resp.status(200).json(response)

  } catch (err) {
    console.error("Error en meli", err);
  }

});

router.get('/:id', async function (req, res, next) {
  try {
    console.log(req.params.id);
    let url = `http://api.mercadolibre.com/items/${req.params.id}`;
    const [item, description] = await Promise.all([
      axios.get(url),
      axios.get(`${url}/description`)
    ]);
    let response = {};
    if (item && item.data) {
      console.log(item);
      response = {
        id: item.data.id,
        title: item.data.title,
        price: {
          currency: item.data.currency_id,
          amount: item.data.price,
          decimals: 0
        },
        picture: item.data.thumbnail,
        condition: item.data.condition,
        free_shipping: item.data.shipping.free_shipping,
        sold_quantity: item.data.sold_quantity
      }
    }
    if (description && description.data) {
      console.log(description);
      response = {
        ...response,
        description: description.data.plain_text
      };
    }
    res.status(200).json(response);
  } catch (err) {
    console.error("Error en meli", err);
  }

});

module.exports = router;