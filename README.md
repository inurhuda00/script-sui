# script-sui

install depedencies

```
npm install
```

install global pm2

```
npm install pm2 -g
```

run faucet

```
pm2 start src/faucet.js --name sui-faucet --watch
```
