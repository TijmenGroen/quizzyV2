import fs from 'fs';

export function handleExists(path) {
    return fs.existsSync(path);
}