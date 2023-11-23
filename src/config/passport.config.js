import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as GithubStrategy } from 'passport-github2';
import { createHash, isValidPassword } from '../utils.js';
import UserModel from '../models/user.model.js';

const opts = {
    usernameField: 'email',
    passReqToCallback: true
};

const githubOpts = {
    clientID: 'Iv1.5594a2d8b3e1a795', // Este dato debe ser pasado por parametro
    clientSecret: 'c22a456c3f2208c6dd173af8cbbb27dca65ce627', // Este dato debe ser pasado por parametro
    callbackURL: "http://localhost:8080/api/sessions/github/callback", // Este dato debe ser pasado por parametro
  };


export const init = () => {
    passport.use('register', new LocalStrategy(opts, async (req, email, password, done) => {
        try{
            const user = await UserModel.findOne({ email });
            if (user) {
                return done(new Error('Usuario ya registrado 😨'));
            }
            const newUser = await UserModel.create({
                ...req.body,
                password: createHash(password),
            });
            done (null, newUser);
        }catch (error) {
            done(new Error(`Ocurrio un error durante la autenticacion ${error.message} 😨.`));
        }
    }));

    passport.use('login', new LocalStrategy(opts, async (req, email, password, done) => {
        try {
          const user = await UserModel.findOne({ email });
          if (!user) {
            return done(new Error('Correo o contraseña invalidos 😨'));
          }
          const isPassValid = isValidPassword(password, user);
          if (!isPassValid) {
            return done(new Error('Correo o contraseña invalidos 😨'));
          }
          console.log('Here');
          done(null, user);
        } catch (error) {
          done(new Error(`Ocurrio un error durante la autenticacion ${error.message} 😨.`));
        }
    }));

    passport.use('github', new GithubStrategy(githubOpts, async (accessToken, refreshToken, profile, done) => {
        console.log('profile', profile);
        let email = profile._json.email;
        let nombre = profile._json.name;
        let user = await UserModel.findOne({ email });
        if (user) {
          return done(null, user);
        }
        
        //hagamos el usuario con los datos y tambien necesitamos ver si tiene publico el nombre y mail
        if(profile._json.name === null){
            nombre = profile._json.login;
        }
        //Con el mail lo mismo
        if(profile._json.email === null){
            email = "Mail privado";
        }

        user = {
          first_name: nombre,
          last_name: '',
          email,
          age: 18,
          password: '',
          provider: 'Github',
        };
    
        const newUser = await UserModel.create(user);
        done(null, newUser);
      }));


    passport.serializeUser((user, done) => {
        done(null, user._id);
    });
    
    passport.deserializeUser(async (uid, done) => {
        const user = await UserModel.findById(uid);
        done(null, user);
    });



}

