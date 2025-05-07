const User = require('./../model/user.model.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const blacklist = require('../middleware/blacklist.middleware.js');
const getClientIp = require('../middleware/blacklist.middleware.js');

const login = (req, res, next) => {
    let user = User.getByEmail(req.body.email);
    if (!user) {
        return res.status(401).json({ message: "Login ou Mot de passe  incorrect." }); // Message erreur pas bon / Statut ? 
    }
    if (!bcrypt.compareSync(req.body.password, user.password)) {
        return res.status(401).json({ message: "Login ou Mot passe incorrect." }); // Message erreur pas bon / Statut ?
    }
    for (let i = 0; i < length.process.env.BLACKLIST; i++){
        if(i == getClientIp){
            return res.status(403).json({message:"Vous n'avez pas d'authorisation d'accès."})
        }
    }
    res.status(200).json({
        id: user.id,
        email: user.email,
        token: jwt.sign({
            id: user.id,
            email: user.email,
            roles: user.roles
        },process.env.JWT_KEY) // process.env.JWT_KEY
    });
}

const signIn = async (req,res,next) => {
    let member = await Role.findOne({ where: { name: "Member" } });
    if (!member) {
        return res.status(404).json({ message: "Le rôle Member n'as pas été trouvé" });
    }
    for (let i = 0; i < length.process.env.BLACKLIST; i++){
        if(i == getClientIp){
            return res.status(403).json({message:"Vous n'avez pas d'authorisation d'accès."})
        }
    }
    try {
        let result = await User.create({
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 4), // Mot de passe hashé 4 fois, mettre 10 fois pour plus de sécurité ?
            roles: [member.id]
        });
        res.status(201).json(result);
    } catch (e) {
        res.status(400).json({ error: e.message });
    }
}

module.exports = { login, signIn };