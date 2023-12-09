const express = require("express");
const userSchema = require("../models/user");

const router = express.Router();

// create user
/**
 * @swagger
 * components:
 *  schemas:
 *      User:
 *          type: object
 *          properties:
 *              categoria:
 *                  type: string
 *                  description: the category
 *              nome:
 *                   type: string
 *                   description: the name of the product
 *              tamanho:
 *                   type: string
 *                   description: product size
 *              valor:
 *                    type: number
 *                    description: product value
 *              required:
 *                  - categoria
 *                  - nome
 *                  - tamanho
 *                  - valor
 *              example:
 *                  categoria: Roupas,
 *                  nome: vestido,
 *                  tamanho: S,
 *                  valor: 39.90
 *                  
 */

/**
 * @swagger
 * /api/users:
 *  post:
 *      summary: create a new product
 *      tags: [User]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          categoria:
 *                              type: string
 *                              description: the category
 *                          nome:
 *                              type: string
 *                              description: the name of the product
 *                          tamanho:
 *                              type: string
 *                              description: product size
 *                          valor:
 *                              type: number
 *                              description: product value
 *                      responses:
 *                          200:
 *                              description: new product created!
 */


router.post("/users", (req, res) => {
    const user = userSchema(req.body);
    user
        .save()
        .then((data) => res.json(data))
        .catch((error) => res.json({message:error}));
});


//get all user

/**
 * @swagger
 * /api/users:
 *  get:
 *      summary: return all products
 *      tags: [User]
 *      responses:
 *          200:
 *              description: all products
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                              items:
 *                                  properties:
 *                                   categoria:
 *                                       type: string
 *                                       description: the category
 *                                   nome:
 *                                      type: string
 *                                      description: the name of the product
 *                                   tamanho:
 *                                      type: string
 *                                      description: product size
 *                                   valor:
 *                                      type: number
 *                                      description: product value
 *                                          responses:
 *                                              200:
 *                                                  description: new product created!
 */

router.get("/users", (req, res) => {
    userSchema
        .find()
        .then((data) => res.json(data))
        .catch((error) => res.json({message:error}));
});

//get a user

/**
 * @swagger
 * /api/users/{id}:
 *  get:
 *      summary: returns a products
 *      tags: [User]
 *      parameters:
 *          - in: path
 *          name: id
 *          schema:
 *              type: string
 *          required: true
 *          description: the product id
 *      responses:
 *          200:
 *              description: all products
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                              items:
 *                                  properties:
 *                                   categoria:
 *                                       type: string
 *                                       description: the category
 *                                   nome:
 *                                      type: string
 *                                      description: the name of the product
 *                                   tamanho:
 *                                      type: string
 *                                      description: product size
 *                                   valor:
 *                                      type: number
 *                                      description: product value
 *       404:
 *          description: product not found
 */

router.get("/users/:id", (req, res) => {
    const { id } = req.params;
    userSchema
        .findById(id)
        .then((data) => res.json(data))
        .catch((error) => res.json({message: error}));
});

// update a user

/**
 * @swagger
 * /api/users/{id}:
 *  put:
 *      summary: update a product
 *      tags: [User]
 *      parameters:
 *          - in: path
 *          name: id
 *          schema:
 *              type: string
 *          required: true
 *          description: the product id
 *      requestBody:
 *          required:true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                          properties:
 *                                   categoria:
 *                                       type: string
 *                                       description: the category
 *                                   nome:
 *                                      type: string
 *                                      description: the name of the product
 *                                   tamanho:
 *                                      type: string
 *                                      description: product size
 *                                   valor:
 *                                      type: number
 *                                      description: product value
 *      responses:
 *          200:
 *              description: product update
 *          404:
 *              description: product not found
 */

router.put("/users/:id", (req, res) => {
    const { id } = req.params;
    const { categoria, nome, tamanho, valor } = req.body;
    userSchema
        .updateOne({ _id: id }, { $set: {categoria, nome, tamanho, valor} })
        .then((data) => res.json(data))
        .catch((error) => res.json({message: error}));
});

// delete a user

/**
 * @swagger
 * /api/users/{id}:
 *  delete:
 *      summary: delete a product
 *      tags: [User]
 *      parameters:
 *          - in: path
 *          name: id
 *          schema:
 *              type: string
 *          required: true
 *          description: the product id
 *      responses:
 *          200:
 *              description: product deleted
 *          404:
 *              description: product not found
 */

router.delete("/users/:id", (req, res) => {
    const { id } = req.params;
    userSchema
        .deleteOne({ _id: id })
        .then((data) => res.json(data))
        .catch((error) => res.json({message: error}));
});

module.exports = router;