const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'animals_playground',
  password: 'postgres',
  port: 5432,
});

const getCategories = async (request, response) => {
  const result = await pool.query('SELECT DISTINCT cat.* FROM animal_categories as cat INNER JOIN animal_photos as photos ON cat.id = photos.category_id ORDER BY category ASC');
  
  let resp = {};
  if ( result.rows && result.rows.length > 0 ) {
    resp.message = 'Success: List of all Animal(s)'; 
    resp.count = result.rows.length; 
    resp.data = result.rows; 
  } 
  else resp.message = 'Empty: List of Animals!!!';
  
  response.status(200).send(resp)
}

const createCategory = async (request, response) => {
  const { category } = request.body;
  const result = await pool.query('INSERT INTO animal_categories (category) VALUES ($1)  RETURNING *', [category]);
  
  let resp = {};
  if ( result.rows && result.rows[0] ) {
    resp.message = 'Success: Category info added'; 
    resp.id = result.rows[0].id; 
  } 
  else resp.message = 'Failure: Unable to create Category info!!!';

  response.status(201).send(resp)
}

const updateCategory = async (request, response) => {
  const id = parseInt(request.params.id)
  const { category } = request.body;
  
  const result = await pool.query( 'UPDATE animal_categories SET category = $1 WHERE id = $2  RETURNING *', [category, id]);
  
  let resp = {};
  if ( result.rows && result.rows[0] ) {
    resp.message = 'Success: Category info updated'; 
    resp.data = result.rows[0]; 
  } 
  else resp.message = 'Failure: Unable to update Category info!!!';  

  response.status(201).send(resp)
}

const deleteCategory = async (request, response) => {
  const id = parseInt(request.params.id);
  const result = await pool.query('DELETE FROM animal_categories WHERE id = $1 RETURNING *', [id]);

  let resp = {};
  if ( result.rows && result.rows[0] ) {
    resp.message = 'Success: Category info deleted'; 
    resp.data = result.rows[0]; 
  } 
  else resp.message = 'Failure: Unable to find Category info for deletion!!!';  

  response.status(200).send(resp)
}

module.exports = {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory  
}