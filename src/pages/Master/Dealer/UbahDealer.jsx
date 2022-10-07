import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../../contexts/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
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
import EditIcon from "@mui/icons-material/Edit";

const UbahDealer = () => {
  const { user } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const [kodeDealer, setKodeDealer] = useState("");
  const [namaDealer, setNamaDealer] = useState("");
  const [alamatDealer, setAlamatDealer] = useState("");
  const [teleponDealer, setTeleponDealer] = useState("");
  const [PICDealer, setPICDealer] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  useEffect(() => {
    getUserById();
  }, []);

  const getUserById = async () => {
    setLoading(true);
    const response = await axios.post(`${tempUrl}/dealers/${id}`, {
      id: user._id,
      token: user.token
    });
    setKodeDealer(response.data.kodeDealer);
    setNamaDealer(response.data.namaDealer);
    setAlamatDealer(response.data.alamatDealer);
    setTeleponDealer(response.data.teleponDealer);
    setPICDealer(response.data.PICDealer);
    setLoading(false);
  };

  const updateUser = async (e) => {
    e.preventDefault();
    if (namaDealer.length === 0 || PICDealer.length === 0) {
      setError(true);
      setOpen(!open);
    } else {
      try {
        setLoading(true);
        await axios.post(`${tempUrl}/updateDealer/${id}`, {
          namaDealer,
          alamatDealer,
          teleponDealer,
          PICDealer,
          id: user._id,
          token: user.token
        });
        setLoading(false);
        navigate(`/dealer/${id}`);
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
        Ubah Dealer
      </Typography>
      <Divider sx={dividerStyle} />
      <Box sx={showDataContainer}>
        <Box sx={showDataWrapper}>
          <TextField
            error={error && kodeDealer.length === 0 && true}
            helperText={error && kodeDealer.length === 0 && "Kode harus diisi!"}
            id="outlined-basic"
            label="Kode"
            variant="outlined"
            value={kodeDealer}
            InputProps={{
              readOnly: true
            }}
            onChange={(e) => setKodeDealer(e.target.value)}
          />
          <TextField
            error={error && namaDealer.length === 0 && true}
            helperText={
              error && namaDealer.length === 0 && "Nama Dealer harus diisi!"
            }
            id="outlined-basic"
            label="Nama Dealer"
            variant="outlined"
            sx={spacingTop}
            value={namaDealer}
            onChange={(e) => setNamaDealer(e.target.value.toUpperCase())}
          />
          <TextField
            id="outlined-basic"
            label="Alamat"
            variant="outlined"
            sx={spacingTop}
            value={alamatDealer}
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
            sx={spacingTop}
            value={PICDealer}
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
        <Button
          variant="contained"
          startIcon={<EditIcon />}
          onClick={updateUser}
        >
          Ubah
        </Button>
      </Box>
      <Divider sx={dividerStyle} />
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

export default UbahDealer;

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
