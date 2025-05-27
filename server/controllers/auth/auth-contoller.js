import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../../models/User.js';

// Register
const registerUser = async (req, res) => {
  const { userName, email, password } = req.body;

  try {
    const checkUser = await User.findOne({ email });
    if (checkUser) {
      return res.json({
        success: false,
        message: "User already exists with same email..!!"
      });
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      userName,
      email,
      password: hashPassword
    });

    await newUser.save();

    res.status(200).json({
      success: true,
      message: "Registration successful..!!"
    });

  } catch (error) {
    console.log("Error in authcontroller register " + error);
    res.status(500).json({
      success: false,
      message: "Some error occurred..!!"
    });
  }
};

// Login
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const checkUser = await User.findOne({ email });
    if (!checkUser) {
      return res.json({
        success: false,
        message: "User doesn't exist. Please register first..!!"
      });
    }

    const checkPasswordMatch = await bcrypt.compare(password, checkUser.password);
    if (!checkPasswordMatch) {
      return res.json({
        success: false,
        message: "Invalid password. Please try again...!!"
      });
    }

    const token = jwt.sign(
      {
        id: checkUser._id,
        role: checkUser.role,
        email: checkUser.email
      },
      process.env.CLIENT_SECRET_KEY,  
      { expiresIn: '60m' }
    );

    res.cookie('token', token, {
      httpOnly: true,
      secure: false 
    }).json({
      success: true,
      message: "Logged in successfully..!!",
      user: {
        email: checkUser.email,
        role: checkUser.role,
        id: checkUser._id
      }
    });

  } catch (error) {
    console.log("Error in authcontroller login " + error);
    res.status(500).json({
      success: false,
      message: "Some error occurred..!!"
    });
  }
};


const logoutUser= (req,res)=>{
   res.clearCookie('token').json({
  success: true,
  message: 'Logged out successfully..!!'
})
}

//auth middleware

const authMiddleware = async(req,res,next)=>{
    const token  =req.cookies.token;
    if(!token) return res.status(401).json({
        sucess:false,
        message:"Unauthorized User..!!"
    })
    try {
        const decoded = jwt.verify(token,process.env.CLIENT_SECRET_KEY)
        req.user = decoded;
        next()
    } catch (error) {
        res.status(401).json({
             sucess:false,
             message:"Unauthorized User..!!"
        })
    }
}

// Export
export { registerUser, loginUser,logoutUser,authMiddleware };
