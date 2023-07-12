import { getDefaultWallets } from '@rainbow-me/rainbowkit'
import { configureChains, createConfig } from 'wagmi'
import { hardhat, sepolia, mainnet } from 'wagmi/chains'
import { publicProvider } from 'wagmi/providers/public'
import { alchemyProvider } from 'wagmi/providers/alchemy'

const walletConnectProjectId = '8357e233f452d783ce19a83b8bef7928'

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [hardhat, sepolia, mainnet],
  [
    alchemyProvider({apiKey: import.meta.env.VITE_ALCHEMY_API_KEY ?? ''}),
    publicProvider(),
  ],
)

const { connectors } = getDefaultWallets({
  appName: 'web3-template',
  chains,
  projectId: walletConnectProjectId,
})

export const config = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient,
})

export { chains }
