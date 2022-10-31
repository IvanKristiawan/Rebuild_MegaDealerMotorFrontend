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
      token: user.token,
      kodeUnitBisnis: user.unitBisnis._id,
      kodeCabang: user.cabang._id
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
          kodeUnitBisnis: user.unitBisnis._id,
          kodeCabang: user.cabang._id,
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
      <Paper sx={contentContainer} elevation={12}>
        <Box sx={showDataContainer}>
          <Box sx={showDataWrapper}>
            <Typography sx={labelInput}>Kode Register</Typography>
            <TextField
              size="small"
              id="outlined-basic"
              variant="outlined"
              value={kodeRegister}
              InputProps={{
                readOnly: true
              }}
              sx={{ backgroundColor: Colors.grey400 }}
            />
            <Typography sx={[labelInput, spacingTop]}>Nama Register</Typography>
            <TextField
              size="small"
              error={error && namaRegister.length === 0 && true}
              helperText={
                error && namaRegister.length === 0 && "Nama harus diisi!"
              }
              id="outlined-basic"
              variant="outlined"
              value={namaRegister}
              onChange={(e) => setNamaRegister(e.target.value.toUpperCase())}
            />
            <Typography sx={[labelInput, spacingTop]}>
              Alamat Register
            </Typography>
            <TextField
              size="small"
              error={error && almRegister.length === 0 && true}
              helperText={
                error && almRegister.length === 0 && "Alamat harus diisi!"
              }
              id="outlined-basic"
              variant="outlined"
              value={almRegister}
              onChange={(e) => setAlmRegister(e.target.value.toUpperCase())}
            />
            <Typography sx={[labelInput, spacingTop]}>
              Telepon Register
            </Typography>
            <TextField
              type="number"
              size="small"
              error={error && tlpRegister.length === 0 && true}
              helperText={
                error && tlpRegister.length === 0 && "Telepon harus diisi!"
              }
              id="outlined-basic"
              variant="outlined"
              value={tlpRegister}
              onChange={(e) => setTlpRegister(e.target.value.toUpperCase())}
            />
            <Typography sx={[labelInput, spacingTop]}>No. KTP</Typography>
            <TextField
              size="small"
              error={error && noKtpRegister.length === 0 && true}
              helperText={
                error && noKtpRegister.length === 0 && "No. KTP harus diisi!"
              }
              id="outlined-basic"
              variant="outlined"
              value={noKtpRegister}
              onChange={(e) => setNoKtpRegister(e.target.value.toUpperCase())}
            />
            <Typography sx={[labelInput, spacingTop]}>Alamat KTP</Typography>
            <TextField
              size="small"
              error={error && almKtpRegister.length === 0 && true}
              helperText={
                error &&
                almKtpRegister.length === 0 &&
                "Alamat KTP harus diisi!"
              }
              id="outlined-basic"
              variant="outlined"
              value={almKtpRegister}
              onChange={(e) => setAlmKtpRegister(e.target.value.toUpperCase())}
            />
            <Typography sx={[labelInput, spacingTop]}>No. KK</Typography>
            <TextField
              size="small"
              error={error && noKKRegister.length === 0 && true}
              helperText={
                error && noKKRegister.length === 0 && "No. KK harus diisi!"
              }
              id="outlined-basic"
              variant="outlined"
              value={noKKRegister}
              onChange={(e) => setNoKKRegister(e.target.value.toUpperCase())}
            />
            <Typography sx={[labelInput, spacingTop]}>Nama Penjamin</Typography>
            <TextField
              size="small"
              id="outlined-basic"
              variant="outlined"
              value={namaPjmRegister}
              onChange={(e) => setNamaPjmRegister(e.target.value.toUpperCase())}
            />
          </Box>
          <Box sx={[showDataWrapper, secondWrapper]}>
            <Typography sx={labelInput}>Alamat Penjamin</Typography>
            <TextField
              size="small"
              id="outlined-basic"
              variant="outlined"
              value={almPjmRegister}
              onChange={(e) => setAlmPjmRegister(e.target.value.toUpperCase())}
            />
            <Typography sx={[labelInput, spacingTop]}>
              Telepon Penjamin
            </Typography>
            <TextField
              size="small"
              id="outlined-basic"
              variant="outlined"
              onChange={(e) => setTlpPjmRegister(e.target.value.toUpperCase())}
            />
            <Typography sx={[labelInput, spacingTop]}>
              Hubungan Penjamin
            </Typography>
            <TextField
              size="small"
              id="outlined-basic"
              variant="outlined"
              value={hubunganRegister}
              onChange={(e) =>
                setHubunganRegister(e.target.value.toUpperCase())
              }
            />
            <Typography sx={[labelInput, spacingTop]}>
              No. KTP Penjamin
            </Typography>
            <TextField
              size="small"
              id="outlined-basic"
              variant="outlined"
              value={noKtpPjmRegister}
              onChange={(e) =>
                setNoKtpPjmRegister(e.target.value.toUpperCase())
              }
            />
            <Typography sx={[labelInput, spacingTop]}>
              Pekerjaan Penjamin
            </Typography>
            <TextField
              size="small"
              id="outlined-basic"
              variant="outlined"
              value={pkjRegister}
              onChange={(e) => setPkjRegister(e.target.value.toUpperCase())}
            />
            <Typography sx={[labelInput, spacingTop]}>
              Nama Referensi
            </Typography>
            <TextField
              size="small"
              id="outlined-basic"
              variant="outlined"
              value={namaRefRegister}
              onChange={(e) => setNamaRefRegister(e.target.value.toUpperCase())}
            />
            <Typography sx={[labelInput, spacingTop]}>
              Alamat Referensi
            </Typography>
            <TextField
              size="small"
              id="outlined-basic"
              variant="outlined"
              value={almRefRegister}
              onChange={(e) => setAlmRefRegister(e.target.value.toUpperCase())}
            />
            <Typography sx={[labelInput, spacingTop]}>
              Telepon Referensi
            </Typography>
            <TextField
              size="small"
              id="outlined-basic"
              variant="outlined"
              value={tlpRefRegister}
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
