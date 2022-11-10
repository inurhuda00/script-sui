import chalk from "chalk"
import fs from "fs/promises"
import moment from "moment"
import path from "path"
import request from "request"

function requestFaucet(recipient) {
    request.post(
        "https://faucet.devnet.sui.io/gas",
        {
            json: {
                FixedAmountRequest: {
                    recipient,
                },
            },
        },
        function (error, response, body) {
            if (!error && response.statusCode == 200) {
                console.log(`[ ${moment().format("HH:mm:ss")} ] `, chalk.green("claim"))
            }
        }
    )
}

async function getFile(filename) {
    let data = await fs.readFile(path.resolve(process.cwd(), "src", filename), {
        encoding: "utf8",
    })
    return data.toString().split("\n")
}

export { requestFaucet, getFile }
