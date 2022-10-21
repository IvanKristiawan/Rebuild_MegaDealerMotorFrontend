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
import { Colors } from "../../../constants/styles";

const UbahMarketing = () => {
  const { user } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const [kodeMarketing, setKodeMarketing] = useState("");
  const [namaMarketing, setNamaMarketing] = useState("");
  const [teleponMarketing, setTeleponMarketing] = useState("");
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
    const response = await axios.post(`${tempUrl}/marketings/${id}`, {
      id: user._id,
      token: user.token
    });
    setKodeMarketing(response.data._id);
    setNamaMarketing(response.data.namaMarketing);
    setTeleponMarketing(response.data.teleponMarketing);
    setLoading(false);
  };

  const updateUser = async (e) => {
    e.preventDefault();
    if (namaMarketing.length === 0 || teleponMarketing.length === 0) {
      setError(true);
      setOpen(!open);
    } else {
      try {
        setLoading(true);
        await axios.post(`${tempUrl}/updateMarketing/${id}`, {
          namaMarketing,
          teleponMarketing,
          kodeUnitBisnis: user.unitBisnis._id,
          kodeCabang: user.cabang._id,
          id: user._id,
          token: user.token
        });
        setLoading(false);
        navigate(`/marketing/${id}`);
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
        Ubah Marketing
      </Typography>
      <Divider sx={dividerStyle} />
      <Box sx={showDataContainer}>
        <Box sx={showDataWrapper}>
          <Typography sx={labelInput}>Kode Marketing</Typography>
          <TextField
            size="small"
            id="outlined-basic"
            variant="outlined"
            value={kodeMarketing}
            InputProps={{
              readOnly: true
            }}
            sx={{ backgroundColor: Colors.grey400 }}
          />
          <Typography sx={[labelInput, spacingTop]}>Nama Marketing</Typography>
          <TextField
            size="small"
            error={error && namaMarketing.length === 0 && true}
            helperText={
              error && namaMarketing.length === 0 && "Nama harus diisi!"
            }
            id="outlined-basic"
            variant="outlined"
            value={namaMarketing}
            onChange={(e) => setNamaMarketing(e.target.value.toUpperCase())}
          />
          <Typography sx={[labelInput, spacingTop]}>Telepon</Typography>
          <TextField
            type="number"
            size="small"
            error={error && teleponMarketing.length === 0 && true}
            helperText={
              error && teleponMarketing.length === 0 && "Telepon harus diisi!"
            }
            id="outlined-basic"
            variant="outlined"
            value={teleponMarketing}
            onChange={(e) => setTeleponMarketing(e.target.value.toUpperCase())}
          />
        </Box>
      </Box>
      <Box sx={spacingTop}>
        <Button
          variant="outlined"
          color="secondary"
          onClick={() => navigate("/marketing")}
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

export default UbahMarketing;

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
