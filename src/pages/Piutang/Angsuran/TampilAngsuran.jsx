import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../../contexts/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";
import {
  namaPerusahaan,
  lokasiPerusahaan,
  kotaPerusahaan
} from "../../../constants/GeneralSetting";
import {
  Box,
  TextField,
  Typography,
  Divider,
  Pagination,
  Button,
  ButtonGroup
} from "@mui/material";
import { ShowTableAngsuran } from "../../../components/ShowTable";
import { Loader, usePagination } from "../../../components";
import { tempUrl } from "../../../contexts/ContextProvider";
import { useStateContext } from "../../../contexts/ContextProvider";
import DownloadIcon from "@mui/icons-material/Download";
import PrintIcon from "@mui/icons-material/Print";
import jsPDF from "jspdf";
import "jspdf-autotable";

const TampilAngsuran = () => {
  const { user, dispatch } = useContext(AuthContext);
  const location = useLocation();
  const id = location.pathname.split("/")[3];
  const { screenSize } = useStateContext();

  // Show Data Jual
  const [namaRegister, setNamaRegister] = useState("");
  const [noJual, setNoJual] = useState("");
  const [tanggalJual, setTanggalJual] = useState("");
  const [nopol, setNopol] = useState("");
  const [almRegister, setAlmRegister] = useState("");
  const [tipe, setTipe] = useState("");
  const [hargaTunai, setHargaTunai] = useState("");
  const [uangMuka, setUangMuka] = useState("");
  const [angPerBulan, setAngPerBulan] = useState("");
  const [tenor, setTenor] = useState("");
  const [jumlahPiutang, setJumlahPiutang] = useState("");
  const [tahun, setTahun] = useState("");
  const [namaWarna, setNamaWarna] = useState("");
  const [noRangka, setNoRangka] = useState("");
  const [noMesin, setNoMesin] = useState("");
  const [noRegister, setNoRegister] = useState("");
  const [tglAng, setTglAng] = useState("");
  const [tglAngAkhir, setTglAngAkhir] = useState("");
  const [modal, setModal] = useState("");
  const [bunga, setBunga] = useState("");
  const [angsurans, setAngsurans] = useState([]);
  const [angsuranTableRekap, setAngsuranTableRekap] = useState([]);
  const [angsuranTableRinci, setAngsuranTableRinci] = useState([]);
  const navigate = useNavigate();

  const columnsRekap = [
    { title: "Tgl. Bayar", field: "tglBayar" },
    { title: "TJ. Tempo", field: "tglJatuhTempo" },
    { title: "No. Kwitansi", field: "noKwitansi" },
    { title: "Ke", field: "_id" },
    { title: "Keterangan", field: "keterangan" },
    { title: "Bayar", field: "angPerBulan" },
    { title: "Saldo", field: "saldo" }
  ];

  const columnsRinci = [
    { title: "Tgl. Bayar", field: "tglBayar" },
    { title: "TJ. Tempo", field: "tglJatuhTempo" },
    { title: "No. Kwitansi", field: "noKwitansi" },
    { title: "Ke", field: "_id" },
    { title: "A. Modal", field: "angModal" },
    { title: "Saldo", field: "modal" },
    { title: "A. Bunga", field: "angBunga" },
    { title: "Saldo", field: "bunga" },
    { title: "Bayar", field: "angPerBulan" },
    { title: "Saldo", field: "saldo" }
  ];

  const [loading, setLoading] = useState(false);
  let [page, setPage] = useState(1);
  const PER_PAGE = 20;

  // Get current posts
  const indexOfLastPost = page * PER_PAGE;
  const indexOfFirstPost = indexOfLastPost - PER_PAGE;
  const currentPosts = angsurans.slice(indexOfFirstPost, indexOfLastPost);

  const count = Math.ceil(angsurans.length / PER_PAGE);
  const _DATA = usePagination(angsurans, PER_PAGE);

  const handleChange = (e, p) => {
    setPage(p);
    _DATA.jump(p);
  };

  useEffect(() => {
    getAngsuran();
    getAngsuranRekap();
    getAngsuranRinci();
    id && getUserById();
  }, [id]);

  const getAngsuran = async () => {
    setLoading(true);
    const response = await axios.post(`${tempUrl}/angsuransByNoJual`, {
      noJual: id,
      id: user._id,
      token: user.token,
      kodeUnitBisnis: user.unitBisnis._id,
      kodeCabang: user.cabang._id
    });
    setAngsurans(response.data.angsuran);
    setModal(response.data.angsuran[0].angModal * response.data.tenor);
    setBunga(response.data.angsuran[0].angBunga * response.data.tenor);
    setLoading(false);
  };

  const getAngsuranRekap = async () => {
    setLoading(true);
    const response = await axios.post(`${tempUrl}/angsuransByNoJualRekap`, {
      noJual: id,
      id: user._id,
      token: user.token,
      kodeUnitBisnis: user.unitBisnis._id,
      kodeCabang: user.cabang._id
    });
    setAngsuranTableRekap(response.data);
    setLoading(false);
  };

  const getAngsuranRinci = async () => {
    setLoading(true);
    const response = await axios.post(`${tempUrl}/angsuransByNoJualRinci`, {
      noJual: id,
      id: user._id,
      token: user.token,
      kodeUnitBisnis: user.unitBisnis._id,
      kodeCabang: user.cabang._id
    });
    setAngsuranTableRinci(response.data);
    setLoading(false);
  };

  const getUserById = async () => {
    if (id) {
      const response = await axios.post(`${tempUrl}/jualsByNoJual`, {
        noJual: id,
        id: user._id,
        token: user.token,
        kodeUnitBisnis: user.unitBisnis._id,
        kodeCabang: user.cabang._id
      });
      setNamaRegister(response.data.namaRegister);
      setNoJual(response.data.noJual);
      setTanggalJual(response.data.tglAng);
      setNopol(response.data.nopol);
      setAlmRegister(response.data.almRegister);
      setTipe(response.data.tipe);
      setHargaTunai(response.data.hargaTunai);
      setUangMuka(response.data.uangMuka);
      setAngPerBulan(response.data.angPerBulan);
      setTenor(response.data.tenor);
      setJumlahPiutang(response.data.jumlahPiutang);
      setTahun(response.data.tahun);
      setNamaWarna(response.data.namaWarna);
      setNoRangka(response.data.noRangka);
      setNoMesin(response.data.noMesin);
      setNoRegister(response.data.noRegister);
      setTglAng(response.data.tglAng);
      setTglAngAkhir(response.data.tglAngAkhir);
    }
  };

  const downloadPdfRekap = () => {
    var date = new Date();
    var current_date =
      date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear();
    var current_time =
      date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
    const doc = new jsPDF();
    doc.setFontSize(12);
    doc.text(`${namaPerusahaan} - ${kotaPerusahaan}`, 15, 10);
    doc.text(`${lokasiPerusahaan}`, 15, 15);
    doc.setFontSize(16);
    doc.text(`Kartu Kredit Rekap`, 85, 30);
    doc.setFontSize(10);
    doc.text(`Nama               : ${namaRegister}`, 15, 40);
    doc.text(`Tipe                    : ${tipe}`, 120, 40);
    doc.text(`Alamat              : ${almRegister.substring(0, 30)}`, 15, 45);
    doc.text(`No. Rangka        : ${noRangka}`, 120, 45);
    doc.text(`Tgl. kontrak      : ${tanggalJual}`, 15, 50);
    doc.text(`No. Mesin           : ${noMesin}`, 120, 50);
    doc.text(`Harga Tunai     : ${hargaTunai.toLocaleString()}`, 15, 55);
    doc.text(`Nopol                  : ${nopol}`, 120, 55);
    doc.text(`Uang Muka       : ${uangMuka.toLocaleString()}`, 15, 60);
    doc.text(`No. Kontrak        : ${noRegister}`, 120, 60);
    doc.text(
      `Angs / Bulan    : ${angPerBulan.toLocaleString()} / ${tenor}`,
      15,
      65
    );
    doc.text(`Tgl. Angs. I         : ${tglAng}`, 120, 65);
    doc.text(`Jml. Piutang    : ${jumlahPiutang.toLocaleString()}`, 15, 70);
    doc.text(`Tgl. Angs. Akhir  : ${tglAngAkhir}`, 120, 70);
    doc.text(`Thn / Warna     : ${tahun} / ${namaWarna}`, 15, 75);
    doc.text(
      `Dicetak Oleh: ${user.username} | Tanggal : ${current_date} | Jam : ${current_time}`,
      15,
      280
    );
    doc.setFontSize(12);
    doc.autoTable({
      margin: { top: 80 },
      columns: columnsRekap.map((col) => ({ ...col, dataKey: col.field })),
      body: angsuranTableRekap,
      headStyles: {
        fillColor: [117, 117, 117],
        color: [0, 0, 0]
      }
    });
    doc.save(`kartuKreditRekap.pdf`);
  };

  const downloadPdfRinci = () => {
    var date = new Date();
    var current_date =
      date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear();
    var current_time =
      date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
    const doc = new jsPDF("l", "mm", [280, 210]);
    doc.setFontSize(12);
    doc.text(`${namaPerusahaan} - ${kotaPerusahaan}`, 15, 10);
    doc.text(`${lokasiPerusahaan}`, 15, 15);
    doc.setFontSize(16);
    doc.text(`Kartu Kredit Rinci`, 120, 30);
    doc.setFontSize(10);
    doc.text(`Nama               : ${namaRegister}`, 15, 40);
    doc.text(`Tipe                    : ${tipe}`, 120, 40);
    doc.text(`Alamat              : ${almRegister.substring(0, 30)}`, 15, 45);
    doc.text(`No. Rangka        : ${noRangka}`, 120, 45);
    doc.text(`Tgl. kontrak      : ${tanggalJual}`, 15, 50);
    doc.text(`No. Mesin           : ${noMesin}`, 120, 50);
    doc.text(`Harga Tunai     : ${hargaTunai.toLocaleString()}`, 15, 55);
    doc.text(`Nopol                  : ${nopol}`, 120, 55);
    doc.text(`Uang Muka       : ${uangMuka.toLocaleString()}`, 15, 60);
    doc.text(`No. Kontrak        : ${noRegister}`, 120, 60);
    doc.text(
      `Angs / Bulan     : ${angPerBulan.toLocaleString()} / ${tenor}`,
      15,
      65
    );
    doc.text(`Tgl. Angs. I         : ${tglAng}`, 120, 65);
    doc.text(`Jml. Piutang     : ${jumlahPiutang.toLocaleString()}`, 15, 70);
    doc.text(`Tgl. Angs. Akhir  : ${tglAngAkhir}`, 120, 70);
    doc.text(`Thn / Warna     : ${tahun} / ${namaWarna}`, 15, 75);
    doc.text(`Modal              : ${modal.toLocaleString()}`, 15, 80);
    doc.text(`Bunga              : ${bunga.toLocaleString()}`, 15, 85);
    doc.text(
      `Dicetak Oleh: ${user.username} | Tanggal : ${current_date} | Jam : ${current_time}`,
      15,
      280
    );
    doc.setFontSize(12);
    doc.autoTable({
      margin: { top: 90 },
      columns: columnsRinci.map((col) => ({ ...col, dataKey: col.field })),
      body: angsuranTableRinci,
      headStyles: {
        fillColor: [117, 117, 117],
        color: [0, 0, 0]
      }
    });
    doc.save(`kartuKreditRinci.pdf`);
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <Button
        variant="outlined"
        color="secondary"
        onClick={() => navigate("/daftarAngsuran")}
        sx={{ marginLeft: 2, marginTop: 4 }}
      >
        {"< Kembali"}
      </Button>
      <Box sx={downloadButtons}>
        <ButtonGroup variant="outlined" color="secondary">
          <Button startIcon={<PrintIcon />} onClick={() => downloadPdfRekap()}>
            Rekap
          </Button>
          <Button
            startIcon={<DownloadIcon />}
            onClick={() => downloadPdfRinci()}
          >
            Rinci
          </Button>
        </ButtonGroup>
      </Box>
      <Box sx={container}>
        <Typography color="#757575">Piutang</Typography>
        <Typography variant="h4" sx={subTitleText}>
          Angsuran
        </Typography>
        <Divider sx={[dividerStyle, { marginBottom: 2 }]} />
        <Box sx={textFieldContainer}>
          <Box sx={textFieldWrapper}>
            <Typography sx={labelInput}>Nama Register</Typography>
            <TextField
              size="small"
              id="outlined-basic"
              variant="filled"
              InputProps={{
                readOnly: true
              }}
              value={namaRegister}
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
          </Box>
          <Box sx={[textFieldWrapper, secondWrapper]}>
            <Typography sx={labelInput}>Nopol</Typography>
            <TextField
              size="small"
              id="outlined-basic"
              variant="filled"
              InputProps={{
                readOnly: true
              }}
              value={nopol}
            />
            <Typography sx={[labelInput, spacingTop]}>Alamat</Typography>
            <TextField
              size="small"
              id="outlined-basic"
              variant="filled"
              InputProps={{
                readOnly: true
              }}
              value={almRegister}
            />
            <Typography sx={[labelInput, spacingTop]}>Tipe</Typography>
            <TextField
              size="small"
              id="outlined-basic"
              variant="filled"
              InputProps={{
                readOnly: true
              }}
              value={tipe}
            />
          </Box>
        </Box>
        <Divider sx={dividerStyle} />
        <Box sx={tableContainer}>
          <ShowTableAngsuran id={id} currentPosts={currentPosts} />
        </Box>
        <Box sx={tableContainer}>
          <Pagination
            count={count}
            page={page}
            onChange={handleChange}
            color="primary"
            size={screenSize <= 600 ? "small" : "large"}
          />
        </Box>
      </Box>
    </>
  );
};

export default TampilAngsuran;

const container = {
  p: 4
};

const subTitleText = {
  fontWeight: "900"
};

const buttonModifierContainer = {
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

const tableContainer = {
  pt: 4,
  display: "flex",
  justifyContent: "center"
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
