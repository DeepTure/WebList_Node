//aqui metan la logica para el pase de lista
const router = require("express").Router();
const db = require("../database/connection");

router.get("/loginpt", (req, res) => {
    res.render("login-pt", {});
});

router.get("/homeprofept",(req,res) => {
    res.render("home-profesor-pt",{});
});

router.get("/homealumnopt",(req,res) => {
    res.render("home-alumno-pt",{});
});

module.exports = router;