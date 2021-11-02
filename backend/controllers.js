const db = require('./db');
const helper = require('./helper');
const config = require('../config');

async function getMultiple(page = 1){
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT id, name, type, country, region, longitude, latitude, description, recommendations 
    FROM pointsofinterest LIMIT ?,?`, 
    [offset, config.listPerPage]
  );
  const data = helper.emptyOrRows(rows);
  const meta = {page};

  return {
    data,
    meta
  }
}

async function getByRegion(reg){
  
  const rows = await db.query(
    `SELECT * FROM pointsofinterest WHERE region LIKE ?`, 
    [reg]
  );
  const data = helper.emptyOrRows(rows);


  return {
    data
  }
}

async function create(poi){
  const result = await db.query(
    `INSERT INTO pointsofinterest 
    (name, type, country, region, lon, lat, description, recommendations) 
    VALUES 
    (?, ?, ?, ?, ?, ?, ?, ?)`, 
    [
      poi.name, poi.type,
      poi.country, poi.region,
      poi.lon, poi.lat,
      poi.description, poi.recommendations
    ]
  );

  let message = 'Error in creating point of interest';

  if (result.affectedRows) {
    message = 'Point of interest created successfully';
  }

  return {message};
}

async function update(id, poi){
  const result = await db.query(
    `UPDATE pointsofinterest 
    SET name=?, type=?, country=?, 
    region=?, lon=?, lat=?, description=?, recommendations=? 
    WHERE id=?`, 
    [
      poi.name, poi.type,
      poi.country, poi.region,
      poi.lon, poi.lat,
      poi.description, poi.recommendations, id
    ]
  );

  let message = 'Error in updating point of interest';

  if (result.affectedRows) {
    message = 'Point of interest updated successfully';
  }

  return {message};
}

async function remove(id){
  const result = await db.query(
    `DELETE FROM pointsofinterest WHERE id=?`, 
    [id]
  );

  let message = 'Error in deleting poi';

  if (result.affectedRows) {
    message = 'poi deleted successfully';
  }

  return {message};
}


async function recommend(id){
  const result = await db.query(
    `UPDATE pointsofinterest 
    SET recommendations= recommendations+1 
    WHERE id=?`, 
    [
      id
    ]
  );

  let message = 'Error in updating recommendation';

  if (result.affectedRows) {
    message = 'Point of interest rec updated successfully';
  }

  return {message};
}

module.exports = {
  getMultiple,
  create,
  update,
  remove,
  recommend,
  getByRegion
}

