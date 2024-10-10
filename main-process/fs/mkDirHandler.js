import fs from 'fs';

export function handeMkDir(path, title) {
    fs.mkdirSync(path + "/" + title);
}