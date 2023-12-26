import path from 'path';
import { fileURLToPath } from 'url';
import bcrypt from 'bcrypt';

const __filename = fileURLToPath(import.meta.url);

export const __dirname = path.dirname(__filename);

export const createHash = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
}

export const isValidPassword = (password, user) => bcrypt.compareSync(password, user.password);

export class Exception extends Error {
    constructor(message, status) {
      super(message);
      this.statusCode = status;
    }
};


// Aca voy a hacer el middleware para validar el rol, a partir de obtener la unformacion del router current

export const authenticateUser = (requiredRole) => async (req, res, next) => {
  try {
    // Llama a la ruta /current para obtener la información del usuario
    const response = await fetch('http://localhost:8080/current', {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json',
          // Agrega cualquier encabezado adicional necesario
      },
      credentials: 'include', // Incluye las cookies en la solicitud
    });

    const data = await response.json();
    //print (data);
    if(data.role !== requiredRole){
      return res.redirect('/login');
    }
    next();
  } catch (error) {
    console.log(error);
    return res.redirect('/login');
  }
} 



export const randomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);