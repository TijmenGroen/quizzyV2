import fs from 'fs';

export function handleWriteFile(path, file, data) {
    fs.writeFileSync(path + "/" + file, data, 'utf8');
}