import chalk from "chalk"
import moment from "moment"
import request from "request"

recipient = "0x00caf2143062cf199354b759462a10d598510d96"

const asu = async () => {
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

setInterval(function () {
    asu()
}, 1000)
