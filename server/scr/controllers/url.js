const Url = require("../models/url");
const services = require("../routes/service");

const save = (longURL, shortURL, shortUrlId, userId) => {
  Url.create({ longURL, shortURL, shortUrlId, userId })
};
const find = (shortUrlId) => Url.findOne();

const urlNavigate = async (req, res, next) => {
  try {
    const url = await Url.findOne({ shortUrlId: req.params.shortUrlId });
    if (url) {
      await Url.findOneAndUpdate({ shortUrlId: url.shortUrlId }, { visits: Number(url.visits) + 1 })
    }
    return !url ? res.status(404).send("Not found") : res.redirect(302, url.longURL)
  } catch (err) {
    return res.status(500).json({ error: err });
  }
}

const getUrlUser = async (req, res, next) => {
  try {
    let query = { userId: req.body.userId };
    const userUrl = await Url.find(query)
    return res.status(200).json(userUrl);
  } catch (err) {
    return res.status(500).json({ error: err });
  }
}

const getAllUrl = async (req, res, next) => {
  try {
    const url = await Url.find();
    return res.status(200).json(url);
  } catch (err) {
    return res.status(500).json({ error: 'err' });
  }
}

const postUrl = async (req, res, next) => {
  try {
    if (!!services.validateUrl(req.body.url)) return res.status(400).send({ msg: "Invalid URL." });
    const urlKey = services.generateUrlKey();
    const shortUrl = `http://localhost:5000/${urlKey}`
    const userId = req.body.userId ? req.body.userId : ''
    await save(req.body.url, shortUrl, urlKey, userId)
    return res.status(200).send({ shortUrl });
  } catch (error) {
    return res.status(500).send({ msg: "Error. Please try again." });
  }
}

const deleteUrl = async (req, res, next) => {
  try {
    let userId = req.body.userId
    let idUrl = req.body.id
    const checkUrl = await Url.find({ _id: idUrl })
    if (checkUrl) {
      if (userId !== checkUrl[0].userId) return res.status(500).json({ error: "sem permissão" });
      await Url.deleteOne({ _id: idUrl })
      const updatedListUrls = await Url.find({ userId: userId })
      return res.status(200).json({ data: updatedListUrls });
    }
  } catch (err) {
    return res.status(500).json({ error: 'url não encontrada' });
  }
}

module.exports = { postUrl, urlNavigate, getAllUrl, getUrlUser, deleteUrl };
