import { Accordion, AccordionDetails, AccordionSummary, Typography, Box } from "@mui/material";
import { useAccount } from "wagmi";
import { WagmiColection } from "./WagmiColection";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import TransactionForm from "./TransactionForm";

export function ContractInteractionList() {
    const { isConnected } = useAccount();
    
    return (
        <Box sx={{outerWidth: '80vw'}}>
            <Accordion disabled={!isConnected}>
                <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
                >
                    <Typography>Exemplos Contrato Hardhat</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <TransactionForm />
                </AccordionDetails>
            </Accordion>
            <Accordion disabled={!isConnected}>
                <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2a-content"
                id="panel2a-header"
                >
                    <Typography>Exemplos Wagmi</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <WagmiColection />
                </AccordionDetails>
            </Accordion>
        </Box>
    );
}