const knex = require('knex')({
    client: 'mysql2',
    connection: {
      host: 'localhost',
      user: 'root',
      password: '200118',
      database: 'flipkart'
    }
  });
  
  async function getAllProducts() {
    try {
      return await knex('allproducts').select('*');
    } catch (error) {
      throw error;
    }
  }
  
  async function addProduct(title, price, description, image, category_id, subsubcategory_id) {
    try {
      console.log('Adding product:', { title, price, description, image, category_id, subsubcategory_id });
  
      const [result] = await knex('allproducts').insert({ title, price, description, image, category_id, subsubcategory_id });
  
      console.log('Product added successfully:', result);
  
      return result;
    } catch (error) {
      console.error('Error adding product:', error);
      throw error;
    }
  }
  
  
  async function getAllCategories() {
    try {
      return await knex('category').select('*');
    } catch (error) {
      throw error;
    }
  }
  
  async function addCategory(title, image) {
    try {
      const [result] = await knex('category').insert({ title, image: image });
      return result;
    } catch (error) {
      throw error;
    }
  }

  async function addRating(rate, count, allproducts_id) {
    try {
      const [result] = await pool.query('INSERT INTO rating (rate, count, allproducts_id) VALUES (?, ?, ?)', [rate, count, allproducts_id]);
      return result;
    } catch (error) {
      throw error;
    }
  }

  async function addSubCategory(title, category_id) {
    try {
      const [result] = await pool.query('INSERT INTO subcategory(title, category_id) VALUES (?,?)', [title, category_id]);
      return result;
    } catch (error) {
      throw error;
    }
  }
  
  module.exports = {
    getAllProducts,
    addProduct,
    getAllCategories,
    addCategory,
    addRating,
    addSubCategory
  };
  