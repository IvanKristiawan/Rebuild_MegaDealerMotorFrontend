import React, { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../../contexts/AuthContext";
import {
  namaPerusahaan,
  lokasiPerusahaan,
  kotaPerusahaan,
  lokasiSP
} from "../../../constants/GeneralSetting";
import { tempUrl } from "../../../contexts/ContextProvider";
import { Loader } from "../../../components";
import { Box, Typography, TextField, Button, Divider } from "@mui/material";
import PrintIcon from "@mui/icons-material/Print";
import jsPDF from "jspdf";
import "jspdf-autotable";

const CariPenerimaanKas = () => {
  const { user } = useContext(AuthContext);
  let curr = new Date();
  let date = curr.toISOString().substring(0, 10);
  const [userInput, setUserInput] = useState("");
  const [dariTgl, setDariTgl] = useState(date);
  const [sampaiTgl, setSampaiTgl] = useState(date);

  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const columns = [
    { title: "No", field: "no" },
    { title: "Kwitansi", field: "noKwitansi" },
    { title: "Keterangan", field: "keterangan" },
    { title: "U.Muka", field: "uangMukaDoc" },
    { title: "A.Modal", field: "angModalDoc" },
    { title: "A.Bunga", field: "angBungaDoc" },
    { title: "Denda", field: "dendaDoc" },
    { title: "Jemputan", field: "jemputanDoc" },
    { title: "BI.Tarik", field: "biayaTarikDoc" },
    { title: "Total", field: "bayarDoc" }
  ];

  const downloadPdf = async () => {
    const response = await axios.post(`${tempUrl}/angsuransForPenerimaanKas`, {
      userInput,
      dariTgl,
      sampaiTgl,
      id: user._id,
      token: user.token,
      kodeUnitBisnis: user.unitBisnis._id,
      kodeCabang: user.cabang._id
    });

    let tempTotalUMuka = 0;
    let tempTotalAModal = 0;
    let tempTotalABunga = 0;
    let tempTotalDenda = 0;
    let tempTotalJemputan = 0;
    let tempTotalBiTarik = 0;
    let tempTotal = 0;
    let tempHeight = 50;
    var date = new Date();
    var current_date =
      date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear();
    var current_time =
      date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
    const doc = new jsPDF("l", "mm", [400, 210]);
    doc.setFontSize(12);
    doc.text(
      `Dicetak Oleh: ${user.username} | Tanggal : ${current_date} | Jam : ${current_time}`,
      15,
      200
    );
    doc.setFontSize(12);
    doc.text(`${namaPerusahaan} - ${kotaPerusahaan}`, 15, 10);
    doc.text(`${lokasiPerusahaan}`, 15, 15);
    doc.setFontSize(16);
    doc.text(`Laporan Penerimaan Kas`, 180, 30);
    doc.setFontSize(10);
    doc.text(`Dari Tanggal : ${dariTgl} s/d ${sampaiTgl}`, 15, 35);
    doc.text(`Periode : `, 15, 40);
    doc.setFontSize(12);
    doc.autoTable({
      margin: { top: 50 },
      columns: columns.map((col) => ({ ...col, dataKey: col.field })),
      body: response.data,
      headStyles: {
        fillColor: [117, 117, 117],
        color: [0, 0, 0]
      },
      didDrawPage: (d) => {
        tempHeight = d.cursor.y;
      },
      columnStyles: {
        0: { cellWidth: 10 },
        1: { cellWidth: 25 },
        2: { cellWidth: 120 },
        3: { cellWidth: 30 },
        4: { cellWidth: 30 },
        5: { cellWidth: 30 },
        6: { cellWidth: 30 },
        7: { cellWidth: 30 },
        8: { cellWidth: 30 },
        9: { cellWidth: 30 },
        10: { cellWidth: 30 }
        // etc
      }
    });
    response.data.map((val) => {
      tempTotalUMuka += val.uangMuka;
      tempTotalAModal += val.angModal;
      tempTotalABunga += val.angBunga;
      tempTotalDenda += val.denda;
      tempTotalJemputan += val.jemputan;
      tempTotalBiTarik += val.biayaTarik;
      tempTotal += val.bayar;
    });
    doc.setDrawColor(0, 0, 0);
    doc.setFontSize(10);
    tempHeight += 2;
    doc.line(15, tempHeight, 380, tempHeight);
    tempHeight += 6;
    doc.text(`TOTAL : `, 15, tempHeight);
    doc.text(`${tempTotalUMuka.toLocaleString()}`, 170, tempHeight);
    doc.text(`${tempTotalAModal.toLocaleString()}`, 200, tempHeight);
    doc.text(`${tempTotalABunga.toLocaleString()}`, 230, tempHeight);
    doc.text(`${tempTotalDenda.toLocaleString()}`, 260, tempHeight);
    doc.text(`${tempTotalJemputan.toLocaleString()}`, 290, tempHeight);
    doc.text(`${tempTotalBiTarik.toLocaleString()}`, 320, tempHeight);
    doc.text(`${tempTotal.toLocaleString()}`, 350, tempHeight);
    tempHeight += 4;
    doc.line(15, tempHeight, 380, tempHeight);
    tempHeight += 12;
    doc.text(`Mengetahui,`, 80, tempHeight);
    doc.text(`${lokasiSP}, ${current_date}`, 290, tempHeight);
    doc.text(`Dibuat Oleh,`, 300, tempHeight + 6);
    tempHeight += 30;
    doc.line(60, tempHeight, 120, tempHeight);
    doc.line(280, tempHeight, 340, tempHeight);
    tempHeight += 6;
    doc.text(`${user.username}`, 80, tempHeight);
    doc.text(`SPV`, 307, tempHeight);
    doc.save(`laporanPenerimaanKas.pdf`);
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <Box sx={container}>
      <Typography color="#757575">Laporan</Typography>
      <Typography variant="h4" sx={subTitleText}>
        Cari Penerimaan Kas
      </Typography>
      <Divider sx={dividerStyle} />
      <Box sx={showDataWrapper}>
        <Typography sx={[labelInput, spacingTop]}>Kasir</Typography>
        <TextField
          size="small"
          error={error && userInput.length === 0 && true}
          helperText={error && userInput.length === 0 && "Kasir harus diisi!"}
          id="outlined-basic"
          variant="outlined"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value.toUpperCase())}
        />
        <Typography sx={[labelInput, spacingTop]}>Dari Tanggal</Typography>
        <TextField
          type="date"
          size="small"
          error={error && dariTgl.length === 0 && true}
          helperText={
            error && dariTgl.length === 0 && "Dari Tanggal harus diisi!"
          }
          id="outlined-basic"
          variant="outlined"
          value={dariTgl}
          onChange={(e) => setDariTgl(e.target.value)}
        />
        <Typography sx={[labelInput, spacingTop]}>Sampai Tanggal</Typography>
        <TextField
          type="date"
          size="small"
          error={error && sampaiTgl.length === 0 && true}
          helperText={
            error && sampaiTgl.length === 0 && "Sampai Tanggal harus diisi!"
          }
          id="outlined-basic"
          variant="outlined"
          value={sampaiTgl}
          onChange={(e) => setSampaiTgl(e.target.value)}
        />
      </Box>
      <Box sx={spacingTop}>
        <Button
          variant="contained"
          startIcon={<PrintIcon />}
          onClick={() => downloadPdf()}
        >
          CETAK
        </Button>
      </Box>
    </Box>
  );
};

export default CariPenerimaanKas;

const container = {
  p: 4
};

const subTitleText = {
  fontWeight: "900"
};

const dividerStyle = {
  mt: 2
};

const spacingTop = {
  mt: 4
};

const labelInput = {
  fontWeight: "600",
  marginLeft: 1
};

const showDataWrapper = {
  display: "flex",
  flex: 1,
  flexDirection: "column",
  maxWidth: {
    md: "40vw"
  }
};
