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
  Paper,
  Autocomplete
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { Colors } from "../../../constants/styles";

const UbahUser = () => {
  const { user, dispatch } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const [kodeUnitBisnis, setKodeUnitBisnis] = useState("");
  const [kodeCabang, setKodeCabang] = useState("");
  const [username, setUsername] = useState("");
  const [tipeUser, setTipeUser] = useState("");
  const [periode, setPeriode] = useState("");
  const [kodeKwitansi, setKodeKwitansi] = useState("");
  const [noTerakhir, setNoTerakhir] = useState("");
  const [password, setPassword] = useState("");
  const [unitBisnis, setUnitBisnis] = useState([]);
  const [cabangs, setCabangs] = useState([]);
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);

  const unitBisnisOptions = unitBisnis.map((unitBisnis1) => ({
    label: `${unitBisnis1._id} - ${unitBisnis1.namaUnitBisnis}`
  }));

  const cabangOptions = cabangs.map((cabang) => ({
    label: `${cabang._id} - ${cabang.namaCabang}`
  }));

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  useEffect(() => {
    getUnitBisnis();
    getUserById();
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

  const getCabangsByUnitBisnis = async (kodeUnit) => {
    setKodeCabang("");
    const response = await axios.post(`${tempUrl}/cabangsByUnitBisnis`, {
      kodeUnitBisnis: kodeUnit,
      id: user._id,
      token: user.token
    });
    setCabangs(response.data);
  };

  const getUserById = async () => {
    setLoading(true);
    const response = await axios.post(`${tempUrl}/findUser/${id}`, {
      tipeAdmin: user.tipeUser,
      id: user._id,
      token: user.token
    });
    setUsername(response.data.username);
    setTipeUser(response.data.tipeUser);
    setPeriode(response.data.periode);
    setKodeKwitansi(response.data.kodeKwitansi);
    setNoTerakhir(response.data.noTerakhir);
    setKodeUnitBisnis(response.data.unitBisnis._id);
    setKodeCabang(response.data.cabang._id);
    setLoading(false);
  };

  const updateUser = async (e) => {
    e.preventDefault();
    if (
      username.length === 0 ||
      tipeUser.length === 0 ||
      periode.length === 0 ||
      kodeKwitansi.length === 0 ||
      kodeUnitBisnis.length === 0 ||
      kodeCabang.length === 0
    ) {
      setError(true);
      setOpen(!open);
    } else {
      if (password.length === 0) {
        setPassword(user.password);
      }
      try {
        setLoading(true);
        await axios.post(`${tempUrl}/users/${id}`, {
          username,
          tipeUser,
          periode,
          kodeKwitansi,
          noTerakhir,
          password,
          kodeUnitBisnis: kodeUnitBisnis.split(" ", 1)[0],
          kodeCabang: kodeCabang.split(" ", 1)[0],
          tipeAdmin: user.tipeUser,
          id: user._id,
          token: user.token
        });
        setLoading(false);
        navigate("/daftarUser");
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
      <Typography color="#757575">User</Typography>
      <Typography variant="h4" sx={subTitleText}>
        Ubah User
      </Typography>
      <Divider sx={dividerStyle} />
      <Paper sx={contentContainer} elevation={12}>
        <Box sx={showDataContainer}>
          <Box sx={showDataWrapper}>
            <Typography sx={labelInput}>Username</Typography>
            <TextField
              size="small"
              error={error && username.length === 0 && true}
              helperText={
                error && username.length === 0 && "Username harus diisi!"
              }
              id="outlined-basic"
              variant="outlined"
              value={username}
              onChange={(e) => setUsername(e.target.value.toUpperCase())}
            />
            <Typography sx={[labelInput, spacingTop]}>Tipe User</Typography>
            <TextField
              size="small"
              error={error && tipeUser.length === 0 && true}
              helperText={
                error && tipeUser.length === 0 && "Tipe User harus diisi!"
              }
              id="outlined-basic"
              variant="outlined"
              value={tipeUser}
              onChange={(e) => setTipeUser(e.target.value.toUpperCase())}
            />
            <Typography sx={[labelInput, spacingTop]}>Periode</Typography>
            <TextField
              size="small"
              error={error && periode.length === 0 && true}
              helperText={
                error && periode.length === 0 && "Periode harus diisi!"
              }
              id="outlined-basic"
              variant="outlined"
              value={periode}
              onChange={(e) => setPeriode(e.target.value.toUpperCase())}
            />
            <Typography sx={[labelInput, spacingTop]}>
              Kode Unit Bisnis
            </Typography>
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
              onInputChange={(e, value) => {
                setKodeUnitBisnis(value);
                getCabangsByUnitBisnis(value.split(" -")[0]);
              }}
              value={kodeUnitBisnis}
            />
            <Typography sx={[labelInput, spacingTop]}>Kode Cabang</Typography>
            <Autocomplete
              size="small"
              disablePortal
              id="combo-box-demo"
              options={cabangOptions}
              renderInput={(params) => (
                <TextField
                  size="small"
                  error={error && kodeCabang.length === 0 && true}
                  helperText={
                    error &&
                    kodeCabang.length === 0 &&
                    "Kode Cabang harus diisi!"
                  }
                  {...params}
                />
              )}
              onInputChange={(e, value) => setKodeCabang(value)}
              value={kodeCabang}
            />
          </Box>
          <Box sx={[showDataWrapper, secondWrapper]}>
            <Typography sx={labelInput}>Kode Kwitansi</Typography>
            <TextField
              size="small"
              error={error && kodeKwitansi.length === 0 && true}
              helperText={
                error &&
                kodeKwitansi.length === 0 &&
                "Kode Kwitansi harus diisi!"
              }
              id="outlined-basic"
              variant="outlined"
              value={kodeKwitansi}
              onChange={(e) => setKodeKwitansi(e.target.value.toUpperCase())}
            />
            <Typography sx={[labelInput, spacingTop]}>No Terakhir</Typography>
            <TextField
              size="small"
              id="outlined-basic"
              variant="outlined"
              value={noTerakhir}
              onChange={(e) => setNoTerakhir(e.target.value.toUpperCase())}
            />
            <Typography sx={[labelInput, spacingTop]}>
              Password (baru)
            </Typography>
            <TextField
              size="small"
              id="outlined-basic"
              variant="outlined"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Typography>
              *Kosongkan jika tidak ingin mengganti password
            </Typography>
          </Box>
        </Box>
        <Box sx={spacingTop}>
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => navigate("/daftarUser")}
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

export default UbahUser;

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
