import fs from 'fs';

export function handleWriteFile(path, file, data) {
    fs.writeFileSync(path + "/" + file, JSON.stringify(data, null, 2), 'utf8');
}