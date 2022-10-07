import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../../contexts/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import { tempUrl } from "../../../contexts/ContextProvider";
import { Loader } from "../../../components";
import { Box, Typography, TextField, Button, Divider } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

const UbahProfilUser = () => {
  const { user, dispatch } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [tipeUser, setTipeUser] = useState("");
  const [periode, setPeriode] = useState("");
  const [kodeKwitansi, setKodeKwitansi] = useState("");
  const [noTerakhir, setNoTerakhir] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getUserById();
  }, []);

  const getUserById = async () => {
    setLoading(true);
    const response = await axios.post(`${tempUrl}/users/${id}`, {
      id: user._id,
      token: user.token
    });
    setUsername(response.data.username);
    setTipeUser(response.data.tipeUser);
    setPeriode(response.data.periode);
    setKodeKwitansi(response.data.kodeKwitansi);
    setNoTerakhir(response.data.noTerakhir);
    setLoading(false);
  };

  const updateUser = async (e) => {
    e.preventDefault();
    if (password.length === 0) {
      setPassword(user.password);
    }
    try {
      setLoading(true);
      await axios.put(`${tempUrl}/users/${id}`, {
        password,
        id: user._id,
        token: user.token
      });
      setLoading(false);
      logoutButtonHandler();
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const logoutButtonHandler = async (e) => {
    dispatch({ type: "LOGOUT" });
    navigate("/");
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <Box sx={container}>
      <Typography color="#757575">User</Typography>
      <Typography variant="h4" sx={subTitleText}>
        Ubah Password User
      </Typography>
      <Divider sx={dividerStyle} />
      <Box sx={showDataContainer}>
        <Box sx={showDataWrapper}>
          <TextField
            id="outlined-basic"
            label="Username"
            variant="outlined"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            InputProps={{
              readOnly: true
            }}
          />
          <TextField
            id="outlined-basic"
            label="Tipe User"
            variant="outlined"
            sx={spacingTop}
            value={tipeUser}
            onChange={(e) => setTipeUser(e.target.value)}
            InputProps={{
              readOnly: true
            }}
          />
          <TextField
            id="outlined-basic"
            label="Periode"
            variant="outlined"
            sx={spacingTop}
            value={periode}
            onChange={(e) => setPeriode(e.target.value)}
            InputProps={{
              readOnly: true
            }}
          />
        </Box>
        <Box sx={[showDataWrapper, { marginLeft: 4 }]}>
          <TextField
            id="outlined-basic"
            label="kodeKwitansi"
            variant="outlined"
            value={kodeKwitansi}
            onChange={(e) => setKodeKwitansi(e.target.value)}
            InputProps={{
              readOnly: true
            }}
          />
          <TextField
            id="outlined-basic"
            label="noTerakhir"
            variant="outlined"
            sx={spacingTop}
            value={noTerakhir}
            onChange={(e) => setNoTerakhir(e.target.value)}
            InputProps={{
              readOnly: true
            }}
          />
          <TextField
            id="outlined-basic"
            label="Password (baru)"
            variant="outlined"
            type="password"
            sx={spacingTop}
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
          onClick={() => navigate("/profilUser")}
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
    </Box>
  );
};

export default UbahProfilUser;

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
