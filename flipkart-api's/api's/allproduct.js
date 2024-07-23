const express = require('express');
const mysql = require('mysql2/promise');
const multer = require('multer');
const cors = require('cors');
const fs = require('fs');
const path = require('path');


const app = express();
const PORT = 3004;

app.use(express.json());
app.use(cors());

// MySQL connection pool configuration
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '200118',
  database: 'flipkart',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'D:/backup/OneDrive/Desktop/newflipkart');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage });


app.get('/products', async (req, res) => {
  try {
    const sql = `
      SELECT p.*, r.rate, r.count 
      FROM allproducts p
      LEFT JOIN rating r ON p.id = r.allproducts_id
    `;
    const [rows] = await pool.query(sql);

    const productsWithRating = rows.map(row => {

      const imagePath = path.join(row.image);

      const imageBase64 = fs.readFileSync(imagePath, 'base64');

      return {
        id: row.id,
        title: row.title,
        price: row.price,
        description: row.description,
        category: row.category,
        image: `data:image/jpeg;base64,${imageBase64}`,
        rating: {
          rate: row.rate,
          count: row.count
        }
      };
    });

    res.json(productsWithRating);
  } catch (error) {
    console.error('Error retrieving products:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/products/:id', async (req, res) => {
  try {
    const productId = req.params.id;
    const productSql = `
      SELECT p.*, r.rate, r.count 
      FROM allproducts p
      LEFT JOIN rating r ON p.id = r.allproducts_id
      WHERE p.id = ?
    `;
    const [productRows] = await pool.query(productSql, [productId]);

    if (productRows.length === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }
    const product = productRows[0];
    const imageSql = 'SELECT images FROM product_images WHERE allproducts_id = ?';
    const [imageRows] = await pool.query(imageSql, [productId]);

    const imagePath = path.join(product.image);
    const imageBase64 = fs.readFileSync(imagePath, 'base64');

    const additionalImages = imageRows.map(row => {
      const imagePath = path.join(row.images);
      const imageBase64 = fs.readFileSync(imagePath, 'base64');
      return `data:image/jpeg;base64,${imageBase64}`;
    });

    const productWithDetails = {
      id: product.id,
      title: product.title,
      price: product.price,
      description: product.description,
      category: product.category,
      image: `data:image/jpeg;base64,${imageBase64}`,
      additionalImages: additionalImages,
      rating: {
        rate: product.rate,
        count: product.count
      }
    };

    res.json(productWithDetails);
  } catch (error) {
    console.error('Error retrieving product:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// PUT endpoint to update a product
app.put('/products/:id', upload.single('image'), async (req, res) => {
  try {
    const productId = req.params.id;
    const { title, price, description, subsubcategory_id } = req.body;
    let image = '';

    if (req.file) {
      image = req.file.path;
    }
    let query;
    let queryParams;

    if (image !== '') {
      query = 'UPDATE allproducts SET title = ?, price = ?, description = ?, image = ?, subsubcategory_id = ? WHERE id = ?';
      queryParams = [title, price, description, image, subsubcategory_id, productId];
    } else {
      query = 'UPDATE allproducts SET title = ?, price = ?, description = ?, subsubcategory_id = ? WHERE id = ?';
      queryParams = [title, price, description, subsubcategory_id, productId];
    }

    await pool.query(query, queryParams);

    const [updatedProduct] = await pool.query('SELECT * FROM allproducts WHERE id = ?', [productId]);

    res.json(updatedProduct);
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/products', upload.single('image'), async (req, res) => {
  try {
    const { title, price, description, subsubcategory_id } = req.body; 
    const image = req.file.path;
    const [result] = await pool.query('INSERT INTO allproducts (title, price, description, image, subsubcategory_id) VALUES (?, ?, ?, ?, ?)', [title, price, description, image, subsubcategory_id]);
    console.log(title);
    const [addedProduct] = await pool.query('SELECT * FROM allproducts WHERE id = ?', [result.insertId]);

    res.json(addedProduct);
  } catch (error) {
    console.error('Error adding product:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/product_images', upload.array('images', 5), async (req, res) => {
  try {
    const productId = req.body.productId;
    if (!productId) {
      return res.status(400).json({ error: 'Product ID is required' });
    }

    console.log('Received productId:', productId);
    const images = req.files.map(file => file.path);

    const insertImagePromises = images.map(async (image) => {
      console.log('Inserting image:', image, 'for productId:', productId);
      await pool.query('INSERT INTO product_images (images, allproducts_id) VALUES (?, ?)', [image, productId]);
    });

    await Promise.all(insertImagePromises);

    res.json({ message: 'Images uploaded successfully' });
  } catch (error) {
    console.error('Error uploading images:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
app.put('/product_images/:id', async (req, res) => {
  const imageId = req.params.id;
  const { productId } = req.body;

  try {
    if (!productId) {
      return res.status(400).json({ error: 'Product ID is required' });
    }

    // Check if the image with given ID exists
    const [existingImage] = await pool.query('SELECT * FROM product_images WHERE id = ?', [imageId]);
    if (!existingImage) {
      return res.status(404).json({ error: 'Image not found' });
    }

    // Update the image record
    await pool.query('UPDATE product_images SET allproducts_id = ? WHERE id = ?', [productId, imageId]);

    res.json({ message: 'Image updated successfully' });
  } catch (error) {
    console.error('Error updating image:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


app.get('/product_images', async (req, res) => {
  try {
    const [images] = await pool.query('SELECT * FROM product_images');
    // console.log('Images from database:', images);
    res.json(images);
  } catch (error) {
    console.error('Error retrieving images:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
app.get('/product_images/:id', async (req, res) => {
  const imageId = req.params.id;

  try {
    const [image] = await pool.query('SELECT * FROM product_images WHERE id = ?', [imageId]);
    
    if (!image) {
      return res.status(404).json({ error: 'Image not found' });
    }

    res.json(image);
  } catch (error) {
    console.error('Error retrieving image:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


app.delete('/product_images/:id', async (req, res) => {
  const imageId = req.params.id;

  try {
    // Check if the image with given ID exists
    const [existingImage] = await pool.query('SELECT * FROM product_images WHERE id = ?', [imageId]);
    if (!existingImage) {
      return res.status(404).json({ error: 'Image not found' });
    }

    // Delete the image record
    await pool.query('DELETE FROM product_images WHERE id = ?', [imageId]);

    res.json({ message: 'Image deleted successfully' });
  } catch (error) {
    console.error('Error deleting image:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.delete('/products/:id', async (req, res) => {
  try {
    const productId = req.params.id;

    if (!productId) {
      return res.status(400).json({ error: 'Product ID is missing or invalid' });
    }

    await pool.query('DELETE FROM allproducts WHERE id = ?', [productId]);

    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/categories', upload.single('image'), async (req, res) => {
  try {
    const { title } = req.body;
    const image = req.file.path;

    console.log("Received title:", title);
    console.log("Received image:", image);

    const [result] = await pool.query('INSERT INTO category (title, image) VALUES (?, ?)', [title, image]);
    console.log("Insert result:", result);

    const [insertedData] = await pool.query('SELECT * FROM category WHERE id = ?', [result.insertId]);
    console.log("Inserted data:", insertedData);

    res.json({
      id: insertedData[0].id,
      title: insertedData[0].title,
      image: insertedData[0].image
    });
  } catch (error) {
    console.error('Error adding category:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/categories', async (req, res) => {
  try {
    const [categories] = await pool.query('SELECT * FROM category');

    for (let category of categories) {
      const [subcategories] = await pool.query('SELECT * FROM subcategory WHERE category_id = ?', [category.id]);
      category.subcategories = subcategories.map(subcategory => ({
        id: subcategory.id,
        title: subcategory.title,
        products: []
      }));

      for (let subcategory of category.subcategories) {
        const [subsubcategories] = await pool.query('SELECT * FROM subsubcategory WHERE subcategory_id = ?', [subcategory.id]);
        subcategory.subsubcategories = subsubcategories.map(subsubcategory => ({
          id: subsubcategory.id,
          title: subsubcategory.title,
          products: [] 
        }));

        // Fetch products for each subsubcategory and push them into the products array
        for (let subsubcategory of subcategory.subsubcategories) {
          const [products] = await pool.query('SELECT * FROM allproducts WHERE subsubcategory_id = ?', [subsubcategory.id]);
          // Convert product images to Base64
          const productsWithBase64Images = await Promise.all(products.map(async (product) => {
            try {
              const imagePath = path.join(product.image);
              const imageBuffer = fs.readFileSync(imagePath);
              const imageBase64 = imageBuffer.toString('base64');
              return {
                ...product,
                image: `data:image/jpeg;base64,${imageBase64}`
              };
            } catch (err) {
              console.error(`Error reading image for product ${product.id}:`, err);
              return product;
            }
          }));
          subsubcategory.products = productsWithBase64Images;
        }
      }
      // Fetch products for each subcategory and push them into the products array
      for (let subcategory of category.subcategories) {
        for (let subsubcategory of subcategory.subsubcategories) {
          subcategory.products.push(...subsubcategory.products);
        }
      }
      const imagePath = category.image;
      const imageBuffer = fs.readFileSync(imagePath);
      const base64Image = imageBuffer.toString('base64');
      category.image = `data:image/jpeg;base64,${base64Image}`;
    }
    res.json(categories);
  } catch (error) {
    console.error('Error retrieving categories:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/categories/:id', async (req, res) => {
  try {
    const categoryId = req.params.id;

    const [categoryRows] = await pool.query('SELECT * FROM category WHERE id = ?', [categoryId]);

    if (categoryRows.length === 0) {
      return res.status(404).json({ error: 'Category not found' });
    }

    const imagePath = categoryRows[0].image;
    const imageBuffer = fs.readFileSync(imagePath);
    const base64Image = imageBuffer.toString('base64');

    const categoryWithImage = {
      id: categoryRows[0].id,
      title: categoryRows[0].title,
      image: `data:image/jpeg;base64,${base64Image}`,
      subcategories: []
    };

    const [subcategoryRows] = await pool.query('SELECT * FROM subcategory WHERE category_id = ?', [categoryId]);

    if (subcategoryRows.length > 0) {
      categoryWithImage.subcategories = subcategoryRows.map(subcategory => ({
        id: subcategory.id,
        title: subcategory.title,
        products: []
      }));

      for (let subcategory of categoryWithImage.subcategories) {
        const [subsubcategoryRows] = await pool.query('SELECT * FROM subsubcategory WHERE subcategory_id = ?', [subcategory.id]);
        subcategory.subsubcategories = subsubcategoryRows.map(subsubcategory => ({
          id: subsubcategory.id,
          title: subsubcategory.title,
          products: [] 
        }));

        for (let subsubcategory of subcategory.subsubcategories) {
          const [products] = await pool.query('SELECT * FROM allproducts WHERE subsubcategory_id = ?', [subsubcategory.id]);

          const productsWithBase64Images = await Promise.all(products.map(async (product) => {
            try {
              const imagePath = path.join(product.image);
              const imageBuffer = fs.readFileSync(imagePath);
              const imageBase64 = imageBuffer.toString('base64');
              return {
                ...product,
                image: `data:image/jpeg;base64,${imageBase64}`
              };
            } catch (err) {
              console.error(`Error reading image for product ${product.id}:`, err);
              return product;
            }
          }));
          subsubcategory.products = productsWithBase64Images;
        }
        for (let subsubcategory of subcategory.subsubcategories) {
          subcategory.products.push(...subsubcategory.products);
        }
      }
    }
    res.json(categoryWithImage);
  } catch (error) {
    console.error('Error retrieving category:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.put('/categories/:id', upload.single('image'), async (req, res) => {
  try {
    const categoryId = req.params.id;
    const { title } = req.body;
    let image = null;

    if (req.file) {
      image = req.file.path;
    }

    let sql = 'UPDATE category SET title = ?';
    const params = [title];

    if (image) {
      sql += ', image = ?';
      params.push(image);
    }

    sql += 'WHERE id = ?';

    await pool.query(sql, [...params, categoryId]);

    const [updateCategory] = await pool.query('SELECT * FROM category WHERE id = ?', [categoryId]);

    res.json(updateCategory);
  } catch (error) {
    console.error('Error updating category:', error);
    res.status(500).json({ error: 'Internal server error' })
  }
})

app.delete('/categories/:id', async (req, res) => {
  try {
    const categoryId = req.params.id;

    if (!categoryId) {
      return res.status(400).json({ error: 'Category ID is missing or invalid' });
    }

    await pool.query('DELETE FROM category WHERE id = ?', [categoryId]);

    res.json({ message: 'Category deleted successfully' });
  } catch (error) {
    console.error('Error deleting category:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/ratings', async (req, res) => {
  try {
    const { rate, count, allproducts_id } = req.body;

    const [result] = await pool.query('INSERT INTO rating (rate, count, allproducts_id) VALUES (?, ?, ?)', [rate, count, allproducts_id]);

    const [insertedRating] = await pool.query('SELECT * FROM rating WHERE id = ?', [result.insertId]);

    res.json(insertedRating);
  } catch (error) {
    console.error('Error adding rating:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.delete('/ratings/:id', async (req, res) => {
  try {
    const ratingId = req.params.id;
    if (!ratingId) {
      return res.status(400).json({ error: 'Rating ID is missing or invalid' });
    }
    await pool.query('Delete FROM rating WHERE id = ?', [ratingId]);
    res.json({ message: 'Rating deleted successfully' });
  } catch (error) {
    console.error('Error deleting rating:', error);
    res.status(500).json({ error: 'Internal server error' })
  }
});

app.put('/ratings/:id', async (req, res) => {
  try {
    const ratingId = req.params.id;
    const { rate, count, allproducts_id } = req.body;

    await pool.query('UPDATE rating SET rate = ?, count = ?, allproducts_id = ? WHERE id = ?', [rate, count, allproducts_id, ratingId]);

    const [updatedRating] = await pool.query('SELECT * FROM rating WHERE id = ?', [ratingId]);

    res.json(updatedRating);
  } catch (error) {
    console.error('Error updating rating:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/ratings', async (req, res) => {
  try {

    const productId = req.query.productId;

    let sql = 'SELECT * FROM rating';
    const params = [];

    if (productId) {
      sql += ' WHERE allproducts_id = ?';
      params.push(productId);
    }

    const [rows] = await pool.query(sql, params);

    res.json(rows);
  } catch (error) {
    console.error('Error retrieving ratings:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// New route to get ratings based on URL parameters
app.get('/ratings/:id', async (req, res) => {
  try {
    const productId = req.params.id;

    const sql = 'SELECT * FROM rating WHERE allproducts_id = ?';
    const params = [productId];

    console.log('SQL Query:', sql);
    console.log('Params:', params);

    const [rows] = await pool.query(sql, params);

    console.log('Query Result:', rows);

    res.json(rows);
  } catch (error) {
    console.error('Error retrieving ratings:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


app.get('/categories/:categoryId/subcategories', async (req, res) => {
  try {
    const categoryId = req.params.categoryId;
    const [rows] = await pool.query('SELECT * FROM subcategory WHERE category_id = ?', [categoryId]);

    const subcategories = rows.map(subcategory => ({
      id: subcategory.id,
      title: subcategory.title,
    }));

    res.json(subcategories);
  } catch (error) {
    console.error('Error retrieving subcategories:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/subcategories', async (req, res) => {
  try {
    const [subcategories] = await pool.query('SELECT * FROM subcategory');
    
    for (let subcategory of subcategories) {
      const [subsubcategories] = await pool.query('SELECT * FROM subsubcategory WHERE subcategory_id = ?', [subcategory.id]);
      
      for (let subsubcategory of subsubcategories) {
        const [products] = await pool.query('SELECT * FROM allproducts WHERE subsubcategory_id = ?', [subsubcategory.id]);

        const productsWithBase64Images = await Promise.all(products.map(async (product) => {
          try {
            const imagePath = path.join(product.image);
            const imageBuffer = fs.readFileSync(imagePath);
            const imageBase64 = imageBuffer.toString('base64');
            return {
              ...product,
              image: `data:image/jpeg;base64,${imageBase64}`
            };
          } catch (err) {
            console.error(`Error reading image for product ${product.id}:`, err);
            return product;
          }
        }));
        subsubcategory.products = productsWithBase64Images;
      }
      subcategory.subsubcategories = subsubcategories;
    }
    res.json(subcategories);
  } catch (error) {
    console.error('Error retrieving subcategories:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/subcategories/:id', async (req, res) => {
  try {
    const subcategoryId = req.params.id;
    const [subcategoryRows] = await pool.query('SELECT * FROM subcategory WHERE id = ?', [subcategoryId]);

    if (subcategoryRows.length === 0) {
      return res.status(404).json({ error: 'Subcategory not found' });
    }
    const subcategory = {
      id: subcategoryRows[0].id,
      title: subcategoryRows[0].title,
      subsubcategories: []
    };

    const [subsubcategoryRows] = await pool.query('SELECT * FROM subsubcategory WHERE subcategory_id = ?', [subcategoryId]);

    if (subsubcategoryRows.length > 0) {
      // For each subsubcategory, retrieve the products
      for (let subsubcategory of subsubcategoryRows) {
        const [products] = await pool.query('SELECT * FROM allproducts WHERE subsubcategory_id = ?', [subsubcategory.id]);

        // Convert product images to Base64
        const productsWithBase64Images = await Promise.all(products.map(async (product) => {
          try {
            const imagePath = path.join(product.image);
            const imageBuffer = fs.readFileSync(imagePath);
            const imageBase64 = imageBuffer.toString('base64');
            return {
              ...product,
              image: `data:image/jpeg;base64,${imageBase64}`
            };
          } catch (err) {
            console.error(`Error reading image for product ${product.id}:`, err);
            return product;
          }
        }));

        subsubcategory.products = productsWithBase64Images;
      }

      subcategory.subsubcategories = subsubcategoryRows.map(subsubcategory => ({
        id: subsubcategory.id,
        title: subsubcategory.title,
        products: subsubcategory.products
      }));
    }

    res.json(subcategory);
  } catch (error) {
    console.error('Error retrieving subcategory:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/subcategories', async (req, res) => {
  try {
    const { title, category_id } = req.body;

    const [result] = await pool.query('INSERT INTO subcategory (title, category_id) VALUES (?, ?)', [title, category_id]);
    console.log(title);

    const [subcategory] = await pool.query('SELECT * FROM subcategory WHERE id = ?', [result.insertId]);

    res.json(subcategory);
  } catch (error) {
    console.error('Error adding subCategory:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.put('/subcategories/:id', async (req, res) => {
  try {
    const subcategoryId = req.params.id;
    const { title, category_id } = req.body;
    await pool.query('UPDATE subcategory SET title = ?, category_id = ? WHERE id = ?', [title, category_id, subcategoryId]);

    const [updatedSubcategory] = await pool.query('SELECT * FROM subcategory WHERE id = ?', [subcategoryId]);
    res.json(updatedSubcategory);
  } catch (error) {
    console.error('Error updating subcategory:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


app.delete('/subcategories/:id', async (req, res) => {
  try {
    const subcategoryId = req.params.id;
    await pool.query('DELETE FROM subcategory WHERE id = ?', [subcategoryId]);
    res.json({ message: 'Subcategory deleted successfully' });
  } catch (error) {
    console.error('Error deleting subcategory:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/subsubcategories', async (req, res) => {
  try {
    const [subsubcategories] = await pool.query('SELECT * FROM subsubcategory');

    // For each subsubcategory, retrieve the products
    for (let subsubcategory of subsubcategories) {
      const sql = `
        SELECT p.*, r.rate, r.count 
        FROM allproducts p
        LEFT JOIN rating r ON p.id = r.allproducts_id
        WHERE p.subsubcategory_id = ?
      `;
      const [products] = await pool.query(sql, [subsubcategory.id]);

      const productsWithBase64ImagesAndRatings = await Promise.all(products.map(async (product) => {
        try {
          const imagePath = path.join(product.image);
          const imageBase64 = fs.readFileSync(imagePath, 'base64');

          const { rate, count, ...productWithoutRating } = product;
          const rating = (rate !== null && count !== null) ? { rate, count } : null; // Include rating if not null

          return {
            ...productWithoutRating,
            image: `data:image/jpeg;base64,${imageBase64}`,
            rating: rating
          };
        } catch (err) {
          console.error(`Error reading image for product ${product.id}:`, err);
          return product;
        }
      }));

      subsubcategory.products = productsWithBase64ImagesAndRatings.map(product => ({
        ...product,
        subsubcategory_id: undefined // Remove subsubcategory_id from products
      }));
    }

    res.json(subsubcategories);
  } catch (error) {
    console.error('Error retrieving subsubcategories:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/subsubcategories/:id', async (req, res) => {
  try {
    const subsubcategoryId = req.params.id;
    const [subsubcategoryRows] = await pool.query('SELECT * FROM subsubcategory WHERE id = ?', [subsubcategoryId]);

    if (subsubcategoryRows.length === 0) {
      return res.status(404).json({ error: 'Subsubcategory not found' });
    }

    const subsubcategory = {
      id: subsubcategoryRows[0].id,
      title: subsubcategoryRows[0].title,
      subcategory_id: subsubcategoryRows[0].subcategory_id,
      products: []
    };
    // Retrieve the products for the subsubcategory, including their ratings
    const sql = `
      SELECT p.id, p.title, p.price, p.description, p.image, r.rate, r.count
      FROM allproducts p
      LEFT JOIN rating r ON p.id = r.allproducts_id
      WHERE p.subsubcategory_id = ?
    `;
    const [products] = await pool.query(sql, [subsubcategoryId]);

    // Convert product images to Base64 and include additional images and ratings
    const productsWithDetails = await Promise.all(products.map(async (product) => {
      try {
        // Read and encode the main product image
        const imagePath = path.join(product.image);
        const imageBase64 = fs.readFileSync(imagePath, 'base64');

        // Query to get the additional images for the product
        const imageSql = 'SELECT images FROM product_images WHERE allproducts_id = ?';
        const [imageRows] = await pool.query(imageSql, [product.id]);

        // Read and encode additional product images
        const additionalImages = imageRows.map(row => {
          const additionalImagePath = path.join(row.images);
          const additionalImageBase64 = fs.readFileSync(additionalImagePath, 'base64');
          return `data:image/jpeg;base64,${additionalImageBase64}`;
        });

        return {
          id: product.id,
          title: product.title,
          price: product.price,
          description: product.description,
          image: `data:image/jpeg;base64,${imageBase64}`,
          additionalImages: additionalImages,
          rating: product.rate !== null && product.count !== null ? { rate: product.rate, count: product.count } : null
        };
      } catch (err) {
        console.error(`Error reading image for product ${product.id}:`, err);
        return {
          id: product.id,
          title: product.title,
          price: product.price,
          description: product.description,
          image: product.image,
          additionalImages: [],
          rating: product.rate !== null && product.count !== null ? { rate: product.rate, count: product.count } : null
        };
      }
    }));

    subsubcategory.products = productsWithDetails;

    res.json(subsubcategory);
  } catch (error) {
    console.error('Error retrieving subsubcategory:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/subcategories/:id/subsubcategories', async (req, res) => {
  try {
    const { title } = req.body;
    const subcategoryId = req.params.id;

    const [result] = await pool.query('INSERT INTO subsubcategory (title, subcategory_id) VALUES (?, ?)', [title, subcategoryId]);

    const [subsubcategory] = await pool.query('SELECT * FROM subsubcategory WHERE id = ?', [result.insertId]);

    res.json(subsubcategory);
  } catch (error) {
    console.error('Error adding subsubcategory:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.put('/subsubcategories/:id', async (req, res) => {
  try {
    const subsubcategoryId = req.params.id;
    const { title } = req.body;

    await pool.query('UPDATE subsubcategory SET title = ? WHERE id = ?', [title, subsubcategoryId]);

    const [updatedSubsubcategory] = await pool.query('SELECT * FROM subsubcategory WHERE id = ?', [subsubcategoryId]);
    res.json(updatedSubsubcategory);
  } catch (error) {
    console.error('Error updating subsubcategory:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.delete('/subsubcategories/:id', async (req, res) => {
  try {
    const subsubcategoryId = req.params.id;

    await pool.query('DELETE FROM subsubcategory WHERE id = ?', [subsubcategoryId]);

    res.json({ message: 'Subsubcategory deleted successfully' });
  } catch (error) {
    console.error('Error deleting subsubcategory:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});