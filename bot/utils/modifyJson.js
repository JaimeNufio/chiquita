const fs = require('fs')

class modifyJson {
  writeJson (filename, Obj) {
    // const currentObj = this.readJson(filename)

    fs.writeFile(filename, JSON.stringify(Obj), function (err) {
      if (err) {
        console.log(err)
      }
    })
  }

  readJson (filename) {
    const currentFile = fs.readFile(filename, function (err) {
      if (err) {
        console.log(err)
      }
    })

    return JSON.parse(currentFile)
  }
}

module.exports = modifyJson
