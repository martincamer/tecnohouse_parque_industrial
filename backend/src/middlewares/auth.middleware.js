// import jwt from "jsonwebtoken";

// export const isAuth = (req, res, next) => {
//   const token = req.cookies.token;

//   if (!token) {
//     return res.status(401).json({
//       message: "No estas autorizado",
//     });
//   }

//   jwt.verify(token, "react2021", (err, decoded) => {
//     if (err)
//       return res.tatus(401).json({
//         message: "No estas autorizado",
//       });
//     req.userId = decoded.id;
//   });

//   next();
// };

import jwt from "jsonwebtoken";
import { pool } from "../db.js";

// export const isAuth = async (req, res, next) => {
//   const token = req.cookies.token;

//   if (!token) {
//     return res.status(401).json({
//       message: "No estás autorizado",
//     });
//   }

//   try {
//     const decoded = jwt.verify(token, "react2021");

//     // Include the user's role in the request object
//     const result = await pool.query("SELECT role_id FROM users WHERE id = $1", [
//       decoded.id,
//     ]);

//     req.userId = decoded.id;
//     req.userRole = result.rows[0].role_id;

//     next();
//   } catch (err) {
//     return res.status(401).json({
//       message: "No estás autorizado",
//     });
//   }
// };

export const isAuth = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({
      message: "No estás autorizado",
    });
  }

  try {
    const decoded = jwt.verify(token, "react2021");

    const result = await pool.query(
      "SELECT role_id, username FROM users WHERE id = $1",
      [decoded.id]
    );

    req.userId = decoded.id;
    req.userRole = result.rows[0].role_id;
    req.username = result.rows[0].username;
    req.email = result.rows[0].email;
    req.createdAt = result.rows[0].created_at;

    next();
  } catch (err) {
    return res.status(401).json({
      message: "No estás autorizado",
    });
  }
};
