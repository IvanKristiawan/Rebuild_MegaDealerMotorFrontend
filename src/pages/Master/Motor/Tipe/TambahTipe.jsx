import React, { useState, useContext } from "react";
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
  Alert
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";

const TambahTipe = () => {
  const { user } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const [kodeTipe, setKodeTipe] = useState("");
  const [namaTipe, setNamaTipe] = useState("");
  const [noRangka, setNoRangka] = useState("");
  const [noMesin, setNoMesin] = useState("");
  const [isi, setIsi] = useState("");
  const [merk, setMerk] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const saveUser = async (e) => {
    e.preventDefault();
    if (kodeTipe.length === 0 || namaTipe.length === 0 || merk.length === 0) {
      setError(true);
      setOpen(!open);
    } else {
      try {
        setLoading(true);
        await axios.post(`${tempUrl}/saveTipe`, {
          kodeTipe,
          namaTipe,
          noRangka,
          noMesin,
          isi,
          merk,
          id: user._id,
          token: user.token
        });
        setLoading(false);
        navigate("/tipe");
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
        Tambah Tipe
      </Typography>
      <Divider sx={dividerStyle} />
      <Box sx={showDataContainer}>
        <Box sx={showDataWrapper}>
          <TextField
            error={error && kodeTipe.length === 0 && true}
            helperText={error && kodeTipe.length === 0 && "Kode harus diisi!"}
            id="outlined-basic"
            label="Kode"
            variant="outlined"
            value={kodeTipe}
            onChange={(e) => setKodeTipe(e.target.value.toUpperCase())}
          />
          <TextField
            error={error && namaTipe.length === 0 && true}
            helperText={
              error && namaTipe.length === 0 && "Nama Tipe harus diisi!"
            }
            id="outlined-basic"
            label="Nama Tipe"
            variant="outlined"
            sx={spacingTop}
            value={namaTipe}
            onChange={(e) => setNamaTipe(e.target.value.toUpperCase())}
          />
          <TextField
            id="outlined-basic"
            label="No. Rangka"
            variant="outlined"
            sx={spacingTop}
            value={noRangka}
            onChange={(e) => setNoRangka(e.target.value.toUpperCase())}
          />
        </Box>
        <Box sx={[showDataWrapper, { marginLeft: 4 }]}>
          <TextField
            id="outlined-basic"
            label="No. Mesin"
            variant="outlined"
            value={noMesin}
            onChange={(e) => setNoMesin(e.target.value.toUpperCase())}
          />
          <TextField
            id="outlined-basic"
            label="Isi"
            variant="outlined"
            sx={spacingTop}
            value={isi}
            onChange={(e) => setIsi(e.target.value.toUpperCase())}
          />
          <TextField
            error={error && merk.length === 0 && true}
            helperText={error && merk.length === 0 && "Merk harus diisi!"}
            id="outlined-basic"
            label="Merk"
            variant="outlined"
            sx={spacingTop}
            value={merk}
            onChange={(e) => setMerk(e.target.value.toUpperCase())}
          />
        </Box>
      </Box>
      <Box sx={spacingTop}>
        <Button
          variant="outlined"
          color="secondary"
          onClick={() => navigate("/tipe")}
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

export default TambahTipe;

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
