import config from '../envVariablesLoad';
import mongoose from "mongoose";

export interface IDatabaseConfig {
   connect(): Promise<void>
}

class MongodbConfig implements IDatabaseConfig {
   private url = config.DATABASE_URL

   async connect(): Promise<void> {
      try {
         await mongoose.connect(this.url)
         console.log('Conectado o MongoDB')
      } catch (err) {
         console.error('Erro ao conectar no MongoDB', err)
      }
   }
}

export default new MongodbConfig()