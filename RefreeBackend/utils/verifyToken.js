const { createError } = require("../utils/error.js");
const AsyncStorage = require('@react-native-async-storage/async-storage');
const jwt = require('jsonwebtoken');



exports.verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // console.log(authHeader);
  if (!authHeader) {
    return next(createError(401, "You are not authenticated!"));
  }

  const token = authHeader.split(' ')[1];

  if (!token) {
    return next(createError(401, "You are not authenticated!"));
  }

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_TOKEN_SECRET);
    req.user = decodedToken;
    next();
  } catch (error) {
    return next(createError(403, "Token is not valid!"));
  }
};


// exports.verifyUser = async (req, res, next) => {
//   try {
//     await verifyToken(req, res, () => {
//       if (req.user.id === req.params.id || req.user.isAdmin) {
//         next();
//       } else {
//         return next(createError(403, "You are not authorized!"));
//       }
//     });
//   } catch (error) {
//     return next(createError(403, "Token is not valid!"));
//   }
// };



// exports.verifyAdmin = async (req, res, next) => {
//   verifyToken(req, res, next, () => {
//     if (req.user.isAdmin) {
//       next();
//     } else {
//       return next(createError(403, "You are not authorized!"));
//     }
//   });
// };
