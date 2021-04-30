import fs from 'fs';
import path from 'path';

export default (fileName: string) => {
  return new Promise((resolve, reject) => {
    fs.readFile(path.join(__dirname, process.env.PUBLIC_PATH, fileName), (err, data) => {
      err ? reject(err) : resolve(data);
    });
  });
};
