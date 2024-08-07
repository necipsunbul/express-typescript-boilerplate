import dotenv from 'dotenv';
import FileManager from "../local_files/FileManager";
import {ApplicationMode} from "../contants/SystemContants";
export default function (){
    const _path = FileManager.instance.PWD() + (process.env.NODE_ENV === ApplicationMode.dev ? '/.env.dev' :'/.env');
    dotenv.config({ path: _path });
}