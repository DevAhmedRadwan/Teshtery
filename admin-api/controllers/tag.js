const Tag = require("../models/tag");

module.exports.get = async (req, res, next) => {
  try {
    const { page, pagesize, _id, name } = req.query;

    let query = {};
    if (_id) query["_id"] = _id;
    if (name) query["name"] = name;

    let tags = null;

    if(page > 0)
      tags = await Tag.paginate(query, {
        page: page ? page : 1,
        limit: pagesize ? pagesize : 20,
      });
    else
      tags = await Tag.find(query);

    res.status(200).json(tags);
  } catch (err) {
    next(err);
  }
};

module.exports.create = async (req, res, next) => {
  try {
    const { name } = req.body;

    const tag = await Tag.create({ name: name });

    res.status(201).json({
      tagId: tag._id,
    });
  } catch (err) {
    next(err);
  }
};

module.exports.update = async (req, res, next) => {
  try {
    const tagId = req.params.tagId;

    const { name } = req.body;

    const tag = await Tag.updateOne(
      { _id: tagId },
      { name: name },
      { new: true }
    );

    res.status(200).json({
      tagId: tag._id,
    });
  } catch (err) {
    next(err);
  }
};

module.exports.delete = async (req, res, next) => {
  try {
    const tagId = req.params.tagId;

    const tag = await Tag.deleteOne({_id:tagId});

    res.status(200).json({
      tagId: tag._id,
    });
  } catch (err) {
    next(err);
  }
};
