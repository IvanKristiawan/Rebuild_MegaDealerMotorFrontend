import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
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
  const [angModal, setAngModal] = useState("");
  const [angBunga, setAngBunga] = useState("");
  const [noJual, setNoJual] = useState("");
  const [noKwitansi, setNoKwitansi] = useState(user.kodeKwitansi);
  const [tglJual, setTglJual] = useState("");
  const [jenisJual, setJenisJual] = useState("");
  const [leasing, setLeasing] = useState("");
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
    const response = await axios.post(`${tempUrl}/daftarStoksByNopol`, {
      nopol,
      id: user._id,
      token: user.token
    });
    setNoRangka(response.data.noRangka);
    setNoMesin(response.data.noMesin);
    setTipe(response.data.tipe);
    setNamaWarna(response.data.namaWarna);
    setTahun(response.data.tahun);
    setNopol(nopol);
  };

  const getStok = async () => {
    setLoading(true);
    const response = await axios.post(`${tempUrl}/daftarStoksNopol`, {
      id: user._id,
      token: user.token
    });
    setStoks(response.data);
    setLoading(false);
  };

  const getRegister = async () => {
    setLoading(true);
    const response = await axios.post(`${tempUrl}/registers`, {
      id: user._id,
      token: user.token
    });
    setRegisters(response.data);
    setLoading(false);
  };

  const getMarketing = async () => {
    setLoading(true);
    const response = await axios.post(`${tempUrl}/marketingsForTable`, {
      id: user._id,
      token: user.token
    });
    setMarketings(response.data);
    setLoading(false);
  };

  const getSurveyor = async () => {
    setLoading(true);
    const response = await axios.post(`${tempUrl}/surveyorsForTable`, {
      id: user._id,
      token: user.token
    });
    setSurveyors(response.data);
    setLoading(false);
  };

  const getPekerjaan = async () => {
    setLoading(true);
    const response = await axios.post(`${tempUrl}/pekerjaansForDoc`, {
      id: user._id,
      token: user.token
    });
    setPekerjaans(response.data);
    setLoading(false);
  };

  const getKecamatan = async () => {
    setLoading(true);
    const response = await axios.post(`${tempUrl}/kecamatansForTable`, {
      id: user._id,
      token: user.token
    });
    setKecamatans(response.data);
    setLoading(false);
  };

  const getLeasing = async () => {
    setLoading(true);
    const response = await axios.post(`${tempUrl}/leasingsForTable`, {
      id: user._id,
      token: user.token
    });
    setLeasings(response.data);
    setLoading(false);
  };

  const saveUser = async (e) => {
    e.preventDefault();
    if (noRegister.length === 0 || namaRegister.length === 0) {
      setError(true);
      setOpen(!open);
    } else {
      try {
        setLoading(true);
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
          kodeMarketing,
          kodeSurveyor,
          kodePekerjaan,
          kodeKecamatan,
          kodeLeasing,
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
          noJual,
          noKwitansi,
          tglJual,
          jenisJual,
          leasing,
          tglAng,
          tglAngAkhir,
          tglInput,
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
                  "Nama Register harus diisi!"
                }
                id="outlined-basic"
                variant="outlined"
                value={noKwitansi}
                InputProps={{
                  readOnly: true
                }}
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
                    setTglInput("");
                  }
                  setJenisJual(value);
                }}
              />
            </Box>
            <Box sx={[showDataWrapper, secondWrapper]}>
              <Typography sx={labelInput}>Leasing</Typography>
              <Autocomplete
                size="small"
                disablePortal
                id="combo-box-demo"
                options={leasingOptions}
                renderInput={(params) => (
                  <TextField
                    size="small"
                    error={error && leasing.length === 0 && true}
                    helperText={
                      error && leasing.length === 0 && "Leasing harus diisi!"
                    }
                    {...params}
                  />
                )}
                onInputChange={(e, value) => setLeasing(value.split(" ", 1)[0])}
              />
              <Typography sx={[labelInput, spacingTop]}>
                Tanggal Angsuran I
              </Typography>
              <TextField
                type="date"
                size="small"
                error={error && tglAng.length === 0 && true}
                helperText={
                  error &&
                  tglAng.length === 0 &&
                  "Tanggal Angsuran harus diisi!"
                }
                id="outlined-basic"
                variant="outlined"
                value={tglAng}
                onChange={(e) => setTglAng(e.target.value.toUpperCase())}
                InputProps={{
                  readOnly: jenisJual === "TUNAI" && true
                }}
              />
              <Typography sx={[labelInput, spacingTop]}>
                Tanggal Angsuran Akhir
              </Typography>
              <TextField
                type="date"
                size="small"
                error={error && tglAngAkhir.length === 0 && true}
                helperText={
                  error &&
                  tglAngAkhir.length === 0 &&
                  "Tanggal Angsuran Akhir harus diisi!"
                }
                id="outlined-basic"
                variant="outlined"
                value={tglAngAkhir}
                onChange={(e) => setTglAngAkhir(e.target.value.toUpperCase())}
                InputProps={{
                  readOnly: jenisJual === "TUNAI" && true
                }}
              />
              <Typography sx={[labelInput, spacingTop]}>
                Tanggal Input
              </Typography>
              <TextField
                type="date"
                size="small"
                error={error && tglInput.length === 0 && true}
                helperText={
                  error && tglInput.length === 0 && "Tanggal Input harus diisi!"
                }
                id="outlined-basic"
                variant="outlined"
                value={tglInput}
                onChange={(e) => setTglInput(e.target.value.toUpperCase())}
                InputProps={{
                  readOnly: jenisJual === "TUNAI" && true
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
                error={error && namaRegister.length === 0 && true}
                helperText={
                  error &&
                  namaRegister.length === 0 &&
                  "Nama Register harus diisi!"
                }
                id="outlined-basic"
                variant="outlined"
                value={namaRegister}
                onChange={(e) => setNamaRegister(e.target.value.toUpperCase())}
              />
              <Typography sx={[labelInput, spacingTop]}>
                Alamat Register
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
                variant="outlined"
                value={jumlahPiutang}
                InputProps={{
                  readOnly: true
                }}
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
            onClick={saveUser}
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
                          setAlmKantor(user.almKantor);
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