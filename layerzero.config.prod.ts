import { EndpointId } from '@layerzerolabs/lz-definitions'

import type { OAppOmniGraphHardhat, OmniPointHardhat } from '@layerzerolabs/toolbox-hardhat'

const polygonContract: OmniPointHardhat = {
    eid: EndpointId.POLYGON_V2_MAINNET,
    contractName: 'MyOFT',
}

const auroraContract: OmniPointHardhat = {
    eid: EndpointId.AURORA_V2_MAINNET,
    contractName: 'MyOFT',
}

const config: OAppOmniGraphHardhat = {
    contracts: [
        {
            contract: polygonContract,
        },
        {
            contract: auroraContract,
        },
    ],
    connections: [
        {
            from: auroraContract,
            to: polygonContract,
        },
        {
            from: polygonContract,
            to: auroraContract,
        },
    ],
}

export default config
