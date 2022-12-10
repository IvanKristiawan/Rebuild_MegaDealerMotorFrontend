import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../../../contexts/AuthContext";
import { tempUrl } from "../../../../contexts/ContextProvider";
import { Colors } from "../../../../constants/styles";
import { Loader } from "../../../../components";
import {
  Box,
  Typography,
  TextField,
  Button,
  Divider,
  Snackbar,
  Alert,
  Autocomplete,
  Paper
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";

const TambahGroupCOA = () => {
  const { user } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const [kodeJenisCOA, setKodeJenisCOA] = useState("");
  const [namaJenisCOA, setNamaJenisCOA] = useState("");
  const [namaGroupCOA, setNamaGroupCOA] = useState("");
  const [jenisCOAsData, setJenisCOAsData] = useState([]);

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
    getJenisCOAsData();
  }, []);

  const getJenisCOAsData = async () => {
    setLoading(true);
    const allJenisCOAs = await axios.post(`${tempUrl}/jenisCOAs`, {
      id: user._id,
      token: user.token,
      kodeUnitBisnis: user.unitBisnis._id,
      kodeCabang: user.cabang._id
    });
    setJenisCOAsData(allJenisCOAs.data);
    setLoading(false);
  };

  const saveGroupCOA = async (e) => {
    e.preventDefault();
    let isFailValidation =
      kodeJenisCOA.length === 0 || namaGroupCOA.length === 0;
    if (isFailValidation) {
      setError(true);
      setOpen(!open);
    } else {
      try {
        setLoading(true);
        await axios.post(`${tempUrl}/saveGroupCOA`, {
          kodeJenisCOA,
          namaJenisCOA,
          namaGroupCOA,
          kodeUnitBisnis: user.unitBisnis._id,
          kodeCabang: user.cabang._id,
          id: user._id,
          token: user.token
        });
        setLoading(false);
        navigate("/groupCOA");
      } catch (error) {
        console.log(error);
      }
    }
  };

  const jenisCOAOptions = jenisCOAsData.map((groupCOA) => ({
    label: `${groupCOA.kodeJenisCOA} - ${groupCOA.namaJenisCOA}`
  }));

  if (loading) {
    return <Loader />;
  }

  return (
    <Box sx={container}>
      <Typography color="#757575">Master</Typography>
      <Typography variant="h4" sx={subTitleText}>
        Tambah Group COA
      </Typography>
      <Divider sx={dividerStyle} />
      <Paper sx={contentContainer} elevation={12}>
        <Box sx={showDataContainer}>
          <Box sx={showDataWrapper}>
            <Typography sx={labelInput}>Kode Jenis COA</Typography>
            <Autocomplete
              size="small"
              disablePortal
              id="combo-box-demo"
              options={jenisCOAOptions}
              renderInput={(params) => (
                <TextField
                  size="small"
                  error={error && kodeJenisCOA.length === 0 && true}
                  helperText={
                    error &&
                    kodeJenisCOA.length === 0 &&
                    "Kode Jenis harus diisi!"
                  }
                  {...params}
                />
              )}
              onInputChange={(e, value) => {
                setKodeJenisCOA(value.split(" ", 1)[0]);
                setNamaJenisCOA(value.split("- ")[1]);
              }}
            />
            <Typography sx={[labelInput, spacingTop]}>
              Nama Group COA
            </Typography>
            <TextField
              size="small"
              error={error && namaGroupCOA.length === 0 && true}
              helperText={
                error && namaGroupCOA.length === 0 && "Nama Group harus diisi!"
              }
              id="outlined-basic"
              variant="outlined"
              value={namaGroupCOA}
              onChange={(e) => setNamaGroupCOA(e.target.value.toUpperCase())}
            />
          </Box>
        </Box>
        <Box sx={spacingTop}>
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => navigate("/groupCOA")}
            sx={{ marginRight: 2 }}
          >
            {"< Kembali"}
          </Button>
          <Button
            variant="contained"
            startIcon={<SaveIcon />}
            onClick={saveGroupCOA}
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

export default TambahGroupCOA;

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
