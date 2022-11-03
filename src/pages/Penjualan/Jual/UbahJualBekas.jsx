import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../../contexts/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";
import { tempUrl } from "../../../contexts/ContextProvider";
import { Loader, SearchBar } from "../../../components";
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
  Dialog,
  DialogTitle,
  DialogActions,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import { makeStyles } from "@mui/styles";
import { Colors } from "../../../constants/styles";

const useStyles = makeStyles({
  root: {
    "& .MuiTableCell-head": {
      color: "white",
      backgroundColor: Colors.blue700
    }
  },
  tableRightBorder: {
    borderWidth: 0,
    borderRightWidth: 1,
    borderColor: "white",
    borderStyle: "solid"
  }
});

const UbahJualBekas = () => {
  const { user } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  // Data Register/Pembeli
  const [registers, setRegisters] = useState([]);
  const [noRegister, setNoRegister] = useState("");
  const [namaRegister, setNamaRegister] = useState("");
  const [almRegister, setAlmRegister] = useState("");
  const [almKantor, setAlmKantor] = useState("");
  const [tlpRegister, setTlpRegister] = useState("");
  const [noKtpRegister, setNoKtpRegister] = useState("");
  const [noKKRegister, setNoKKRegister] = useState("");
  const [namaPjmRegister, setNamaPjmRegister] = useState("");
  const [noKtpPjmRegister, setNoKtpPjmRegister] = useState("");
  const [namaRefRegister, setNamaRefRegister] = useState("");
  const [almRefRegister, setAlmRefRegister] = useState("");
  const [tlpRefRegister, setTlpRefRegister] = useState("");
  const [kodeMarketing, setKodeMarketing] = useState("");
  const [kodeSurveyor, setKodeSurveyor] = useState("");
  const [kodePekerjaan, setKodePekerjaan] = useState("");
  const [kodeKecamatan, setKodeKecamatan] = useState("");
  const [kodeLeasing, setKodeLeasing] = useState("");
  const [marketings, setMarketings] = useState([]);
  const [surveyors, setSurveyors] = useState([]);
  const [pekerjaans, setPekerjaans] = useState([]);
  const [kecamatans, setKecamatans] = useState([]);
  const [leasings, setLeasings] = useState([]);

  // Data Motor -> Dari Stok
  const [noRangka, setNoRangka] = useState("");
  const [tempNoRangka, setTempNoRangka] = useState("");
  const [noMesin, setNoMesin] = useState("");
  const [nopol, setNopol] = useState("");
  const [tipe, setTipe] = useState("");
  const [namaWarna, setNamaWarna] = useState("");
  const [tahun, setTahun] = useState("");
  const [stoks, setStoks] = useState([]);

  // Data Penjualan -> dari input
  const [hargaTunai, setHargaTunai] = useState("");
  const [uangMuka, setUangMuka] = useState("");
  const [sisaPiutang, setSisaPiutang] = useState("");
  const [angPerBulan, setAngPerBulan] = useState("");
  const [tenor, setTenor] = useState("");
  const [bunga, setBunga] = useState("");
  const [jumlahPiutang, setJumlahPiutang] = useState("");
  const [angModal, setAngModal] = useState("");
  const [angBunga, setAngBunga] = useState("");
  const [noJual, setNoJual] = useState("");
  const [noKwitansi, setNoKwitansi] = useState(user.kodeKwitansi);
  const [tglJual, setTglJual] = useState("");
  const [jenisJual, setJenisJual] = useState("");
  const [tglAng, setTglAng] = useState("");
  const [tglAngAkhir, setTglAngAkhir] = useState("");
  const [tglInput, setTglInput] = useState("");

  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [searchTermRegister, setSearchTermRegister] = useState("");
  const [openRegister, setOpenRegister] = React.useState(false);

  const classes = useStyles();

  const handleClickOpenRegister = () => {
    setOpenRegister(true);
  };

  const handleCloseRegister = () => {
    setOpenRegister(false);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const marketingOptions = marketings.map((marketing) => ({
    label: `${marketing._id} - ${marketing.namaMarketing}`
  }));

  const surveyorOptions = surveyors.map((surveyor) => ({
    label: `${surveyor._id} - ${surveyor.namaSurveyor}`
  }));

  const pekerjaanOptions = pekerjaans.map((pekerjaan) => ({
    label: `${pekerjaan._id} - ${pekerjaan.namaPekerjaan}`
  }));

  const kecamatanOptions = kecamatans.map((kecamatan) => ({
    label: `${kecamatan.kodeKecamatan} - ${kecamatan.namaKecamatan}`
  }));

  const leasingOptions = leasings.map((leasing) => ({
    label: `${leasing._id} - ${leasing.namaLeasing}`
  }));

  const nopolOptions = stoks.map((stok) => ({
    label: `${stok.nopol}`
  }));

  const tempPostsRegister = registers.filter((val) => {
    if (searchTermRegister === "") {
      return val;
    } else if (
      val.noRegister.toUpperCase().includes(searchTermRegister.toUpperCase()) ||
      val.tanggalRegister
        .toUpperCase()
        .includes(searchTermRegister.toUpperCase()) ||
      val.namaRegister.toUpperCase().includes(searchTermRegister.toUpperCase())
    ) {
      return val;
    }
  });

  useEffect(() => {
    getUserById();
    getStok();
    getRegister();
    getMarketing();
    getSurveyor();
    getPekerjaan();
    getKecamatan();
    getLeasing();
  }, []);

  const getStoksByNopol = async (nopol) => {
    const response = await axios.post(`${tempUrl}/daftarStoksByNopol`, {
      nopol,
      id: user._id,
      token: user.token,
      kodeUnitBisnis: user.unitBisnis._id,
      kodeCabang: user.cabang._id
    });
    if (response.data) {
      setNoRangka(response.data.noRangka);
      setNoMesin(response.data.noMesin);
      setTipe(response.data.tipe);
      setNamaWarna(response.data.namaWarna);
      setTahun(response.data.tahun);
    }
    setNopol(nopol);
  };

  const getStok = async () => {
    setLoading(true);
    const response = await axios.post(`${tempUrl}/daftarStoksNopol`, {
      id: user._id,
      token: user.token,
      kodeUnitBisnis: user.unitBisnis._id,
      kodeCabang: user.cabang._id
    });
    setStoks(response.data);
    setLoading(false);
  };

  const getRegister = async () => {
    setLoading(true);
    const response = await axios.post(`${tempUrl}/registers`, {
      id: user._id,
      token: user.token,
      kodeUnitBisnis: user.unitBisnis._id,
      kodeCabang: user.cabang._id
    });
    setRegisters(response.data);
    setLoading(false);
  };

  const getMarketing = async () => {
    setLoading(true);
    const response = await axios.post(`${tempUrl}/marketings`, {
      id: user._id,
      token: user.token,
      kodeUnitBisnis: user.unitBisnis._id,
      kodeCabang: user.cabang._id
    });
    setMarketings(response.data);
    setLoading(false);
  };

  const getSurveyor = async () => {
    setLoading(true);
    const response = await axios.post(`${tempUrl}/surveyors`, {
      id: user._id,
      token: user.token,
      kodeUnitBisnis: user.unitBisnis._id,
      kodeCabang: user.cabang._id
    });
    setSurveyors(response.data);
    setLoading(false);
  };

  const getPekerjaan = async () => {
    setLoading(true);
    const response = await axios.post(`${tempUrl}/pekerjaans`, {
      id: user._id,
      token: user.token,
      kodeUnitBisnis: user.unitBisnis._id,
      kodeCabang: user.cabang._id
    });
    setPekerjaans(response.data);
    setLoading(false);
  };

  const getKecamatan = async () => {
    setLoading(true);
    const response = await axios.post(`${tempUrl}/kecamatans`, {
      id: user._id,
      token: user.token,
      kodeUnitBisnis: user.unitBisnis._id,
      kodeCabang: user.cabang._id
    });
    setKecamatans(response.data);
    setLoading(false);
  };

  const getLeasing = async () => {
    setLoading(true);
    const response = await axios.post(`${tempUrl}/leasingsForTable`, {
      id: user._id,
      token: user.token,
      kodeUnitBisnis: user.unitBisnis._id,
      kodeCabang: user.cabang._id
    });
    setLeasings(response.data);
    setLoading(false);
  };

  const getUserById = async () => {
    if (id) {
      const response = await axios.post(`${tempUrl}/jualsNoPopulate/${id}`, {
        id: user._id,
        token: user.token,
        kodeUnitBisnis: user.unitBisnis._id,
        kodeCabang: user.cabang._id
      });
      // Data Register/Pembeli
      setNoRegister(response.data.noRegister);
      setNamaRegister(response.data.namaRegister);
      setAlmRegister(response.data.almRegister);
      setAlmKantor(response.data.almKantor);
      setTlpRegister(response.data.tlpRegister);
      setNoKtpRegister(response.data.noKtpRegister);
      setNoKKRegister(response.data.noKKRegister);
      setNamaPjmRegister(response.data.namaPjmRegister);
      setNoKtpPjmRegister(response.data.noKtpPjmRegister);
      setNamaRefRegister(response.data.namaRefRegister);
      setAlmRefRegister(response.data.almRefRegister);
      setTlpRefRegister(response.data.tlpRefRegister);
      setKodeMarketing(response.data.kodeMarketing);
      setKodeSurveyor(response.data.kodeSurveyor);
      setKodePekerjaan(response.data.kodePekerjaan);
      setKodeKecamatan(response.data.kodeKecamatan);
      setKodeLeasing(response.data.kodeLeasing);

      // Data Motor -> Dari Stok
      setNoRangka(response.data.noRangka);
      setTempNoRangka(response.data.noRangka);
      setNoMesin(response.data.noMesin);
      setNopol(response.data.nopol);
      setTipe(response.data.tipe);
      setNamaWarna(response.data.namaWarna);
      setTahun(response.data.tahun);

      // Data Penjualan -> dari input
      setHargaTunai(response.data.hargaTunai);
      setUangMuka(response.data.uangMuka);
      setSisaPiutang(response.data.sisaPiutang);
      setAngPerBulan(response.data.angPerBulan);
      setTenor(response.data.tenor);
      setBunga(response.data.bunga);
      setJumlahPiutang(response.data.jumlahPiutang);
      setAngModal(response.data.angModal);
      setAngBunga(response.data.angBunga);
      setNoJual(response.data.noJual);
      setNoKwitansi(response.data.noKwitansi);
      setTglJual(response.data.tanggalJual);
      setJenisJual(response.data.jenisJual);
      setTglAng(response.data.tglAng);
      setTglAngAkhir(response.data.tglAngAkhir);
      setTglInput(response.data.tglInput);
    }
  };

  const updateUser = async (e) => {
    e.preventDefault();
    if (
      noJual.length === 0 ||
      tglJual.length === 0 ||
      jenisJual.length === 0 ||
      tglInput.length === 0 ||
      noRegister.length === 0 ||
      kodeMarketing.length === 0 ||
      kodeSurveyor.length === 0 ||
      kodePekerjaan.length === 0 ||
      kodeKecamatan.length === 0 ||
      kodeLeasing.length === 0 ||
      nopol.length === 0 ||
      hargaTunai.length === 0 ||
      uangMuka.length === 0 ||
      sisaPiutang.length === 0 ||
      angPerBulan.length === 0 ||
      tenor.length === 0 ||
      jumlahPiutang.length === 0
    ) {
      setError(true);
      setOpen(!open);
    } else {
      try {
        setLoading(true);
        if (tempNoRangka !== noRangka) {
          const tempStok = await axios.post(`${tempUrl}/daftarStoksByNorang`, {
            noRangka: tempNoRangka,
            id: user._id,
            token: user.token
          });
          // Update Stok
          await axios.post(`${tempUrl}/updateDaftarStok/${tempStok.data._id}`, {
            noJual: "",
            tanggalJual: "",
            id: user._id,
            token: user.token
          });
          const tempStok2 = await axios.post(`${tempUrl}/daftarStoksByNopol`, {
            nopol,
            id: user._id,
            token: user.token
          });
          // Update Stok
          await axios.post(
            `${tempUrl}/updateDaftarStok/${tempStok2.data._id}`,
            {
              noJual,
              tanggalJual: tglJual,
              id: user._id,
              token: user.token
            }
          );
        }
        await axios.post(`${tempUrl}/updateJual/${id}`, {
          noRegister,
          namaRegister,
          almRegister,
          almKantor,
          tlpRegister,
          noKtpRegister,
          noKKRegister,
          namaPjmRegister,
          noKtpPjmRegister,
          namaRefRegister,
          almRefRegister,
          tlpRefRegister,
          kodeMarketing: kodeMarketing.split(" -", 1)[0],
          kodeSurveyor: kodeSurveyor.split(" -", 1)[0],
          kodePekerjaan: kodePekerjaan.split(" -", 1)[0],
          kodeKecamatan: kodeKecamatan.split(" -", 1)[0],
          kodeLeasing: kodeLeasing.split(" -", 1)[0],
          noRangka,
          noMesin,
          nopol,
          tipe,
          namaWarna,
          tahun,
          hargaTunai,
          uangMuka,
          sisaPiutang,
          angPerBulan,
          tenor,
          bunga,
          jumlahPiutang,
          angModal,
          angBunga,
          noKwitansi,
          angModal: sisaPiutang / tenor,
          angBunga: angPerBulan - sisaPiutang / tenor,
          kodeUnitBisnis: user.unitBisnis._id,
          kodeCabang: user.cabang._id,
          id: user._id,
          token: user.token
        });
        setLoading(false);
        navigate("/jual");
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
      <Typography color="#757575">Penjualan</Typography>
      <Typography variant="h4" sx={subTitleText}>
        Ubah Jual Bekas
      </Typography>
      <Divider sx={dividerStyle} />
      <Paper sx={contentContainer} elevation={12}>
        {/* Data Penjualan */}
        <Paper elevation={6} sx={mainContainer}>
          <Typography variant="h5" sx={titleStyle} color="primary">
            DATA PENJUALAN
          </Typography>
          <Box sx={showDataContainer}>
            <Box sx={showDataWrapper}>
              <Typography sx={labelInput}>No. Jual</Typography>
              <TextField
                size="small"
                id="outlined-basic"
                variant="outlined"
                value={noJual}
                InputProps={{
                  readOnly: true
                }}
                sx={{ backgroundColor: Colors.grey400 }}
              />
              <Typography sx={[labelInput, spacingTop]}>
                No. Kwitansi
              </Typography>
              <TextField
                size="small"
                id="outlined-basic"
                variant="outlined"
                value={noKwitansi}
                InputProps={{
                  readOnly: true
                }}
                sx={{ backgroundColor: Colors.grey400 }}
              />
              <Typography sx={[labelInput, spacingTop]}>
                Tanggal Jual
              </Typography>
              <TextField
                size="small"
                id="outlined-basic"
                variant="outlined"
                value={tglJual}
                InputProps={{
                  readOnly: true
                }}
                sx={{ backgroundColor: Colors.grey400 }}
              />
              <Typography sx={[labelInput, spacingTop]}>Jenis Jual</Typography>
              <TextField
                size="small"
                id="outlined-basic"
                variant="outlined"
                value={jenisJual}
                InputProps={{
                  readOnly: true
                }}
                sx={{ backgroundColor: Colors.grey400 }}
              />
            </Box>
            <Box sx={[showDataWrapper, secondWrapper]}>
              <Typography sx={labelInput}>Tanggal Angsuran I</Typography>
              <TextField
                size="small"
                id="outlined-basic"
                variant="outlined"
                value={tglAng}
                onChange={(e) => setTglAng(e.target.value.toUpperCase())}
                InputProps={{
                  readOnly: true
                }}
                sx={{ backgroundColor: Colors.grey400 }}
              />
              <Typography sx={[labelInput, spacingTop]}>
                Tanggal Angsuran Akhir
              </Typography>
              <TextField
                size="small"
                id="outlined-basic"
                variant="outlined"
                value={tglAngAkhir}
                onChange={(e) => setTglAngAkhir(e.target.value.toUpperCase())}
                InputProps={{
                  readOnly: true
                }}
                sx={{ backgroundColor: Colors.grey400 }}
              />
              <Typography sx={[labelInput, spacingTop]}>
                Tanggal Input
              </Typography>
              <TextField
                size="small"
                id="outlined-basic"
                variant="outlined"
                value={tglInput}
                InputProps={{
                  readOnly: true
                }}
                sx={{ backgroundColor: Colors.grey400 }}
              />
            </Box>
          </Box>
        </Paper>

        {/* Data Pembeli */}
        <Paper elevation={6} sx={mainContainer}>
          <Typography variant="h5" sx={titleStyle} color="primary">
            DATA PEMBELI
          </Typography>
          <Box sx={showDataContainer}>
            <Box sx={showDataWrapper}>
              <Typography sx={labelInput}>Kode Register</Typography>
              <TextField
                size="small"
                id="outlined-basic"
                error={error && noRegister.length === 0 && true}
                helperText={
                  error &&
                  noRegister.length === 0 &&
                  "Kode Register harus diisi!"
                }
                variant="outlined"
                value={noRegister}
                InputProps={{
                  readOnly: true
                }}
                onClick={() => handleClickOpenRegister()}
                placeholder="Pilih..."
              />
              <Typography sx={[labelInput, spacingTop]}>
                Nama Register
              </Typography>
              <TextField
                size="small"
                id="outlined-basic"
                variant="outlined"
                value={namaRegister}
                onChange={(e) => setNamaRegister(e.target.value.toUpperCase())}
              />
              <Typography sx={[labelInput, spacingTop]}>
                Alamat Rumah
              </Typography>
              <TextField
                size="small"
                id="outlined-basic"
                variant="outlined"
                value={almRegister}
                onChange={(e) => setAlmRegister(e.target.value.toUpperCase())}
              />
              <Typography sx={[labelInput, spacingTop]}>
                Alamat Kantor
              </Typography>
              <TextField
                size="small"
                id="outlined-basic"
                variant="outlined"
                value={almKantor}
                onChange={(e) => setAlmKantor(e.target.value.toUpperCase())}
              />
              <Typography sx={[labelInput, spacingTop]}>
                Telepon Register
              </Typography>
              <TextField
                size="small"
                id="outlined-basic"
                variant="outlined"
                value={tlpRegister}
                onChange={(e) => setTlpRegister(e.target.value.toUpperCase())}
              />
              <Typography sx={[labelInput, spacingTop]}>
                No. KTP Register
              </Typography>
              <TextField
                size="small"
                id="outlined-basic"
                variant="outlined"
                value={noKtpRegister}
                onChange={(e) => setNoKtpRegister(e.target.value.toUpperCase())}
              />
              <Typography sx={[labelInput, spacingTop]}>
                No. KK Register
              </Typography>
              <TextField
                size="small"
                id="outlined-basic"
                variant="outlined"
                value={noKKRegister}
                onChange={(e) => setNoKKRegister(e.target.value.toUpperCase())}
              />
              <Typography sx={[labelInput, spacingTop]}>
                Nama Penjamin Register
              </Typography>
              <TextField
                size="small"
                id="outlined-basic"
                variant="outlined"
                value={namaPjmRegister}
                onChange={(e) =>
                  setNamaPjmRegister(e.target.value.toUpperCase())
                }
              />
              <Typography sx={[labelInput, spacingTop]}>
                No. KTP Penjamin Register
              </Typography>
              <TextField
                size="small"
                id="outlined-basic"
                variant="outlined"
                value={noKtpPjmRegister}
                onChange={(e) =>
                  setNoKtpPjmRegister(e.target.value.toUpperCase())
                }
              />
            </Box>
            <Box sx={[showDataWrapper, secondWrapper]}>
              <Typography sx={labelInput}>Nama Ref. Register</Typography>
              <TextField
                size="small"
                id="outlined-basic"
                variant="outlined"
                value={namaRefRegister}
                onChange={(e) =>
                  setNamaRefRegister(e.target.value.toUpperCase())
                }
              />
              <Typography sx={[labelInput, spacingTop]}>
                Alamat Ref. Register
              </Typography>
              <TextField
                size="small"
                id="outlined-basic"
                variant="outlined"
                value={almRefRegister}
                onChange={(e) =>
                  setAlmRefRegister(e.target.value.toUpperCase())
                }
              />
              <Typography sx={[labelInput, spacingTop]}>
                Telepon Ref. Register
              </Typography>
              <TextField
                size="small"
                id="outlined-basic"
                variant="outlined"
                value={tlpRefRegister}
                onChange={(e) =>
                  setTlpRefRegister(e.target.value.toUpperCase())
                }
              />
              <Typography sx={[labelInput, spacingTop]}>
                Kode Marketing
              </Typography>
              <Autocomplete
                size="small"
                disablePortal
                id="combo-box-demo"
                options={marketingOptions}
                renderInput={(params) => (
                  <TextField
                    size="small"
                    error={error && kodeMarketing.length === 0 && true}
                    helperText={
                      error &&
                      kodeMarketing.length === 0 &&
                      "Kode Marketing harus diisi!"
                    }
                    {...params}
                  />
                )}
                onInputChange={(e, value) => setKodeMarketing(value)}
                value={kodeMarketing}
              />
              <Typography sx={[labelInput, spacingTop]}>
                Kode Surveyor
              </Typography>
              <Autocomplete
                size="small"
                disablePortal
                id="combo-box-demo"
                options={surveyorOptions}
                renderInput={(params) => (
                  <TextField
                    size="small"
                    error={error && kodeSurveyor.length === 0 && true}
                    helperText={
                      error &&
                      kodeSurveyor.length === 0 &&
                      "Kode Surveyor harus diisi!"
                    }
                    {...params}
                  />
                )}
                onInputChange={(e, value) => setKodeSurveyor(value)}
                value={kodeSurveyor}
              />
              <Typography sx={[labelInput, spacingTop]}>
                Kode Pekerjaan
              </Typography>
              <Autocomplete
                size="small"
                disablePortal
                id="combo-box-demo"
                options={pekerjaanOptions}
                renderInput={(params) => (
                  <TextField
                    size="small"
                    error={error && kodePekerjaan.length === 0 && true}
                    helperText={
                      error &&
                      kodePekerjaan.length === 0 &&
                      "Kode Pekerjaan harus diisi!"
                    }
                    {...params}
                  />
                )}
                onInputChange={(e, value) => setKodePekerjaan(value)}
                value={kodePekerjaan}
              />
              <Typography sx={[labelInput, spacingTop]}>
                Kode Kecamatan
              </Typography>
              <Autocomplete
                size="small"
                disablePortal
                id="combo-box-demo"
                options={kecamatanOptions}
                renderInput={(params) => (
                  <TextField
                    size="small"
                    error={error && kodeKecamatan.length === 0 && true}
                    helperText={
                      error &&
                      kodeKecamatan.length === 0 &&
                      "Kode Kecamatan harus diisi!"
                    }
                    {...params}
                  />
                )}
                onInputChange={(e, value) => setKodeKecamatan(value)}
                value={kodeKecamatan}
              />
              <Typography sx={[labelInput, spacingTop]}>
                Kode Leasing
              </Typography>
              <Autocomplete
                size="small"
                disablePortal
                id="combo-box-demo"
                options={leasingOptions}
                renderInput={(params) => (
                  <TextField
                    size="small"
                    error={error && kodeLeasing.length === 0 && true}
                    helperText={
                      error &&
                      kodeLeasing.length === 0 &&
                      "Kode Leasing harus diisi!"
                    }
                    {...params}
                  />
                )}
                onInputChange={(e, value) => setKodeLeasing(value)}
                value={kodeLeasing}
              />
            </Box>
          </Box>
        </Paper>

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
                value={nopol}
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

        {/* Data Rincian Harga (Input) */}
        <Paper elevation={6} sx={mainContainer}>
          <Typography variant="h5" sx={titleStyle} color="primary">
            RINCIAN HARGA
          </Typography>
          <Box sx={showDataContainer}>
            <Box sx={showDataWrapper}>
              <Typography sx={[labelInput]}>
                Harga Tunai
                {hargaTunai !== 0 &&
                  !isNaN(parseInt(hargaTunai)) &&
                  ` : Rp ${parseInt(hargaTunai).toLocaleString()}`}
              </Typography>
              <TextField
                type="number"
                size="small"
                error={error && hargaTunai.length === 0 && true}
                helperText={
                  error && hargaTunai.length === 0 && "Harga Tunai harus diisi!"
                }
                id="outlined-basic"
                variant="outlined"
                value={hargaTunai}
                onChange={(e) => {
                  setHargaTunai(e.target.value);
                  let tempSisaPiutang = e.target.value - uangMuka;
                  setSisaPiutang(tempSisaPiutang);
                }}
              />
              <Typography sx={[labelInput, spacingTop]}>
                Uang Muka
                {uangMuka !== 0 &&
                  !isNaN(parseInt(uangMuka)) &&
                  ` : Rp ${parseInt(uangMuka).toLocaleString()}`}
              </Typography>
              <TextField
                type="number"
                size="small"
                error={error && uangMuka.length === 0 && true}
                helperText={
                  error && uangMuka.length === 0 && "Uang Muka harus diisi!"
                }
                id="outlined-basic"
                variant="outlined"
                value={uangMuka}
                onChange={(e) => {
                  setUangMuka(e.target.value);
                  let tempSisaPiutang = hargaTunai - e.target.value;
                  setSisaPiutang(tempSisaPiutang);
                }}
              />
              <Typography sx={[labelInput, spacingTop]}>
                Sisa Piutang
                {sisaPiutang !== 0 &&
                  !isNaN(parseInt(sisaPiutang)) &&
                  ` : Rp ${parseInt(sisaPiutang).toLocaleString()}`}
              </Typography>
              <TextField
                size="small"
                error={error && sisaPiutang.length === 0 && true}
                helperText={
                  error &&
                  sisaPiutang.length === 0 &&
                  "Sisa Piutang harus diisi!"
                }
                id="outlined-basic"
                variant="outlined"
                value={sisaPiutang}
                InputProps={{
                  readOnly: true
                }}
                sx={{ backgroundColor: Colors.grey400 }}
              />
            </Box>
            <Box sx={[showDataWrapper, secondWrapper]}>
              <Typography sx={labelInput}>
                Angsuran/bulan
                {angPerBulan !== 0 &&
                  !isNaN(parseInt(angPerBulan)) &&
                  ` : Rp ${parseInt(angPerBulan).toLocaleString()}`}
              </Typography>
              <TextField
                size="small"
                id="outlined-basic"
                error={error && angPerBulan.length === 0 && true}
                helperText={
                  error &&
                  angPerBulan.length === 0 &&
                  "Angsuran/bulan harus diisi!"
                }
                variant="outlined"
                value={angPerBulan}
                onChange={(e) => {
                  setAngPerBulan(e.target.value);
                  let tempJumlahPiutang = e.target.value * tenor;
                  setJumlahPiutang(tempJumlahPiutang);
                }}
              />
              <Typography sx={[labelInput, spacingTop]}>
                Tenor
                {tenor !== 0 &&
                  !isNaN(parseInt(tenor)) &&
                  ` : ${parseInt(tenor).toLocaleString()}`}
              </Typography>
              <TextField
                size="small"
                id="outlined-basic"
                error={error && tenor.length === 0 && true}
                helperText={error && tenor.length === 0 && "Tenor harus diisi!"}
                variant="outlined"
                value={tenor}
                onChange={(e) => {
                  setTenor(e.target.value);
                  let tempJumlahPiutang = angPerBulan * e.target.value;
                  setJumlahPiutang(tempJumlahPiutang);
                }}
              />
              <Typography sx={[labelInput, spacingTop]}>
                Total Piutang
                {jumlahPiutang !== 0 &&
                  !isNaN(parseInt(jumlahPiutang)) &&
                  ` : ${parseInt(jumlahPiutang).toLocaleString()}`}
              </Typography>
              <TextField
                size="small"
                id="outlined-basic"
                error={error && jumlahPiutang.length === 0 && true}
                helperText={
                  error &&
                  jumlahPiutang.length === 0 &&
                  "Total Piutang harus diisi!"
                }
                variant="outlined"
                value={jumlahPiutang}
                InputProps={{
                  readOnly: true
                }}
                sx={{ backgroundColor: Colors.grey400 }}
              />
            </Box>
          </Box>
        </Paper>

        <Box sx={spacingTop}>
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => navigate("/jual")}
            sx={{ marginRight: 2 }}
          >
            {"< Kembali"}
          </Button>
          <Button
            variant="contained"
            startIcon={<SaveIcon />}
            onClick={updateUser}
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
      <Dialog
        open={openRegister}
        onClose={handleCloseRegister}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{`Pilih Data Pembeli`}</DialogTitle>
        <DialogActions>
          <Box sx={dialogContainer}>
            <SearchBar setSearchTerm={setSearchTermRegister} />
            <TableContainer component={Paper} sx={dialogWrapper}>
              <Table aria-label="simple table">
                <TableHead className={classes.root}>
                  <TableRow>
                    <TableCell
                      sx={{ fontWeight: "bold" }}
                      className={classes.tableRightBorder}
                    >
                      No. Register
                    </TableCell>
                    <TableCell
                      sx={{ fontWeight: "bold" }}
                      className={classes.tableRightBorder}
                    >
                      Tanggal
                    </TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>Customer</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {tempPostsRegister
                    .filter((val) => {
                      if (searchTermRegister === "") {
                        return val;
                      } else if (
                        val.noRegister
                          .toUpperCase()
                          .includes(searchTermRegister.toUpperCase()) ||
                        val.tanggalRegister
                          .toUpperCase()
                          .includes(searchTermRegister.toUpperCase()) ||
                        val.namaRegister
                          .toUpperCase()
                          .includes(searchTermRegister.toUpperCase())
                      ) {
                        return val;
                      }
                    })
                    .map((user, index) => (
                      <TableRow
                        key={user._id}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                          "&:hover": { bgcolor: Colors.grey300 },
                          cursor: "pointer"
                        }}
                        onClick={() => {
                          setNoRegister(user.noRegister);
                          setNamaRegister(user.namaRegister);
                          setAlmRegister(user.almRegister);
                          setAlmKantor(user.almRegister);
                          setTlpRegister(user.tlpRegister);
                          setNoKtpRegister(user.noKtpRegister);
                          setNoKKRegister(user.noKKRegister);
                          setNamaPjmRegister(user.namaPjmRegister);
                          setNoKtpPjmRegister(user.noKtpPjmRegister);
                          setNamaRefRegister(user.namaRefRegister);
                          setAlmRefRegister(user.almRefRegister);
                          setTlpRefRegister(user.tlpRefRegister);
                          handleCloseRegister();
                        }}
                      >
                        <TableCell component="th" scope="row">
                          {user.noRegister}
                        </TableCell>
                        <TableCell>{user.tanggalRegister}</TableCell>
                        <TableCell>{user.namaRegister}</TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default UbahJualBekas;

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

const dialogContainer = {
  display: "flex",
  flexDirection: "column",
  padding: 4,
  width: "800px"
};

const dialogWrapper = {
  width: "100%",
  marginTop: 2
};

const titleStyle = {
  textAlign: "center",
  fontWeight: "600"
};