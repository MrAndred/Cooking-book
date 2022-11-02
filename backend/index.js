const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const { json } = require('express');
const app = express()
app.use(json())

const GET_ALL_RECIPIES = `SELECT
r.id,
r.name,
rn.country_name
FROM recipes r
JOIN recipe_nationality rn on r.nationality_id = rn.id
WHERE r.active = true`

const GET_ALL_DISHES = `
    SELECT 
    d.id,
    d.name,
    dt.name as dish_type
    FROM dishes d 
    JOIN dish_type dt on d.dish_type_id = dt.id`

const GET_RECIPE_PRODUCTS = `
    SELECT
        p.name,
        rp.product_count
      FROM recipe_products rp
      LEFT JOIN products p on rp.product_id = p.id
    WHERE rp.recipe_id = ?`

const GET_RECIPE_HASHTAGS = `
SELECT
h.name
FROM recipe_hashtags rp
JOIN hashtag h on rp.hashtag_id = h.id
WHERE rp.recipe_id = ?
`
const GET_ADD_PRODUCTS = `SELECT
p.name,
1 AS product_count
FROM custom_ingredients ci
LEFT JOIN products p on ci.product_id = p.id
WHERE ci.dish_id = ?;`

const GET_NATIONALITY = `SELECT id, country_name FROM recipe_nationality`
const GET_HASHTAG = `SELECT id, name FROM hashtag;`
const GET_PRODUCTS = `SELECT p.id, name, type_name, info FROM products p JOIN product_types pt on pt.id = p.product_type_id;`
const GET_PRODUCT_TYPES = `SELECT id, type_name FROM product_types`
const GET_DISH_TYPES = `SELECT id, name FROM dish_type`

app.use(cors());
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "cooking",
  password: "root"
});

app.get('/all-recipes', async (req, res) => {
  try {
    connection.query(GET_ALL_RECIPIES, function (error, result, fields) {
      res.send(result)
    });
  }
  catch (error) {
    console.error(error);
  }
})

app.get('/all-dishes', async (req, res) => {
  try {
    connection.query(GET_ALL_DISHES, function (error, result, fields) {
      res.send(result)
    });
  }
  catch (error) {
    console.error(error);
  }
})

app.post('/dishes', async (req, res) => {
  const { dishType, name } = req.body;
  const id = Math.round(Math.random() * (1000000000));
  try {
    connection.query('INSERT INTO dishes VALUES (?, ?, ?)', [id, dishType, name], function (error, result, fields) {
      if (error) {
        console.log(error);
        res.send(error)
      }
      res.send(result)
    });
  }
  catch (error) {
    console.error(error);
  }
})

app.delete('/dishes/:id', async (req, res) => {
  const { id } = req.params;
  try {
    connection.query('DELETE FROM dishes WHERE id = ?', [id], function (error, result, fields) {
      if (error) {
        console.log(error);
        res.send(error)
      }
      res.send(result)
    });
  }
  catch (error) {
    console.error(error);
  }
})

app.get('/nationality', async (req, res) => {
  try {
    connection.query(GET_NATIONALITY, function (error, result, fields) {
      res.send(result)
    });
  }
  catch (error) {
    console.error(error);
  }
})

app.delete('/nationality/:id', async (req, res) => {
  const { id } = req.params;
  try {
    connection.query("DELETE FROM recipe_nationality WHERE id = ?", [id], function (error, result, fields) {
      if (error) {
        console.log(error);
        res.json({ message: 'This nationality exists in recipe' })
      }
      res.send(result)
    });
  }
  catch (error) {
    console.error(error);
  }
})

app.post('/nationality', async (req, res) => {
  const { country_name } = req.body;
  const id = Math.round(Math.random() * (1000000000));
  try {
    connection.query('INSERT INTO recipe_nationality VALUES (?, ?)', [id, country_name], function (error, result, fields) {
      if (error) {
        console.log(error);
        res.send(error)
      }
      res.send(result)
    });
  }
  catch (error) {
    console.error(error);
  }
})

app.get('/dish-type', async (req, res) => {
  try {
    connection.query(GET_DISH_TYPES, function (error, result, fields) {
      res.send(result)
    });
  }
  catch (error) {
    console.error(error);
  }
})

app.post('/dish-type', async (req, res) => {
  const { name } = req.body;
  const id = Math.round(Math.random() * (1000000000));
  try {
    connection.query('INSERT INTO dish_type VALUES (?, ?)', [id, name], function (error, result, fields) {
      if (error) {
        console.log(error);
        res.send(error)
      }
      res.send(result)
    });
  }
  catch (error) {
    console.error(error);
  }
})

app.delete('/dish-type/:id', async (req, res) => {
  const { id } = req.params;
  try {
    connection.query('DELETE FROM dish_type WHERE id = ?', [id], function (error, result, fields) {
      if (error) {
        console.log(error);
        res.send(error)
      }
      res.send(result)
    });
  }
  catch (error) {
    console.error(error);
  }
})


