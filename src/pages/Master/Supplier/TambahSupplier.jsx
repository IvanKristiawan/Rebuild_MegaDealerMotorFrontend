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
  Alert,
  Paper
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import { Colors } from "../../../constants/styles";

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
      <Paper sx={contentContainer} elevation={12}>
        <Box sx={showDataContainer}>
          <Box sx={showDataWrapper}>
            <Typography sx={labelInput}>Kode Supplier</Typography>
            <TextField
              size="small"
              id="outlined-basic"
              variant="outlined"
              value={kodeSupplier}
              InputProps={{
                readOnly: true
              }}
              sx={{ backgroundColor: Colors.grey400 }}
            />
            <Typography sx={[labelInput, spacingTop]}>Nama Supplier</Typography>
            <TextField
              size="small"
              error={error && namaSupplier.length === 0 && true}
              helperText={
                error &&
                namaSupplier.length === 0 &&
                "Nama Supplier harus diisi!"
              }
              id="outlined-basic"
              variant="outlined"
              value={namaSupplier}
              onChange={(e) => setNamaSupplier(e.target.value.toUpperCase())}
            />
            <Typography sx={[labelInput, spacingTop]}>
              Alamat Supplier
            </Typography>
            <TextField
              size="small"
              id="outlined-basic"
              variant="outlined"
              value={alamatSupplier}
              onChange={(e) => setAlamatSupplier(e.target.value.toUpperCase())}
            />
            <Typography sx={[labelInput, spacingTop]}>Kota Supplier</Typography>
            <TextField
              size="small"
              id="outlined-basic"
              variant="outlined"
              value={kotaSupplier}
              onChange={(e) => setKotaSupplier(e.target.value.toUpperCase())}
            />
          </Box>
          <Box sx={[showDataWrapper, secondWrapper]}>
            <Typography sx={labelInput}>Telepon</Typography>
            <TextField
              size="small"
              id="outlined-basic"
              variant="outlined"
              value={teleponSupplier}
              onChange={(e) => setTeleponSupplier(e.target.value.toUpperCase())}
            />
            <Typography sx={[labelInput, spacingTop]}>PIC</Typography>
            <TextField
              size="small"
              error={error && picSupplier.length === 0 && true}
              helperText={
                error && picSupplier.length === 0 && "PIC Supplier harus diisi!"
              }
              id="outlined-basic"
              variant="outlined"
              value={picSupplier}
              onChange={(e) => setPicSupplier(e.target.value.toUpperCase())}
            />
            <Typography sx={[labelInput, spacingTop]}>NPWP</Typography>
            <TextField
              size="small"
              id="outlined-basic"
              variant="outlined"
              value={npwpSupplier}
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
          <Button
            variant="contained"
            startIcon={<SaveIcon />}
            onClick={saveUser}
          >
            Simpan
          </Button>
        </Box>
      </Paper>
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

const labelInput = {
  fontWeight: "600",
  marginLeft: 1
};

const contentContainer = {
  p: 3,
  pt: 1,
  mt: 2,
  backgroundColor: Colors.grey100
};

const secondWrapper = {
  marginLeft: {
    md: 4
  },
  marginTop: {
    md: 0,
    xs: 4
  }
};
