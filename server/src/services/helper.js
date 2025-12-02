const fs = require('fs');   // This is the correct module

const deleteFile = (file) => {
    const filePath = './assets/' + file;

    // Check if the file exists
    if (!fs.existsSync(filePath)) {
        throw {
            code: 404,
            status: 'File already deleted',
            message: 'File does not exist'
        };
    }

    // Delete the file
    fs.unlinkSync(filePath);

    return;
};

const randomNumberGeneration = (num) => {
    let value = []
    let char = '1234567890qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM'

    for (let i = 0; i < num; i++) {
        let pos = Math.floor(Math.random() * char.length)
        value.push(char[pos])
    }

    return value.join('');
}

module.exports = {
    deleteFile,
    randomNumberGeneration
};