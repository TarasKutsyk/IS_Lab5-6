const math = require('mathjs');
const {matrixRowCount, matrixColumnCount} = require('../config');

module.exports = class MatrixKey {
    constructor(alphabet) {
        if (matrixRowCount * matrixColumnCount !== alphabet.length) {
            throw new Error('Invalid matrix dimensions specified');
        }

        const shuffledAlphabet = this.shuffleAlphabet(alphabet);
        this.matrix = this.createMatrix(shuffledAlphabet);
    }

    shuffleAlphabet(alphabet) {
        let shuffledAlphabet = alphabet.split('');

        let currentIndex = shuffledAlphabet.length, randomIndex;

        while (currentIndex !== 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            [shuffledAlphabet[currentIndex], shuffledAlphabet[randomIndex]] =
                [shuffledAlphabet[randomIndex], shuffledAlphabet[currentIndex]];
        }

        return shuffledAlphabet;
    }

    createMatrix(shuffledAlphabet) {
        const matrixRows = [];
        let newRow;

        for (let i = 0; i < shuffledAlphabet.length; i += matrixColumnCount) {
            newRow = shuffledAlphabet.slice(i, i + matrixColumnCount);
            matrixRows.push(newRow);
        }

        return math.matrix(matrixRows);
    }

    print() {
        let row = '';
        for (let i = 0; i < matrixRowCount; i++) {
            for (let j = 0; j < matrixColumnCount; j++) {
                row += this.matrix._data[i][j] + ' ';
            }

            console.log(row);
            row = '';
        }
    }
    
    getLetterByIndex(i, j) {
        return this.matrix.subset(math.index(i, j));
    }

    getIndicesOfLetter(letter) {
        for (let i = 0; i < matrixRowCount; i++) {
            for (let j = 0; j < matrixColumnCount; j++) {
                if (this.matrix._data[i][j] === letter) {
                    return [i, j];
                }
            }
        }
    }

    getIndicesOfBigram(bigram) {
        return [this.getIndicesOfLetter(bigram[0]), this.getIndicesOfLetter(bigram[1])]
    }
    
    getBigramByIndices(i_1, j_1, i_2, j_2)
    {
        return this.getLetterByIndex(i_1, j_1) + this.getLetterByIndex(i_2, j_2);
    }

    getEncryptedBigram(inputBigram) {
        if (inputBigram.length === 1) {
            const [i, j] = this.getIndicesOfLetter(inputBigram);

            return this.getLetterByIndex(i, (j + 1) % matrixColumnCount);
        }

        const [[i_1, j_1], [i_2, j_2]] = this.getIndicesOfBigram(inputBigram);
        let result_i_1, result_i_2, result_j_1, result_j_2;

        if (i_1 !== i_2 && j_1 !== j_2) {
            result_i_1 = i_2;
            result_j_1 = j_1;

            result_i_2 = i_1;
            result_j_2 = j_2;
        }
        else if (i_1 === i_2) {
            result_i_1 = result_i_2 = i_1;

            result_j_1 = (j_1 + 1) % matrixColumnCount;
            result_j_2 = (j_2 + 1) % matrixColumnCount;
        }
        else if (j_1 === j_2) {
            result_j_1 = result_j_2 = j_1;

            result_i_1 = (i_1 + 1) % matrixRowCount;
            result_i_2 = (i_2 + 1) % matrixRowCount;
        }

        return this.getBigramByIndices(result_i_1, result_j_1, result_i_2, result_j_2);
    }

    getDecryptedBigram(inputBigram) {
        if (inputBigram.length === 1) {
            const [i, j] = this.getIndicesOfLetter(inputBigram);

            return this.getLetterByIndex(i, (j - 1) >= 0 ? j - 1 : matrixColumnCount - 1);
        }

        const [[i_1, j_1], [i_2, j_2]] = this.getIndicesOfBigram(inputBigram);
        let result_i_1, result_i_2, result_j_1, result_j_2;

        if (i_1 !== i_2 && j_1 !== j_2) {
            result_i_1 = i_2;
            result_j_1 = j_1;

            result_i_2 = i_1;
            result_j_2 = j_2;
        }
        else if (i_1 === i_2) {
            result_i_1 = result_i_2 = i_1;

            result_j_1 = (j_1 - 1) >= 0 ? j_1 - 1 : matrixColumnCount - 1;
            result_j_2 = (j_2 - 1) >= 0 ? j_2 - 1 : matrixColumnCount - 1;
        }
        else if (j_1 === j_2) {
            result_j_1 = result_j_2 = j_1;

            result_i_1 = (i_1 - 1) >= 0 ? i_1 - 1 : matrixRowCount - 1;
            result_i_2 = (i_2 - 1) >= 0 ? i_2 - 1 : matrixRowCount - 1;
        }

        return this.getBigramByIndices(result_i_1, result_j_1, result_i_2, result_j_2);
    }
}