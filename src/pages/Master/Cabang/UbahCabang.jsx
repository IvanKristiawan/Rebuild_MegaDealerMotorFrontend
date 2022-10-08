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
  Alert,
  Paper
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { Colors } from "../../../constants/styles";

const UbahCabang = () => {
  const { user } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const [kodeCabang, setKodeCabang] = useState("");
  const [namaCabang, setNamaCabang] = useState("");
  const [alamatCabang, setAlamatCabang] = useState("");
  const [teleponCabang, setTeleponCabang] = useState("");
  const [picCabang, setPicCabang] = useState("");
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
    const response = await axios.post(`${tempUrl}/cabangs/${id}`, {
      id: user._id,
      token: user.token
    });
    setKodeCabang(response.data.kodeCabang);
    setNamaCabang(response.data.namaCabang);
    setAlamatCabang(response.data.alamatCabang);
    setTeleponCabang(response.data.teleponCabang);
    setPicCabang(response.data.picCabang);
    setLoading(false);
  };

  const updateUser = async (e) => {
    e.preventDefault();
    if (namaCabang.length === 0 || picCabang.length === 0) {
      setError(true);
      setOpen(!open);
    } else {
      try {
        setLoading(true);
        await axios.post(`${tempUrl}/updateCabang/${id}`, {
          namaCabang,
          alamatCabang,
          teleponCabang,
          picCabang,
          id: user._id,
          token: user.token
        });
        setLoading(false);
        navigate(`/cabang/${id}`);
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
        Ubah Cabang
      </Typography>
      <Divider sx={dividerStyle} />
      <Paper sx={contentContainer} elevation={12}>
        <Box sx={showDataContainer}>
          <Box sx={showDataWrapper}>
            <Typography sx={labelInput}>Kode Cabang</Typography>
            <TextField
              size="small"
              error={error && kodeCabang.length === 0 && true}
              helperText={
                error && kodeCabang.length === 0 && "Kode harus diisi!"
              }
              id="outlined-basic"
              variant="outlined"
              value={kodeCabang}
              InputProps={{
                readOnly: true
              }}
              onChange={(e) => setKodeCabang(e.target.value)}
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
              size="small"
              id="outlined-basic"
              variant="outlined"
              value={teleponCabang}
              onChange={(e) => setTeleponCabang(e.target.value.toUpperCase())}
            />
            <Typography sx={[labelInput, spacingTop]}>Isi</Typography>
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
            startIcon={<EditIcon />}
            onClick={updateUser}
          >
            Ubah
          </Button>
        </Box>
      </Paper>
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

export default UbahCabang;

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
