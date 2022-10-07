import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { tempUrl } from "../../../../contexts/ContextProvider";
import { Loader } from "../../../../components";
import {
  Box,
  Typography,
  TextField,
  Button,
  Divider,
  Snackbar,
  Alert,
  Autocomplete
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";

const TambahKecamatan = () => {
  const { user } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const [kodeWilayah, setKodeWilayah] = useState("");
  const [namaWilayah, setNamaWilayah] = useState("");
  const [namaKecamatan, setNamaKecamatan] = useState("");
  const [wilayah, setWilayah] = useState([]);
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
    getWilayah();
  }, []);

  const getWilayah = async () => {
    setLoading(true);
    const response = await axios.post(`${tempUrl}/wilayahs`, {
      id: user._id,
      token: user.token
    });
    setWilayah(response.data);
    setLoading(false);
  };

  const saveUser = async (e) => {
    e.preventDefault();
    if (kodeWilayah.length === 0 || namaKecamatan.length === 0) {
      setError(true);
      setOpen(!open);
    } else {
      try {
        setLoading(true);
        await axios.post(`${tempUrl}/saveKecamatan`, {
          kodeWilayah,
          namaWilayah,
          namaKecamatan,
          id: user._id,
          token: user.token
        });
        setLoading(false);
        navigate("/kecamatan");
      } catch (error) {
        console.log(error);
      }
    }
  };

  const wilayahOptions = wilayah.map((wil) => ({
    label: `${wil.kodeWilayah} - ${wil.namaWilayah}`
  }));

  if (loading) {
    return <Loader />;
  }

  return (
    <Box sx={container}>
      <Typography color="#757575">Master</Typography>
      <Typography variant="h4" sx={subTitleText}>
        Tambah Kecamatan
      </Typography>
      <Divider sx={dividerStyle} />
      <Box sx={showDataContainer}>
        <Box sx={showDataWrapper}>
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={wilayahOptions}
            renderInput={(params) => (
              <TextField
                error={error && kodeWilayah.length === 0 && true}
                helperText={
                  error &&
                  kodeWilayah.length === 0 &&
                  "Kode Wilayah harus diisi!"
                }
                {...params}
                label="Kode Wilayah"
              />
            )}
            onInputChange={(e, value) => {
              setKodeWilayah(value.split(" ", 1)[0]);
              setNamaWilayah(value.split("- ")[1]);
            }}
          />
          <TextField
            error={error && namaKecamatan.length === 0 && true}
            helperText={
              error &&
              namaKecamatan.length === 0 &&
              "Nama Kecamatan harus diisi!"
            }
            id="outlined-basic"
            label="Nama Kecamatan"
            variant="outlined"
            value={namaKecamatan}
            sx={spacingTop}
            onChange={(e) => setNamaKecamatan(e.target.value.toUpperCase())}
          />
        </Box>
      </Box>
      <Box sx={spacingTop}>
        <Button
          variant="outlined"
          color="secondary"
          onClick={() => navigate("/kecamatan")}
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

export default TambahKecamatan;

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
