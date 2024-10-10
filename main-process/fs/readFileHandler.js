import fs from 'fs';

export function handleReadFile(path, file) {
    const unparsedData = fs.readFileSync(path + "/" + file, "utf-8");
    return JSON.parse(unparsedData);
}

export function handleReadDataFile(path) {
    const unparsedData = fs.readFileSync(path + "/data.json", "utf-8");
    return JSON.parse(unparsedData);
}