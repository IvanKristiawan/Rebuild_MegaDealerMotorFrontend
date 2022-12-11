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
  Paper,
  Autocomplete
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

const UbahCOA = () => {
  const { user } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const [kodeCOA, setKodeCOA] = useState("");
  const [namaCOA, setNamaCOA] = useState("");
  const [jenisSaldo, setJenisSaldo] = useState("");
  const [kasBank, setKasBank] = useState("");
  const [kodeJenisCOA, setKodeJenisCOA] = useState("");
  const [kodeGroupCOA, setKodeGroupCOA] = useState("");
  const [kodeSubGroupCOA, setKodeSubGroupCOA] = useState("");
  const [jenisCOAsData, setJenisCOAsData] = useState([]);
  const [groupCOAsData, setGroupCOAsData] = useState([]);
  const [subGroupCOAsData, setSubGroupCOAsData] = useState([]);

  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);

  const jenisCOAOptions = jenisCOAsData.map((jenisCOA) => ({
    label: `${jenisCOA.kodeJenisCOA} - ${jenisCOA.namaJenisCOA}`
  }));

  const groupCOAOptions = groupCOAsData.map((groupCOA) => ({
    label: `${groupCOA.kodeGroupCOA} - ${groupCOA.namaGroupCOA}`
  }));

  const subGroupCOAOptions = subGroupCOAsData.map((subGroupCOA) => ({
    label: `${subGroupCOA.kodeSubGroupCOA} - ${subGroupCOA.namaSubGroupCOA}`
  }));

  const jenisSaldoOptions = [{ label: "DEBIT" }, { label: "KREDIT" }];

  const kasBankOptions = [
    { label: "KAS" },
    { label: "BANK" },
    { label: "NON KAS BANK" }
  ];

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  useEffect(() => {
    getSubGroupCOAsData();
    getGroupCOAsData();
    getJenisCOAsData();
    getCOAById();
  }, []);

  const getSubGroupCOAsData = async () => {
    setLoading(true);
    const allSubGroupCOAs = await axios.post(`${tempUrl}/subGroupCOAs`, {
      id: user._id,
      token: user.token,
      kodeCabang: user.cabang._id
    });
    setSubGroupCOAsData(allSubGroupCOAs.data);
    setLoading(false);
  };

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

  const getJenisCOAsData = async () => {
    setLoading(true);
    const allJenisCOAs = await axios.post(`${tempUrl}/jenisCOAs`, {
      id: user._id,
      token: user.token,
      kodeCabang: user.cabang._id
    });
    setJenisCOAsData(allJenisCOAs.data);
    setLoading(false);
  };

  const getCOAById = async () => {
    setLoading(true);
    const pickedTipe = await axios.post(`${tempUrl}/COAs/${id}`, {
      id: user._id,
      token: user.token
    });
    setKodeCOA(pickedTipe.data.kodeCOA);
    setNamaCOA(pickedTipe.data.namaCOA);
    setJenisSaldo(pickedTipe.data.jenisSaldo);
    setKasBank(pickedTipe.data.kasBank);
    setKodeJenisCOA(pickedTipe.data.jenisCOA);
    setKodeGroupCOA(pickedTipe.data.groupCOA);
    setKodeSubGroupCOA(pickedTipe.data.subGroupCOA);
    setLoading(false);
  };

  const updateTipe = async (e) => {
    e.preventDefault();
    let isFailedValidation =
      kodeCOA.length === 0 ||
      namaCOA.length === 0 ||
      kodeJenisCOA.length === 0 ||
      kodeGroupCOA.length === 0 ||
      kodeSubGroupCOA.length === 0 ||
      jenisSaldo.length === 0 ||
      kasBank.length === 0;
    if (isFailedValidation) {
      setError(true);
      setOpen(!open);
    } else {
      try {
        setLoading(true);
        let tempJenisCOA = await axios.post(`${tempUrl}/jenisCOAByKode`, {
          kodeJenisCOA: kodeJenisCOA.split(" ", 1)[0],
          kodeCabang: user.cabang._id,
          id: user._id,
          token: user.token
        });
        let tempGroupCOA = await axios.post(`${tempUrl}/groupCOAByKode`, {
          kodeGroupCOA: kodeGroupCOA.split(" ", 1)[0],
          kodeCabang: user.cabang._id,
          id: user._id,
          token: user.token
        });
        let tempSubGroupCOA = await axios.post(`${tempUrl}/subGroupCOAByKode`, {
          kodeSubGroupCOA: kodeSubGroupCOA.split(" ", 1)[0],
          kodeCabang: user.cabang._id,
          id: user._id,
          token: user.token
        });
        await axios.post(`${tempUrl}/updateCOA/${id}`, {
          namaCOA,
          kodeCOA,
          kodeSubGroupCOA: kodeSubGroupCOA.split(" ", 1)[0],
          subGroupCOA: tempSubGroupCOA.data._id,
          groupCOA: tempGroupCOA.data._id,
          jenisCOA: tempJenisCOA.data._id,
          jenisSaldo,
          kasBank,
          kodeCabang: user.cabang._id,
          id: user._id,
          token: user.token
        });
        setLoading(false);
        navigate(`/COA/${id}`);
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
        Ubah COA
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
                    "Kode Jenis COA harus diisi!"
                  }
                  {...params}
                />
              )}
              onInputChange={(e, value) => {
                setKodeJenisCOA(value);
              }}
              value={{ label: kodeJenisCOA }}
            />
            <Typography sx={[labelInput, spacingTop]}>
              Kode Group COA
            </Typography>
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
              Kode Sub Group COA
            </Typography>
            <Autocomplete
              size="small"
              disablePortal
              id="combo-box-demo"
              options={subGroupCOAOptions}
              renderInput={(params) => (
                <TextField
                  size="small"
                  error={error && kodeSubGroupCOA.length === 0 && true}
                  helperText={
                    error &&
                    kodeSubGroupCOA.length === 0 &&
                    "Kode Group COA harus diisi!"
                  }
                  {...params}
                />
              )}
              onInputChange={(e, value) => {
                setKodeSubGroupCOA(value);
              }}
              value={{ label: kodeSubGroupCOA }}
            />
            <Typography sx={[labelInput, spacingTop]}>Kode COA</Typography>
            <TextField
              size="small"
              id="outlined-basic"
              variant="outlined"
              value={kodeCOA}
              InputProps={{
                readOnly: true
              }}
              sx={{ backgroundColor: Colors.grey400 }}
            />
          </Box>
          <Box sx={[showDataWrapper, secondWrapper]}>
            <Typography sx={labelInput}>Nama COA</Typography>
            <TextField
              size="small"
              error={error && namaCOA.length === 0 && true}
              helperText={
                error && namaCOA.length === 0 && "Nama COA harus diisi!"
              }
              id="outlined-basic"
              variant="outlined"
              value={namaCOA}
              onChange={(e) => setNamaCOA(e.target.value.toUpperCase())}
            />
            <Typography sx={[labelInput, spacingTop]}>Jenis Saldo</Typography>
            <Autocomplete
              size="small"
              disablePortal
              id="combo-box-demo"
              options={jenisSaldoOptions}
              renderInput={(params) => (
                <TextField
                  size="small"
                  error={error && jenisSaldo.length === 0 && true}
                  helperText={
                    error &&
                    jenisSaldo.length === 0 &&
                    "Jenis Saldo harus diisi!"
                  }
                  {...params}
                />
              )}
              onInputChange={(e, value) => {
                setJenisSaldo(value);
              }}
              value={{ label: jenisSaldo }}
            />
            <Typography sx={[labelInput, spacingTop]}>Kas/Bank</Typography>
            <Autocomplete
              size="small"
              disablePortal
              id="combo-box-demo"
              options={kasBankOptions}
              renderInput={(params) => (
                <TextField
                  size="small"
                  error={error && kasBank.length === 0 && true}
                  helperText={
                    error && kasBank.length === 0 && "Kas/Bank harus diisi!"
                  }
                  {...params}
                />
              )}
              onInputChange={(e, value) => {
                setKasBank(value);
              }}
              value={{ label: kasBank }}
            />
          </Box>
        </Box>
        <Box sx={spacingTop}>
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => navigate("/COA")}
            sx={{ marginRight: 2 }}
          >
            {"< Kembali"}
          </Button>
          <Button
            variant="contained"
            startIcon={<EditIcon />}
            onClick={updateTipe}
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

export default UbahCOA;

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
    sm: 4
  },
  marginTop: {
    sm: 0,
    xs: 4
  }
};
