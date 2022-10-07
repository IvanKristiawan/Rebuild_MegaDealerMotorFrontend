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
  Alert
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";

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
    label: `${supplier.kodeSupplier} - ${supplier.namaSupplier}`
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
      token: user.token
    });
    setKodeBeli(response.data);
    setLoading(false);
  };

  const getSupplier = async () => {
    setLoading(true);
    const response = await axios.post(`${tempUrl}/suppliers`, {
      id: user._id,
      token: user.token
    });
    setSuppliers(response.data);
    setLoading(false);
  };

  const saveUser = async (e) => {
    e.preventDefault();

    if (tanggalBeli.length === 0 || kodeSupplier.length === 0) {
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
      <Box sx={textFieldContainer}>
        <Box sx={textFieldWrapper}>
          <TextField
            id="outlined-basic"
            label="Kode Beli"
            variant="outlined"
            value={kodeBeli}
            disabled
          />
          <TextField
            error={error && tanggalBeli.length === 0 && true}
            helperText={
              error && tanggalBeli.length === 0 && "Tanggal harus diisi!"
            }
            id="outlined-basic"
            label="Tanggal (hari-bulan-tahun)"
            variant="outlined"
            sx={textFieldStyle}
            value={tanggalBeli}
            onChange={(e) => setTanggalBeli(e.target.value.toUpperCase())}
          />
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={supplierOptions}
            renderInput={(params) => (
              <TextField
                error={error && kodeSupplier.length === 0 && true}
                helperText={
                  error &&
                  kodeSupplier.length === 0 &&
                  "Kode Supplier harus diisi!"
                }
                {...params}
                label="Kode Supplier"
              />
            )}
            onInputChange={(e, value) =>
              setKodeSupplier(value.split(" ", 1)[0])
            }
            sx={textFieldStyle}
          />
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={jenisBeliOption}
            renderInput={(params) => (
              <TextField
                error={error && jenisBeli.length === 0 && true}
                helperText={
                  error && jenisBeli.length === 0 && "Jenis Motor harus diisi!"
                }
                {...params}
                label="Jenis Motor"
              />
            )}
            onInputChange={(e, value) => setJenisBeli(value)}
            sx={textFieldStyle}
          />
          <TextField
            id="outlined-basic"
            label="Jumlah"
            variant="outlined"
            sx={textFieldStyle}
            value={jumlahBeli}
            disabled
            onChange={(e) => setJumlahBeli(e.target.value.toUpperCase())}
          />
        </Box>
        <Box sx={[textFieldWrapper, { marginLeft: 4 }]}>
          <TextField
            id="outlined-basic"
            label="PPN"
            variant="outlined"
            value={ppnBeli}
            disabled
            onChange={(e) => setPpnBeli(e.target.value.toUpperCase())}
          />
          <TextField
            id="outlined-basic"
            label="Potongan"
            variant="outlined"
            sx={textFieldStyle}
            value={potongan}
            disabled
            onChange={(e) => setPotongan(e.target.value.toUpperCase())}
          />
          <TextField
            id="outlined-basic"
            label="Lama (Hari)"
            variant="outlined"
            sx={textFieldStyle}
            value={lama}
            onChange={(e, value) => {
              var tempShit1 = tanggalBeli.toString().split("-", 1)[0];
              var tempShit2 = tanggalBeli.toString().split("-")[1];
              var tempShit3 = tanggalBeli.toString().split("-")[2];
              var combineShit = `${tempShit3}-${tempShit2}-${tempShit1}`;
              var someDate = new Date(combineShit);
              var numberOfDaysToAdd =
                e.target.value !== "" ? parseInt(e.target.value) : 0;
              var result = someDate.setDate(
                someDate.getDate() + numberOfDaysToAdd
              );
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
            }}
          />
          <TextField
            id="outlined-basic"
            label="Jatuh Tempo (hari-bulan-tahun)"
            variant="outlined"
            sx={textFieldStyle}
            value={jatuhTempo}
            onChange={(e) => {
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
            }}
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
        <Button variant="contained" startIcon={<SaveIcon />} onClick={saveUser}>
          Simpan
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
