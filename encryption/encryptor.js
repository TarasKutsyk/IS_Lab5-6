module.exports = (inputText, matrixKey) => {
    let encryptedText = [];
    let nextOutputBigram, nextInputBigram;

    for (let i = 0; i < inputText.length; i += 2) {
        nextInputBigram = inputText[i + 1] ? inputText[i] + inputText[i + 1] : inputText[i];

        nextOutputBigram = matrixKey.getEncryptedBigram(nextInputBigram);

        encryptedText.push(nextOutputBigram);
    }

    return encryptedText.join('');
}