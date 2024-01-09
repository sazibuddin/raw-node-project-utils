const fs = require('fs');
const patch = require('path');

const lib = {};

// base directory of the data folder.
lib.baseDir = patch.join(__dirname, '/../.data/');
// write data to file
lib.create = function (dir, file, data, callback) {
    fs.open(lib.baseDir+dir+'/'+file+'.json', 'wx', function (err, fileDescriptor) {
        if(!err && fileDescriptor) {
            const stringData = JSON.stringify(data);
            fs.writeFile(fileDescriptor, stringData, function (err) {
                if(!err) {
                    fs.close(fileDescriptor, function (err) {
                        if(!err) {
                            callback(false);
                        }else {
                            callback("Error to closing file!");
                        }
                    })
                }else {
                    callback("Error writing to new file");
                }
            })
        }else {
            callback(err);
        }
    });
}

// read data from file
lib.read = (dir, file, callback) => {
    fs.readFile(lib.baseDir+dir+'/'+file+'.json', 'utf-8', function (err, data) {
        callback(err, data);
    })
}

// update the file
lib.update = function (dir, file, data, callback) {
    fs.open(lib.baseDir+dir+'/'+file+'.json', 'r+', function (err, fileDescriptor) {
        if(!err && fileDescriptor) {
            const stringData = JSON.stringify(data);
            fs.ftruncate(fileDescriptor, function (err) {
                if(!err) {
                    fs.writeFile(fileDescriptor, stringData, function (err) {
                        if(!err) {
                            fs.close(fileDescriptor, function (err) {
                                if(!err) {
                                    callback(false);
                                }else {
                                    callback("Error to closing file!");
                                }
                            })
                        }else {
                            callback("Error writing to new file");
                        }
                    })
                }else {
                    callback('Error to truncate the file!')
                }
            })
        }else {
            callback(err);
        }
    })
}

// delete existing file
lib.delete = function (dir, file, callback) {
    fs.unlink(`${lib.baseDir} ${dir} ${file}.json`, (err) => {
        if(!err) {
            callback(false);
        }else {
            callback("Error deleting file!");
        }
    })
}

//export the module
module.exports = lib;