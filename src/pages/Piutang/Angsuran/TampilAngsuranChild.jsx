import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../../contexts/AuthContext";
import { tempUrl } from "../../../contexts/ContextProvider";
import { Colors } from "../../../constants/styles";
import { Loader } from "../../../components";
import {
  Box,
  TextField,
  Typography,
  Divider,
  Button,
  ButtonGroup
} from "@mui/material";
import jsPDF from "jspdf";
import angkaTerbilang from "@develoka/angka-terbilang-js";
import PrintIcon from "@mui/icons-material/Print";
import SaveIcon from "@mui/icons-material/Save";

const TampilAngsuranChild = () => {
  const { user } = useContext(AuthContext);
  const { id, idAngsuranChild } = useParams();
  const navigate = useNavigate();

  // Data Angsuran
  const [mainId, setMainId] = useState("");
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

  const [md1, setMd1] = useState("");
  const [md2, setMd2] = useState("");
  const [md3, setMd3] = useState("");
  const [sp, setSp] = useState("");
  const [st, setSt] = useState("");
  const [mdTerakhir, setMdTerakhir] = useState("");

  const [namaRegister, setNamaRegister] = useState("");
  const [almRegister, setAlmRegister] = useState("");
  const [noRangka, setNoRangka] = useState("");
  const [nopol, setNopol] = useState("");
  const [tipe, setTipe] = useState("");
  const [namaWarna, setNamaWarna] = useState("");
  const [tenor, setTenor] = useState("");
  const [noJual, setNoJual] = useState("");

  const [isDisabledMd1, setIsDisabledMd1] = useState(true);
  const [isDisabledMd2, setIsDisabledMd2] = useState(true);
  const [isDisabledMd3, setIsDisabledMd3] = useState(true);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getAngsuranChildById();
    getJualById();
  }, []);

  const getAngsuranChildById = async () => {
    if (id) {
      const findAngsuranId = await axios.post(`${tempUrl}/angsuransByNoJual`, {
        noJual: id,
        ke: idAngsuranChild,
        id: user._id,
        token: user.token
      });
      setMainId(findAngsuranId.data._id);
      const response = await axios.post(`${tempUrl}/angsuransFindChild`, {
        noJual: id,
        ke: idAngsuranChild,
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
        setKodeKolektor(
          `${response.data.kodeKolektor.kodeKolektor} - ${response.data.kodeKolektor.namaKolektor}`
        );
      }

      setMd1(response.data.md1);
      setMd2(response.data.md2);
      setMd3(response.data.md3);
      setSp(response.data.sp);
      setSt(response.data.st);

      let isMd1Active =
        response.data.tglBayar.length === 0 && response.data.md1.length === 0;
      let isMd2Active =
        response.data.md1.length > 0 && response.data.md2.length === 0;
      let isMd3Active =
        response.data.md1.length > 0 &&
        response.data.md2.length > 0 &&
        response.data.md3.length === 0;

      if (isMd1Active) {
        setIsDisabledMd1(false);
      } else if (isMd2Active) {
        setIsDisabledMd2(false);
      } else if (isMd3Active) {
        setIsDisabledMd3(false);
      }
    }
  };

  const getJualById = async () => {
    if (id) {
      const response = await axios.post(`${tempUrl}/jualByNoJual`, {
        noJual: id,
        id: user._id,
        token: user.token,
        kodeCabang: user.cabang._id
      });
      // alert(response);
      setNamaRegister(response.data.namaRegister);
      setAlmRegister(response.data.almRegister);
      setNoRangka(response.data.noRangka);
      setNopol(response.data.nopol);
      setTipe(response.data.tipe);
      setNamaWarna(response.data.namaWarna);
      setTenor(response.data.tenor);
      setNoJual(response.data.noJual);
    }
  };

  const downloadPdfCetakKwitansiAngsuran = async () => {
    const tempStok = await axios.post(`${tempUrl}/daftarStoksByNorang`, {
      noRangka,
      id: user._id,
      token: user.token
    });

    let newJatuhTempo = new Date(tglJatuhTempo);
    let tempJatuhTempo =
      newJatuhTempo.getDate() +
      "-" +
      (newJatuhTempo.getMonth() + 1) +
      "-" +
      newJatuhTempo.getFullYear();
    let findMonth = (monthNumber) => {
      if (monthNumber === 1) {
        return "JANUARI";
      } else if (monthNumber === 2) {
        return "FEBRUARI";
      } else if (monthNumber === 3) {
        return "MARET";
      } else if (monthNumber === 4) {
        return "APRIL";
      } else if (monthNumber === 5) {
        return "MEI";
      } else if (monthNumber === 6) {
        return "JUNI";
      } else if (monthNumber === 7) {
        return "JULI";
      } else if (monthNumber === 8) {
        return "AGUSTUS";
      } else if (monthNumber === 9) {
        return "SEPTEMBER";
      } else if (monthNumber === 10) {
        return "OKTOBER";
      } else if (monthNumber === 11) {
        return "NOVEMBER";
      } else if (monthNumber === 12) {
        return "DESEMBER";
      }
    };
    let monthJatuhTempo = findMonth(newJatuhTempo.getMonth() + 1);
    var date = new Date();
    var current_date =
      date.getDate() +
      "-" +
      findMonth(date.getMonth() + 1) +
      "-" +
      date.getFullYear();
    let tempX1 = 220;
    let tempX2 = 60;
    let tempY = 29;
    const doc = new jsPDF("l", "mm", [270, 208]);
    doc.setFontSize(12);
    doc.text(`${noKwitansi}`, tempX1, tempY);
    tempY += 5;
    doc.text(
      `${idAngsuran} - ${namaRegister.split(" ", 1)[0]}`,
      tempX1,
      tempY + 3
    );
    tempY += 15;
    doc.text(`${namaRegister} / ${noJual}`, tempX2, tempY);
    tempY += 6.5;
    doc.text(`${almRegister}`, tempX2, tempY);
    tempY += 16;
    doc.setFont(undefined, "bold");
    doc.text(`${angkaTerbilang(totalBayar)} rupiah`, tempX2, tempY);
    doc.setFont(undefined, "normal");
    tempY += 12;
    doc.text(
      `ANGSURAN SEWA BELI 1 (satu) unit sepeda motor ${tempStok.data.merk}`,
      tempX2,
      tempY
    );
    tempY += 6.5;
    doc.text(
      `Warna : ${namaWarna}. ${nopol} / ${noRangka} - ${tipe} `,
      tempX2,
      tempY
    );
    tempY += 6.5;
    doc.text(
      `Angsuran Ke-${idAngsuran} (${angkaTerbilang(
        idAngsuran
      )}) Dari ${tenor} (${angkaTerbilang(tenor)}).`,
      tempX2,
      tempY
    );
    tempY += 6.5;
    doc.text(`Kontrak TGL. ${tempJatuhTempo}`, tempX2, tempY);
    tempY += 6.5;
    doc.text(
      `Untuk Angsuran Bulan ${monthJatuhTempo} ${newJatuhTempo.getFullYear()}`,
      tempX2,
      tempY
    );
    tempY += 36;
    doc.setFont(undefined, "bold");
    doc.text(`${totalBayar.toLocaleString()}`, tempX2 + 5, tempY);
    doc.setFont(undefined, "normal");
    doc.text(`${current_date}`, 185, tempY);
    tempY += 50;
    doc.text(`${namaRegister}`, tempX2 - 8, tempY);
    doc.text(`( ${user.username} )`, 185, tempY);
    doc.save(`kwitansiAngsuran.pdf`);
  };

  const saveAngsuran = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      // Update Jual
      const response = await axios.post(`${tempUrl}/jualByNoJual`, {
        noJual: id,
        id: user._id,
        token: user.token,
        kodeCabang: user.cabang._id
      });
      await axios.post(`${tempUrl}/updateJual/${response.data._id}`, {
        tglMdTerakhir: mdTerakhir,
        kodeCabang: user.cabang._id,
        id: user._id,
        token: user.token
      });
      // Update Angsuran
      await axios.post(`${tempUrl}/updateAngsuran/${mainId}`, {
        angsuranKe: idAngsuranChild - 1,
        _id: idAngsuranChild,
        tglJatuhTempo,
        angModal,
        angBunga,
        angPerBulan,
        tglBayar,
        kodeKolektor: kodeKolektor.split(" ", 1)[0],
        noKwitansi,
        keterangan,
        denda,
        potongan,
        jemputan,
        biayaTarik,
        hutangDenda,
        totalPiutang,
        totalBayar,
        bayar,
        md1,
        md2,
        md3,
        sp,
        st,
        id: user._id,
        token: user.token
      });
      setLoading(false);
      navigate(`/daftarAngsuran/angsuran/${id}`);
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
        <Box sx={downloadButtons}>
          <ButtonGroup variant="outlined" color="secondary">
            <Button
              startIcon={<PrintIcon />}
              onClick={() => downloadPdfCetakKwitansiAngsuran()}
            >
              CETAK KWITANSI
            </Button>
          </ButtonGroup>
        </Box>
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
              value={angModal.toLocaleString()}
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
              value={angBunga.toLocaleString()}
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
              value={angPerBulan.toLocaleString()}
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
        <Divider sx={dividerStyle} />
        <Box sx={textFieldContainer}>
          <Box sx={textFieldWrapper}>
            <Typography sx={labelInput}>Md1</Typography>
            <TextField
              type="date"
              size="small"
              id="outlined-basic"
              variant="outlined"
              value={md1}
              disabled={isDisabledMd1}
              onChange={(e) => {
                setMd1(e.target.value);
                setMdTerakhir(e.target.value);
              }}
            />
            <Typography sx={[labelInput, spacingTop]}>Md2</Typography>
            <TextField
              type="date"
              size="small"
              id="outlined-basic"
              variant="outlined"
              value={md2}
              disabled={isDisabledMd2}
              onChange={(e) => {
                setMd2(e.target.value);
                setMdTerakhir(e.target.value);
              }}
            />
            <Typography sx={[labelInput, spacingTop]}>Md3</Typography>
            <TextField
              type="date"
              size="small"
              id="outlined-basic"
              variant="outlined"
              value={md3}
              disabled={isDisabledMd3}
              onChange={(e) => {
                setMd3(e.target.value);
                setMdTerakhir(e.target.value);
              }}
            />
          </Box>
          <Box sx={[textFieldWrapper, secondWrapper]}>
            <Typography sx={labelInput}>SP</Typography>
            <TextField
              size="small"
              id="outlined-basic"
              variant="outlined"
              disabled
              value={sp}
              sx={{ backgroundColor: Colors.grey400 }}
            />
            <Typography sx={[labelInput, spacingTop]}>ST</Typography>
            <TextField
              size="small"
              id="outlined-basic"
              variant="outlined"
              disabled
              value={st}
              sx={{ backgroundColor: Colors.grey400 }}
            />
          </Box>
        </Box>
        <Box sx={spacingTop}>
          <Button
            variant="contained"
            startIcon={<SaveIcon />}
            onClick={saveAngsuran}
          >
            Simpan
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default TampilAngsuranChild;

const container = {
  p: 4
};

const subTitleText = {
  fontWeight: "900"
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

const downloadButtons = {
  mt: 4,
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "center"
};
