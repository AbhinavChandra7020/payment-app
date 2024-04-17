const express = require('express');
const jwt = require('jsonwebtoken');
const zod = require('zod')
const JWT_SECRET = require('../config');
const { User, Account } = require('../db');
const { authMiddleware } = require('../middleware');
const router = express.Router();

const validationSchema = zod.object({
    username: zod.string().email(),
    password: zod.string(),
    firstName: zod.string(),
    lastName: zod.string()
})


router.post("/signup", async (req,res) =>{
    const body = req.body
    const {success} = validationSchema.safeParse(req.body);
    if(!success){
        return res.json({
            msg:"User already exists/Incorrect inputs"
        });
    }

    const user = await User.findOne({
        username: body.username
    })

    if(user){
        return res.json({
            msg:"User already exists/Incorrect inputs"
        });
    }

    const userCreation = await User.create(body)

    const userId = userCreation._id
    
    await Account.create({
        userId,
        balance: 1 + Math.random() * 10000
    })

    const token = jwt.sign({
        userId: userCreation._id
    }, JWT_SECRET)
    res.json({
        msg:"User created successfully",
        token: token
    })
})

const signInValidation = zod.object({
    username: zod.string().email(),
    password: zod.string()
})

router.post("/signin", async(req,res) =>{
    const username = req.body.username;
    const password = req.body.password;
    const body = req.body
    const {success} = signInValidation.safeParse(req.body);
    if(!success){
        res.json({
            msg: "Incorrect inputs"
        })
    }

    const user = await User.findOne({
        username: body.username,
        password: body.password
    })

    if (user) {
        const token = jwt.sign({
            userId: user._id
        }, JWT_SECRET);
  
        res.json({
            token: token
        })
        return;
    }

    res.status(411).json({
        message: "Error while logging in"
    })
})

const updateUser = zod.object({
    password: zod.string().optional(),
    firstName: zod.string().optional(),
    lastName: zod.string().optional()
})

router.put('/', authMiddleware, async (req,res) => {
    const { success } = updateUser.safeParse(req.body);
    if(!success){
        return res.status(411).json({
            msg:"Error while updating information"
        })
    }

    await User.updateOne({ _id: req.userId }, req.body);

    res.json({
        msg: "Updated successfully"
    })
})

router.get('/bulk', async (req,res) =>{
    const searchItem = req.query.filter || "";
    const users = await User.find({
        $or: [{
            firstName: {
                "$regex": searchItem
            }
        },{
            lastName: {
                "$regex": searchItem
            }
        }]
    })
    res.json({
        user: users.map(user =>({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
        }))
    })

})

module.exports = router;