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
  Paper,
  Autocomplete
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import { Colors } from "../../../constants/styles";

const TambahCabang = () => {
  const { user } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const [kodeUnitBisnis, setKodeUnitBisnis] = useState("");
  const [kodeCabang, setKodeCabang] = useState("");
  const [namaCabang, setNamaCabang] = useState("");
  const [alamatCabang, setAlamatCabang] = useState("");
  const [teleponCabang, setTeleponCabang] = useState("");
  const [picCabang, setPicCabang] = useState("");
  const [unitBisnis, setUnitBisnis] = useState([]);
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const unitBisnisOptions = unitBisnis.map((unitBisnis1) => ({
    label: `${unitBisnis1._id} - ${unitBisnis1.namaUnitBisnis}`
  }));

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  useEffect(() => {
    getUnitBisnis();
    getNextLength();
  }, []);

  const getUnitBisnis = async () => {
    setLoading(true);
    const response = await axios.post(`${tempUrl}/unitBisnis`, {
      id: user._id,
      token: user.token
    });
    setUnitBisnis(response.data);
    setLoading(false);
  };

  const getNextLength = async () => {
    setLoading(true);
    const response = await axios.post(`${tempUrl}/cabangsNextLength`, {
      id: user._id,
      token: user.token
    });
    setKodeCabang(response.data);
    setLoading(false);
  };

  const saveUser = async (e) => {
    e.preventDefault();
    if (namaCabang.length === 0 || picCabang.length === 0) {
      setError(true);
      setOpen(!open);
    } else {
      try {
        setLoading(true);
        await axios.post(`${tempUrl}/saveCabang`, {
          namaCabang,
          alamatCabang,
          teleponCabang,
          picCabang,
          kodeUnitBisnis,
          id: user._id,
          token: user.token
        });
        setLoading(false);
        navigate("/cabang");
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
        Tambah Cabang
      </Typography>
      <Divider sx={dividerStyle} />
      <Paper sx={contentContainer} elevation={12}>
        <Box sx={showDataContainer}>
          <Box sx={showDataWrapper}>
            <Typography sx={labelInput}>Kode Cabang</Typography>
            <TextField
              size="small"
              id="outlined-basic"
              variant="outlined"
              value={kodeCabang}
              InputProps={{
                readOnly: true
              }}
              sx={{ backgroundColor: Colors.grey400 }}
            />
            <Typography sx={[labelInput, spacingTop]}>Nama Cabang</Typography>
            <TextField
              size="small"
              error={error && namaCabang.length === 0 && true}
              helperText={
                error && namaCabang.length === 0 && "Nama Cabang harus diisi!"
              }
              id="outlined-basic"
              variant="outlined"
              value={namaCabang}
              onChange={(e) => setNamaCabang(e.target.value.toUpperCase())}
            />
            <Typography sx={[labelInput, spacingTop]}>Alamat</Typography>
            <TextField
              size="small"
              id="outlined-basic"
              variant="outlined"
              value={alamatCabang}
              onChange={(e) => setAlamatCabang(e.target.value.toUpperCase())}
            />
          </Box>
          <Box sx={[showDataWrapper, secondWrapper]}>
            <Typography sx={labelInput}>Telepon</Typography>
            <TextField
              type="number"
              size="small"
              id="outlined-basic"
              variant="outlined"
              value={teleponCabang}
              onChange={(e) => setTeleponCabang(e.target.value.toUpperCase())}
            />
            <Typography sx={[labelInput, spacingTop]}>PIC</Typography>
            <TextField
              size="small"
              error={error && picCabang.length === 0 && true}
              helperText={
                error && picCabang.length === 0 && "PIC Cabang harus diisi!"
              }
              id="outlined-basic"
              variant="outlined"
              value={picCabang}
              onChange={(e) => setPicCabang(e.target.value.toUpperCase())}
            />
            <Typography sx={[labelInput, spacingTop]}>Kode Supplier</Typography>
            <Autocomplete
              size="small"
              disablePortal
              id="combo-box-demo"
              options={unitBisnisOptions}
              renderInput={(params) => (
                <TextField
                  size="small"
                  error={error && kodeUnitBisnis.length === 0 && true}
                  helperText={
                    error &&
                    kodeUnitBisnis.length === 0 &&
                    "Kode Unit Bisnis harus diisi!"
                  }
                  {...params}
                />
              )}
              onInputChange={(e, value) =>
                setKodeUnitBisnis(value.split(" -")[0])
              }
            />
          </Box>
        </Box>
        <Box sx={spacingTop}>
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => navigate("/cabang")}
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

export default TambahCabang;

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
