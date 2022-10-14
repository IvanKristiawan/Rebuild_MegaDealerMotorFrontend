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

const UbahPekerjaan = () => {
  const { user } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const [kodePekerjaan, setKodePekerjaan] = useState("");
  const [namaPekerjaan, setNamaPekerjaan] = useState("");
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
    const response = await axios.post(`${tempUrl}/pekerjaans/${id}`, {
      id: user._id,
      token: user.token
    });
    setKodePekerjaan(response.data.kodePekerjaan);
    setNamaPekerjaan(response.data.namaPekerjaan);
    setLoading(false);
  };

  const updateUser = async (e) => {
    e.preventDefault();
    if (kodePekerjaan.length === 0 || namaPekerjaan.length === 0) {
      setError(true);
      setOpen(!open);
    } else {
      try {
        setLoading(true);
        await axios.post(`${tempUrl}/updatePekerjaan/${id}`, {
          namaPekerjaan,
          id: user._id,
          token: user.token
        });
        setLoading(false);
        navigate(`/pekerjaan/${id}`);
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
        Ubah Pekerjaan
      </Typography>
      <Divider sx={dividerStyle} />
      <Box sx={showDataContainer}>
        <Box sx={showDataWrapper}>
          <TextField
            error={error && kodePekerjaan.length === 0 && true}
            helperText={
              error && kodePekerjaan.length === 0 && "Kode harus diisi!"
            }
            id="outlined-basic"
            label="Kode"
            variant="outlined"
            value={kodePekerjaan}
            InputProps={{
              readOnly: true
            }}
            onChange={(e) => setKodePekerjaan(e.target.value.toUpperCase())}
          />
          <TextField
            error={error && namaPekerjaan.length === 0 && true}
            helperText={
              error &&
              namaPekerjaan.length === 0 &&
              "Nama Pekerjaan harus diisi!"
            }
            id="outlined-basic"
            label="Nama Pekerjaan"
            variant="outlined"
            value={namaPekerjaan}
            sx={spacingTop}
            onChange={(e) => setNamaPekerjaan(e.target.value.toUpperCase())}
          />
        </Box>
      </Box>
      <Box sx={spacingTop}>
        <Button
          variant="outlined"
          color="secondary"
          onClick={() => navigate("/pekerjaan")}
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

export default UbahPekerjaan;

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
