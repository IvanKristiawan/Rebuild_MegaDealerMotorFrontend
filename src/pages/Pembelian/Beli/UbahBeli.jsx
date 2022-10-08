import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../../contexts/AuthContext";
import { PPN } from "../../../constants/GeneralSetting";
import { useNavigate, useParams } from "react-router-dom";
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
import EditIcon from "@mui/icons-material/Edit";
import { Colors } from "../../../constants/styles";

const UbahBeli = () => {
  const { user, dispatch } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const [kodeBeli, setKodeBeli] = useState("");
  const [tanggalBeli, setTanggalBeli] = useState("");
  const [kodeSupplier, setKodeSupplier] = useState("");
  const [jumlahBeli, setJumlahBeli] = useState("");
  const [ppnBeli, setPpnBeli] = useState("");
  const [isPpnBeli, setIsPpnBeli] = useState();
  const [potongan, setPotongan] = useState(0);
  const [lama, setLama] = useState("");
  const [jenisBeli, setJenisBeli] = useState("");
  const [jatuhTempo, setJatuhTempo] = useState("");
  const [error, setError] = useState(false);
  const [suppliers, setSuppliers] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);

  const supplierOptions = suppliers.map((supplier) => ({
    label: `${supplier.kodeSupplier} - ${supplier.namaSupplier}`
  }));

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  useEffect(() => {
    getSupplier();
    getUserById();
  }, []);

  const getSupplier = async () => {
    setLoading(true);
    const response = await axios.post(`${tempUrl}/suppliers`, {
      id: user._id,
      token: user.token
    });
    setSuppliers(response.data);
    setLoading(false);
  };

  const getUserById = async () => {
    setLoading(true);
    const response = await axios.post(`${tempUrl}/belis/${id}`, {
      id: user._id,
      token: user.token
    });
    setKodeBeli(response.data.noBeli);
    setTanggalBeli(response.data.tanggalBeli);
    setJumlahBeli(response.data.jumlahBeli);
    setKodeSupplier(response.data.kodeSupplier);
    setPpnBeli(response.data.ppnBeli);
    setIsPpnBeli(response.data.isPpnBeli);
    setPotongan(response.data.potongan);
    setLama(response.data.lama);
    setJenisBeli(response.data.jenisBeli);
    setJatuhTempo(response.data.jatuhTempo);
    setLoading(false);
  };

  const updateUser = async (e) => {
    e.preventDefault();
    if (
      tanggalBeli.length === 0 ||
      kodeSupplier.length === 0 ||
      jumlahBeli.length === 0
    ) {
      setError(true);
      setOpen(!open);
    } else {
      try {
        setLoading(true);
        await axios.post(`${tempUrl}/updateBeli/${id}`, {
          tanggalBeli,
          kodeSupplier,
          jumlahBeli,
          potongan,
          lama,
          jenisBeli,
          jatuhTempo,
          ppnBeli: ppnBeli ? ppnBeli : 0,
          id: user._id,
          token: user.token
        });
        setLoading(false);
        navigate(`/daftarBeli/beli/${id}`);
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
        Ubah Beli
      </Typography>
      <Divider sx={dividerStyle} />
      <Paper sx={contentContainer} elevation={12}>
        <Box sx={textFieldContainer}>
          <Box sx={textFieldWrapper}>
            <Typography sx={labelInput}>Kode Beli</Typography>
            <TextField
              id="outlined-basic"
              variant="outlined"
              value={kodeBeli}
              InputProps={{
                readOnly: true
              }}
            />
            <Typography sx={[labelInput, spacingTop]}>Jenis Motor</Typography>
            <TextField
              id="outlined-basic"
              variant="outlined"
              value={jenisBeli}
              disabled
            />
            <Typography sx={[labelInput, spacingTop]}>
              Tanggal (hari-bulan-tahun)
            </Typography>
            <TextField
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
                />
              )}
              onInputChange={(e, value) =>
                setKodeSupplier(value.split(" ", 1)[0])
              }
              value={{ label: kodeSupplier }}
            />
            <Typography sx={[labelInput, spacingTop]}>Lama (Hari)</Typography>
            <TextField
              id="outlined-basic"
              variant="outlined"
              value={lama}
              onChange={(e, value) => lamaFunction(e, value)}
            />
            <Typography sx={[labelInput, spacingTop]}>
              Jatuh Tempo (hari-bulan-tahun)
            </Typography>
            <TextField
              id="outlined-basic"
              variant="outlined"
              value={jatuhTempo}
              onChange={(e) => jatuhTempoFunction(e)}
            />
          </Box>
          <Box sx={[textFieldWrapper, secondWrapper]}>
            <Box sx={[jumlahContainer, { marginTop: 0 }]}>
              <Typography sx={jumlahText}>
                Jumlah
                {jumlahBeli !== 0 &&
                  !isNaN(parseInt(jumlahBeli)) &&
                  ` : Rp ${parseInt(jumlahBeli).toLocaleString()}`}
              </Typography>
              <TextField
                error={error && jumlahBeli.length === 0 && true}
                helperText={
                  error && jumlahBeli.length === 0 && "Jumlah harus diisi!"
                }
                id="outlined-basic"
                variant="outlined"
                value={jumlahBeli}
                onChange={(e) => setJumlahBeli(e.target.value)}
                disabled
              />
            </Box>
            <Box sx={jumlahContainer}>
              <Typography sx={jumlahText}>
                Potongan
                {potongan !== 0 &&
                  !isNaN(parseInt(potongan)) &&
                  ` : Rp ${parseInt(potongan).toLocaleString()}`}
              </Typography>
              <TextField
                error={error && potongan.length === 0 && true}
                helperText={
                  error && potongan.length === 0 && "Potongan harus diisi!"
                }
                id="outlined-basic"
                variant="outlined"
                value={potongan}
                onChange={(e) => {
                  setPpnBeli((jumlahBeli - e.target.value) * PPN);
                  setPotongan(e.target.value);
                }}
              />
            </Box>
            {isPpnBeli && (
              <Box sx={jumlahContainer}>
                <Typography sx={jumlahText}>
                  PPN
                  {ppnBeli !== 0 &&
                    !isNaN(parseInt(ppnBeli)) &&
                    ` : Rp ${parseInt(ppnBeli).toLocaleString()}`}
                </Typography>
                <TextField
                  error={error && ppnBeli.length === 0 && true}
                  helperText={
                    error && ppnBeli.length === 0 && "PPN harus diisi!"
                  }
                  id="outlined-basic"
                  variant="outlined"
                  value={ppnBeli}
                  disabled
                />
              </Box>
            )}
          </Box>
        </Box>
        <Box sx={textFieldStyle}>
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => navigate(`/daftarBeli/beli/${id}`)}
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

export default UbahBeli;

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

const jumlahContainer = {
  marginTop: 2.5,
  display: "flex",
  flexDirection: "column"
};

const jumlahText = {
  fontWeight: "500",
  color: "gray"
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
