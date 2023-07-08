# Ray Dex Core Smart Contract V2

Core smart contracts of raydex protocol. Built to be deployed on PulseChain Network.

### Installation, building and running

Git clone, then from the project root execute command

```shell
yarn install
```

#### Tests

Target to run all the tests found in the `/test` directory, transpiled as necessary.

```shell
npx hardhat test
```

Run a single test (or a regex of tests), then pass in as an argument.

```shell
 npx hardhat test \test/RayDex.js || npx hardhat test .\test\sample.test.ts
```

#### Scripts

The TypeScript transpiler will automatically as needed, execute through HardHat for the instantiated environment

```shell
npx hardhat nodenpx hardhat run scripts/deploy.js --network testnet
```
