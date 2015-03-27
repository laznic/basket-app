var Joi          = require('Joi'),
    ObjectAssign = require('object-assign'),
    BaseModel    = require('hapi-mongo-models').BaseModel;

var List = BaseModel.extend({ 
  constructor: function (attrs) {
    ObjectAssign(this, attrs);
  }
});

List._collection = 'lists';

List.schema = Joi.object().keys({
  _id: Joi.object(),
  hash: Joi.string().required(),
  items: Joi.array().items(Joi.object()),
  assignedTo: Joi.array().items(Joi.object()),
  created: Joi.object().keys({
    date: Joi.date(),
    user: Joi.object().required()
  }),
  updated: Joi.object().keys({
    date: Joi.date(),
    user: Joi.object().required()
  })
});

List.indexes = [
  [ { hash: 1 }, { unique: true } ]
];

module.exports = List;