const encryptor = require('./encryption/encryptor');
const decryptor = require('./decryption/decryptor');
const fileService = require('./utility/fileService');
const MatrixKey = require('./utility/matrixKey');

const matrixKey = new MatrixKey(fileService.getAlphabet());

matrixKey.print();

const encryptedData = encryptor(fileService.getInputText(), matrixKey);
fileService.writeEncryptedData(encryptedData);

const decryptedData = decryptor(encryptedData, matrixKey);

fileService.writeDecryptedData(decryptedData);
