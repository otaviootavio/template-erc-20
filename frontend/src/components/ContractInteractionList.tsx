import {
  AccordionDetails,
  Box,
} from "@mui/material";
import { useAccount } from "wagmi";
import TransactionForm from "./TransactionForm";

export function ContractInteractionList() {
  const { isConnected } = useAccount();

  return (
    <Box sx={{ outerWidth: "80vw" }}>
      <AccordionDetails>
        <TransactionForm />
      </AccordionDetails>
    </Box>
  );
}
