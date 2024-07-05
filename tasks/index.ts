import { task } from 'hardhat/config'

import { createGetHreByEid, createProviderFactory, getEidForNetworkName } from '@layerzerolabs/devtools-evm-hardhat'
import { Options } from '@layerzerolabs/lz-v2-utilities'

import amoyDeployment from '../deployments/amoy/MyOFT.json'
import auroraTestnetDeployment from '../deployments/auroratestnet/MyOFT.json'
import sepoliaDeployment from '../deployments/sepolia/MyOFT.json'

type Deployment = typeof sepoliaDeployment
type Network = 'auroratestnet' | 'sepolia' | 'amoy'

const deployments: Record<Network, Deployment> = {
    auroratestnet: auroraTestnetDeployment,
    sepolia: sepoliaDeployment,
    amoy: amoyDeployment,
}

// send messages from a contract on one network to another
task('oft:send', 'test send')
    // network that sender contract resides on
    .addParam('networkA', 'name of the network A')
    // network that receiver contract resides on
    .addParam('networkB', 'name of the network B')
    // message to send from network a to network b
    .addParam('amount', 'amount to send from network A to network B')
    .setAction(async (taskArgs, { ethers }) => {
        const eidA = getEidForNetworkName(taskArgs.networkA)
        const eidB = getEidForNetworkName(taskArgs.networkB)
        const contractA = deployments[taskArgs.networkA as Network]
        const environmentFactory = createGetHreByEid()
        const providerFactory = createProviderFactory(environmentFactory)
        const signer = (await providerFactory(eidA)).getSigner()

        const oappContractFactory = await ethers.getContractFactory('MyOFT', signer)
        const oapp = oappContractFactory.attach(contractA.address)

        const options = Options.newOptions().addExecutorLzReceiveOption(200000, 0).toHex().toString()

        // Defining the amount of tokens to send and constructing the parameters for the send operation
        const tokensToSend = ethers.utils.parseEther(taskArgs.amount)

        const ownerA = await signer.getAddress()
        const ownerB = ownerA
        const sendParam = [eidB, ethers.utils.zeroPad(ownerB, 32), tokensToSend, tokensToSend, options, '0x', '0x']

        // Fetching the native fee for the token send operation
        const [nativeFee] = await oapp.quoteSend(sendParam, false)
        console.log('native fee:', nativeFee)

        const r = await oapp.send(sendParam, [nativeFee, 0], ownerA, { value: nativeFee })

        console.log(`Tx initiated. See: https://layerzeroscan.com/tx/${r.hash}`)
    })

task('oft:state', 'read state of MyOFT').setAction(async (taskArgs, { ethers }) => {
    const environmentFactory = createGetHreByEid()
    const providerFactory = createProviderFactory(environmentFactory)
    const networks: Network[] = ['auroratestnet', 'sepolia', 'amoy']

    const state = []
    for (const network of networks) {
        const eid = getEidForNetworkName(network)
        const contractAddress = deployments[network].address
        const networkSigner = (await providerFactory(eid)).getSigner()

        const contractFactory = await ethers.getContractFactory('MyOFT', networkSigner)

        const contract = contractFactory.attach(contractAddress)
        const contractState = {
            network,
            contractAddress,
            decimals: await contract.decimals(),
            totalSupply: await contract.totalSupply(),
        }
        state.push(contractState)
    }

    console.log(state)
})
