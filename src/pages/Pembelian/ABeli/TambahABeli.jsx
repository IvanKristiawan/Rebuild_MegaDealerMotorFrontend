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
import SaveIcon from "@mui/icons-material/Save";
import { Colors } from "../../../constants/styles";

const TambahABeli = () => {
  const { user, dispatch } = useContext(AuthContext);
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
  const [tglStnk, setTglStnk] = useState("");
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
    const response = await axios.post(`${tempUrl}/tipes`, {
      id: user._id,
      token: user.token
    });
    setTipes(response.data);
    setLoading(false);
  };

  const getTipe = async (idTipe) => {
    const response = await axios.post(`${tempUrl}/tipesByKode`, {
      kodeTipe: idTipe,
      id: user._id,
      token: user.token
    });
    setNoRangka(response.data.noRangka);
    setNoMesin(response.data.noMesin);
    setKodeTipe(idTipe);
  };

  const getTipeBeli = async () => {
    setLoading(true);
    const response = await axios.post(`${tempUrl}/belis/${id}`, {
      id: user._id,
      token: user.token
    });
    setJenisABeli(response.data.jenisBeli);
    setTanggalBeli(response.data.tanggalBeli);
    setKodeSupplier(response.data.kodeSupplier);
    setLoading(false);
  };

  const getWarnas = async () => {
    setLoading(true);
    const response = await axios.post(`${tempUrl}/warnas`, {
      id: user._id,
      token: user.token
    });
    setWarnas(response.data);
    setLoading(false);
  };

  const getBelis = async () => {
    setLoading(true);
    const response = await axios.post(`${tempUrl}/belis/${id}`, {
      id: user._id,
      token: user.token
    });
    setBelis(response.data);
    setLoading(false);
  };

  const saveUser = async (e) => {
    e.preventDefault();
    // Set Tgl Stnk
    var tempTanggalStnk1 = tglStnk.toString().split("-", 1)[0];
    var tempTanggalStnk2 = tglStnk.toString().split("-")[1];
    var tempTanggalStnk3 = tglStnk.toString().split("-")[2];
    var combineTanggalBeli = `${tempTanggalStnk3}-${tempTanggalStnk2}-${tempTanggalStnk1}`;
    // Get Beli
    const response = await axios.post(`${tempUrl}/belis/${id}`, {
      id: user._id,
      token: user.token
    });
    // Get Supplier
    const getSupplier = await axios.post(`${tempUrl}/suppliersByKode`, {
      kodeSupplier: kodeSupplier.split(" ", 1)[0],
      id: user._id,
      token: user.token
    });
    // Get Tipe/Merk
    const getTipe = await axios.post(`${tempUrl}/tipesByKode`, {
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
            id: user._id,
            token: user.token
          });
          // Save Daftar Stok
          const tempDaftarStok = await axios.post(`${tempUrl}/saveDaftarStok`, {
            noBeli: belis.noBeli,
            tanggalBeli,
            supplier: `${getSupplier.data.kodeSupplier} - ${getSupplier.data.namaSupplier}`,
            merk: getTipe.data.merk,
            tipe: `${getTipe.data.kodeTipe} - ${getTipe.data.namaTipe}`,
            namaTipe: getTipe.data.namaTipe,
            noRangka: `${noRangka}${noRangka2}`,
            noMesin: `${noMesin}${noMesin2}`,
            nopol,
            namaStnk,
            tglStnk,
            jenisBeli: jenisABeli,
            hargaSatuan,
            hargaTable: `Rp ${parseInt(hargaSatuan).toLocaleString()}`,
            id: user._id,
            token: user.token
          });
          // Update Beli
          await axios.post(`${tempUrl}/updateBeli/${id}`, {
            jumlahBeli:
              parseInt(getBeli.data.jumlahBeli) + parseInt(hargaSatuan),
            id: user._id,
            token: user.token
          });
          // Save A Beli
          await axios.post(`${tempUrl}/saveABeli`, {
            idStok: tempDaftarStok.data._id,
            noBeli: belis.noBeli,
            kodeTipe,
            tahun,
            namaWarna,
            noRangka: `${noRangka}${noRangka2}`,
            noMesin: `${noMesin}${noMesin2}`,
            nopol,
            namaStnk,
            tglStnk,
            jenisABeli,
            hargaSatuan,
            ppnABeli,
            tanggalBeli,
            kodeSupplier: `${getSupplier.data.kodeSupplier} - ${getSupplier.data.namaSupplier}`,
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
        tglStnk.length === 0 ||
        hargaSatuan.length === 0
      ) {
        setError(true);
        setOpen(!open);
      } else {
        try {
          setLoading(true);
          // Get Beli
          const getBeli = await axios.post(`${tempUrl}/belis/${id}`, {
            id: user._id,
            token: user.token
          });
          // Save Daftar Stok
          const tempDaftarStok = await axios.post(`${tempUrl}/saveDaftarStok`, {
            noBeli: belis.noBeli,
            tanggalBeli,
            supplier: `${getSupplier.data.kodeSupplier} - ${getSupplier.data.namaSupplier}`,
            merk: getTipe.data.merk,
            tipe: `${getTipe.data.kodeTipe} - ${getTipe.data.namaTipe}`,
            namaTipe: getTipe.data.namaTipe,
            noRangka: `${noRangka}${noRangka2}`,
            noMesin: `${noMesin}${noMesin2}`,
            nopol,
            namaStnk,
            tglStnk: combineTanggalBeli,
            jenisBeli: jenisABeli,
            hargaSatuan,
            hargaTable: `Rp ${parseInt(hargaSatuan).toLocaleString()}`,
            id: user._id,
            token: user.token
          });
          // Update Beli
          await axios.post(`${tempUrl}/updateBeli/${id}`, {
            jumlahBeli:
              parseInt(getBeli.data.jumlahBeli) + parseInt(hargaSatuan),
            id: user._id,
            token: user.token
          });
          // Save A Beli
          await axios.post(`${tempUrl}/saveABeli`, {
            idStok: tempDaftarStok.data._id,
            noBeli: belis.noBeli,
            kodeTipe,
            tahun,
            namaWarna,
            noRangka: `${noRangka}${noRangka2}`,
            noMesin: `${noMesin}${noMesin2}`,
            nopol,
            namaStnk,
            tglStnk: combineTanggalBeli,
            jenisABeli,
            hargaSatuan,
            ppnABeli,
            kodeSupplier: `${getSupplier.data.kodeSupplier} - ${getSupplier.data.namaSupplier}`,
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
                  getTipe(`${value.split(" ", 1)[0]}`);
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
                sx={[textFieldStyle, { flex: 2 }]}
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
                sx={[textFieldStyle, { flex: 2 }]}
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
              onChange={(e) => setJenisABeli(e.target.value.toUpperCase())}
              disabled
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
                <input
                  type="date"
                  id="start"
                  name="trip-start"
                  error={error && tglStnk.length === 0 && true}
                  helperText={
                    error && tglStnk.length === 0 && "Tanggal Stnk harus diisi!"
                  }
                  value={tglStnk}
                  onChange={(e) => setTglStnk(e.target.value)}
                  style={inputDateStyle}
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
                  disabled
                  onChange={(e) => setNopol(e.target.value.toUpperCase())}
                />
                <Typography sx={[spacingTop]}>Tanggal Stnk</Typography>
                <TextField
                  size="small"
                  id="outlined-basic"
                  variant="outlined"
                  value={tglStnk}
                  disabled
                  onChange={(e) => setTglStnk(e.target.value.toUpperCase())}
                />
                <Typography sx={[spacingTop]}>Nama Stnk</Typography>
                <TextField
                  size="small"
                  id="outlined-basic"
                  variant="outlined"
                  value={namaStnk}
                  disabled
                  onChange={(e) => setNamaStnk(e.target.value.toUpperCase())}
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
                  setHargaSatuan(e.target.value.toUpperCase());
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
                sx={hargaTextField}
                value={ppnABeli}
                disabled
                onChange={(e) => setPpnABeli(e.target.value.toUpperCase())}
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

export default TambahABeli;

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
    md: 4
  },
  marginTop: {
    md: 0,
    xs: 4
  }
};

const inputDateStyle = {
  height: "40px",
  border: "1px solid gray",
  borderColor: Colors.grey400,
  borderRadius: "5px",
  paddingLeft: 8,
  backgroundColor: Colors.grey100
};
