import React, { ChangeEventHandler, useEffect, useState } from "react";
import {
  TextField,
  Typography,
  Box,
  Snackbar,
  AlertProps,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import {
  Address,
  useAccount,
  useBalance,
  useContractWrite,
  useWaitForTransaction,
} from "wagmi";
import contractConfig from "../contracts/contract-config.json";
import MuiAlert, { AlertColor } from "@mui/material/Alert";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert( props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const TransactionForm = () => {
  const account = useAccount();
  const [recipient, setRecipient] = useState<string>("");
  const [amount, setAmount] = useState<bigint>(0n);
  const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);
  const [snackbarText, setSnackbarText] = useState<string>("");
  const [severitySnackbar, setSeveritySnackbar] = useState<AlertColor>("error");
  const balance = useBalance({
    token: contractConfig.address as Address,
    address: account.address,
    watch: true,
  });

  const handleAmountChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    setAmount(BigInt(event.target.value) * 1000000000000000000n);
  };

  const handleCloseSnackbar = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnackbar(false);
  };

  const sendTokenWrite = useContractWrite({
    address: contractConfig.address as Address,
    abi: contractConfig.abi,
    functionName: "transfer",
    onError(error) {
      setSeveritySnackbar("error");
      setOpenSnackbar(true);
      setSnackbarText(error.message || "");
    },
    onSuccess(data) {
      setSeveritySnackbar("success");
      setOpenSnackbar(true);
      setSnackbarText("Transferencia efetuada com sucesso!");
    },
  });

  const waitSendToken = useWaitForTransaction({
    hash: sendTokenWrite.data?.hash,
  });

  const handleSendToken = () => {
    sendTokenWrite.write({
      args: [recipient as Address, BigInt(amount)],
    });
  };

  const handleRecipientChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    setRecipient(event.target.value);
  };
  return (
    <Box
      component="form"
      sx={{ "& .MuiTextField-root": { m: 1, width: "30ch" } }}
      noValidate
      autoComplete="off"
    >
      <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
        ERC-20
      </Typography>
      <Typography variant="h5" component="div">
        Balance: {balance.data?.formatted ?? 0}
      </Typography>
      <TextField
        id="standard-number"
        label="Amount"
        type="number"
        variant="filled"
        onChange={handleAmountChange}
      />
      <TextField
        label="Recipient"
        type="text"
        variant="filled"
        onChange={handleRecipientChange}
      />
      <br />
      <LoadingButton
        loading={waitSendToken.isLoading || waitSendToken.isLoading}
        variant="outlined"
        color="warning"
        onClick={handleSendToken}
      >
        SendToken
      </LoadingButton>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={severitySnackbar}
          sx={{ width: "100%" }}
        >
          {snackbarText}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default TransactionForm;