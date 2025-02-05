// Get the environment configuration from .env file
//
// To make use of automatic environment setup:
// - Duplicate .env.example file and name it .env
// - Fill in the environment variables
import 'dotenv/config'

import 'hardhat-deploy'
import 'hardhat-contract-sizer'
import '@nomiclabs/hardhat-ethers'
import '@layerzerolabs/toolbox-hardhat'
import { HardhatUserConfig, HttpNetworkAccountsUserConfig, NetworksUserConfig } from 'hardhat/types'

import { EndpointId } from '@layerzerolabs/lz-definitions'

import './tasks'

// Set your preferred authentication method
//
// If you prefer using a mnemonic, set a MNEMONIC environment variable
// to a valid mnemonic
const MNEMONIC = process.env.MNEMONIC

// If you prefer to be authenticated using a private key, set a PRIVATE_KEY environment variable
const PRIVATE_KEY = process.env.PRIVATE_KEY

const accounts: HttpNetworkAccountsUserConfig | undefined = MNEMONIC
    ? { mnemonic: MNEMONIC }
    : PRIVATE_KEY
      ? [PRIVATE_KEY]
      : undefined

if (accounts == null) {
    console.warn(
        'Could not find MNEMONIC or PRIVATE_KEY environment variables. It will not be possible to execute transactions in your example.'
    )
}

const networks: NetworksUserConfig =
    process.env.ENV === 'production'
        ? {
              polygon: {
                  eid: EndpointId.POLYGON_V2_MAINNET,
                  url: process.env.RPC_URL_POLYGON || 'https://polygon.llamarpc.com',
                  accounts,
              },
              aurora: {
                  eid: EndpointId.AURORA_V2_MAINNET,
                  url: process.env.RPC_URL_AURORA_MAINNET || 'https://mainnet.aurora.dev',
                  accounts,
              },
          }
        : {
              sepolia: {
                  eid: EndpointId.SEPOLIA_V2_TESTNET,
                  url: process.env.RPC_URL_SEPOLIA || 'https://rpc.sepolia.org/',
                  accounts,
              },
              amoy: {
                  eid: EndpointId.AMOY_V2_TESTNET,
                  url: process.env.RPC_URL_AMOY || 'https://polygon-amoy-bor-rpc.publicnode.com',
                  accounts,
              },
              auroratestnet: {
                  eid: EndpointId.AURORA_V2_TESTNET,
                  url: process.env.RPC_URL_AURORA_TESTNET || 'https://testnet.aurora.dev',
                  accounts,
              },
          }

const config: HardhatUserConfig = {
    solidity: {
        compilers: [
            {
                version: '0.8.22',
                settings: {
                    optimizer: {
                        enabled: true,
                        runs: 200,
                    },
                },
            },
        ],
    },
    networks,
    namedAccounts: {
        deployer: {
            default: 0, // wallet address of index[0], of the mnemonic in .env
        },
    },
}

export default config
