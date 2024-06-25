const knex = require("../db/knex");
const db = require("../db/db");

const addFriend = async (req, res) => {
    try {
        const id = await knex.select("user_id").from("users").where({email: req.body.email});
    
        if (!id[0]?.user_id) {
            return res.json("Sorry, that email hasn't been registered in our app")
        }
    
        //tmbhkan utk cek sdh berteman atau tidak
        await knex("friends_relation").insert({
            person1: req.body.person1, 
            person2: id[0].user_id
        });
        return res.json("Please wait for your friend confirmation");
    } catch (err) {
        console.log(err);
    }
}

const invdata = async (req, res) => {
    const account = await knex.select("pict", "name", "user_id").from("users").where({user_id: req.body.id});

    return res.json(account);
}

const lists = async (req, res) => {
    const invs = await knex.select().from("friends_relation").where({status: false, person2: req.body.id});

    return res.json(invs);
}

const accinv = async (req, res) => {
    await knex("friends_relation").where({relation_id: req.body.relation_id}).update({status: true})

    return res.status(200).json("Accepted!");
}

const refuseinv = async(req, res) => {
    await knex("friends_relation").where({relation_id: req.body.relation_id}).del()
}

module.exports = {addFriend, invdata, lists, accinv, refuseinv};