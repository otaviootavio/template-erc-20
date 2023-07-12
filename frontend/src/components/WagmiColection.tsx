import { Box, Divider, Stack, Typography } from "@mui/material";
import { Account } from "./wagmi-examples/Account";
import { Balance } from "./wagmi-examples/Balance";
import { BlockNumber } from "./wagmi-examples/BlockNumber";
import { NetworkSwitcher } from "./wagmi-examples/NetworkSwitcher";
import { ReadContract } from "./wagmi-examples/ReadContract";
import { ReadContracts } from "./wagmi-examples/ReadContracts";
import { ReadContractsInfinite } from "./wagmi-examples/ReadContractsInfinite";
import { SendTransaction } from "./wagmi-examples/SendTransaction";
import { SendTransactionPrepared } from "./wagmi-examples/SendTransactionPrepared";
import { SignMessage } from "./wagmi-examples/SignMessage";
import { SignTypedData } from "./wagmi-examples/SignTypedData";
import { Token } from "./wagmi-examples/Token";
import { WatchContractEvents } from "./wagmi-examples/WatchContractEvents";
import { WatchPendingTransactions } from "./wagmi-examples/WatchPendingTransactions";
import { WriteContract } from "./wagmi-examples/WriteContract";
import { WriteContractPrepared } from "./wagmi-examples/WriteContractPrepared";

export function WagmiColection() {
    return (
        
        <Stack
        direction="column"
        justifyContent="center"
        alignItems="flex-start"
        spacing={2}
        divider={<Divider orientation="horizontal" flexItem />}
        >
          <Box>
            <Typography variant="h5">Network</Typography>
            <NetworkSwitcher />
          </Box>
          
          <Box>
          <Typography variant="h5">Account</Typography>
          <Account />
          </Box>
          
          <Box>
          <Typography variant="h5">Balance</Typography>
          <Balance />
          </Box>
          
          <Box>
          <Typography variant="h5">Block Number</Typography>
          <BlockNumber />
          </Box>
          
          <Box>
          <Typography variant="h5">Read Contract</Typography>
          <ReadContract />
          </Box>
          
          <Box>
          <Typography variant="h5">Read Contracts</Typography>
          <ReadContracts />
          </Box>
          
          <Box>
          <Typography variant="h5">Read Contracts Infinite</Typography>
          <ReadContractsInfinite />
          </Box>
          
          <Box>
          <Typography variant="h5">Send Transaction</Typography>
          <SendTransaction />
          </Box>
          
          <Box>
          <Typography variant="h5">Send Transaction (Prepared)</Typography>
          <SendTransactionPrepared />
          </Box>
          
          <Box>
          <Typography variant="h5">Sign Message</Typography>
          <SignMessage />
          </Box>
          
          <Box>
          <Typography variant="h5">Sign Typed Data</Typography>
          <SignTypedData />
          </Box>
          
          <Box>
          <Typography variant="h5">Token</Typography>
          <Token />
          </Box>
          
          <Box>
          <Typography variant="h5">Watch Contract Events</Typography>
          <WatchContractEvents />
          </Box>
          
          <Box>
          <Typography variant="h5">Watch Pending Transactions</Typography>
          <WatchPendingTransactions />
          </Box>
          
          <Box>
          <Typography variant="h5">Write Contract</Typography>
          <WriteContract />
          </Box>
          
          <Box>
          <Typography variant="h5">Write Contract (Prepared)</Typography>
          <WriteContractPrepared />
          </Box>
        </Stack>
    )
  }