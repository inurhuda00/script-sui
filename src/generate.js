import { exec } from "child_process"
import fs from "fs"

function generateNewWallet() {
    exec("sui client new-address ed25519", (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`)
            return
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`)
            return
        }

        saveNewWalletFromStdout(stdout)
    })
}

function saveNewWalletFromStdout(string) {
    let matches = string.match(/\[(.*?)\]/g)
    let wallet = []
    for (let i = 0; i < matches.length; i++) {
        let str = matches[i]
        wallet.push(str.substring(1, str.length - 1))
    }

    fs.appendFile("src/wallet.txt", `${wallet[0]} \r\n`, function (err) {
        if (err) return console.log(err)
    })

    fs.appendFile("src/backup.txt", `${wallet.join(", ")} \r\n`, function (err) {
        if (err) return console.log(err)
    })
}

let i = 0
while (i < 40) {
    generateNewWallet()
    i++
}
