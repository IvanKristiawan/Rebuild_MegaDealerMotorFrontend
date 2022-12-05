import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../../contexts/AuthContext";
import { tempUrl } from "../../../contexts/ContextProvider";
import { Colors } from "../../../constants/styles";
import { PPN } from "../../../constants/GeneralSetting";
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
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";

const TambahBeliChild = () => {
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const [open, setOpen] = useState(false);
  const [kodeTipe, setKodeTipe] = useState("");
  const [tahun, setTahun] = useState("");
  const [namaWarna, setNamaWarna] = useState("");
  const [noRangka, setNoRangka] = useState("");
  const [noRangka2, setNoRangka2] = useState("");
  const [noMesin, setNoMesin] = useState("");
  const [noMesin2, setNoMesin2] = useState("");
  const [nopol, setNopol] = useState("");
  const [namaStnk, setNamaStnk] = useState("");
  const [tglStnk, setTglStnk] = useState();
  const [jenisABeli, setJenisABeli] = useState("");
  const [hargaSatuan, setHargaSatuan] = useState("");
  const [ppnABeli, setPpnABeli] = useState("");
  const [tanggalBeli, setTanggalBeli] = useState("");
  const [kodeSupplier, setKodeSupplier] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const [tipes, setTipes] = useState([]);
  const [warnas, setWarnas] = useState([]);
  const [belis, setBelis] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openAlert, setOpenAlert] = React.useState(false);

  const handleClickOpenAlert = () => {
    setOpenAlert(true);
  };

  const handleCloseAlert = () => {
    setOpenAlert(false);
  };

  const tipeOptions = tipes.map((tipe) => ({
    label: `${tipe.kodeTipe} - ${tipe.namaTipe}`
  }));

  const warnaOptions = warnas.map((warna) => ({
    label: `${warna.namaWarna}`
  }));

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  useEffect(() => {
    getTipes();
    getWarnas();
    getBelis();
    getTipeBeli();
  }, []);

  const getTipes = async () => {
    setLoading(true);
    const allTipes = await axios.post(`${tempUrl}/tipes`, {
      kodeUnitBisnis: user.unitBisnis._id,
      kodeCabang: user.cabang._id,
      id: user._id,
      token: user.token
    });
    setTipes(allTipes.data);
    setLoading(false);
  };

  const getTipe = async (idTipe) => {
    const allTipesByKode = await axios.post(`${tempUrl}/tipesByKode`, {
      kodeTipe: idTipe,
      kodeUnitBisnis: user.unitBisnis._id,
      kodeCabang: user.cabang._id,
      id: user._id,
      token: user.token
    });
    if (allTipesByKode.data) {
      setNoRangka(allTipesByKode.data.noRangka);
      setNoMesin(allTipesByKode.data.noMesin);
    }
    setKodeTipe(idTipe);
  };

  const getTipeBeli = async () => {
    setLoading(true);
    const allBelis = await axios.post(`${tempUrl}/belis/${id}`, {
      kodeUnitBisnis: user.unitBisnis._id,
      kodeCabang: user.cabang._id,
      id: user._id,
      token: user.token
    });
    setJenisABeli(allBelis.data.jenisBeli);
    setTanggalBeli(allBelis.data.tanggalBeli);
    setKodeSupplier(allBelis.data.supplier._id);
    setLoading(false);
  };

  const getWarnas = async () => {
    setLoading(true);
    const allWarnas = await axios.post(`${tempUrl}/warnas`, {
      kodeUnitBisnis: user.unitBisnis._id,
      kodeCabang: user.cabang._id,
      id: user._id,
      token: user.token
    });
    setWarnas(allWarnas.data);
    setLoading(false);
  };

  const getBelis = async () => {
    setLoading(true);
    const pickedBeli = await axios.post(`${tempUrl}/belis/${id}`, {
      kodeUnitBisnis: user.unitBisnis._id,
      kodeCabang: user.cabang._id,
      id: user._id,
      token: user.token
    });
    setBelis(pickedBeli.data);
    setLoading(false);
  };

  const saveBeliChild = async (e) => {
    e.preventDefault();
    // Set Tgl Stnk
    if (tglStnk !== undefined) {
      var tempTanggalStnk1 = tglStnk.toString().split("-", 1)[0];
      var tempTanggalStnk2 = tglStnk.toString().split("-")[1];
      var tempTanggalStnk3 = tglStnk.toString().split("-")[2];
      var combineTanggalBeli = `${tempTanggalStnk3}-${tempTanggalStnk2}-${tempTanggalStnk1}`;
    }
    // Get Beli
    const response = await axios.post(`${tempUrl}/belis/${id}`, {
      kodeUnitBisnis: user.unitBisnis._id,
      kodeCabang: user.cabang._id,
      id: user._id,
      token: user.token
    });
    // Get Tipe/Merk
    const getTipe = await axios.post(`${tempUrl}/tipesByKode`, {
      kodeUnitBisnis: user.unitBisnis._id,
      kodeCabang: user.cabang._id,
      kodeTipe,
      id: user._id,
      token: user.token
    });

    if (response.data.jenisBeli === "BARU") {
      if (
        kodeTipe.length === 0 ||
        tahun.length === 0 ||
        namaWarna.length === 0 ||
        hargaSatuan.length === 0
      ) {
        setError(true);
        setOpen(!open);
      } else {
        try {
          setLoading(true);
          // Get Beli
          const getBeli = await axios.post(`${tempUrl}/belis/${id}`, {
            kodeUnitBisnis: user.unitBisnis._id,
            kodeCabang: user.cabang._id,
            id: user._id,
            token: user.token
          });
          // Save Daftar Stok
          const tempDaftarStok = await axios.post(`${tempUrl}/saveDaftarStok`, {
            noBeli: belis.noBeli,
            tanggalBeli,
            kodeSupplier,
            merk: getTipe.data.merk,
            tipe: getTipe.data.kodeTipe,
            noRangka: `${noRangka}${noRangka2}`,
            noMesin: `${noMesin}${noMesin2}`,
            nopol,
            tahun,
            namaWarna,
            namaStnk,
            tglStnk,
            jenisBeli: jenisABeli,
            hargaSatuan,
            ppnABeli,
            kodeUnitBisnis: user.unitBisnis._id,
            kodeCabang: user.cabang._id,
            id: user._id,
            token: user.token
          });
          // Update Beli
          await axios.post(`${tempUrl}/updateBeli/${id}`, {
            jumlahBeli:
              parseInt(getBeli.data.jumlahBeli) + parseInt(hargaSatuan),
            kodeUnitBisnis: user.unitBisnis._id,
            kodeCabang: user.cabang._id,
            id: user._id,
            token: user.token
          });
          setLoading(false);
          navigate(`/daftarBeli/beli/${id}`);
        } catch (error) {
          console.log(error);
        }
      }
    } else if (response.data.jenisBeli === "BEKAS") {
      if (
        kodeTipe.length === 0 ||
        tahun.length === 0 ||
        namaWarna.length === 0 ||
        nopol.length === 0 ||
        namaStnk.length === 0 ||
        !tglStnk ||
        hargaSatuan.length === 0
      ) {
        setError(true);
        setOpen(!open);
      } else {
        try {
          setLoading(true);
          // Get Beli
          const getBeli = await axios.post(`${tempUrl}/belis/${id}`, {
            kodeUnitBisnis: user.unitBisnis._id,
            kodeCabang: user.cabang._id,
            id: user._id,
            token: user.token
          });
          // Save Daftar Stok
          const tempDaftarStok = await axios.post(`${tempUrl}/saveDaftarStok`, {
            noBeli: belis.noBeli,
            tanggalBeli,
            kodeSupplier,
            merk: getTipe.data.merk,
            tipe: `${getTipe.data.kodeTipe}`,
            noRangka: `${noRangka}${noRangka2}`,
            noMesin: `${noMesin}${noMesin2}`,
            nopol,
            tahun,
            namaWarna,
            namaStnk,
            tglStnk: combineTanggalBeli,
            jenisBeli: jenisABeli,
            hargaSatuan,
            ppnABeli,
            kodeUnitBisnis: user.unitBisnis._id,
            kodeCabang: user.cabang._id,
            id: user._id,
            token: user.token
          });
          // Update Beli
          await axios.post(`${tempUrl}/updateBeli/${id}`, {
            jumlahBeli:
              parseInt(getBeli.data.jumlahBeli) + parseInt(hargaSatuan),
            kodeUnitBisnis: user.unitBisnis._id,
            kodeCabang: user.cabang._id,
            id: user._id,
            token: user.token
          });
          setLoading(false);
          navigate(`/daftarBeli/beli/${id}`);
        } catch (error) {
          console.log(error);
        }
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
        Tambah Barang Beli
      </Typography>
      <Dialog
        open={openAlert}
        onClose={handleCloseAlert}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{`Data Nopol Sama`}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            {`Nopol ${nopol} sudah ada, ganti Nopol!`}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAlert}>Ok</Button>
        </DialogActions>
      </Dialog>
      <Divider sx={dividerStyle} />
      <Paper sx={contentContainer} elevation={12}>
        <Box sx={textFieldContainer}>
          <Box sx={textFieldWrapper}>
            <Typography sx={labelInput}>Kode Tipe</Typography>
            <Autocomplete
              size="small"
              disablePortal
              id="combo-box-demo"
              options={tipeOptions}
              renderInput={(params) => (
                <TextField
                  size="small"
                  error={error && kodeTipe.length === 0 && true}
                  helperText={
                    error && kodeTipe.length === 0 && "Kode Tipe harus diisi!"
                  }
                  {...params}
                />
              )}
              onInputChange={(e, value) => {
                if (value) {
                  getTipe(`${value.split(" -", 1)[0]}`);
                } else {
                  setNoRangka("");
                  setNoMesin("");
                }
              }}
            />
            <Typography sx={[labelInput, spacingTop]}>Tahun</Typography>
            <TextField
              size="small"
              error={error && tahun.length !== 4 && true}
              helperText={
                error &&
                tahun.length !== 4 &&
                "Tahun harus diisi dan harus 4 digit angka!"
              }
              type="number"
              id="outlined-basic"
              variant="outlined"
              value={tahun}
              onChange={(e) => setTahun(e.target.value.toUpperCase())}
            />
            <Typography sx={[labelInput, spacingTop]}>Nama Warna</Typography>
            <Autocomplete
              size="small"
              disablePortal
              id="combo-box-demo"
              options={warnaOptions}
              renderInput={(params) => (
                <TextField
                  size="small"
                  error={error && namaWarna.length === 0 && true}
                  helperText={
                    error && namaWarna.length === 0 && "Nama Warna harus diisi!"
                  }
                  {...params}
                />
              )}
              onInputChange={(e, value) => setNamaWarna(value)}
            />
            <Box sx={{ display: "flex" }}>
              <TextField
                size="small"
                id="outlined-basic"
                label="No Rangka"
                variant="outlined"
                value={noRangka}
                InputProps={{
                  readOnly: true
                }}
                onChange={(e) => setNoRangka(e.target.value.toUpperCase())}
                sx={[
                  textFieldStyle,
                  { flex: 2, backgroundColor: Colors.grey400 }
                ]}
              />
              <TextField
                size="small"
                id="outlined-basic"
                label="(Tambahan)"
                variant="outlined"
                value={noRangka2}
                onChange={(e) => setNoRangka2(e.target.value.toUpperCase())}
                sx={[textFieldStyle, { flex: 1 }]}
              />
            </Box>
            <Box sx={{ display: "flex" }}>
              <TextField
                size="small"
                id="outlined-basic"
                label="No Mesin"
                variant="outlined"
                value={noMesin}
                InputProps={{
                  readOnly: true
                }}
                onChange={(e) => setNoMesin(e.target.value.toUpperCase())}
                sx={[
                  textFieldStyle,
                  { flex: 2, backgroundColor: Colors.grey400 }
                ]}
              />
              <TextField
                size="small"
                id="outlined-basic"
                label="(Tambahan)"
                variant="outlined"
                value={noMesin2}
                onChange={(e) => setNoMesin2(e.target.value.toUpperCase())}
                sx={[textFieldStyle, { flex: 1 }]}
              />
            </Box>
            <Typography sx={[labelInput, spacingTop]}>Jenis</Typography>
            <TextField
              size="small"
              id="outlined-basic"
              variant="outlined"
              value={jenisABeli}
              InputProps={{
                readOnly: true
              }}
              sx={{ backgroundColor: Colors.grey400 }}
            />
          </Box>
          <Box sx={[textFieldWrapper, secondWrapper]}>
            {jenisABeli === "BEKAS" ? (
              <>
                <Typography sx={labelInput}>Nopol</Typography>
                <TextField
                  size="small"
                  error={error && nopol.length === 0 && true}
                  helperText={
                    error && nopol.length === 0 && "Nopol harus diisi!"
                  }
                  id="outlined-basic"
                  variant="outlined"
                  value={nopol}
                  onChange={(e) => setNopol(e.target.value.toUpperCase())}
                />
                <Typography sx={[labelInput, spacingTop]}>
                  Tanggal Stnk
                </Typography>
                <TextField
                  size="small"
                  type="date"
                  id="start"
                  name="trip-start"
                  error={error && tglStnk === undefined && true}
                  helperText={
                    error &&
                    tglStnk === undefined &&
                    "Tanggal Stnk harus diisi!"
                  }
                  value={tglStnk}
                  onChange={(e) => setTglStnk(e.target.value)}
                />
                <Typography sx={[labelInput, spacingTop]}>Nama Stnk</Typography>
                <TextField
                  size="small"
                  error={error && namaStnk.length === 0 && true}
                  helperText={
                    error && namaStnk.length === 0 && "Nama Stnk harus diisi!"
                  }
                  id="outlined-basic"
                  variant="outlined"
                  value={namaStnk}
                  onChange={(e) => setNamaStnk(e.target.value.toUpperCase())}
                />
              </>
            ) : (
              <>
                <Typography>Nopol</Typography>
                <TextField
                  size="small"
                  id="outlined-basic"
                  variant="outlined"
                  value={nopol}
                  InputProps={{
                    readOnly: true
                  }}
                  sx={{ backgroundColor: Colors.grey400 }}
                />
                <Typography sx={[spacingTop]}>Tanggal Stnk</Typography>
                <TextField
                  size="small"
                  id="outlined-basic"
                  variant="outlined"
                  value={tglStnk}
                  InputProps={{
                    readOnly: true
                  }}
                  sx={{ backgroundColor: Colors.grey400 }}
                />
                <Typography sx={[spacingTop]}>Nama Stnk</Typography>
                <TextField
                  size="small"
                  id="outlined-basic"
                  variant="outlined"
                  value={namaStnk}
                  InputProps={{
                    readOnly: true
                  }}
                  sx={{ backgroundColor: Colors.grey400 }}
                />
              </>
            )}
            <Box sx={hargaContainer}>
              <Typography sx={[labelInput]}>
                Harga Satuan
                {hargaSatuan !== 0 &&
                  !isNaN(parseInt(hargaSatuan)) &&
                  ` : Rp ${parseInt(hargaSatuan).toLocaleString()}`}
              </Typography>
              <TextField
                type="number"
                error={error && hargaSatuan.length === 0 && true}
                helperText={
                  error &&
                  hargaSatuan.length === 0 &&
                  "Harga Satuan harus diisi!"
                }
                id="outlined-basic"
                variant="outlined"
                size="small"
                sx={hargaTextField}
                value={hargaSatuan}
                onChange={(e) => {
                  setHargaSatuan(e.target.value);
                  setPpnABeli(e.target.value * PPN);
                }}
              />
            </Box>
            <Box sx={hargaContainer}>
              <Typography sx={hargaText}>
                PPN
                {ppnABeli !== 0 &&
                  !isNaN(parseInt(ppnABeli)) &&
                  ` : Rp ${parseInt(ppnABeli).toLocaleString()}`}
              </Typography>
              <TextField
                error={error && ppnABeli.length === 0 && true}
                helperText={
                  error && ppnABeli.length === 0 && "PPN harus diisi!"
                }
                id="outlined-basic"
                variant="outlined"
                size="small"
                sx={[hargaTextField, { backgroundColor: Colors.grey400 }]}
                value={ppnABeli}
                InputProps={{
                  readOnly: true
                }}
              />
            </Box>
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
            startIcon={<SaveIcon />}
            onClick={saveBeliChild}
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

export default TambahBeliChild;

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

const hargaContainer = {
  marginTop: 2.5
};

const hargaText = {
  fontWeight: "500",
  color: "gray"
};

const hargaTextField = {
  display: "flex"
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
    sm: 4
  },
  marginTop: {
    sm: 0,
    xs: 4
  }
};
