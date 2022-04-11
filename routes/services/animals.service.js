const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'animals_playground',
  password: 'postgres',
  port: 5432,
});

const getAnimals = async (request, response) => {
  const result = await pool.query('SELECT * FROM animal_photos ORDER BY id ASC');
  
  let resp = {};
  if ( result.rows && result.rows.length > 0 ) {
    resp.message = 'Success: List of all Animal(s)'; 
    resp.count = result.rows.length; 
    resp.data = result.rows; 
  } 
  else resp.message = 'Empty: List of Animals!!!';
  
  response.status(200).send(resp)
}

const getAnimalById = async (request, response) => {
  const id = parseInt(request.params.id);
  const result = await pool.query('SELECT * FROM animal_photos WHERE id = $1', [id]);

  let resp = {};
  if ( result.rows && result.rows[0] ) {
    resp.message = 'Success: Animal info found'; 
    resp.data = result.rows[0]; 
  } 
  else resp.message = 'Failure: Unable to update Animal info!!!';
  
  response.status(201).send(resp)
}

const createAnimal = async (request, response) => {
  const { category_id, photo_url } = request.body;  
  const result = await pool.query('INSERT INTO animal_photos (category_id, photo_url) VALUES ($1, $2)  RETURNING *', [category_id, photo_url]);
  
  let resp = {};
  if ( result.rows && result.rows[0] ) {
    resp.message = 'Success: Animal info added'; 
    resp.id = result.rows[0].id; 
  } 
  else resp.message = 'Failure: Unable to create Animal info!!!';

  response.status(201).send(resp)
}

const updateAnimal = async (request, response) => {
  const id = parseInt(request.params.id)
  const { category_id, photo_url } = request.body;
  
  const result = await pool.query( 'UPDATE animal_photos SET category_id = $1, photo_url = $2 WHERE id = $3  RETURNING *', [category_id, photo_url, id]);
  
  let resp = {};
  if ( result.rows && result.rows[0] ) {
    resp.message = 'Success: Animal info updated'; 
    resp.data = result.rows[0]; 
  } 
  else resp.message = 'Failure: Unable to update Animal info!!!';  

  response.status(201).send(resp)
}

const deleteAnimal = async (request, response) => {
  const id = parseInt(request.params.id);
  const result = await pool.query('DELETE FROM animal_photos WHERE id = $1 RETURNING *', [id]);

  let resp = {};
  if ( result.rows && result.rows[0] ) {
    resp.message = 'Success: Animal info deleted'; 
    resp.data = result.rows[0]; 
  } 
  else resp.message = 'Failure: Unable to find Animal info for deletion!!!';  

  response.status(200).send(resp)
}

module.exports = {
  getAnimals,
  getAnimalById,
  createAnimal,
  updateAnimal,
  deleteAnimal
}