import { validationResult, body, param } from "express-validator";

export const validationResultExpress = (req, res, next) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array });
    }
    next();
};

export const bodyRegisterValidator = [
        body("email", "formato de email incorrecto")
        .trim()
        .isEmail()
        .normalizeEmail(),
        body("password", "password incorrecta")
        .trim()
        .isLength({min: 6}),
        validationResultExpress, 
    ];

export const bodyLoginValidator = [
        body("email", "Formato de email incorrecto")
            .trim()
            .isEmail()
            .normalizeEmail(),
        body("password", "Mínimo 6 carácteres").trim().isLength({ min: 6 }),
        validationResultExpress,
    ];