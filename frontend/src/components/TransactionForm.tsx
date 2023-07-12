import React, { ChangeEventHandler, useEffect, useState } from 'react';
import { TextField, Stack, Typography, Box, Snackbar, AlertProps } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton'
import { Address, useAccount, useBalance, useContractRead, useContractWrite, usePrepareContractWrite, useWaitForTransaction } from 'wagmi';
import contractConfig from '../contracts/contract-config.json'
import MuiAlert, { AlertColor } from '@mui/material/Alert';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const TransactionForm = () => {
  const account = useAccount()
  const [amount, setAmount] = useState<bigint>(0n);
  const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);
  const [snackbarText, setSnackbarText] = useState<string>('');
  const [severitySnackbar, setSeveritySnackbar] = useState<AlertColor>('error');
  const balance = useBalance({
    token: contractConfig[1].address as Address,
    address: account.address,
    watch: true,
  })

  const handleAmountChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    setAmount(BigInt(event.target.value) * 1000000000000000000n);
  };


  const handleCloseSnackbar = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenSnackbar(false);
  };

  const approveWrite = useContractWrite({
    address: contractConfig[1].address as Address,
    abi: contractConfig[1].abi,
    functionName: 'approve',
    onError(error) {
      setSeveritySnackbar('error')
      setOpenSnackbar(true)
      setSnackbarText(error.message || '')
    },
    onSuccess(data) {
      setSeveritySnackbar('success')
      setOpenSnackbar(true)
      setSnackbarText('Aprovação de valor concluída!')
    },
  })
  const waitApprove = useWaitForTransaction({ hash: approveWrite.data?.hash })

  const sharesData = useContractRead({
    address: contractConfig[0].address as Address,
    abi: contractConfig[0].abi,
    functionName: 'balanceOf',
    args: [account.address],
    watch: true
  })

  const depositWrite = useContractWrite({
    address: contractConfig[0].address as Address,
    abi: contractConfig[0].abi,
    functionName: 'deposit',
    onError(error) {
      setSeveritySnackbar('error')
      setOpenSnackbar(true)
      setSnackbarText(error.message || '')
    },
    onSuccess(data) {
      setSeveritySnackbar('success')
      setOpenSnackbar(true)
      setSnackbarText('Deposito efetuado com sucesso!')
    },
  })
  const waitDeposit = useWaitForTransaction({ hash: depositWrite.data?.hash })

  const withdrawWrite = useContractWrite({
    address: contractConfig[0].address as Address,
    abi: contractConfig[0].abi,
    functionName: 'withdraw',
    onError(error) {
      setSeveritySnackbar('error')
      setOpenSnackbar(true)
      setSnackbarText(error.message || '')
    },
    onSuccess(data) {
      setSeveritySnackbar('success')
      setOpenSnackbar(true)
      setSnackbarText('Saque efetuado com sucesso!')
    },
  })
  const waitWithdraw = useWaitForTransaction({ hash: withdrawWrite.data?.hash })
  
  const handleDeposit = () => {
    depositWrite.write({
      args: [BigInt(amount)],
    })
  };

  const handleWithdraw = () => {
    withdrawWrite.write({
      args: [BigInt(amount)],
    })
  };

  const handleApprove= () => {
    approveWrite.write({
      args: [contractConfig[0].address as Address, BigInt(amount)],
    })
  };

  return (
    <Box>
      <Stack direction="row" alignItems="center" spacing={2}>
        <TextField
          id="standard-number"
          label="Amount"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}  
          variant="standard"
          onChange={handleAmountChange} />

        <Typography variant="body1">Saldo: {balance.data?.formatted ?? 0}</Typography>
        <Typography variant="body1">Shares: {sharesData.data?.toString() ?? 0}</Typography>
      </Stack>
      <br />
      <Stack direction="row" spacing={2}>
          <LoadingButton loading={waitDeposit.isLoading || depositWrite.isLoading} variant="outlined" color="primary" onClick={handleDeposit}>
            Deposit
          </LoadingButton>
          <LoadingButton loading={waitWithdraw.isLoading || withdrawWrite.isLoading} variant="outlined" color="secondary" onClick={handleWithdraw}>
            Withdraw
          </LoadingButton>
          <LoadingButton loading={waitApprove.isLoading || approveWrite.isLoading} variant="outlined" color="warning" onClick={handleApprove}>
            Approve
          </LoadingButton>
      </Stack>
      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={severitySnackbar} sx={{ width: '100%' }}>
          {snackbarText}
        </Alert>
      </Snackbar>
    </Box>
    
  );
};

export default TransactionForm;