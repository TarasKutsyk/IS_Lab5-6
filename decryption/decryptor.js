module.exports = (cryptogram, matrixKey) => {
    let decryptedText = [];
    let nextOutputBigram, nextInputBigram;

    for (let i = 0; i < cryptogram.length; i += 2) {
        nextInputBigram = cryptogram[i + 1] ? cryptogram[i] + cryptogram[i + 1] : cryptogram[i];

        nextOutputBigram = matrixKey.getDecryptedBigram(nextInputBigram);

        decryptedText.push(nextOutputBigram);
    }

    return decryptedText.join('');
}