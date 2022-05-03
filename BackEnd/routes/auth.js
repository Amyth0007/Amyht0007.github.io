const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs/dist/bcrypt');
var jwt = require('jsonwebtoken');
var fetchuser = require('../Middleware/fetchuser');
const JWT_SECRET = "amitisgoodboy";


//Route 3 create a user using : POST "/api/auth/createuser" . doesnt require auth

router.post('/createuser' ,[
    // username must be an email
  body('name' , "Enter the valid name").isLength({ min: 3 }),
  body('email' , "eneter the valid email").isEmail(),
  // password must be at least 5 chars long
  body('password' , "eneter the valid password it must be atleast 5 characters").isLength({ min: 5 }),
], async(req , res)=>{
    console.log(req.body);
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success, errors: errors.array() });
    }
    try{
    let user = await User.findOne({email: req.body.email});
    
    if(user){
        return res.status(400).json({success, error: "sorry a user with this email already exists"})
    }

    const salt = await bcrypt.genSalt(10);
    secPass = await bcrypt.hash(req.body.password ,salt);
    user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      })
      const data={
          user:{
              id: user.id
          }
      }
     const authtoken = jwt.sign(data , JWT_SECRET);
     success = true;
     res.json({success, authtoken})
    }catch(error){
        console.log(error.message);
        res.status(500).send("some error occured")
    }
})    

// Route 2: Authenticate a user using
router.post('/login' ,[
  body('email' , "eneter the valid email").isEmail(),
  // password must be at least 5 chars long
  body('password' , "eneter the valid password it must be atleast 5 characters").isLength({ min: 5 }),
], async(req , res)=>{
  let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    
    const{email , password} = req.body;
    try {
        let user = await User.findOne({email});
        if(!user){
            return res.status(400).json({error: "bhai sahi info daal"});
        }
        const passwordCompare = await bcrypt.compare(password, user.password);
        if(!passwordCompare){
            success = false;
            return res.status(400).json({ success, error: "bhai galat password hai lol"});

        }
        const data={
            user:{
                id: user.id
            }
        }
       const authtoken = jwt.sign(data , JWT_SECRET);
       success = true;
       res.json({success, authtoken})
    } catch (error) {
        
        console.log(error.message);
        res.status(500).send("internal server error");
    }
})

// Route 3 get logedin user detail POST "/api/auth/getuser" login required
router.post('/getuser' ,fetchuser, async(req , res)=>{
  
try {
   let userId = req.user.id;
    const user = await User.findById(userId).select("-password")
    res.send(user);
    
} catch (error) {
    console.error(error.message);
    res.status(500).send("internal server Error");
    
}
});
module.exports = router;