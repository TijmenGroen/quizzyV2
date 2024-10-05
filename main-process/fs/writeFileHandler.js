import fs from 'fs';

export function handleWriteFile(path, file, data) {
    console.log(path + "/" +file);
    fs.writeFileSync(path + "/" + file, data, 'utf8');
}