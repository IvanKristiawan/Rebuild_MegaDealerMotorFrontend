import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../../contexts/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import {
  Box,
  TextField,
  Typography,
  Divider,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions
} from "@mui/material";
import { Loader } from "../../../components";
import { tempUrl } from "../../../contexts/ContextProvider";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

const TampilABeli = () => {
  const { user, dispatch } = useContext(AuthContext);
  const { id, idABeli } = useParams();
  const navigate = useNavigate();
  const [idStok, setIdStok] = useState("");
  const [noBeli, setNoBeli] = useState("");
  const [kodeTipe, setKodeTipe] = useState("");
  const [tahun, setTahun] = useState("");
  const [namaWarna, setNamaWarna] = useState("");
  const [noRangka, setNoRangka] = useState("");
  const [noMesin, setNoMesin] = useState("");
  const [nopol, setNopol] = useState("");
  const [namaStnk, setNamaStnk] = useState("");
  const [tglStnk, setTglStnk] = useState("");
  const [jenisABeli, setJenisABeli] = useState("");
  const [hargaSatuan, setHargaSatuan] = useState("");
  const [ppnABeli, setPpnABeli] = useState("");
  const [tanggalJual, setTanggalJual] = useState("");
  const [noJual, setNoJual] = useState("");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    getUserById();
  }, []);

  const getUserById = async () => {
    if (id) {
      const response = await axios.post(`${tempUrl}/aBelis/${idABeli}`, {
        id: user._id,
        token: user.token
      });
      setIdStok(response.data.idStok);
      setNoBeli(response.data.noBeli);
      setKodeTipe(response.data.tipe);
      setTahun(response.data.tahun);
      setNamaWarna(response.data.namaWarna);
      setNoRangka(response.data.noRangka);
      setNoMesin(response.data.noMesin);
      setNopol(response.data.nopol);
      setNamaStnk(response.data.namaStnk);
      setTglStnk(response.data.tglStnk);
      setJenisABeli(response.data.jenisABeli);
      setHargaSatuan(response.data.hargaSatuan);
      setPpnABeli(response.data.ppnABeli);
      setTanggalJual(response.data.tanggalJual);
      setNoJual(response.data.noJual);
    }
  };

  const deleteUser = async (id) => {
    try {
      setLoading(true);
      // Get Beli
      const getBeli = await axios.post(`${tempUrl}/belis/${id}`, {
        id: user._id,
        token: user.token
      });
      // Update Beli
      await axios.post(`${tempUrl}/updateBeli/${id}`, {
        jumlahBeli: parseInt(getBeli.data.jumlahBeli) - parseInt(hargaSatuan),
        id: user._id,
        token: user.token
      });
      // Delete A Beli
      await axios.post(`${tempUrl}/deleteABeli/${idABeli}`, {
        id: user._id,
        token: user.token
      });
      // Delete Daftar Stok
      await axios.post(`${tempUrl}/deleteDaftarStok/${idStok}`, {
        id: user._id,
        token: user.token
      });
      setNoBeli("");
      setKodeTipe("");
      setTahun("");
      setNamaWarna("");
      setNoRangka("");
      setNoMesin("");
      setNopol("");
      setNamaStnk("");
      setTglStnk("");
      setJenisABeli("");
      setHargaSatuan("");
      setPpnABeli("");
      setTanggalJual("");
      setNoJual("");
      setLoading(false);
      navigate(`/daftarBeli/beli/${id}`);
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <Button
        variant="outlined"
        color="secondary"
        onClick={() => navigate(`/daftarBeli/beli/${id}`)}
        sx={{ marginLeft: 2, marginTop: 4 }}
      >
        {"< Kembali"}
      </Button>
      <Box sx={container}>
        <Typography color="#757575">Pembelian</Typography>
        <Typography variant="h4" sx={subTitleText}>
          Barang Beli
        </Typography>
        <Box sx={deleteButtonContainer}>
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">{`Hapus Data`}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-slide-description">
                {`Yakin ingin menghapus data ${kodeTipe.kodeTipe}?`}
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => deleteUser(id)}>Ok</Button>
              <Button onClick={handleClose}>Cancel</Button>
            </DialogActions>
          </Dialog>
          <Button
            variant="contained"
            color="error"
            startIcon={<DeleteOutlineIcon />}
            sx={{ textTransform: "none" }}
            onClick={handleClickOpen}
          >
            Hapus
          </Button>
        </Box>
        <Divider sx={dividerStyle} />
        <Box sx={textFieldContainer}>
          <Box sx={textFieldWrapper}>
            <Typography sx={labelInput}>No Beli</Typography>
            <TextField
              size="small"
              id="outlined-basic"
              variant="filled"
              InputProps={{
                readOnly: true
              }}
              value={noBeli}
            />
            <Typography sx={[labelInput, spacingTop]}>Kode Tipe</Typography>
            <TextField
              size="small"
              id="outlined-basic"
              variant="filled"
              InputProps={{
                readOnly: true
              }}
              value={`${kodeTipe.kodeTipe} - ${kodeTipe.namaTipe}`}
            />
            <Typography sx={[labelInput, spacingTop]}>Tahun</Typography>
            <TextField
              size="small"
              id="outlined-basic"
              variant="filled"
              InputProps={{
                readOnly: true
              }}
              value={tahun}
            />
            <Typography sx={[labelInput, spacingTop]}>Nama Warna</Typography>
            <TextField
              size="small"
              id="outlined-basic"
              variant="filled"
              InputProps={{
                readOnly: true
              }}
              value={namaWarna}
            />
            <Typography sx={[labelInput, spacingTop]}>No Rangka</Typography>
            <TextField
              size="small"
              id="outlined-basic"
              variant="filled"
              InputProps={{
                readOnly: true
              }}
              value={noRangka}
            />
            <Typography sx={[labelInput, spacingTop]}>No Mesin</Typography>
            <TextField
              size="small"
              id="outlined-basic"
              variant="filled"
              InputProps={{
                readOnly: true
              }}
              value={noMesin}
            />
            <Typography sx={[labelInput, spacingTop]}>Nopol</Typography>
            <TextField
              size="small"
              id="outlined-basic"
              variant="filled"
              InputProps={{
                readOnly: true
              }}
              value={nopol}
            />
          </Box>
          <Box sx={[textFieldWrapper, secondWrapper]}>
            <Typography sx={labelInput}>Nama Stnk</Typography>
            <TextField
              size="small"
              id="outlined-basic"
              variant="filled"
              InputProps={{
                readOnly: true
              }}
              value={namaStnk}
            />
            <Typography sx={[labelInput, spacingTop]}>Tanggal Stnk</Typography>
            <TextField
              size="small"
              id="outlined-basic"
              variant="filled"
              InputProps={{
                readOnly: true
              }}
              value={tglStnk}
            />
            <Typography sx={[labelInput, spacingTop]}>Jenis</Typography>
            <TextField
              size="small"
              id="outlined-basic"
              variant="filled"
              InputProps={{
                readOnly: true
              }}
              value={jenisABeli}
            />
            <Typography sx={[labelInput, spacingTop]}>Harga Satuan</Typography>
            <TextField
              size="small"
              id="outlined-basic"
              variant="filled"
              InputProps={{
                readOnly: true
              }}
              value={hargaSatuan.toLocaleString()}
            />
            <Typography sx={[labelInput, spacingTop]}>PPN</Typography>
            <TextField
              size="small"
              id="outlined-basic"
              variant="filled"
              InputProps={{
                readOnly: true
              }}
              value={ppnABeli.toLocaleString()}
            />
            <Typography sx={[labelInput, spacingTop]}>Tanggal Jual</Typography>
            <TextField
              size="small"
              id="outlined-basic"
              variant="filled"
              InputProps={{
                readOnly: true
              }}
              value={tanggalJual}
            />
            <Typography sx={[labelInput, spacingTop]}>No. Jual</Typography>
            <TextField
              size="small"
              id="outlined-basic"
              variant="filled"
              InputProps={{
                readOnly: true
              }}
              value={noJual}
            />
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default TampilABeli;

const container = {
  p: 4
};

const subTitleText = {
  fontWeight: "900"
};

const deleteButtonContainer = {
  mt: 4,
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "center"
};

const dividerStyle = {
  pt: 4
};

const textFieldContainer = {
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
  display: "flex",
  mt: 4
};

const labelInput = {
  fontWeight: "600",
  marginLeft: 1
};

const spacingTop = {
  mt: 4
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
