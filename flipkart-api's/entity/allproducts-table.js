const mysql = require('mysql2');

// Function to create the category table
function createCategoryTable() {
    return new Promise((resolve, reject) => {
      const con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "200118",
        database: "flipkart"
      });
  
      con.connect(function(err) {
        if (err) reject(err);
        console.log("Connected to database for category table creation!");
        const sql = `CREATE TABLE category (
          id INT AUTO_INCREMENT PRIMARY KEY,
          title VARCHAR(255),
          image VARCHAR(255)
        )`;
        con.query(sql, function (err, result) {
          if (err) reject(err);
          console.log("category table created!");
          con.end();
          resolve();
        });
      });
    });
}

// Function to create the subcategory table
function createSubcategoryTable() {
  return new Promise((resolve, reject)=> {
    const con = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "200118",
      database: "flipkart"
    });
    con.connect(function(err){
      if(err) reject(err);
      console.log("Connected to database for subcategory table creation!");
      const sql = `CREATE TABLE subcategory (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255),
        category_id INT,
        FOREIGN KEY (category_id) REFERENCES category(id)
      )`;
      con.query(sql, function (err, result){
        if(err) reject(err);
        console.log("Subcategory table created!")
        con.end();
        resolve();
      })
    })
  })
}
// Function to create the subcategory table
function createSubsubcategoryTable(){
  return new Promise((resolve, reject)=>{
    const con = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "200118",
      database: "flipkart"
    });
    con.connect(function(err){
      if(err) reject(err);
      console.log("Connected to database for subsubcategory table creation!");
      const sql = `CREATE TABLE subsubcategory (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255),
        subcategory_id INT,
        FOREIGN KEY (subcategory_id) REFERENCES subcategory(id)
      )`;
      con.query(sql, function(err, result){
        if(err) reject(err);
        console.log("Subsubcategory table created!")
        con.end();
        resolve();
      })
    })
  })
}

// Function to create the allproducts table
function createAllProductsTable() {
  return new Promise((resolve, reject) => {
    const con = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "200118",
      database: "flipkart"
    });

    con.connect(function(err) {
      if (err) reject(err);
      console.log("Connected to database for allproducts table creation!");
      const sql = `CREATE TABLE allproducts (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255),
        price DECIMAL(10, 2),
        description VARCHAR(1000),
        image VARCHAR(255),
        subsubcategory_id INT,
        FOREIGN KEY (subsubcategory_id) REFERENCES subsubcategory(id)
      )`;
      con.query(sql, function (err, result) {
        if (err) reject(err);
        console.log("Allproducts table created!");
        con.end();
        resolve();
      });
    });
  });
}

// Function to create the rating table
function createRatingTable() {
  return new Promise((resolve, reject) => {
    const con = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "200118",
      database: "flipkart"
    });

    con.connect(function(err) {
      if (err) reject(err);
      console.log("Connected to database for rating table creation!");
      const sql = `CREATE TABLE rating (
        id INT AUTO_INCREMENT PRIMARY KEY,
        rate DECIMAL(10, 2),
        count INT,
        allproducts_id INT,
        FOREIGN KEY (allproducts_id) REFERENCES allproducts(id)
      )`;
      con.query(sql, function (err, result) {
        if (err) reject(err);
        console.log("Rating table created!");
        con.end();
        resolve();
      });
    });
  });
}

// Function to create the product_images table
function createProductImagesTable() {
  return new Promise((resolve, reject) => {
    const con = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "200118",
      database: "flipkart"
    });

    con.connect(function(err) {
      if (err) reject(err);
      console.log("Connected to database for product_images table creation!");
      const sql = `CREATE TABLE product_images (
        id INT AUTO_INCREMENT PRIMARY KEY,
        images VARCHAR(255),
        allproducts_id INT,
        FOREIGN KEY (allproducts_id) REFERENCES allproducts(id)
      )`;
      con.query(sql, function (err, result) {
        if (err) reject(err);
        console.log("Product_images table created!");
        con.end();
        resolve();
      });
    });
  });
}

// Run all scripts concurrently
Promise.all([createAllProductsTable(), createRatingTable(), createCategoryTable(), createSubcategoryTable(), createSubsubcategoryTable(), createProductImagesTable()])
  .then(() => {
    console.log("Tables created successfully!");
  })
  .catch((err) => {
    console.error("Error creating tables:", err);
  });
