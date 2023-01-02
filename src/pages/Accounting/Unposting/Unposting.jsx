import React, { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../../contexts/AuthContext";
import { tempUrl } from "../../../contexts/ContextProvider";
import { Loader } from "../../../components";
import {
  Box,
  Typography,
  TextField,
  Button,
  Divider,
  Snackbar,
  Alert
} from "@mui/material";
import DeleteSweepIcon from "@mui/icons-material/DeleteSweep";

const Unposting = () => {
  const { user } = useContext(AuthContext);
  let curr = new Date();
  let date = curr.toISOString().substring(0, 10);
  const [dariTgl, setDariTgl] = useState(date);
  const [sampaiTgl, setSampaiTgl] = useState(date);

  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [vertical] = useState("bottom");
  const [horizontal] = useState("center");

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const unposting = async () => {
    setLoading(true);
    // Jurnal Unposting Pembelian
    await axios.post(`${tempUrl}/jurnalUnposting`, {
      dariTgl,
      sampaiTgl,
      id: user._id,
      token: user.token,
      kodeCabang: user.cabang._id
    });
    setLoading(false);
    setOpen(true);
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <Box sx={container}>
      <Typography color="#757575">Accounting</Typography>
      <Typography variant="h4" sx={subTitleText}>
        Unposting
      </Typography>
      <Divider sx={dividerStyle} />
      <Box sx={showDataWrapper}>
        <Typography sx={[labelInput, spacingTop]}>Dari Tanggal</Typography>
        <TextField
          type="date"
          size="small"
          error={error && dariTgl.length === 0 && true}
          helperText={
            error && dariTgl.length === 0 && "Dari Tanggal harus diisi!"
          }
          id="outlined-basic"
          variant="outlined"
          value={dariTgl}
          onChange={(e) => setDariTgl(e.target.value)}
        />
        <Typography sx={[labelInput, spacingTop]}>Sampai Tanggal</Typography>
        <TextField
          type="date"
          size="small"
          error={error && sampaiTgl.length === 0 && true}
          helperText={
            error && sampaiTgl.length === 0 && "Sampai Tanggal harus diisi!"
          }
          id="outlined-basic"
          variant="outlined"
          value={sampaiTgl}
          onChange={(e) => setSampaiTgl(e.target.value)}
        />
      </Box>
      <Box sx={spacingTop}>
        <Button
          variant="contained"
          startIcon={<DeleteSweepIcon />}
          onClick={() => unposting()}
        >
          UNPOSTING
        </Button>
      </Box>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical, horizontal }}
        key={vertical + horizontal}
      >
        <Alert
          onClose={handleClose}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          Jurnal berhasil diunposting!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Unposting;

const container = {
  p: 4
};

const subTitleText = {
  fontWeight: "900"
};

const dividerStyle = {
  mt: 2
};

const spacingTop = {
  mt: 4
};

const labelInput = {
  fontWeight: "600",
  marginLeft: 1
};

const showDataWrapper = {
  display: "flex",
  flex: 1,
  flexDirection: "column",
  maxWidth: {
    md: "40vw"
  }
};
