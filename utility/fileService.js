const fs = require('fs');
const path = require('path');

const alphabetPath = path.join(process.cwd(), 'data', 'alphabet.txt');
const inputFilePath = path.join(process.cwd(), 'data', 'textToEncrypt.txt');
const outputFilePath = path.join(process.cwd(), 'data', 'encrypted.txt');
const decryptedFilePath = path.join(process.cwd(), 'data', 'decrypted.txt');

module.exports = {
    getAlphabet() {
        const rawData = fs.readFileSync(alphabetPath);
        return rawData.toString();
    },

    getInputText() {
        const rawData = fs.readFileSync(inputFilePath, 'utf-8');
        return rawData.toLocaleLowerCase('ua');
    },

    writeEncryptedData(data) {
        fs.writeFileSync(outputFilePath, data);
    },

    writeDecryptedData(data) {
        fs.writeFileSync(decryptedFilePath, data);
    }
}