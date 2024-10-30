import dotenv from 'dotenv'
dotenv.config();
const conf={
    port:Number(process.env.PORT)
}

export default conf;