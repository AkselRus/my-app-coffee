const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const { check, validationResult } = require("express-validator");
const tokenService = require("../services/token.service");
const router = express.Router({ mergeParams: true });

router.post("/signUp", [
    check("email", "Некоректный email").trim().notEmpty().escape(),
    check("password", "Поле не может быть пустым").trim(),
    check(
        "password",
        "Пароль должен содержать один символ нижнего регистра, один символ верхнего регистра, цифру и специальный символ.Минимальная длина пароля 8 символов"
    ).matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/, "i"),
    // check("password", "Минимальная длина пароля 8 символов").isLength({
    //     min: 8,
    // }),
    async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    error: {
                        message: "INVALID_DATA",
                        code: 400,
                        errors: errors.array(),
                    },
                });
            }
            const { email, password } = req.body;

            const exitingUser = await User.findOne({ email: email });
            if (exitingUser) {
                return res.status(400).json({
                    error: {
                        message: "EMAIL_EXISTS",
                        code: 400,
                    },
                });
            }

            const hashedPassword = await bcrypt.hash(password, 12);
            const newUser = User.create({
                image: `https://avatars.dicebear.com/api/avataaars/${(
                    Math.random() + 1
                )
                    .toString(36)
                    .substring(7)}.svg`,
                ...req.body,
                password: hashedPassword,
            });

            const tokens = tokenService.generate({ id: newUser.id });
            await tokenService.save(newUser.id, tokens.refreshToken);

            res.status(201).send({ ...tokens, userId: newUser.id });
        } catch (error) {
            res.status(500).json({
                massage: "На сервере произошла ошибка. Попробуйте позже",
            });
        }
    },
]);

router.post("/signInWithPassword", [
    check("email", "Email введен некорректно").normalizeEmail().isEmail(),
    check("password", "Неправильный пароль").exists(),
    async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    error: {
                        message: "INVALID_DATA",
                        cose: 400,
                    },
                });
            }

            const { email, password } = req.body;
            const existingUser = await User.findOne({ email });

            if (!existingUser) {
                return res.status(400).send({
                    error: {
                        message: "EMAIL_NOT_FOUND",
                        cose: 400,
                    },
                });
            }

            const isPasswordEqual = bcrypt.compare(
                password,
                existingUser.password
            );
            if (!isPasswordEqual) {
                return res.status(400).send({
                    error: {
                        message: "INVALID_PASSWORD",
                        cose: 400,
                    },
                });
            }
            const tokens = tokenService.generate({ id: existingUser.id });
            await tokenService.save(existingUser.id, tokens.refreshToken);

            res.status(200).send({ ...tokens, userId: existingUser.id });
        } catch (error) {
            res.status(500).json({
                massage: "На сервере произошла ошибка. Попробуйте позже",
            });
        }
    },
]);
router.post("/token", async (req, res) => {
    try {
        const { refresh_token: refreshToken } = req.body;

        const data = tokenService.validateRefresh(refreshToken);
        console.log("data", data);
        const dbToken = tokenService.findToken(refreshToken);

        if (isTokenInvalid(data, dbToken)) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const tokens = tokenService.generate({ id: data.id });
        await tokenService.save(data.id, tokens.refreshToken);

        res.status(200).send({ ...tokens, userId: data.id });
    } catch (error) {
        res.status(500).json({
            massage: "На сервере произошла ошибка. Попробуйте позже",
        });
    }
});
function isTokenInvalid(data, dbToken) {
    return !data || !dbToken || data.id !== dbToken?.user?.toString();
}

module.exports = router;
