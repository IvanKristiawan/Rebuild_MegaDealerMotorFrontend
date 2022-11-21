import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../../contexts/AuthContext";
import { tempUrl } from "../../../contexts/ContextProvider";
import { Colors } from "../../../constants/styles";
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
  Autocomplete,
  TextareaAutosize
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import { makeStyles } from "@mui/styles";

const TambahBiayaPerawatan = () => {
  const { user } = useContext(AuthContext);
  const [open, setOpen] = useState(false);

  const [noBukti, setNoBukti] = useState("");
  const [nopol, setNopol] = useState("");
  let findNowDate = new Date();
  let nowDate = findNowDate.toISOString().substring(0, 10);
  const [tglPerawatan, setTglPerawatan] = useState(nowDate);
  const [keterangan, setKeterangan] = useState("");
  const [biayaPerawatan, setBiayaPerawatan] = useState("");

  // Data Motor -> Dari Stok
  const [noRangka, setNoRangka] = useState("");
  const [noMesin, setNoMesin] = useState("");
  const [tipe, setTipe] = useState("");
  const [namaWarna, setNamaWarna] = useState("");
  const [tahun, setTahun] = useState("");
  const [stoks, setStoks] = useState([]);

  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const nopolOptions = stoks.map((stok) => ({
    label: `${stok.nopol}`
  }));

  useEffect(() => {
    getStok();
    getBiayaPerawatanNextKode();
  }, []);

  const getStoksByNopol = async (nopol) => {
    const allDaftarStoksByNopol = await axios.post(
      `${tempUrl}/daftarStoksByNopol`,
      {
        nopol,
        id: user._id,
        token: user.token,
        kodeUnitBisnis: user.unitBisnis._id,
        kodeCabang: user.cabang._id
      }
    );
    if (allDaftarStoksByNopol.data) {
      setNoRangka(allDaftarStoksByNopol.data.noRangka);
      setNoMesin(allDaftarStoksByNopol.data.noMesin);
      setTipe(allDaftarStoksByNopol.data.tipe);
      setNamaWarna(allDaftarStoksByNopol.data.namaWarna);
      setTahun(allDaftarStoksByNopol.data.tahun);
    }
    setNopol(nopol);
  };

  const getStok = async () => {
    setLoading(true);
    const allDaftarStokHasNopol = await axios.post(
      `${tempUrl}/daftarStoksNopolAllBlmTerjual`,
      {
        id: user._id,
        token: user.token,
        kodeUnitBisnis: user.unitBisnis._id,
        kodeCabang: user.cabang._id
      }
    );
    setStoks(allDaftarStokHasNopol.data);
    setLoading(false);
  };

  const getBiayaPerawatanNextKode = async () => {
    setLoading(true);
    const nextBiayaPerawatanKode = await axios.post(
      `${tempUrl}/biayaPerawatansNextKode`,
      {
        id: user._id,
        token: user.token,
        kodeUnitBisnis: user.unitBisnis._id,
        kodeCabang: user.cabang._id
      }
    );
    setNoBukti(nextBiayaPerawatanKode.data);
    setLoading(false);
  };

  const saveJual = async (e) => {
    e.preventDefault();
    let tempTotalBiayaPerawatan = 0;
    let isFailedValidation =
      nopol.length === 0 ||
      tglPerawatan.length === 0 ||
      biayaPerawatan.length === 0;
    if (isFailedValidation) {
      setError(true);
      setOpen(!open);
    } else {
      try {
        setLoading(true);
        let findDaftarStok = await axios.post(`${tempUrl}/daftarStoksByNopol`, {
          nopol,
          id: user._id,
          token: user.token,
          kodeUnitBisnis: user.unitBisnis._id,
          kodeCabang: user.cabang._id
        });
        tempTotalBiayaPerawatan =
          parseInt(findDaftarStok.data.totalBiayaPerawatan) +
          parseInt(biayaPerawatan);
        await axios.post(
          `${tempUrl}/updateDaftarStok/${findDaftarStok.data._id}`,
          {
            totalBiayaPerawatan: tempTotalBiayaPerawatan,
            id: user._id,
            token: user.token,
            kodeUnitBisnis: user.unitBisnis._id,
            kodeCabang: user.cabang._id
          }
        );
        await axios.post(`${tempUrl}/saveBiayaPerawatan`, {
          nopol,
          tglPerawatan,
          keterangan,
          biayaPerawatan,
          id: user._id,
          token: user.token,
          kodeUnitBisnis: user.unitBisnis._id,
          kodeCabang: user.cabang._id
        });
        setLoading(false);
        navigate("/biayaPerawatan");
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
      <Typography color="#757575">Perawatan</Typography>
      <Typography variant="h4" sx={subTitleText}>
        Tambah Biaya Perawatan
      </Typography>
      <Divider sx={dividerStyle} />
      <Paper sx={contentContainer} elevation={12}>
        {/* Data Motor */}
        <Paper elevation={6} sx={mainContainer}>
          <Typography variant="h5" sx={titleStyle} color="primary">
            DATA MOTOR
          </Typography>
          <Box sx={showDataContainer}>
            <Box sx={showDataWrapper}>
              <Typography sx={labelInput}>Nopol</Typography>
              <Autocomplete
                size="small"
                disablePortal
                id="combo-box-demo"
                options={nopolOptions}
                renderInput={(params) => (
                  <TextField
                    size="small"
                    error={error && nopol.length === 0 && true}
                    helperText={
                      error && nopol.length === 0 && "Nopol harus diisi!"
                    }
                    {...params}
                  />
                )}
                onInputChange={(e, value) => {
                  if (value) {
                    getStoksByNopol(value);
                  } else {
                    setNoRangka("");
                    setNoMesin("");
                    setTipe("");
                    setNamaWarna("");
                    setTahun("");
                  }
                }}
              />
              <Typography sx={[labelInput, spacingTop]}>No. Rangka</Typography>
              <TextField
                size="small"
                id="outlined-basic"
                variant="outlined"
                value={noRangka}
                InputProps={{
                  readOnly: true
                }}
                sx={{ backgroundColor: Colors.grey400 }}
              />
              <Typography sx={[labelInput, spacingTop]}>No. Mesin</Typography>
              <TextField
                size="small"
                id="outlined-basic"
                variant="outlined"
                value={noMesin}
                InputProps={{
                  readOnly: true
                }}
                sx={{ backgroundColor: Colors.grey400 }}
              />
            </Box>
            <Box sx={[showDataWrapper, secondWrapper]}>
              <Typography sx={labelInput}>Tipe</Typography>
              <TextField
                size="small"
                id="outlined-basic"
                variant="outlined"
                value={tipe}
                InputProps={{
                  readOnly: true
                }}
                sx={{ backgroundColor: Colors.grey400 }}
              />
              <Typography sx={[labelInput, spacingTop]}>Nama Warna</Typography>
              <TextField
                size="small"
                id="outlined-basic"
                variant="outlined"
                value={namaWarna}
                InputProps={{
                  readOnly: true
                }}
                sx={{ backgroundColor: Colors.grey400 }}
              />
              <Typography sx={[labelInput, spacingTop]}>
                Tahun Perakitan
              </Typography>
              <TextField
                size="small"
                id="outlined-basic"
                variant="outlined"
                value={tahun}
                InputProps={{
                  readOnly: true
                }}
                sx={{ backgroundColor: Colors.grey400 }}
              />
            </Box>
          </Box>
        </Paper>

        {/* Biaya Perawatan (Input) */}
        <Paper elevation={6} sx={mainContainer}>
          <Typography variant="h5" sx={titleStyle} color="primary">
            RINCIAN BIAYA PERAWATAN
          </Typography>
          <Box sx={showDataContainer}>
            <Box sx={showDataWrapper}>
              <Typography sx={labelInput}>No Bukti</Typography>
              <TextField
                size="small"
                id="outlined-basic"
                variant="outlined"
                value={noBukti}
                InputProps={{
                  readOnly: true
                }}
                sx={{ backgroundColor: Colors.grey400 }}
              />
              <Typography sx={[labelInput, spacingTop]}>
                Tgl. Perawatan
              </Typography>
              <TextField
                type="date"
                size="small"
                error={error && tglPerawatan.length === 0 && true}
                helperText={
                  error &&
                  tglPerawatan.length === 0 &&
                  "Nama Dealer harus diisi!"
                }
                id="outlined-basic"
                variant="outlined"
                value={tglPerawatan}
                onChange={(e) => setTglPerawatan(e.target.value.toUpperCase())}
              />
              <Typography sx={[labelInput, spacingTop]}>
                Biaya Perawatan
                {biayaPerawatan !== 0 &&
                  !isNaN(parseInt(biayaPerawatan)) &&
                  ` : Rp ${parseInt(biayaPerawatan).toLocaleString()}`}
              </Typography>
              <TextField
                type="number"
                size="small"
                id="outlined-basic"
                error={error && biayaPerawatan.length === 0 && true}
                helperText={
                  error &&
                  biayaPerawatan.length === 0 &&
                  "Biaya Perawatan harus diisi!"
                }
                variant="outlined"
                value={biayaPerawatan}
                onChange={(e) => {
                  setBiayaPerawatan(e.target.value);
                }}
              />
            </Box>
            <Box sx={[showDataWrapper, secondWrapper]}>
              <Typography sx={labelInput}>Keterangan</Typography>
              <TextareaAutosize
                maxRows={1}
                aria-label="maximum height"
                style={{ height: 230 }}
                value={keterangan}
                onChange={(e) => {
                  setKeterangan(e.target.value);
                }}
              />
            </Box>
          </Box>
        </Paper>

        <Box sx={spacingTop}>
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => navigate("/biayaPerawatan")}
            sx={{ marginRight: 2 }}
          >
            {"< Kembali"}
          </Button>
          <Button
            variant="contained"
            startIcon={<SaveIcon />}
            onClick={saveJual}
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

export default TambahBiayaPerawatan;

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

const mainContainer = {
  padding: 3,
  borderRadius: "20px",
  margin: 4
};

const titleStyle = {
  textAlign: "center",
  fontWeight: "600"
};
