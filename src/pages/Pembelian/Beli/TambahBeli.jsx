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
  Autocomplete,
  Snackbar,
  Alert,
  Paper
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import { Colors } from "../../../constants/styles";

const TambahBeli = () => {
  const { user, dispatch } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const [kodeBeli, setKodeBeli] = useState("");
  const [kodeSupplier, setKodeSupplier] = useState("");
  const [jumlahBeli, setJumlahBeli] = useState(0);
  const [ppnBeli, setPpnBeli] = useState(0);
  const [potongan, setPotongan] = useState(0);
  const [lama, setLama] = useState("");
  const [jenisBeli, setJenisBeli] = useState("");
  const [jatuhTempo, setJatuhTempo] = useState("");
  const [error, setError] = useState(false);
  const [suppliers, setSuppliers] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  var date = new Date();
  var now_date =
    date.getDate().toLocaleString("en-US", {
      minimumIntegerDigits: 2,
      useGrouping: false
    }) +
    "-" +
    (date.getMonth() + 1).toLocaleString("en-US", {
      minimumIntegerDigits: 2,
      useGrouping: false
    }) +
    "-" +
    date.getFullYear();
  const [tanggalBeli, setTanggalBeli] = useState(`${now_date}`);

  const supplierOptions = suppliers.map((supplier) => ({
    label: `${supplier._id} - ${supplier.namaSupplier}`
  }));

  const jenisBeliOption = [{ label: "BARU" }, { label: "BEKAS" }];

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  useEffect(() => {
    getSupplier();
    getNextLength();
  }, []);

  const getNextLength = async () => {
    setLoading(true);
    const response = await axios.post(`${tempUrl}/belisNextLength`, {
      id: user._id,
      token: user.token,
      kodeUnitBisnis: user.unitBisnis._id,
      kodeCabang: user.cabang._id
    });
    setKodeBeli(response.data);
    setLoading(false);
  };

  const getSupplier = async () => {
    setLoading(true);
    const response = await axios.post(`${tempUrl}/suppliers`, {
      id: user._id,
      token: user.token,
      kodeUnitBisnis: user.unitBisnis._id,
      kodeCabang: user.cabang._id
    });
    setSuppliers(response.data);
    setLoading(false);
  };

  const saveUser = async (e) => {
    e.preventDefault();

    if (
      tanggalBeli.length === 0 ||
      kodeSupplier.length === 0 ||
      jenisBeli.length === 0 ||
      lama.length === 0 ||
      jatuhTempo.length === 0
    ) {
      setError(true);
      setOpen(!open);
    } else {
      try {
        setLoading(true);
        await axios.post(`${tempUrl}/saveBeli`, {
          kodeSupplier,
          tanggalBeli,
          jumlahBeli,
          ppnBeli,
          potongan,
          lama,
          jenisBeli,
          jatuhTempo,
          kodeUnitBisnis: user.unitBisnis._id,
          kodeCabang: user.cabang._id,
          id: user._id,
          token: user.token
        });
        setLoading(false);
        navigate("/daftarBeli");
      } catch (error) {
        console.log(error);
      }
    }
  };

  const lamaFunction = (e, value) => {
    var tempShit1 = tanggalBeli.toString().split("-", 1)[0];
    var tempShit2 = tanggalBeli.toString().split("-")[1];
    var tempShit3 = tanggalBeli.toString().split("-")[2];
    var combineShit = `${tempShit3}-${tempShit2}-${tempShit1}`;
    var someDate = new Date(combineShit);
    var numberOfDaysToAdd =
      e.target.value !== "" ? parseInt(e.target.value) : 0;
    var result = someDate.setDate(someDate.getDate() + numberOfDaysToAdd);
    var finalize = new Date(result);
    var now_final =
      finalize.getDate().toLocaleString("en-US", {
        minimumIntegerDigits: 2,
        useGrouping: false
      }) +
      "-" +
      (finalize.getMonth() + 1).toLocaleString("en-US", {
        minimumIntegerDigits: 2,
        useGrouping: false
      }) +
      "-" +
      finalize.getFullYear();
    setJatuhTempo(now_final);
    setLama(e.target.value.toUpperCase());
  };

  const jatuhTempoFunction = (e) => {
    var tempTanggalBeli1 = tanggalBeli.toString().split("-", 1)[0];
    var tempTanggalBeli2 = tanggalBeli.toString().split("-")[1];
    var tempTanggalBeli3 = tanggalBeli.toString().split("-")[2];
    var combineTanggalBeli = `${tempTanggalBeli3}-${tempTanggalBeli2}-${tempTanggalBeli1}`;
    var tempTanggalBeli = new Date(combineTanggalBeli);
    var tempJatuhTempo1 = e.target.value.toString().split("-", 1)[0];
    var tempJatuhTempo2 = e.target.value.toString().split("-")[1];
    var tempJatuhTempo3 = e.target.value.toString().split("-")[2];
    var combineJatuhTempo = `${tempJatuhTempo3}-${tempJatuhTempo2}-${tempJatuhTempo1}`;
    var tempJatuhTempo = new Date(combineJatuhTempo);

    const diffTime = Math.abs(tempJatuhTempo - tempTanggalBeli);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    setLama(diffDays);
    setJatuhTempo(e.target.value.toUpperCase());
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <Box sx={container}>
      <Typography color="#757575">Pembelian</Typography>
      <Typography variant="h4" sx={subTitleText}>
        Tambah Beli
      </Typography>
      <Divider sx={dividerStyle} />
      <Paper sx={contentContainer} elevation={12}>
        <Box sx={textFieldContainer}>
          <Box sx={textFieldWrapper}>
            <Typography sx={labelInput}>Kode Beli</Typography>
            <TextField
              size="small"
              id="outlined-basic"
              variant="outlined"
              value={kodeBeli}
              InputProps={{
                readOnly: true
              }}
              sx={{ backgroundColor: Colors.grey400 }}
            />
            <Typography sx={[labelInput, spacingTop]}>
              Tanggal (hari-bulan-tahun)
            </Typography>
            <TextField
              size="small"
              error={error && tanggalBeli.length === 0 && true}
              helperText={
                error && tanggalBeli.length === 0 && "Tanggal harus diisi!"
              }
              id="outlined-basic"
              variant="outlined"
              value={tanggalBeli}
              onChange={(e) => setTanggalBeli(e.target.value.toUpperCase())}
            />
            <Typography sx={[labelInput, spacingTop]}>Kode Supplier</Typography>
            <Autocomplete
              size="small"
              disablePortal
              id="combo-box-demo"
              options={supplierOptions}
              renderInput={(params) => (
                <TextField
                  size="small"
                  error={error && kodeSupplier.length === 0 && true}
                  helperText={
                    error &&
                    kodeSupplier.length === 0 &&
                    "Kode Supplier harus diisi!"
                  }
                  {...params}
                />
              )}
              onInputChange={(e, value) =>
                setKodeSupplier(value.split(" ", 1)[0])
              }
            />
            <Typography sx={[labelInput, spacingTop]}>Jenis Motor</Typography>
            <Autocomplete
              size="small"
              disablePortal
              id="combo-box-demo"
              options={jenisBeliOption}
              renderInput={(params) => (
                <TextField
                  size="small"
                  error={error && jenisBeli.length === 0 && true}
                  helperText={
                    error &&
                    jenisBeli.length === 0 &&
                    "Jenis Motor harus diisi!"
                  }
                  {...params}
                />
              )}
              onInputChange={(e, value) => setJenisBeli(value)}
            />
            <Typography sx={[labelInput, spacingTop]}>Jumlah</Typography>
            <TextField
              size="small"
              id="outlined-basic"
              variant="outlined"
              value={jumlahBeli}
              InputProps={{
                readOnly: true
              }}
              sx={{ backgroundColor: Colors.grey400 }}
            />
          </Box>
          <Box sx={[textFieldWrapper, secondWrapper]}>
            <Typography sx={labelInput}>PPN</Typography>
            <TextField
              size="small"
              id="outlined-basic"
              variant="outlined"
              value={ppnBeli}
              InputProps={{
                readOnly: true
              }}
              sx={{ backgroundColor: Colors.grey400 }}
            />
            <Typography sx={[labelInput, spacingTop]}>Potongan</Typography>
            <TextField
              size="small"
              id="outlined-basic"
              variant="outlined"
              value={potongan}
              InputProps={{
                readOnly: true
              }}
              sx={{ backgroundColor: Colors.grey400 }}
            />
            <Typography sx={[labelInput, spacingTop]}>Lama (Hari)</Typography>
            <TextField
              error={error && lama.length === 0 && true}
              helperText={error && lama.length === 0 && "Lama harus diisi!"}
              size="small"
              id="outlined-basic"
              variant="outlined"
              value={lama}
              onChange={(e, value) => lamaFunction(e, value)}
            />
            <Typography sx={[labelInput, spacingTop]}>
              Jatuh Tempo (hari-bulan-tahun)
            </Typography>
            <TextField
              error={error && jatuhTempo.length === 0 && true}
              helperText={
                error && jatuhTempo.length === 0 && "Jatuh Tempo harus diisi!"
              }
              size="small"
              id="outlined-basic"
              variant="outlined"
              value={jatuhTempo}
              onChange={(e) => jatuhTempoFunction(e)}
            />
          </Box>
        </Box>
        <Box sx={textFieldStyle}>
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => navigate("/daftarBeli")}
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

export default TambahBeli;

const container = {
  p: 4
};

const subTitleText = {
  fontWeight: "900"
};

const dividerStyle = {
  mt: 2
};

const textFieldContainer = {
  mt: 4,
  display: "flex",
  flexDirection: {
    xs: "column",
    sm: "row"
  }
};

const textFieldWrapper = {
  display: "flex",
  flex: 1,
  flexDirection: "column",
  maxWidth: {
    md: "40vw"
  }
};

const textFieldStyle = {
  mt: 4
};

const alertBox = {
  width: "100%"
};

const spacingTop = {
  mt: 4
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
