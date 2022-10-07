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

const TambahSupplier = () => {
  const { user } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const [kodeSupplier, setKodeSupplier] = useState("");
  const [namaSupplier, setNamaSupplier] = useState("");
  const [alamatSupplier, setAlamatSupplier] = useState("");
  const [kotaSupplier, setKotaSupplier] = useState("");
  const [teleponSupplier, setTeleponSupplier] = useState("");
  const [picSupplier, setPicSupplier] = useState("");
  const [npwpSupplier, setNpwpSupplier] = useState("");
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
    const response = await axios.post(`${tempUrl}/suppliersNextLength`, {
      id: user._id,
      token: user.token
    });
    setKodeSupplier(response.data);
    setLoading(false);
  };

  const saveUser = async (e) => {
    e.preventDefault();
    if (namaSupplier.length === 0 || picSupplier.length === 0) {
      setError(true);
      setOpen(!open);
    } else {
      try {
        setLoading(true);
        await axios.post(`${tempUrl}/saveSupplier`, {
          namaSupplier,
          alamatSupplier,
          kotaSupplier,
          teleponSupplier,
          picSupplier,
          npwpSupplier,
          id: user._id,
          token: user.token
        });
        setLoading(false);
        navigate("/supplier");
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
        Tambah Supplier
      </Typography>
      <Divider sx={dividerStyle} />
      <Box sx={showDataContainer}>
        <Box sx={showDataWrapper}>
          <TextField
            id="outlined-basic"
            label="Kode Supplier"
            variant="outlined"
            value={kodeSupplier}
            InputProps={{
              readOnly: true
            }}
          />
          <TextField
            error={error && namaSupplier.length === 0 && true}
            helperText={
              error && namaSupplier.length === 0 && "Nama Supplier harus diisi!"
            }
            id="outlined-basic"
            label="Nama Supplier"
            variant="outlined"
            value={namaSupplier}
            sx={spacingTop}
            onChange={(e) => setNamaSupplier(e.target.value.toUpperCase())}
          />
          <TextField
            id="outlined-basic"
            label="Alamat Supplier"
            variant="outlined"
            value={alamatSupplier}
            sx={spacingTop}
            onChange={(e) => setAlamatSupplier(e.target.value.toUpperCase())}
          />
          <TextField
            id="outlined-basic"
            label="Kota Supplier"
            variant="outlined"
            value={kotaSupplier}
            sx={spacingTop}
            onChange={(e) => setKotaSupplier(e.target.value.toUpperCase())}
          />
        </Box>
        <Box sx={[showDataWrapper, { marginLeft: 4 }]}>
          <TextField
            id="outlined-basic"
            label="Telepon Supplier"
            variant="outlined"
            value={teleponSupplier}
            onChange={(e) => setTeleponSupplier(e.target.value.toUpperCase())}
          />
          <TextField
            error={error && picSupplier.length === 0 && true}
            helperText={
              error && picSupplier.length === 0 && "PIC Supplier harus diisi!"
            }
            id="outlined-basic"
            label="PIC Supplier"
            variant="outlined"
            value={picSupplier}
            sx={spacingTop}
            onChange={(e) => setPicSupplier(e.target.value.toUpperCase())}
          />
          <TextField
            id="outlined-basic"
            label="NPWP Supplier"
            variant="outlined"
            value={npwpSupplier}
            sx={spacingTop}
            onChange={(e) => setNpwpSupplier(e.target.value.toUpperCase())}
          />
        </Box>
      </Box>
      <Box sx={spacingTop}>
        <Button
          variant="outlined"
          color="secondary"
          onClick={() => navigate("/supplier")}
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

export default TambahSupplier;

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
