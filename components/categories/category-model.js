const db = require('../../data/dbConfig.js');

module.exports = {
  find,
  findById,
  findKindsByCategoryId,
  findPrereqsByCategoryId,
  getImages,
  getThumbnail,
  add,
  addKindsConnection,
  addPrereq,
  update,
  remove,
  removeKindsConnection,
  removePrereq
};



function find() {
  return db('categories')
}

function findById(id) {
  return db('categories')
    .where( 'category_id', id )
    .first();
}

function findKindsByCategoryId(id) {
  return db('category_to_kinds')
    .join('kinds', 'category_to_kinds.ck_kind_id', 'kinds.kind_id')
    .where('ck_category_id', id)
}

function findPrereqsByCategoryId(id) {
  return db('category_prerequisites')
    .join('categories', 'category_prerequisites.cp_prereq_id', 'categories.category_id')
    .where('cp_category_id', id)
}

function getImages(id) {
  return db('images').where("foreign_id", id).where("foreign_class", "Category").where("thumbnail", false)
}

function getThumbnail(id) {
  return db('images').where("foreign_id", id).where("foreign_class", "Category").where("thumbnail", true).first()
}

function add(category) {
  return db('categories')
    .insert(category)
    .then(ids => {
      return "Success";
    });
}

function addKindsConnection(category_kind) {
  return db('category_to_kinds')
    .insert(category_kind)
    .then(ids => {
      return "Success";
    });
}

function addPrereq(prereq) {
  return db('category_prerequisites')
    .insert(prereq)
    .then(ids => {
      return "Success";
    });
}

function update(changes, id) {
  return db('categories')
    .where('category_id', id)
    .update(changes);
}

function remove(id) {
  return db('categories')
    .where( 'category_id', id )
    .del();
}

function removeKindsConnection(category_id, kind_id) {
  return db('category_to_kinds')
    .where( 'ck_category_id', category_id )
    .where('ck_kind_id', kind_id )
    .del();
}

function removePrereq(category_id, prereq_id) {
  return db('category_prerequisites')
    .where( 'cp_category_id', category_id )
    .where('cp_prereq_id', prereq_id )
    .del();
}
