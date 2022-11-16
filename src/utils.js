import chalk from "chalk"
import fs from "fs/promises"
import moment from "moment"
import path from "path"
import request from "request"

const faucetUri = "https://faucet.testnet.sui.io/gas"

function requestFaucet(recipient) {
    request.post(
        faucetUri,
        {
            json: {
                FixedAmountRequest: {
                    recipient,
                },
            },
            headers: {
                accept: "*/*",
                "accept-language": "en-US,en;q=0.9",
                "cache-control": "no-cache",
                "content-type": "application/json",
                pragma: "no-cache",
                "sec-ch-ua": '"Google Chrome";v="107", "Chromium";v="107", "Not=A?Brand";v="24"',
                "sec-ch-ua-mobile": "?0",
                "sec-ch-ua-platform": '"macOS"',
                "sec-fetch-dest": "empty",
                "sec-fetch-mode": "cors",
                "sec-fetch-site": "none",
            },
        },
        function (error, response, body) {
            const { transferred_gas_objects } = body
            if (!error && response.statusCode == 201 && !transferred_gas_objects.error) {
                console.log(`[ ${moment().format("HH:mm:ss")} ] `, chalk.green("dapet sui 🐷"))
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
