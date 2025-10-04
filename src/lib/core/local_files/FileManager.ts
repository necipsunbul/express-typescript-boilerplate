import path from 'path';
import fs from 'fs';
class FileManager {
  private static _instance?: FileManager;
  private constructor() {}
  public static get instance(): FileManager {
    if (!this._instance) this._instance = new FileManager();
    return this._instance;
  }
  getRootPath(): string {
    return process.env.PWD as string;
  }

  PWD(): string {
    return process.env.PWD as string;
  }

  getPath(folderList: string[] = []): string {
    return path.join(this.getRootPath(), ...folderList);
  }

  createFile(fileName: string, content: Buffer) {
    return new Promise((resolve, reject) => {
      fs.writeFile(fileName, content, (err) => {
        if (err) reject(err);
        resolve(true);
      });
    });
  }

  readFile(filePath: string) {
    return new Promise((resolve, reject) => {
      fs.readFile(filePath, { encoding: 'utf-8' }, function (err, data) {
        if (!err) return resolve(data);
        reject(err);
      });
    });
  }

  joinPath(folders: string[]) {
    return path.join(...folders);
  }

  removeFileFromServer(filePath: string) {
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
  }

  getFileExtension(fileName: string) {
    return path.extname(fileName).replace('.', '');
  }

  writeFile(filePath: string, content: string) {
    return new Promise((resolve, reject) => {
      fs.writeFile(filePath, content, (err) => {
        if (err) reject(err);
        resolve(true);
      });
    });
  }
}

export default FileManager;
