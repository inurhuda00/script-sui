import { getFile, requestFaucet } from "./utils.js"

async function main() {
    try {
        const wallets = await getFile("wallet.txt")
        wallets.forEach((wallet, index) => {
            setInterval(() => {
                requestFaucet(wallet)
            }, 1000)
        })
    } catch (err) {
        console.log(err)
    }
}

main()
