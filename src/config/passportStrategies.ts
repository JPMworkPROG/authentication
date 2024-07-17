import { Strategy as LocalStrategy } from 'passport-local';
import { ExtractJwt, Strategy as JwtStrategy } from 'passport-jwt';
import UserService from '../services/userService';
import passport from 'passport';
import config from './envVariablesLoad';

passport.use(new LocalStrategy(
  async (username, password, done) => {
    try {
      const user = await UserService.authenticate(username, password);
      if (!user) {
        return done(null, false, { message: 'Invalid credentials' });
      } 
      return done(null, user);
    } catch (error) {
      return done(error);
    }
  }
));

passport.use(new JwtStrategy(
  {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.JWT_SECRET
  },
  async (jwtPayload, done) => {
    try {
      const user = await UserService.findById(jwtPayload.id);
      if (!user) return done(null, false);
      return done(null, user);
    } catch (error) {
      return done(error);
    }
  }
));

export default passport;
