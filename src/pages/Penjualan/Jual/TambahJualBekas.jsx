import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../../contexts/AuthContext";
import { tempUrl } from "../../../contexts/ContextProvider";
import { Colors } from "../../../constants/styles";
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

const TambahJualBekas = () => {
  const { user } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
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
  const [noJual, setNoJual] = useState("");
  const [noKwitansi, setNoKwitansi] = useState(user.kodeKwitansi);
  const [tglJual, setTglJual] = useState("");
  const [jenisJual, setJenisJual] = useState("");
  const [tglAng, setTglAng] = useState("");
  const [tglAngAkhir, setTglAngAkhir] = useState("");

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

  const jenisJualOption = [{ label: "TUNAI" }, { label: "KREDIT" }];

  const marketingOptions = marketings.map((marketing) => ({
    label: `${marketing.kodeMarketing} - ${marketing.namaMarketing}`
  }));

  const surveyorOptions = surveyors.map((surveyor) => ({
    label: `${surveyor.kodeSurveyor} - ${surveyor.namaSurveyor}`
  }));

  const pekerjaanOptions = pekerjaans.map((pekerjaan) => ({
    label: `${pekerjaan.kodePekerjaan} - ${pekerjaan.namaPekerjaan}`
  }));

  const kecamatanOptions = kecamatans.map((kecamatan) => ({
    label: `${kecamatan.kodeKecamatan} - ${kecamatan.namaKecamatan}`
  }));

  const leasingOptions = leasings.map((leasing) => ({
    label: `${leasing.kodeLeasing} - ${leasing.namaLeasing}`
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

  const countDateDuration = (e) => {
    var tempDate = new Date(tglAng);
    var final = tempDate.setMonth(
      tempDate.getMonth() + parseInt(e.target.value)
    );
    var finalDate = new Date(final);
    var calculatedDateResult =
      finalDate.getDate().toLocaleString("en-US", {
        minimumIntegerDigits: 2,
        useGrouping: false
      }) +
      "-" +
      (finalDate.getMonth() + 1).toLocaleString("en-US", {
        minimumIntegerDigits: 2,
        useGrouping: false
      }) +
      "-" +
      finalDate.getFullYear();
    setTglAngAkhir(calculatedDateResult);
  };

  useEffect(() => {
    getStok();
    getRegister();
    getMarketing();
    getSurveyor();
    getPekerjaan();
    getKecamatan();
    getLeasing();
  }, []);

  const getStoksByNopol = async (nopol) => {
    const allDaftarStoksByNopol = await axios.post(
      `${tempUrl}/daftarStoksByNopol`,
      {
        nopol,
        id: user._id,
        token: user.token,
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
      `${tempUrl}/daftarStoksNopol`,
      {
        id: user._id,
        token: user.token,
        kodeCabang: user.cabang._id
      }
    );
    setStoks(allDaftarStokHasNopol.data);
    setLoading(false);
  };

  const getRegister = async () => {
    setLoading(true);
    const allRegisters = await axios.post(`${tempUrl}/registers`, {
      id: user._id,
      token: user.token,
      kodeCabang: user.cabang._id
    });
    setRegisters(allRegisters.data);
    setLoading(false);
  };

  const getMarketing = async () => {
    setLoading(true);
    const allMarketings = await axios.post(`${tempUrl}/marketings`, {
      id: user._id,
      token: user.token,
      kodeCabang: user.cabang._id
    });
    setMarketings(allMarketings.data);
    setLoading(false);
  };

  const getSurveyor = async () => {
    setLoading(true);
    const allSurveyors = await axios.post(`${tempUrl}/surveyors`, {
      id: user._id,
      token: user.token,
      kodeCabang: user.cabang._id
    });
    setSurveyors(allSurveyors.data);
    setLoading(false);
  };

  const getPekerjaan = async () => {
    setLoading(true);
    const allPekerjaans = await axios.post(`${tempUrl}/pekerjaans`, {
      id: user._id,
      token: user.token,
      kodeCabang: user.cabang._id
    });
    setPekerjaans(allPekerjaans.data);
    setLoading(false);
  };

  const getKecamatan = async () => {
    setLoading(true);
    const allKecamatans = await axios.post(`${tempUrl}/kecamatans`, {
      id: user._id,
      token: user.token,
      kodeCabang: user.cabang._id
    });
    setKecamatans(allKecamatans.data);
    setLoading(false);
  };

  const getLeasing = async () => {
    setLoading(true);
    const allLeasings = await axios.post(`${tempUrl}/leasings`, {
      id: user._id,
      token: user.token,
      kodeCabang: user.cabang._id
    });
    setLeasings(allLeasings.data);
    setLoading(false);
  };

  const saveJual = async (e) => {
    e.preventDefault();
    let isFailedValidation;
    var date = new Date();
    var current_date =
      date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear();
    var current_time =
      date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
    var newTglAngAkhir = new Date(tglAngAkhir);
    var tempTglAngAkhir =
      newTglAngAkhir.getFullYear() +
      "-" +
      (newTglAngAkhir.getMonth() + 1).toLocaleString("en-US", {
        minimumIntegerDigits: 2,
        useGrouping: false
      }) +
      "-" +
      newTglAngAkhir.getDate().toLocaleString("en-US", {
        minimumIntegerDigits: 2,
        useGrouping: false
      });

    let tempDateAng = tglAng.split("-")[2];
    if (tempDateAng > 28) {
      alert(`Tanggal Angsuran I tidak boleh lebih dari 28!`);
    } else {
      if (jenisJual === "KREDIT") {
        isFailedValidation =
          noJual.length === 0 ||
          tglJual.length === 0 ||
          jenisJual.length === 0 ||
          tglAng.length === 0 ||
          tglAngAkhir.length === 0 ||
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
          jumlahPiutang.length === 0;
      } else {
        isFailedValidation =
          noJual.length === 0 ||
          tglJual.length === 0 ||
          jenisJual.length === 0 ||
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
          jumlahPiutang.length === 0;
      }

      if (isFailedValidation) {
        setError(true);
        setOpen(!open);
      } else {
        try {
          setLoading(true);
          const tempMarketing = await axios.post(`${tempUrl}/marketingByKode`, {
            kodeMarketing,
            id: user._id,
            token: user.token,
            kodeCabang: user.cabang._id
          });
          const tempSurveyor = await axios.post(`${tempUrl}/surveyorByKode`, {
            kodeSurveyor,
            id: user._id,
            token: user.token,
            kodeCabang: user.cabang._id
          });
          const tempPekerjaan = await axios.post(`${tempUrl}/pekerjaanByKode`, {
            kodePekerjaan,
            id: user._id,
            token: user.token,
            kodeCabang: user.cabang._id
          });
          const tempKecamatan = await axios.post(`${tempUrl}/kecamatanByKode`, {
            kodeKecamatan,
            id: user._id,
            token: user.token,
            kodeCabang: user.cabang._id
          });
          const tempLeasing = await axios.post(`${tempUrl}/leasingByKode`, {
            kodeLeasing,
            id: user._id,
            token: user.token,
            kodeCabang: user.cabang._id
          });
          const tempStok = await axios.post(`${tempUrl}/daftarStoksByNopol`, {
            nopol,
            id: user._id,
            token: user.token,
            kodeCabang: user.cabang._id
          });
          // Update Stok
          await axios.post(`${tempUrl}/updateDaftarStok/${tempStok.data._id}`, {
            noJual,
            tanggalJual: tglJual,
            id: user._id,
            token: user.token
          });
          if (jenisJual === "KREDIT") {
            // Save Angsuran
            let tempAngsuran = await axios.post(`${tempUrl}/saveAngsuran`, {
              tenor,
              noJual,
              tglAng,
              angModal: sisaPiutang / tenor,
              angBunga: angPerBulan - sisaPiutang / tenor,
              angPerBulan,
              tglInput: current_date,
              jamInput: current_time,
              userInput: user.username,
              kodeCabang: user.cabang._id,
              id: user._id,
              token: user.token
            });
            // Save Penerimaan
            let tempPenerimaan = await axios.post(`${tempUrl}/savePenerimaan`, {
              tenor,
              noJual,
              angModal: sisaPiutang / tenor,
              angBunga: angPerBulan - sisaPiutang / tenor,
              tglInput: current_date,
              jamInput: current_time,
              userInput: user.username,
              kodeCabang: user.cabang._id,
              id: user._id,
              token: user.token
            });
            await axios.post(`${tempUrl}/saveJual`, {
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
              kodeMarketing: tempMarketing.data._id,
              kodeSurveyor: tempSurveyor.data._id,
              kodePekerjaan: tempPekerjaan.data._id,
              kodeKecamatan: tempKecamatan.data._id,
              kodeLeasing: tempLeasing.data._id,
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
              noJual,
              noKwitansi,
              tanggalJual: tglJual,
              jenisJual,
              tglAng,
              tglAngAkhir: tempTglAngAkhir,
              userInput: user.username,
              angModal: sisaPiutang / tenor,
              angBunga: angPerBulan - sisaPiutang / tenor,
              kodeAngsuran: tempAngsuran.data._id,
              jenisBeli: "BEKAS",
              tglInput: current_date,
              jamInput: current_time,
              userInput: user.username,
              kodeCabang: user.cabang._id,
              id: user._id,
              token: user.token
            });
          } else {
            await axios.post(`${tempUrl}/saveJual`, {
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
              kodeMarketing: tempMarketing.data._id,
              kodeSurveyor: tempSurveyor.data._id,
              kodePekerjaan: tempPekerjaan.data._id,
              kodeKecamatan: tempKecamatan.data._id,
              kodeLeasing: tempLeasing.data._id,
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
              noJual,
              noKwitansi,
              tanggalJual: tglJual,
              jenisJual,
              tglAng,
              tglAngAkhir: tempTglAngAkhir,
              angModal: sisaPiutang / tenor,
              angBunga: angPerBulan - sisaPiutang / tenor,
              jenisBeli: "BEKAS",
              userInput: user.username,
              tglInput: current_date,
              jamInput: current_time,
              userInput: user.username,
              kodeCabang: user.cabang._id,
              id: user._id,
              token: user.token
            });
          }
          setLoading(false);
          navigate("/jual");
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
      <Typography color="#757575">Penjualan</Typography>
      <Typography variant="h4" sx={subTitleText}>
        Tambah Jual Bekas
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
                error={error && noJual.length === 0 && true}
                helperText={
                  error && noJual.length === 0 && "No. Jual harus diisi!"
                }
                id="outlined-basic"
                variant="outlined"
                value={noJual}
                onChange={(e) => setNoJual(e.target.value.toUpperCase())}
              />
              <Typography sx={[labelInput, spacingTop]}>
                No. Kwitansi
              </Typography>
              <TextField
                size="small"
                error={error && noKwitansi.length === 0 && true}
                helperText={
                  error &&
                  noKwitansi.length === 0 &&
                  "No. Kwitansi harus diisi!"
                }
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
                type="date"
                size="small"
                error={error && tglJual.length === 0 && true}
                helperText={
                  error && tglJual.length === 0 && "No. Jual harus diisi!"
                }
                id="outlined-basic"
                variant="outlined"
                value={tglJual}
                onChange={(e) => setTglJual(e.target.value.toUpperCase())}
              />
              <Typography sx={[labelInput, spacingTop]}>Jenis Jual</Typography>
              <Autocomplete
                size="small"
                disablePortal
                id="combo-box-demo"
                options={jenisJualOption}
                renderInput={(params) => (
                  <TextField
                    size="small"
                    error={error && jenisJual.length === 0 && true}
                    helperText={
                      error &&
                      jenisJual.length === 0 &&
                      "Jenis Jual harus diisi!"
                    }
                    {...params}
                  />
                )}
                onInputChange={(e, value) => {
                  if (value === "TUNAI") {
                    setTglAng("");
                    setTglAngAkhir("");
                  }
                  setJenisJual(value);
                }}
              />
            </Box>
            <Box sx={[showDataWrapper, secondWrapper]}>
              <Typography sx={labelInput}>Tanggal Angsuran I</Typography>
              <TextField
                type="date"
                size="small"
                error={
                  error && tglAng.length === 0 && jenisJual === "KREDIT" && true
                }
                helperText={
                  error &&
                  tglAng.length === 0 &&
                  jenisJual === "KREDIT" &&
                  "Tanggal Angsuran I harus diisi!"
                }
                id="outlined-basic"
                variant="outlined"
                value={tglAng}
                onChange={(e) => {
                  setTglAng(e.target.value.toUpperCase());
                }}
                InputProps={{
                  readOnly: jenisJual === "TUNAI" && true
                }}
                sx={{
                  backgroundColor: jenisJual === "TUNAI" && Colors.grey400
                }}
              />
              <Typography sx={[labelInput, spacingTop]}>
                Tenor
                {tenor !== 0 &&
                  !isNaN(parseInt(tenor)) &&
                  ` : ${parseInt(tenor).toLocaleString()}`}
              </Typography>
              <TextField
                type="number"
                size="small"
                id="outlined-basic"
                error={error && tenor.length === 0 && true}
                helperText={error && tenor.length === 0 && "Tenor harus diisi!"}
                variant="outlined"
                value={tenor}
                onChange={(e, value) => {
                  countDateDuration(e);
                  setTenor(e.target.value);
                  let tempJumlahPiutang = angPerBulan * e.target.value;
                  setJumlahPiutang(tempJumlahPiutang);
                }}
              />
              <Typography sx={[labelInput, spacingTop]}>
                Tanggal Angsuran Akhir
              </Typography>
              <TextField
                size="small"
                error={
                  error &&
                  tglAngAkhir.length === 0 &&
                  jenisJual === "KREDIT" &&
                  true
                }
                helperText={
                  error &&
                  tglAngAkhir.length === 0 &&
                  jenisJual === "KREDIT" &&
                  "Tanggal Angsuran Akhir harus diisi!"
                }
                id="outlined-basic"
                variant="outlined"
                value={tglAngAkhir}
                onChange={(e) => setTglAngAkhir(e.target.value.toUpperCase())}
                InputProps={{
                  readOnly: true
                }}
                sx={{
                  backgroundColor: Colors.grey400
                }}
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
                onInputChange={(e, value) =>
                  setKodeMarketing(value.split(" ", 1)[0])
                }
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
                onInputChange={(e, value) =>
                  setKodeSurveyor(value.split(" ", 1)[0])
                }
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
                onInputChange={(e, value) =>
                  setKodePekerjaan(value.split(" ", 1)[0])
                }
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
                onInputChange={(e, value) =>
                  setKodeKecamatan(value.split(" ", 1)[0])
                }
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
                onInputChange={(e, value) =>
                  setKodeLeasing(value.split(" ", 1)[0])
                }
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
                type="number"
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
                type="number"
                size="small"
                id="outlined-basic"
                error={error && tenor.length === 0 && true}
                helperText={error && tenor.length === 0 && "Tenor harus diisi!"}
                variant="outlined"
                value={tenor}
                onChange={(e, value) => {
                  countDateDuration(e);
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

export default TambahJualBekas;

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
  p: {
    sm: 0,
    md: 3
  },
  pt: {
    sm: 0,
    md: 1
  },
  mt: {
    sm: 0,
    md: 2
  },
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

const mainContainer = {
  padding: 3,
  borderRadius: "20px",
  margin: {
    sm: 0,
    md: 4
  },
  marginTop: {
    xs: 4,
    md: 0
  }
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
