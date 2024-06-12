import { validationResult, matchedData } from "express-validator";

export const validateSchema = (req, res, next) => {
    const result = validationResult(req);
    if (result.isEmpty()) {
        req.body = matchedData(req);
        return next();
    }
    return res.status(400).send({ errors: result.array() });
}