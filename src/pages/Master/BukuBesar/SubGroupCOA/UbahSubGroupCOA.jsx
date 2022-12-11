import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
import EditIcon from "@mui/icons-material/Edit";

const UbahSubGroupCOA = () => {
  const { user } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const [kodeGroupCOA, setKodeGroupCOA] = useState("");
  const [namaSubGroupCOA, setNamaSubGroupCOA] = useState("");
  const [groupCOAsData, setGroupCOAsData] = useState([]);

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
    getSubGroupById();
    getGroupCOAsData();
  }, []);

  const getGroupCOAsData = async () => {
    setLoading(true);
    const allGroupCOAs = await axios.post(`${tempUrl}/groupCOAs`, {
      id: user._id,
      token: user.token,
      kodeCabang: user.cabang._id
    });
    setGroupCOAsData(allGroupCOAs.data);
    setLoading(false);
  };

  const getSubGroupById = async () => {
    setLoading(true);
    const pickedGroupCOA = await axios.post(`${tempUrl}/subGroupCOAs/${id}`, {
      id: user._id,
      token: user.token
    });
    setKodeGroupCOA(
      `${pickedGroupCOA.data.kodeGroupCOA} - ${pickedGroupCOA.data.namaGroupCOA}`
    );
    setNamaSubGroupCOA(pickedGroupCOA.data.namaSubGroupCOA);
    setLoading(false);
  };

  const updateSubGroupCOA = async (e) => {
    e.preventDefault();
    let isFailValidation =
      kodeGroupCOA.length === 0 || namaSubGroupCOA.length === 0;
    if (isFailValidation) {
      setError(true);
      setOpen(!open);
    } else {
      try {
        setLoading(true);
        await axios.post(`${tempUrl}/updateSubGroupCOA/${id}`, {
          kodeGroupCOA: kodeGroupCOA.split(" ", 1)[0],
          namaGroupCOA: kodeGroupCOA.split("- ")[1],
          namaSubGroupCOA,
          kodeCabang: user.cabang._id,
          id: user._id,
          token: user.token
        });
        setLoading(false);
        navigate(`/subGroupCOA/${id}`);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const groupCOAOptions = groupCOAsData.map((groupCOA) => ({
    label: `${groupCOA.kodeGroupCOA} - ${groupCOA.namaGroupCOA}`
  }));

  if (loading) {
    return <Loader />;
  }

  return (
    <Box sx={container}>
      <Typography color="#757575">Master</Typography>
      <Typography variant="h4" sx={subTitleText}>
        Ubah Sub Group COA
      </Typography>
      <Divider sx={dividerStyle} />
      <Paper sx={contentContainer} elevation={12}>
        <Box sx={showDataContainer}>
          <Box sx={showDataWrapper}>
            <Typography sx={labelInput}>Kode Group COA</Typography>
            <Autocomplete
              size="small"
              disablePortal
              id="combo-box-demo"
              options={groupCOAOptions}
              renderInput={(params) => (
                <TextField
                  size="small"
                  error={error && kodeGroupCOA.length === 0 && true}
                  helperText={
                    error &&
                    kodeGroupCOA.length === 0 &&
                    "Kode Group COA harus diisi!"
                  }
                  {...params}
                />
              )}
              onInputChange={(e, value) => {
                setKodeGroupCOA(value);
              }}
              value={{ label: kodeGroupCOA }}
            />
            <Typography sx={[labelInput, spacingTop]}>
              Nama Sub Group COA
            </Typography>
            <TextField
              size="small"
              error={error && namaSubGroupCOA.length === 0 && true}
              helperText={
                error &&
                namaSubGroupCOA.length === 0 &&
                "Nama Sub Group COA harus diisi!"
              }
              id="outlined-basic"
              variant="outlined"
              value={namaSubGroupCOA}
              onChange={(e) => setNamaSubGroupCOA(e.target.value.toUpperCase())}
            />
          </Box>
        </Box>
        <Box sx={spacingTop}>
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => navigate("/subGroupCOA")}
            sx={{ marginRight: 2 }}
          >
            {"< Kembali"}
          </Button>
          <Button
            variant="contained"
            startIcon={<EditIcon />}
            onClick={updateSubGroupCOA}
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

export default UbahSubGroupCOA;

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
