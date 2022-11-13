import validate from "validate.js"
import shortId from "shortid"
const validateUrl = (url = "") => {
  return validate({ website: url }, {
    website: {
      url: {
        allowLocal: true
      }
    }
  });
}
const generateUrlKey = () => shortId.generate();
export { validateUrl, generateUrlKey }
