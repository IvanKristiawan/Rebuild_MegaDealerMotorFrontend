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
  Alert
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";

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
    setNoRangka(response.data[0].noRangka);
    setNoMesin(response.data[0].noMesin);
    setKodeTipe(idTipe);
  };

  const getTipeBeli = async () => {
    setLoading(true);
    const response = await axios.post(`${tempUrl}/belis/${id}`, {
      id: user._id,
      token: user.token
    });
    setJenisABeli(response.data.jenisBeli);
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
    const response = await axios.post(`${tempUrl}/belis/${id}`, {
      id: user._id,
      token: user.token
    });

    if (response.data.jenisBeli === "BARU") {
      if (
        kodeTipe.length === 0 ||
        tahun.length === 0 ||
        namaWarna.length === 0 ||
        noRangka.length === 0 ||
        noRangka2.length === 0 ||
        noMesin.length === 0 ||
        noMesin2.length === 0 ||
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
          // Update Beli
          await axios.post(`${tempUrl}/updateBeli/${id}`, {
            jumlahBeli:
              parseInt(getBeli.data.jumlahBeli) + parseInt(hargaSatuan),
            id: user._id,
            token: user.token
          });
          // Save A Beli
          await axios.post(`${tempUrl}/saveABeli`, {
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
        noRangka.length === 0 ||
        noRangka2.length === 0 ||
        noMesin.length === 0 ||
        noMesin2.length === 0 ||
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
          // Update Beli
          await axios.post(`${tempUrl}/updateBeli/${id}`, {
            jumlahBeli:
              parseInt(getBeli.data.jumlahBeli) + parseInt(hargaSatuan),
            id: user._id,
            token: user.token
          });
          // Save A Beli
          await axios.post(`${tempUrl}/saveABeli`, {
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
      <Box sx={textFieldContainer}>
        <Box sx={textFieldWrapper}>
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={tipeOptions}
            renderInput={(params) => (
              <TextField
                error={error && kodeTipe.length === 0 && true}
                helperText={
                  error && kodeTipe.length === 0 && "Kode Tipe harus diisi!"
                }
                {...params}
                label="Kode Tipe"
              />
            )}
            onInputChange={(e, value) => {
              if (value) {
                getTipe(`${value.split(" ", 1)[0]} ${value.split(" ")[1]}`);
              } else {
                setNoRangka("");
                setNoMesin("");
              }
            }}
          />
          <TextField
            error={error && tahun.length !== 4 && true}
            helperText={
              error &&
              tahun.length !== 4 &&
              "Tahun harus diisi dan harus 4 digit angka!"
            }
            type="number"
            id="outlined-basic"
            label="Tahun"
            variant="outlined"
            value={tahun}
            onChange={(e) => setTahun(e.target.value.toUpperCase())}
            sx={textFieldStyle}
          />
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={warnaOptions}
            renderInput={(params) => (
              <TextField
                error={error && namaWarna.length === 0 && true}
                helperText={
                  error && namaWarna.length === 0 && "Nama Warna harus diisi!"
                }
                {...params}
                label="Warna"
              />
            )}
            onInputChange={(e, value) => setNamaWarna(value)}
            sx={textFieldStyle}
          />
          <Box sx={{ display: "flex" }}>
            <TextField
              error={error && noRangka.length === 0 && true}
              helperText={
                error && noRangka.length === 0 && "No. Rangka harus diisi!"
              }
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
              error={error && noRangka2.length === 0 && true}
              helperText={
                error && noRangka2.length === 0 && "(Tambahan) harus diisi!"
              }
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
              error={error && noMesin.length === 0 && true}
              helperText={
                error && noMesin.length === 0 && "No. Mesin harus diisi!"
              }
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
              error={error && noMesin2.length === 0 && true}
              helperText={
                error && noMesin2.length === 0 && "(Tambahan) harus diisi!"
              }
              id="outlined-basic"
              label="(Tambahan)"
              variant="outlined"
              value={noMesin2}
              onChange={(e) => setNoMesin2(e.target.value.toUpperCase())}
              sx={[textFieldStyle, { flex: 1 }]}
            />
          </Box>
          <TextField
            id="outlined-basic"
            label="Jenis"
            variant="outlined"
            value={jenisABeli}
            onChange={(e) => setJenisABeli(e.target.value.toUpperCase())}
            sx={textFieldStyle}
            disabled
          />
        </Box>
        <Box sx={[textFieldWrapper, { marginLeft: 4 }]}>
          {jenisABeli === "BEKAS" ? (
            <>
              <TextField
                error={error && nopol.length === 0 && true}
                helperText={error && nopol.length === 0 && "Nopol harus diisi!"}
                id="outlined-basic"
                label="Nopol"
                variant="outlined"
                value={nopol}
                onChange={(e) => setNopol(e.target.value.toUpperCase())}
              />
              <TextField
                error={error && tglStnk.length === 0 && true}
                helperText={
                  error && tglStnk.length === 0 && "Tanggal Stnk harus diisi!"
                }
                id="outlined-basic"
                label="Tanggal Stnk (hari-bulan-tahun)"
                variant="outlined"
                value={tglStnk}
                onChange={(e) => setTglStnk(e.target.value.toUpperCase())}
                sx={textFieldStyle}
              />
              <TextField
                error={error && namaStnk.length === 0 && true}
                helperText={
                  error && namaStnk.length === 0 && "Nama Stnk harus diisi!"
                }
                id="outlined-basic"
                label="Nama Stnk"
                variant="outlined"
                value={namaStnk}
                onChange={(e) => setNamaStnk(e.target.value.toUpperCase())}
                sx={textFieldStyle}
              />{" "}
            </>
          ) : (
            <>
              <TextField
                id="outlined-basic"
                label="Nopol"
                variant="outlined"
                value={nopol}
                disabled
                onChange={(e) => setNopol(e.target.value.toUpperCase())}
              />
              <TextField
                id="outlined-basic"
                label="Tanggal Stnk (hari-bulan-tahun)"
                variant="outlined"
                value={tglStnk}
                disabled
                onChange={(e) => setTglStnk(e.target.value.toUpperCase())}
                sx={textFieldStyle}
              />
              <TextField
                id="outlined-basic"
                label="Nama Stnk"
                variant="outlined"
                value={namaStnk}
                disabled
                onChange={(e) => setNamaStnk(e.target.value.toUpperCase())}
                sx={textFieldStyle}
              />{" "}
            </>
          )}
          <Box sx={hargaContainer}>
            <Typography sx={hargaText}>
              Harga Satuan
              {hargaSatuan !== 0 &&
                !isNaN(parseInt(hargaSatuan)) &&
                ` : Rp ${parseInt(hargaSatuan).toLocaleString()}`}
            </Typography>
            <TextField
              error={error && hargaSatuan.length === 0 && true}
              helperText={
                error && hargaSatuan.length === 0 && "Harga Satuan harus diisi!"
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
              helperText={error && ppnABeli.length === 0 && "PPN harus diisi!"}
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
