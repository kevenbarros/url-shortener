import { Request, Response, NextFunction } from "express"
import { Url } from "../models/Url";
import { validateUrl, generateUrlKey } from "../routes/service";

const save = (longURL: string, shortURL: string, shortUrlId: string, userId: string): void => {
  Url.create({ longURL, shortURL, shortUrlId, userId })
};

const urlNavigate = async (req: Request, res: Response) => {
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

const getUrlUser = async (req: Request, res: Response) => {
  try {
    let query = { userId: req.params.userId };
    const userUrl = await Url.find(query)
    return res.status(200).json(userUrl);
  } catch (err) {
    return res.status(500).json({ error: err });
  }
}

const getAllUrl = async (req: Request, res: Response) => {
  try {
    const url = await Url.find();
    return res.status(200).json(url);
  } catch (err) {
    return res.status(500).json({ error: 'err' });
  }
}

const postUrl = async (req: Request, res: Response) => {
  try {
    if (!!validateUrl(req.body.url)) return res.status(400).send({ msg: "Link invalido :(" });
    const urlKey = generateUrlKey();
    const urlBody = req.body.url
    const shortUrl = `http://localhost:5000/${urlKey}`
    const userId = req.body.userId ? req.body.userId : ''
    await save(urlBody, shortUrl, urlKey, userId)
    return res.status(200).send({ shortUrl });
  } catch (error) {
    return res.status(500).send({msg: "Ocorreu um erro, tente novamente"});
  }
}

const deleteUrl = async (req: Request, res: Response) => {
  try {
    let userId = req.params.userId
    let idUrl = req.params.urlId
    const checkUrl = await Url.find({ _id: idUrl })
    if (checkUrl) {
      if (userId !== checkUrl[0].userId) return res.status(500).json({ error: "sem permissão" });
      await Url.deleteOne({ _id: idUrl })
      const updatedListUrls = await Url.find({ userId: userId })
      return res.status(200).json(updatedListUrls);
    }
  } catch (err) {
    return res.status(500).json({ error: 'url não encontrada' });
  }
}

export { postUrl, urlNavigate, getAllUrl, getUrlUser, deleteUrl }
