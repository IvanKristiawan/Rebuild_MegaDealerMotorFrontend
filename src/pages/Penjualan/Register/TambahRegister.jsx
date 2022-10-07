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

const TambahRegister = () => {
  const { user } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const [kodeRegister, setKodeRegister] = useState("");
  const [namaRegister, setNamaRegister] = useState("");
  const [almRegister, setAlmRegister] = useState("");
  const [tlpRegister, setTlpRegister] = useState("");
  const [noKtpRegister, setNoKtpRegister] = useState("");
  const [almKtpRegister, setAlmKtpRegister] = useState("");
  const [noKKRegister, setNoKKRegister] = useState("");
  const [namaPjmRegister, setNamaPjmRegister] = useState("");
  const [almPjmRegister, setAlmPjmRegister] = useState("");
  const [tlpPjmRegister, setTlpPjmRegister] = useState("");
  const [hubunganRegister, setHubunganRegister] = useState("");
  const [noKtpPjmRegister, setNoKtpPjmRegister] = useState("");
  const [pkjRegister, setPkjRegister] = useState("");
  const [namaRefRegister, setNamaRefRegister] = useState("");
  const [almRefRegister, setAlmRefRegister] = useState("");
  const [tlpRefRegister, setTlpRefRegister] = useState("");
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
    const response = await axios.post(`${tempUrl}/registersNextLength`, {
      id: user._id,
      token: user.token
    });
    setKodeRegister(response.data);
    setLoading(false);
  };

  const saveUser = async (e) => {
    e.preventDefault();
    if (
      namaRegister.length === 0 ||
      almRegister.length === 0 ||
      tlpRegister.length === 0 ||
      noKtpRegister.length === 0 ||
      almKtpRegister.length === 0 ||
      noKKRegister.length === 0
    ) {
      setError(true);
      setOpen(!open);
    } else {
      try {
        setLoading(true);
        await axios.post(`${tempUrl}/saveRegister`, {
          namaRegister,
          almRegister,
          tlpRegister,
          noKtpRegister,
          almKtpRegister,
          noKKRegister,
          namaPjmRegister,
          almPjmRegister,
          tlpPjmRegister,
          hubunganRegister,
          noKtpPjmRegister,
          pkjRegister,
          namaRefRegister,
          almRefRegister,
          tlpRefRegister,
          id: user._id,
          token: user.token
        });
        setLoading(false);
        navigate("/register");
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
        Tambah Register Penjualan
      </Typography>
      <Divider sx={dividerStyle} />
      <Box sx={showDataContainer}>
        <Box sx={showDataWrapper}>
          <TextField
            id="outlined-basic"
            label="Kode Register"
            variant="outlined"
            value={kodeRegister}
            InputProps={{
              readOnly: true
            }}
          />
          <TextField
            error={error && namaRegister.length === 0 && true}
            helperText={
              error && namaRegister.length === 0 && "Nama harus diisi!"
            }
            id="outlined-basic"
            label="Nama"
            variant="outlined"
            value={namaRegister}
            sx={spacingTop}
            onChange={(e) => setNamaRegister(e.target.value.toUpperCase())}
          />
          <TextField
            error={error && almRegister.length === 0 && true}
            helperText={
              error && almRegister.length === 0 && "Alamat harus diisi!"
            }
            id="outlined-basic"
            label="Alamat"
            variant="outlined"
            value={almRegister}
            sx={spacingTop}
            onChange={(e) => setAlmRegister(e.target.value.toUpperCase())}
          />
          <TextField
            error={error && tlpRegister.length === 0 && true}
            helperText={
              error && tlpRegister.length === 0 && "Telepon harus diisi!"
            }
            id="outlined-basic"
            label="Telepon"
            variant="outlined"
            value={tlpRegister}
            sx={spacingTop}
            onChange={(e) => setTlpRegister(e.target.value.toUpperCase())}
          />
          <TextField
            error={error && noKtpRegister.length === 0 && true}
            helperText={
              error && noKtpRegister.length === 0 && "No. KTP harus diisi!"
            }
            id="outlined-basic"
            label="No. KTP"
            variant="outlined"
            value={noKtpRegister}
            sx={spacingTop}
            onChange={(e) => setNoKtpRegister(e.target.value.toUpperCase())}
          />
          <TextField
            error={error && almKtpRegister.length === 0 && true}
            helperText={
              error && almKtpRegister.length === 0 && "Alamat KTP harus diisi!"
            }
            id="outlined-basic"
            label="Alamat KTP"
            variant="outlined"
            value={almKtpRegister}
            sx={spacingTop}
            onChange={(e) => setAlmKtpRegister(e.target.value.toUpperCase())}
          />
          <TextField
            error={error && noKKRegister.length === 0 && true}
            helperText={
              error && noKKRegister.length === 0 && "No. KK harus diisi!"
            }
            id="outlined-basic"
            label="No. KK"
            variant="outlined"
            value={noKKRegister}
            sx={spacingTop}
            onChange={(e) => setNoKKRegister(e.target.value.toUpperCase())}
          />
          <TextField
            id="outlined-basic"
            label="Nama Penjamin"
            variant="outlined"
            value={namaPjmRegister}
            sx={spacingTop}
            onChange={(e) => setNamaPjmRegister(e.target.value.toUpperCase())}
          />
          <TextField
            id="outlined-basic"
            label="Alamat Penjamin"
            variant="outlined"
            value={almPjmRegister}
            sx={spacingTop}
            onChange={(e) => setAlmPjmRegister(e.target.value.toUpperCase())}
          />
        </Box>
        <Box sx={[showDataWrapper, { marginLeft: 4 }]}>
          <TextField
            id="outlined-basic"
            label="Telepon Penjamin"
            variant="outlined"
            value={tlpPjmRegister}
            onChange={(e) => setTlpPjmRegister(e.target.value.toUpperCase())}
          />
          <TextField
            id="outlined-basic"
            label="Hubungan Penjamin"
            variant="outlined"
            value={hubunganRegister}
            sx={spacingTop}
            onChange={(e) => setHubunganRegister(e.target.value.toUpperCase())}
          />
          <TextField
            id="outlined-basic"
            label="No. KTP Penjamin"
            variant="outlined"
            value={noKtpPjmRegister}
            sx={spacingTop}
            onChange={(e) => setNoKtpPjmRegister(e.target.value.toUpperCase())}
          />
          <TextField
            id="outlined-basic"
            label="Pekerjaan Penjamin"
            variant="outlined"
            value={pkjRegister}
            sx={spacingTop}
            onChange={(e) => setPkjRegister(e.target.value.toUpperCase())}
          />
          <TextField
            id="outlined-basic"
            label="Nama Referensi"
            variant="outlined"
            value={namaRefRegister}
            sx={spacingTop}
            onChange={(e) => setNamaRefRegister(e.target.value.toUpperCase())}
          />
          <TextField
            id="outlined-basic"
            label="Alamat Referensi"
            variant="outlined"
            value={almRefRegister}
            sx={spacingTop}
            onChange={(e) => setAlmRefRegister(e.target.value.toUpperCase())}
          />
          <TextField
            id="outlined-basic"
            label="Telepon Referensi"
            variant="outlined"
            value={tlpRefRegister}
            sx={spacingTop}
            onChange={(e) => setTlpRefRegister(e.target.value.toUpperCase())}
          />
        </Box>
      </Box>
      <Box sx={spacingTop}>
        <Button
          variant="outlined"
          color="secondary"
          onClick={() => navigate("/register")}
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

export default TambahRegister;

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
