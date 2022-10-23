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

const TampilAAngsuran = () => {
  const { user, dispatch } = useContext(AuthContext);
  const { id, idAAngsuran } = useParams();
  const navigate = useNavigate();

  // Data Angsuran
  const [idAngsuran, setIdAngsuran] = useState("");
  const [tglJatuhTempo, setTglJatuhTempo] = useState("");
  const [angModal, setAngModal] = useState("");
  const [angBunga, setAngBunga] = useState("");
  const [angPerBulan, setAngPerBulan] = useState("");

  // Data Inputan
  const [tglBayar, setTglBayar] = useState("");
  const [noKwitansi, setNoKwitansi] = useState("");
  const [keterangan, setKeterangan] = useState("");
  const [kodeKolektor, setKodeKolektor] = useState("");
  const [denda, setDenda] = useState("");
  const [potongan, setPotongan] = useState("");
  const [jemputan, setJemputan] = useState("");
  const [biayaTarik, setBiayaTarik] = useState("");
  const [hutangDenda, setHutangDenda] = useState("");
  const [totalPiutang, setTotalPiutang] = useState("");
  const [totalBayar, setTotalBayar] = useState("");
  const [bayar, setBayar] = useState("");

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
      const response = await axios.post(`${tempUrl}/angsuransFindChild`, {
        noJual: id,
        ke: idAAngsuran,
        id: user._id,
        token: user.token
      });
      setIdAngsuran(response.data._id);
      setTglJatuhTempo(response.data.tglJatuhTempo);
      setAngModal(response.data.angModal);
      setAngBunga(response.data.angBunga);
      setAngPerBulan(response.data.angPerBulan);

      setTglBayar(response.data.tglBayar);
      setNoKwitansi(response.data.noKwitansi);
      setKeterangan(response.data.keterangan);
      setDenda(response.data.denda);
      setPotongan(response.data.potongan);
      setJemputan(response.data.jemputan);
      setBiayaTarik(response.data.biayaTarik);
      setHutangDenda(response.data.hutangDenda);
      setTotalPiutang(response.data.totalPiutang);
      setTotalBayar(response.data.totalBayar);
      setBayar(response.data.bayar);

      if (response.data.kodeKolektor) {
        const kolektorData = await axios.post(
          `${tempUrl}/kolektors/${response.data.kodeKolektor}`,
          {
            id: user._id,
            token: user.token
          }
        );
        setKodeKolektor(
          `${kolektorData.data._id} - ${kolektorData.data.namaKolektor}`
        );
      } else {
        setKodeKolektor("");
      }
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
        onClick={() => navigate(`/daftarAngsuran/angsuran/${id}`)}
        sx={{ marginLeft: 2, marginTop: 4 }}
      >
        {"< Kembali"}
      </Button>
      <Box sx={container}>
        <Typography color="#757575">Piutang</Typography>
        <Typography variant="h4" sx={subTitleText}>
          Angsuran Ke-
        </Typography>
        <Divider sx={dividerStyle} />
        <Box sx={textFieldContainer}>
          <Box sx={textFieldWrapper}>
            <Typography sx={labelInput}>No</Typography>
            <TextField
              size="small"
              id="outlined-basic"
              variant="filled"
              InputProps={{
                readOnly: true
              }}
              value={idAngsuran}
            />
            <Typography sx={[labelInput, spacingTop]}>
              Tanggal Jatuh Tempo
            </Typography>
            <TextField
              size="small"
              id="outlined-basic"
              variant="filled"
              InputProps={{
                readOnly: true
              }}
              value={tglJatuhTempo}
            />
            <Typography sx={[labelInput, spacingTop]}>
              Angsuran Modal
            </Typography>
            <TextField
              size="small"
              id="outlined-basic"
              variant="filled"
              InputProps={{
                readOnly: true
              }}
              value={angModal}
            />
          </Box>
          <Box sx={[textFieldWrapper, secondWrapper]}>
            <Typography sx={labelInput}>Angsuran Bunga</Typography>
            <TextField
              size="small"
              id="outlined-basic"
              variant="filled"
              InputProps={{
                readOnly: true
              }}
              value={angBunga}
            />
            <Typography sx={[labelInput, spacingTop]}>
              Angsuran/Bulan
            </Typography>
            <TextField
              size="small"
              id="outlined-basic"
              variant="filled"
              InputProps={{
                readOnly: true
              }}
              value={angPerBulan}
            />
          </Box>
        </Box>
        <Divider sx={dividerStyle} />
        <Box sx={textFieldContainer}>
          <Box sx={textFieldWrapper}>
            <Typography sx={labelInput}>Tanggal Bayar</Typography>
            <TextField
              size="small"
              id="outlined-basic"
              variant="filled"
              InputProps={{
                readOnly: true
              }}
              value={tglBayar}
            />
            <Typography sx={[labelInput, spacingTop]}>No. Kwitansi</Typography>
            <TextField
              size="small"
              id="outlined-basic"
              variant="filled"
              InputProps={{
                readOnly: true
              }}
              value={noKwitansi}
            />
            <Typography sx={[labelInput, spacingTop]}>Keterangan</Typography>
            <TextField
              size="small"
              id="outlined-basic"
              variant="filled"
              InputProps={{
                readOnly: true
              }}
              value={keterangan}
            />
            <Typography sx={[labelInput, spacingTop]}>Kode Kolektor</Typography>
            <TextField
              size="small"
              id="outlined-basic"
              variant="filled"
              InputProps={{
                readOnly: true
              }}
              value={kodeKolektor}
            />
            <Typography sx={[labelInput, spacingTop]}>Denda</Typography>
            <TextField
              size="small"
              id="outlined-basic"
              variant="filled"
              InputProps={{
                readOnly: true
              }}
              value={denda.toLocaleString()}
            />
            <Typography sx={[labelInput, spacingTop]}>Potongan</Typography>
            <TextField
              size="small"
              id="outlined-basic"
              variant="filled"
              InputProps={{
                readOnly: true
              }}
              value={potongan.toLocaleString()}
            />
          </Box>
          <Box sx={[textFieldWrapper, secondWrapper]}>
            <Typography sx={labelInput}>Jemputan</Typography>
            <TextField
              size="small"
              id="outlined-basic"
              variant="filled"
              InputProps={{
                readOnly: true
              }}
              value={jemputan.toLocaleString()}
            />
            <Typography sx={[labelInput, spacingTop]}>Biaya Tarik</Typography>
            <TextField
              size="small"
              id="outlined-basic"
              variant="filled"
              InputProps={{
                readOnly: true
              }}
              value={biayaTarik.toLocaleString()}
            />
            <Typography sx={[labelInput, spacingTop]}>Hutang Denda</Typography>
            <TextField
              size="small"
              id="outlined-basic"
              variant="filled"
              InputProps={{
                readOnly: true
              }}
              value={hutangDenda.toLocaleString()}
            />
            <Typography sx={[labelInput, spacingTop]}>Total Piutang</Typography>
            <TextField
              size="small"
              id="outlined-basic"
              variant="filled"
              InputProps={{
                readOnly: true
              }}
              value={totalPiutang.toLocaleString()}
            />
            <Typography sx={[labelInput, spacingTop]}>Total Bayar</Typography>
            <TextField
              size="small"
              id="outlined-basic"
              variant="filled"
              InputProps={{
                readOnly: true
              }}
              value={totalBayar.toLocaleString()}
            />
            <Typography sx={[labelInput, spacingTop]}>Bayar</Typography>
            <TextField
              size="small"
              id="outlined-basic"
              variant="filled"
              InputProps={{
                readOnly: true
              }}
              value={bayar.toLocaleString()}
            />
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default TampilAAngsuran;

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
  pt: 4,
  mb: 2
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
