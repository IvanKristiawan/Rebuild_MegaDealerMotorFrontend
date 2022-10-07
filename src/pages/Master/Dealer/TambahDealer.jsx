import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
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
import SaveIcon from "@mui/icons-material/Save";

const TambahDealer = () => {
  const { user } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const [kodeDealer, setKodeDealer] = useState("");
  const [namaDealer, setNamaDealer] = useState("");
  const [alamatDealer, setAlamatDealer] = useState("");
  const [teleponDealer, setTeleponDealer] = useState("");
  const [PICDealer, setPICDealer] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  useEffect(() => {
    getNextLength();
  }, []);

  const getNextLength = async () => {
    setLoading(true);
    const response = await axios.post(`${tempUrl}/dealersNextLength`, {
      id: user._id,
      token: user.token
    });
    setKodeDealer(response.data);
    setLoading(false);
  };

  const saveUser = async (e) => {
    e.preventDefault();
    if (namaDealer.length === 0 || PICDealer.length === 0) {
      setError(true);
      setOpen(!open);
    } else {
      try {
        setLoading(true);
        await axios.post(`${tempUrl}/saveDealer`, {
          namaDealer,
          alamatDealer,
          teleponDealer,
          PICDealer,
          id: user._id,
          token: user.token
        });
        setLoading(false);
        navigate("/dealer");
      } catch (error) {
        console.log(error);
      }
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <Box sx={container}>
      <Typography color="#757575">Master</Typography>
      <Typography variant="h4" sx={subTitleText}>
        Tambah Dealer
      </Typography>
      <Divider sx={dividerStyle} />
      <Box sx={showDataContainer}>
        <Box sx={showDataWrapper}>
          <TextField
            id="outlined-basic"
            label="Kode Dealer"
            variant="outlined"
            value={kodeDealer}
            InputProps={{
              readOnly: true
            }}
          />
          <TextField
            error={error && namaDealer.length === 0 && true}
            helperText={
              error && namaDealer.length === 0 && "Nama Dealer harus diisi!"
            }
            id="outlined-basic"
            label="Nama Dealer"
            variant="outlined"
            value={namaDealer}
            sx={spacingTop}
            onChange={(e) => setNamaDealer(e.target.value.toUpperCase())}
          />
          <TextField
            id="outlined-basic"
            label="Alamat"
            variant="outlined"
            value={alamatDealer}
            sx={spacingTop}
            onChange={(e) => setAlamatDealer(e.target.value.toUpperCase())}
          />
        </Box>
        <Box sx={[showDataWrapper, { marginLeft: 4 }]}>
          <TextField
            id="outlined-basic"
            label="Telepon"
            variant="outlined"
            value={teleponDealer}
            onChange={(e) => setTeleponDealer(e.target.value.toUpperCase())}
          />
          <TextField
            error={error && PICDealer.length === 0 && true}
            helperText={
              error && PICDealer.length === 0 && "PIC Dealer harus diisi!"
            }
            id="outlined-basic"
            label="PIC"
            variant="outlined"
            value={PICDealer}
            sx={spacingTop}
            onChange={(e) => setPICDealer(e.target.value.toUpperCase())}
          />
        </Box>
      </Box>
      <Box sx={spacingTop}>
        <Button
          variant="outlined"
          color="secondary"
          onClick={() => navigate("/dealer")}
          sx={{ marginRight: 2 }}
        >
          {"< Kembali"}
        </Button>
        <Button variant="contained" startIcon={<SaveIcon />} onClick={saveUser}>
          Simpan
        </Button>
      </Box>
      <Divider sx={spacingTop} />
      {error && (
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="error" sx={alertBox}>
            Data belum terisi semua!
          </Alert>
        </Snackbar>
      )}
    </Box>
  );
};

export default TambahDealer;

const container = {
  p: 4
};

const subTitleText = {
  fontWeight: "900"
};

const dividerStyle = {
  mt: 2
};

const showDataContainer = {
  mt: 4,
  display: "flex",
  flexDirection: {
    xs: "column",
    sm: "row"
  }
};

const showDataWrapper = {
  display: "flex",
  flex: 1,
  flexDirection: "column",
  maxWidth: {
    md: "40vw"
  }
};

const spacingTop = {
  mt: 4
};

const alertBox = {
  width: "100%"
};
