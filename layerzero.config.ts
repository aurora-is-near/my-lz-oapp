import { EndpointId } from '@layerzerolabs/lz-definitions'

import type { OAppOmniGraphHardhat, OmniPointHardhat } from '@layerzerolabs/toolbox-hardhat'

const sepoliaContract: OmniPointHardhat = {
    eid: EndpointId.SEPOLIA_V2_TESTNET,
    contractName: 'MyOFT',
}

const amoyContract: OmniPointHardhat = {
    eid: EndpointId.AMOY_V2_TESTNET,
    contractName: 'MyOFT',
}

const auroraTestnetContract: OmniPointHardhat = {
    eid: EndpointId.AURORA_V2_TESTNET,
    contractName: 'MyOFT',
}

const config: OAppOmniGraphHardhat = {
    contracts: [
        {
            contract: sepoliaContract,
        },
        {
            contract: amoyContract,
        },
        {
            contract: auroraTestnetContract,
        },
    ],
    connections: [
        {
            from: sepoliaContract,
            to: amoyContract,
        },
        {
            from: sepoliaContract,
            to: auroraTestnetContract,
        },
        {
            from: amoyContract,
            to: sepoliaContract,
        },
        {
            from: amoyContract,
            to: auroraTestnetContract,
        },
        {
            from: auroraTestnetContract,
            to: amoyContract,
        },
        {
            from: auroraTestnetContract,
            to: sepoliaContract,
        },
    ],
}

export default config