app.get('/product-type', async (req, res) => {
  try {
    connection.query(GET_PRODUCT_TYPES, function (error, result, fields) {
      res.send(result)
    });
  }
  catch (error) {
    console.error(error);
  }
})

app.get('/products', async (req, res) => {
  try {
    connection.query(GET_PRODUCTS, function (error, result, fields) {
      res.send(result)
    });
  }
  catch (error) {
    console.error(error);
  }
})

app.post('/products', async (req, res) => {
  try {
    const { name, productType, info } = req.body;
    const id = Math.round(Math.random() * (1000000000));

    connection.query('INSERT INTO products VALUES (?, ?, ?, ?)', [id, productType, name, info], function (error, result, fields) {
      if (error) {
        console.log(error);
        res.send(error)
      }
      res.send(result)
    });
  }
  catch (error) {
    console.error(error);
  }
})

app.delete('/products/:id', async (req, res) => {
  try {
    const { id } = req.params;

    connection.query('DELETE FROM products WHERE id = ?', [id], function (error, result, fields) {
      if (error) {
        console.log(error);
        res.send(error)
      }
      res.send(result)
    });
  }
  catch (error) {
    console.error(error);
  }
})

app.post('/product-types', async (req, res) => {
  try {
    const { type_name } = req.body;
    const id = Math.round(Math.random() * (1000000000));

    connection.query('INSERT INTO product_types VALUES (?, ?)', [id, type_name], function (error, result, fields) {
      if (error) {
        console.log(error);
        res.send(error)
      }
      res.send(result)
    });
  }
  catch (error) {
    console.error(error);
  }
})

app.delete('/delete-product-type/:id', async (req, res) => {
  try {
    const { id } = req.params;

    connection.query('DELETE FROM product_types WHERE id = ?', [id], function (error, result, fields) {
      if (error) {
        console.log(error);
        res.json({ message: 'This product type exists in products' })
      }
      res.send(result)
    });
  }
  catch (error) {
    console.error(error);
  }
})

app.get('/hashtags', async (req, res) => {
  try {
    connection.query(GET_HASHTAG, function (error, result, fields) {
      res.send(result)
    });
  }
  catch (error) {
    console.error(error);
  }
})

app.delete('/hashtag/:id', async (req, res) => {
  const { id } = req.params;
  try {
    connection.query("DELETE FROM hashtag WHERE id = ?", [id], function (error, result, fields) {
      if (error) {
        console.log(error);
        res.json({ message: 'This hashtag exists in recipe' })
      }
      res.send(result)
    });
  }
  catch (error) {
    console.error(error);
  }
})

app.post('/hashtag', async (req, res) => {
  try {
    const { hashtag } = req.body;
    const id = Math.round(Math.random() * (1000000000));

    connection.query("INSERT INTO hashtag VALUES (?, ?)", [id, hashtag], function (error, result, fields) {
      res.send(result)
    });
  }
  catch (error) {
    console.error(error);
  }
})

app.get('/recipe-products/:recipe', async (req, res) => {
  try {
    const { recipe } = req.params;
    connection.query(GET_RECIPE_PRODUCTS, [recipe], function (error, result, fields) {
      res.send(result)
    });
  }
  catch (error) {
    console.error(error);
  }
})

app.get('/recipe-hashtags/:recipe', async (req, res) => {
  try {
    const { recipe } = req.params;
    connection.query(GET_RECIPE_HASHTAGS, [recipe], function (error, result, fields) {
      res.send(result)
    });
  }
  catch (error) {
    console.error(error);
  }
})

app.delete('/delete-recipe/:id', (req, res) => {
  const { id } = req.params;
  try {
    connection.query('DELETE FROM recipes WHERE id = ?', [id], function (error, result, fields) {
      if (error) {
        console.log(error);
        res.send(error)
      }
      res.send(result)
    });
  }
  catch (error) {
    console.error(error);
  }
})
app.post('/add-recipe', async (req, res) => {
  try {
    const { hashtags, products, formData } = req.body;
    const { name, dish, nationality } = formData;

    const id = Math.round(Math.random() * (1000000000));

    connection.query("INSERT INTO recipes VALUES (?, ?, ?, ?, ?)", [id, nationality, dish, name, true], function (error, result, fields) {
      if (error) {
        console.log(error);
      }
    });

    const hashKeys = Object.keys(hashtags);
    hashKeys.forEach(async (element) => {
      const idHash = Math.round(Math.random() * (1000000000));
      connection.query("INSERT INTO recipe_hashtags VALUES (?, ?, ?)", [idHash, id, parseInt(element)])
    })

    const prodKeys = Object.keys(products);
    prodKeys.forEach(async element => {
      const idProd = Math.round(Math.random() * (1000000000));
      connection.query("INSERT INTO recipe_products VALUES (?, ?, ?, ?)", [idProd, id, parseInt(element), "one"])
    })

    res.sendStatus(200)
  }
  catch (error) {
    console.error(error);
  }
})

app.listen(5005, () => {
  console.log('Server is listening on 5005');
})