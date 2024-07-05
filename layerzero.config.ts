import { EndpointId } from '@layerzerolabs/lz-definitions'

import type { OAppOmniGraphHardhat, OmniPointHardhat } from '@layerzerolabs/toolbox-hardhat'

const sepoliaContract: OmniPointHardhat = {
    eid: EndpointId.SEPOLIA_V2_TESTNET,
    contractName: 'MyOFT',
}

const fujiContract: OmniPointHardhat = {
    eid: EndpointId.AVALANCHE_V2_TESTNET,
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
        {
            contract: polygonContract,
        },
        {
            contract: auroraContract,
        },
    ],
    connections: [
        // testnet pathways
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
        // mainnet pathways
        {
            from: auroraContract,
            to: polygonContract,
            // config: {
            //     sendLibrary: '0x1aCe9DD1BC743aD036eF2D92Af42Ca70A1159df5',
            //     receiveLibraryConfig: {
            //         receiveLibrary: '0x000CC1A759bC3A15e664Ed5379E321Be5de1c9B6',
            //         gracePeriod: BigInt(0),
            //     },
            //     sendConfig: {
            //         executorConfig: {
            //             maxMessageSize: 10000,
            //             executor: '0xA2b402FFE8dd7460a8b425644B6B9f50667f0A61',
            //         },
            //         ulnConfig: {
            //             confirmations: BigInt(512),
            //             requiredDVNs: [
            //                 '0xd4a903930f2c9085586cda0b11d9681eecb20d2f',
            //                 '0xdd7b5e1db4aafd5c8ec3b764efb8ed265aa5445b',
            //             ],
            //         },
            //     },
            //     receiveConfig: {
            //         ulnConfig: {
            //             confirmations: BigInt(512),
            //             requiredDVNs: [
            //                 '0xd4a903930f2c9085586cda0b11d9681eecb20d2f',
            //                 '0xdd7b5e1db4aafd5c8ec3b764efb8ed265aa5445b',
            //             ],
            //         },
            //     },
            // },
        },

        {
            from: polygonContract,
            to: auroraContract,
            // config: {
            //     sendLibrary: '0x6c26c61a97006888ea9E4FA36584c7df57Cd9dA3',
            //     receiveLibraryConfig: {
            //         receiveLibrary: '0x1322871e4ab09Bc7f5717189434f97bBD9546e95',
            //         gracePeriod: BigInt(0),
            //     },
            //     sendConfig: {
            //         executorConfig: {
            //             maxMessageSize: 10000,
            //             executor: '0xCd3F213AD101472e1713C72B1697E727C803885b',
            //         },
            //         ulnConfig: {
            //             confirmations: BigInt(512),
            //             requiredDVNs: [
            //                 '0x23de2fe932d9043291f870324b74f820e11dc81a',
            //                 '0x25e0e650a78e6304a3983fc4b7ffc6544b1beea6',
            //             ],
            //         },
            //     },
            //     receiveConfig: {
            //         ulnConfig: {
            //             confirmations: BigInt(512),
            //             requiredDVNs: [
            //                 '0x23de2fe932d9043291f870324b74f820e11dc81a',
            //                 '0x25e0e650a78e6304a3983fc4b7ffc6544b1beea6',
            //             ],
            //         },
            //     },
            // },
        },
    ],
}

export default config
