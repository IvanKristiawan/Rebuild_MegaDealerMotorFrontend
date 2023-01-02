import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
  Checkbox,
  FormGroup,
  FormControlLabel
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

const UbahUser = () => {
  const { user, dispatch } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const [kodeCabang, setKodeCabang] = useState("");
  const [username, setUsername] = useState("");
  const [tipeUser, setTipeUser] = useState("");
  const [periode, setPeriode] = useState("");
  const [kodeKwitansi, setKodeKwitansi] = useState("");
  const [noTerakhir, setNoTerakhir] = useState("");
  const [password, setPassword] = useState("");

  // Akses Master
  const [motor, setMotor] = useState(false);
  const [area, setArea] = useState(false);
  const [bukuBesar, setBukuBesar] = useState(false);
  const [dealer, setDealer] = useState(false);
  const [kolektor, setKolektor] = useState(false);
  const [marketing, setMarketing] = useState(false);
  const [pekerjaan, setPekerjaan] = useState(false);
  const [surveyor, setSurveyor] = useState(false);
  const [leasing, setLeasing] = useState(false);
  const [supplier, setSupplier] = useState(false);
  const [cabang, setCabang] = useState(false);

  // Akses Pembelian
  const [beli, setBeli] = useState(false);

  // Akses Penjualan
  const [register, setRegister] = useState(false);
  const [jual, setJual] = useState(false);

  // Akses Laporan
  const [daftarStok, setDaftarStok] = useState(false);
  const [totalPiutang, setTotalPiutang] = useState(false);
  const [tunggakan, setTunggakan] = useState(false);
  const [penerimaanKas, setPenerimaanKas] = useState(false);
  const [penjualanPerCabang, setPenjualanPerCabang] = useState(false);
  const [rekapPenerimaan, setRekapPenerimaan] = useState(false);
  const [lapPenjualan, setLapPenjualan] = useState(false);

  // Akses Piutang
  const [angsuran, setAngsuran] = useState(false);
  const [sp, setSp] = useState(false);
  const [st, setSt] = useState(false);

  // Akses Perawatan
  const [biayaPerawatan, setBiayaPerawatan] = useState(false);

  // Akses Finance
  const [kasMasuk, setKasMasuk] = useState(false);
  const [kasKeluar, setKasKeluar] = useState(false);
  const [bankMasuk, setBankMasuk] = useState(false);
  const [bankKeluar, setBankKeluar] = useState(false);

  // Akses Accounting
  const [posting, setPosting] = useState(false);
  const [unposting, setUnposting] = useState(false);
  const [aktivitasBukuBesar, setAktivitasBukuBesar] = useState(false);
  const [labaRugi, setLabaRugi] = useState(false);
  const [neraca, setNeraca] = useState(false);
  const [neracaSaldo, setNeracaSaldo] = useState(false);

  // Akses Utility
  const [profilUser, setProfilUser] = useState(false);
  const [daftarUser, setDaftarUser] = useState(false);

  const [cabangs, setCabangs] = useState([]);
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);

  const cabangOptions = cabangs.map((cabang) => ({
    label: `${cabang._id} - ${cabang.namaCabang}`
  }));

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  useEffect(() => {
    getCabangsData();
    getUserById();
  }, []);

  const getCabangsData = async (kodeUnit) => {
    setKodeCabang("");
    const response = await axios.post(`${tempUrl}/cabangs`, {
      id: user._id,
      token: user.token
    });
    setCabangs(response.data);
  };

  const getUserById = async () => {
    setLoading(true);
    const response = await axios.post(`${tempUrl}/findUser/${id}`, {
      tipeAdmin: user.tipeUser,
      id: user._id,
      token: user.token
    });
    setUsername(response.data.username);
    setTipeUser(response.data.tipeUser);
    setPeriode(response.data.periode);
    setKodeKwitansi(response.data.kodeKwitansi);
    setNoTerakhir(response.data.noTerakhir);
    setKodeCabang(response.data.cabang._id);

    // Akses Master
    setMotor(response.data.akses.motor);
    setArea(response.data.akses.area);
    setBukuBesar(response.data.akses.bukuBesar);
    setDealer(response.data.akses.dealer);
    setKolektor(response.data.akses.kolektor);
    setMarketing(response.data.akses.marketing);
    setPekerjaan(response.data.akses.pekerjaan);
    setSurveyor(response.data.akses.surveyor);
    setLeasing(response.data.akses.leasing);
    setSupplier(response.data.akses.supplier);
    setCabang(response.data.akses.cabang);

    // Akses Pembelian
    setBeli(response.data.akses.beli);

    // Akses Penjualan
    setRegister(response.data.akses.register);
    setJual(response.data.akses.jual);

    // Akses Laporan
    setDaftarStok(response.data.akses.daftarStok);
    setTotalPiutang(response.data.akses.totalPiutang);
    setTunggakan(response.data.akses.tunggakan);
    setPenerimaanKas(response.data.akses.penerimaanKas);
    setPenjualanPerCabang(response.data.akses.penjualanPerCabang);
    setRekapPenerimaan(response.data.akses.rekapPenerimaan);
    setLapPenjualan(response.data.akses.lapPenjualan);

    // Akses Piutang
    setAngsuran(response.data.akses.angsuran);
    setSp(response.data.akses.sp);
    setSt(response.data.akses.st);

    // Akses Perawatan
    setBiayaPerawatan(response.data.akses.biayaPerawatan);

    // Akses Finance
    setKasMasuk(response.data.akses.kasMasuk);
    setKasKeluar(response.data.akses.kasKeluar);
    setBankMasuk(response.data.akses.bankMasuk);
    setBankKeluar(response.data.akses.bankKeluar);

    // Akses Accounting
    setPosting(response.data.akses.posting);
    setUnposting(response.data.akses.unposting);
    setAktivitasBukuBesar(response.data.akses.aktivitasBukuBesar);
    setLabaRugi(response.data.akses.labaRugi);
    setNeraca(response.data.akses.neraca);
    setNeracaSaldo(response.data.akses.neracaSaldo);

    // Akses Utility
    setProfilUser(response.data.akses.profilUser);
    setDaftarUser(response.data.akses.daftarUser);
    setLoading(false);
  };

  const updateUser = async (e) => {
    e.preventDefault();
    let isFailedValidation =
      username.length === 0 ||
      tipeUser.length === 0 ||
      periode.length === 0 ||
      kodeKwitansi.length === 0 ||
      kodeCabang.length === 0;
    if (isFailedValidation) {
      setError(true);
      setOpen(!open);
    } else {
      if (password.length === 0) {
        setPassword(user.password);
      }
      try {
        setLoading(true);
        await axios.post(`${tempUrl}/users/${id}`, {
          username,
          tipeUser,
          periode,
          kodeKwitansi,
          noTerakhir,
          password,
          tipeAdmin: user.tipeUser,
          akses: {
            motor,
            area,
            bukuBesar,
            dealer,
            kolektor,
            marketing,
            pekerjaan,
            surveyor,
            leasing,
            supplier,
            cabang,
            beli,
            register,
            jual,
            daftarStok,
            totalPiutang,
            tunggakan,
            penerimaanKas,
            penjualanPerCabang,
            rekapPenerimaan,
            lapPenjualan,
            angsuran,
            sp,
            st,
            biayaPerawatan,
            kasMasuk,
            kasKeluar,
            bankMasuk,
            bankKeluar,
            posting,
            unposting,
            aktivitasBukuBesar,
            labaRugi,
            neraca,
            neracaSaldo,
            profilUser,
            daftarUser
          },
          kodeCabang: kodeCabang.split(" ", 1)[0],
          id: user._id,
          token: user.token
        });
        setLoading(false);

        if (user._id === id) {
          dispatch({ type: "LOGOUT" });
          navigate("/");
        } else {
          navigate("/daftarUser");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const tipeUserOption = [{ label: "MGR" }, { label: "ADM" }];

  if (loading) {
    return <Loader />;
  }

  return (
    <Box sx={container}>
      <Typography color="#757575">User</Typography>
      <Typography variant="h4" sx={subTitleText}>
        Ubah User
      </Typography>
      <Divider sx={dividerStyle} />
      <Paper sx={contentContainer} elevation={12}>
        <Box sx={showDataContainer}>
          <Box sx={showDataWrapper}>
            <Typography sx={labelInput}>Username</Typography>
            <TextField
              size="small"
              error={error && username.length === 0 && true}
              helperText={
                error && username.length === 0 && "Username harus diisi!"
              }
              id="outlined-basic"
              variant="outlined"
              value={username}
              onChange={(e) => setUsername(e.target.value.toUpperCase())}
            />
            <Typography sx={[labelInput, spacingTop]}>Tipe User</Typography>
            <Autocomplete
              size="small"
              disablePortal
              id="combo-box-demo"
              options={tipeUserOption}
              renderInput={(params) => (
                <TextField
                  size="small"
                  error={error && tipeUser.length === 0 && true}
                  helperText={
                    error && tipeUser.length === 0 && "Tipe User harus diisi!"
                  }
                  {...params}
                />
              )}
              onInputChange={(e, value) => setTipeUser(value)}
              value={{ label: tipeUser }}
            />
            <Typography sx={[labelInput, spacingTop]}>Periode</Typography>
            <TextField
              size="small"
              error={error && periode.length === 0 && true}
              helperText={
                error && periode.length === 0 && "Periode harus diisi!"
              }
              id="outlined-basic"
              variant="outlined"
              value={periode}
              onChange={(e) => setPeriode(e.target.value.toUpperCase())}
            />
            <Typography sx={[labelInput, spacingTop]}>Kode Cabang</Typography>
            <Autocomplete
              size="small"
              disablePortal
              id="combo-box-demo"
              options={cabangOptions}
              renderInput={(params) => (
                <TextField
                  size="small"
                  error={error && kodeCabang.length === 0 && true}
                  helperText={
                    error &&
                    kodeCabang.length === 0 &&
                    "Kode Cabang harus diisi!"
                  }
                  {...params}
                />
              )}
              onInputChange={(e, value) => setKodeCabang(value)}
              value={kodeCabang}
            />
          </Box>
          <Box sx={[showDataWrapper, secondWrapper]}>
            <Typography sx={labelInput}>Kode Kwitansi</Typography>
            <TextField
              size="small"
              error={error && kodeKwitansi.length === 0 && true}
              helperText={
                error &&
                kodeKwitansi.length === 0 &&
                "Kode Kwitansi harus diisi!"
              }
              id="outlined-basic"
              variant="outlined"
              value={kodeKwitansi}
              onChange={(e) => setKodeKwitansi(e.target.value.toUpperCase())}
            />
            <Typography sx={[labelInput, spacingTop]}>No Terakhir</Typography>
            <TextField
              size="small"
              id="outlined-basic"
              variant="outlined"
              value={noTerakhir}
              onChange={(e) => setNoTerakhir(e.target.value.toUpperCase())}
            />
            <Typography sx={[labelInput, spacingTop]}>
              Password (baru)
            </Typography>
            <TextField
              size="small"
              id="outlined-basic"
              variant="outlined"
              value={password}
              onChange={(e) => setPassword(e.target.value.toUpperCase())}
            />
            <Typography>
              *Kosongkan jika tidak ingin mengganti password
            </Typography>
          </Box>
        </Box>
      </Paper>
      {user.tipeUser === "MGR" && (
        <Paper sx={contentContainer} elevation={12}>
          <Typography variant="h5" sx={[labelInput, spacingTop]}>
            Atur Hak Akses
          </Typography>
          <Box sx={showDataContainer}>
            <Box sx={showDataWrapper}>
              <Typography variant="p" sx={[spacingTop]}>
                Master
              </Typography>
              <FormGroup>
                <FormControlLabel
                  control={<Checkbox checked={motor} />}
                  label="Motor"
                  onChange={() => setMotor(!motor)}
                />
              </FormGroup>
              <FormGroup>
                <FormControlLabel
                  control={<Checkbox checked={area} />}
                  label="Area"
                  onChange={() => setArea(!area)}
                />
              </FormGroup>
              <FormGroup>
                <FormControlLabel
                  control={<Checkbox checked={bukuBesar} />}
                  label="Buku Besar"
                  onChange={() => setBukuBesar(!bukuBesar)}
                />
              </FormGroup>
              <FormGroup>
                <FormControlLabel
                  control={<Checkbox checked={dealer} />}
                  label="Dealer"
                  onChange={() => setDealer(!dealer)}
                />
              </FormGroup>
              <FormGroup>
                <FormControlLabel
                  control={<Checkbox checked={kolektor} />}
                  label="Kolektor"
                  onChange={() => setKolektor(!kolektor)}
                />
              </FormGroup>
              <FormGroup>
                <FormControlLabel
                  control={<Checkbox checked={marketing} />}
                  label="Marketing"
                  onChange={() => setMarketing(!marketing)}
                />
              </FormGroup>
              <FormGroup>
                <FormControlLabel
                  control={<Checkbox checked={pekerjaan} />}
                  label="Pekerjaan"
                  onChange={() => setPekerjaan(!pekerjaan)}
                />
              </FormGroup>
              <FormGroup>
                <FormControlLabel
                  control={<Checkbox checked={surveyor} />}
                  label="Surveyor"
                  onChange={() => setSurveyor(!surveyor)}
                />
              </FormGroup>
              <FormGroup>
                <FormControlLabel
                  control={<Checkbox checked={leasing} />}
                  label="Leasing"
                  onChange={() => setLeasing(!leasing)}
                />
              </FormGroup>
              <FormGroup>
                <FormControlLabel
                  control={<Checkbox checked={supplier} />}
                  label="Supplier"
                  onChange={() => setSupplier(!supplier)}
                />
              </FormGroup>
              <FormGroup>
                <FormControlLabel
                  control={<Checkbox checked={cabang} />}
                  label="Cabang"
                  onChange={() => setCabang(!cabang)}
                />
              </FormGroup>
              <Typography variant="p" sx={[spacingTop]}>
                Pembelian
              </Typography>
              <FormGroup>
                <FormControlLabel
                  control={<Checkbox checked={beli} />}
                  label="Beli"
                  onChange={() => setBeli(!beli)}
                />
              </FormGroup>
              <Typography variant="p" sx={[spacingTop]}>
                Penjualan
              </Typography>
              <FormGroup>
                <FormControlLabel
                  control={<Checkbox checked={register} />}
                  label="Register"
                  onChange={() => setRegister(!register)}
                />
              </FormGroup>
              <FormGroup>
                <FormControlLabel
                  control={<Checkbox checked={jual} />}
                  label="Jual"
                  onChange={() => setJual(!jual)}
                />
              </FormGroup>
              <Typography variant="p" sx={[spacingTop]}>
                Laporan
              </Typography>
              <FormGroup>
                <FormControlLabel
                  control={<Checkbox checked={daftarStok} />}
                  label="Daftar Stok"
                  onChange={() => setDaftarStok(!daftarStok)}
                />
              </FormGroup>
              <FormGroup>
                <FormControlLabel
                  control={<Checkbox checked={totalPiutang} />}
                  label="Total Piutang"
                  onChange={() => setTotalPiutang(!totalPiutang)}
                />
              </FormGroup>
              <FormGroup>
                <FormControlLabel
                  control={<Checkbox checked={tunggakan} />}
                  label="Tunggakan"
                  onChange={() => setTunggakan(!tunggakan)}
                />
              </FormGroup>
              <FormGroup>
                <FormControlLabel
                  control={<Checkbox checked={penerimaanKas} />}
                  label="Penerimaan Kas"
                  onChange={() => setPenerimaanKas(!penerimaanKas)}
                />
              </FormGroup>
              <FormGroup>
                <FormControlLabel
                  control={<Checkbox checked={penjualanPerCabang} />}
                  label="Penjualan/Cabang"
                  onChange={() => setPenjualanPerCabang(!penjualanPerCabang)}
                />
              </FormGroup>
              <FormGroup>
                <FormControlLabel
                  control={<Checkbox checked={rekapPenerimaan} />}
                  label="Rekap Penerimaan"
                  onChange={() => setRekapPenerimaan(!rekapPenerimaan)}
                />
              </FormGroup>
              <FormGroup>
                <FormControlLabel
                  control={<Checkbox checked={lapPenjualan} />}
                  label="Lap. Penjualan"
                  onChange={() => setLapPenjualan(!lapPenjualan)}
                />
              </FormGroup>
            </Box>
            <Box sx={[showDataWrapper, secondWrapper]}>
              <Typography variant="p" sx={[spacingTop]}>
                Piutang
              </Typography>
              <FormGroup>
                <FormControlLabel
                  control={<Checkbox checked={angsuran} />}
                  label="Angsuran"
                  onChange={() => setAngsuran(!angsuran)}
                />
              </FormGroup>
              <FormGroup>
                <FormControlLabel
                  control={<Checkbox checked={sp} />}
                  label="SP"
                  onChange={() => setSp(!sp)}
                />
              </FormGroup>
              <FormGroup>
                <FormControlLabel
                  control={<Checkbox checked={st} />}
                  label="ST"
                  onChange={() => setSt(!st)}
                />
              </FormGroup>
              <Typography variant="p" sx={[spacingTop]}>
                Perawatan
              </Typography>
              <FormGroup>
                <FormControlLabel
                  control={<Checkbox checked={biayaPerawatan} />}
                  label="Biaya Perawatan"
                  onChange={() => setBiayaPerawatan(!biayaPerawatan)}
                />
              </FormGroup>
              <Typography variant="p" sx={[spacingTop]}>
                Finance
              </Typography>
              <FormGroup>
                <FormControlLabel
                  control={<Checkbox checked={kasMasuk} />}
                  label="Kas Masuk"
                  onChange={() => setKasMasuk(!kasMasuk)}
                />
              </FormGroup>
              <FormGroup>
                <FormControlLabel
                  control={<Checkbox checked={kasKeluar} />}
                  label="Kas Keluar"
                  onChange={() => setKasKeluar(!kasKeluar)}
                />
              </FormGroup>
              <FormGroup>
                <FormControlLabel
                  control={<Checkbox checked={bankMasuk} />}
                  label="Bank Masuk"
                  onChange={() => setBankMasuk(!bankMasuk)}
                />
              </FormGroup>
              <FormGroup>
                <FormControlLabel
                  control={<Checkbox checked={bankKeluar} />}
                  label="Bank Keluar"
                  onChange={() => setBankKeluar(!bankKeluar)}
                />
              </FormGroup>
              <Typography variant="p" sx={[spacingTop]}>
                Accounting
              </Typography>
              <FormGroup>
                <FormControlLabel
                  control={<Checkbox checked={posting} />}
                  label="Posting"
                  onChange={() => setPosting(!posting)}
                />
              </FormGroup>
              <FormGroup>
                <FormControlLabel
                  control={<Checkbox checked={unposting} />}
                  label="Unposting"
                  onChange={() => setUnposting(!unposting)}
                />
              </FormGroup>
              <FormGroup>
                <FormControlLabel
                  control={<Checkbox checked={aktivitasBukuBesar} />}
                  label="Aktivitas Buku Besar"
                  onChange={() => setAktivitasBukuBesar(!aktivitasBukuBesar)}
                />
              </FormGroup>
              <FormGroup>
                <FormControlLabel
                  control={<Checkbox checked={labaRugi} />}
                  label="Laba Rugi"
                  onChange={() => setLabaRugi(!labaRugi)}
                />
              </FormGroup>
              <FormGroup>
                <FormControlLabel
                  control={<Checkbox checked={neraca} />}
                  label="Neraca"
                  onChange={() => setNeraca(!neraca)}
                />
              </FormGroup>
              <FormGroup>
                <FormControlLabel
                  control={<Checkbox checked={neracaSaldo} />}
                  label="Neraca Saldo"
                  onChange={() => setNeracaSaldo(!neracaSaldo)}
                />
              </FormGroup>
              <Typography variant="p" sx={[spacingTop]}>
                Utility
              </Typography>
              <FormGroup>
                <FormControlLabel
                  control={<Checkbox checked={profilUser} />}
                  label="Profil User"
                  onChange={() => setProfilUser(!profilUser)}
                />
              </FormGroup>
              <FormGroup>
                <FormControlLabel
                  control={<Checkbox checked={daftarUser} />}
                  label="Daftar User"
                  onChange={() => setDaftarUser(!daftarUser)}
                />
              </FormGroup>
            </Box>
          </Box>
        </Paper>
      )}
      <Box sx={spacingTop}>
        <Button
          variant="outlined"
          color="secondary"
          onClick={() => navigate("/daftarUser")}
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

export default UbahUser;

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
    sm: 4
  },
  marginTop: {
    sm: 0,
    xs: 4
  }
};
