const express = require("express");
const chalk = require("chalk");
const User = require("../models/User");
// const auth = require("../middleware/auth.middleware");
const router = express.Router({ mergeParams: true });

router
    .patch("/:userId", async (req, res) => {
        try {
            const { userId } = req.params;

            if (userId) {
                const updateUser = await User.findByIdAndUpdate(
                    userId,
                    req.body,
                    {
                        new: true,
                    }
                );
                res.send(updateUser);
            } else {
                res.status(401).json({ message: "Unauthorized" });
            }
        } catch (error) {
            res.status(500).json({
                massage: "На сервере произошла ошибка. Попробуйте позже",
            });
        }
    })
    .get("/:userId", async (req, res) => {
        try {
            const { userId } = req.params;
            if (userId) {
                const currentUser = await User.findById(userId);
                res.send(currentUser);
            } else {
                res.status(401).json({ message: "Unauthorized" });
            }
        } catch (error) {
            res.status(500).json({
                massage: "На сервере произошла ошибка. Попробуйте позже",
            });
        }
    });
// router.delete("/:userId", async (req, res) => {
//     try {
//         const { userId } = req.params;
//         const removedUser = await User.findByIdAndDelete(userId);
//         console.log("removedUser", removedUser);
//     } catch (error) {
//         res.status(500).json({
//             massage: "На сервере произошла ошибка. Попробуйте позже",
//         });
//     }
// });

router.get("/", async (req, res) => {
    try {
        const list = await User.find();
        res.status(200).send(list);
    } catch (error) {
        res.status(500).json({
            massage: "На сервере произошла ошибка. Попробуйте позже",
        });
    }
});

module.exports = router;

// User.findByIdAndUpdate(userId, {
//     $push: { purchases: newItem_id },
//   });
