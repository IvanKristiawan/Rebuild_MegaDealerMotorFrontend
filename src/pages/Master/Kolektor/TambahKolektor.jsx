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

const TambahKolektor = () => {
  const { user } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const [kodeKolektor, setKodeKolektor] = useState("");
  const [namaKolektor, setNamaKolektor] = useState("");
  const [teleponKolektor, setTeleponKolektor] = useState("");
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
    const response = await axios.post(`${tempUrl}/kolektorsNextLength`, {
      id: user._id,
      token: user.token
    });
    setKodeKolektor(response.data);
    setLoading(false);
  };

  const saveUser = async (e) => {
    e.preventDefault();
    if (namaKolektor.length === 0) {
      setError(true);
      setOpen(!open);
    } else {
      try {
        setLoading(true);
        await axios.post(`${tempUrl}/saveKolektor`, {
          namaKolektor,
          teleponKolektor,
          id: user._id,
          token: user.token
        });
        setLoading(false);
        navigate("/kolektor");
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
        Tambah Kolektor
      </Typography>
      <Divider sx={dividerStyle} />
      <Paper sx={contentContainer} elevation={12}>
        <Box sx={showDataContainer}>
          <Box sx={showDataWrapper}>
            <Typography sx={labelInput}>Kode Kolektor</Typography>
            <TextField
              size="small"
              id="outlined-basic"
              variant="outlined"
              value={kodeKolektor}
              InputProps={{
                readOnly: true
              }}
              sx={{ backgroundColor: Colors.grey400 }}
            />
            <Typography sx={[labelInput, spacingTop]}>Nama Kolektor</Typography>
            <TextField
              size="small"
              error={error && namaKolektor.length === 0 && true}
              helperText={
                error &&
                namaKolektor.length === 0 &&
                "Nama Kolektor harus diisi!"
              }
              id="outlined-basic"
              variant="outlined"
              value={namaKolektor}
              onChange={(e) => setNamaKolektor(e.target.value.toUpperCase())}
            />
          </Box>
          <Box sx={[showDataWrapper, secondWrapper]}>
            <Typography sx={labelInput}>Telepon</Typography>
            <TextField
              type="number"
              size="small"
              id="outlined-basic"
              variant="outlined"
              value={teleponKolektor}
              onChange={(e) => setTeleponKolektor(e.target.value.toUpperCase())}
            />
          </Box>
        </Box>
        <Box sx={spacingTop}>
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => navigate("/kolektor")}
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

export default TambahKolektor;

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