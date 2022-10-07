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
  Autocomplete
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";

const TambahSurveyor = () => {
  const { user } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const [kodeSurveyor, setKodeSurveyor] = useState("");
  const [namaSurveyor, setNamaSurveyor] = useState("");
  const [jenisSurveyor, setJenisSurveyor] = useState("");
  const [teleponSurveyor, setTeleponSurveyor] = useState("");
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
    const response = await axios.post(`${tempUrl}/surveyorsNextLength`, {
      id: user._id,
      token: user.token
    });
    setKodeSurveyor(response.data);
    setLoading(false);
  };

  const saveUser = async (e) => {
    e.preventDefault();
    if (
      namaSurveyor.length === 0 ||
      jenisSurveyor.length === 0 ||
      teleponSurveyor.length === 0
    ) {
      setError(true);
      setOpen(!open);
    } else {
      try {
        setLoading(true);
        await axios.post(`${tempUrl}/saveSurveyor`, {
          namaSurveyor,
          jenisSurveyor,
          teleponSurveyor,
          id: user._id,
          token: user.token
        });
        setLoading(false);
        navigate("/surveyor");
      } catch (error) {
        console.log(error);
      }
    }
  };

  const jenisSurveyorOption = [{ label: "CMO" }, { label: "SURVEYOR" }];

  if (loading) {
    return <Loader />;
  }

  return (
    <Box sx={container}>
      <Typography color="#757575">Master</Typography>
      <Typography variant="h4" sx={subTitleText}>
        Tambah Surveyor
      </Typography>
      <Divider sx={dividerStyle} />
      <Box sx={showDataContainer}>
        <Box sx={showDataWrapper}>
          <TextField
            id="outlined-basic"
            label="Kode Surveyor"
            variant="outlined"
            value={kodeSurveyor}
            InputProps={{
              readOnly: true
            }}
          />
          <TextField
            error={error && namaSurveyor.length === 0 && true}
            helperText={
              error && namaSurveyor.length === 0 && "Nama Surveyor harus diisi!"
            }
            id="outlined-basic"
            label="Nama Surveyor"
            variant="outlined"
            value={namaSurveyor}
            sx={spacingTop}
            onChange={(e) => setNamaSurveyor(e.target.value.toUpperCase())}
          />
          <TextField
            error={error && teleponSurveyor.length === 0 && true}
            helperText={
              error &&
              teleponSurveyor.length === 0 &&
              "Telepon Surveyor harus diisi!"
            }
            id="outlined-basic"
            label="Telepon Surveyor"
            variant="outlined"
            value={teleponSurveyor}
            sx={spacingTop}
            onChange={(e) => setTeleponSurveyor(e.target.value.toUpperCase())}
          />
        </Box>
        <Box sx={[showDataWrapper, { marginLeft: 4 }]}>
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={jenisSurveyorOption}
            renderInput={(params) => (
              <TextField
                error={error && jenisSurveyor.length === 0 && true}
                helperText={
                  error && jenisSurveyor.length === 0 && "Jenis harus diisi!"
                }
                {...params}
                label="Jenis Surveyor"
              />
            )}
            onInputChange={(e, value) => setJenisSurveyor(value)}
          />
        </Box>
      </Box>
      <Box sx={spacingTop}>
        <Button
          variant="outlined"
          color="secondary"
          onClick={() => navigate("/surveyor")}
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

export default TambahSurveyor;

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
