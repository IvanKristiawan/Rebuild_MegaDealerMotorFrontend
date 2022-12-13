import React, { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../../contexts/AuthContext";
import {
  namaPerusahaan,
  lokasiPerusahaan,
  kotaPerusahaan
} from "../../../constants/GeneralSetting";
import { tempUrl } from "../../../contexts/ContextProvider";
import { Loader } from "../../../components";
import { Box, Typography, Button, Divider, TextField } from "@mui/material";
import PrintIcon from "@mui/icons-material/Print";
import jsPDF from "jspdf";
import "jspdf-autotable";

const RekapPenerimaan = () => {
  const { user } = useContext(AuthContext);
  let curr = new Date();
  let date = curr.toISOString().substring(0, 10);
  const [dariTgl, setDariTgl] = useState(date);
  const [sampaiTgl, setSampaiTgl] = useState(date);

  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const downloadPdf = async () => {
    let getPenjualanPerCabang;
    const response = await axios.post(`${tempUrl}/cabangs`, {
      id: user._id,
      token: user.token
    });

    let y = 55;
    let total = 0;
    let totalAll = 0;
    let totalPenjualanTunai = 0,
      totalUangMuka = 0,
      totalAngModal = 0,
      totalAngBunga = 0;
    let totalDenda = 0,
      totalBiayaTarik = 0;
    let yCount = 0;
    let yTenor = 0;

    var date = new Date();
    var current_date =
      date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear();
    var current_time =
      date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
    const doc = new jsPDF("l", "mm", [380, 210]);
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
    doc.text(`Laporan Rekap Penerimaan`, 160, 30);
    doc.setFontSize(10);
    let tempDariTgl = new Date(dariTgl);
    let tempYearDariTgl = tempDariTgl.getFullYear();
    let tempMonthDariTgl = tempDariTgl.getMonth() + 1;
    let tempDayDariTgl = tempDariTgl.getDate();
    doc.text(
      `Dari Tanggal : ${`${tempYearDariTgl}-${tempMonthDariTgl}-${tempDayDariTgl}`} s/d ${sampaiTgl}`,
      15,
      40
    );
    doc.text(`Periode : `, 15, 45);
    doc.line(15, y, 360, y);
    y += 5;
    doc.text(`Cabang`, 38, y + 8);
    doc.text(`Penerimaan`, 190, y);
    doc.text(`Total`, 330, y + 8);
    y += 10;
    doc.line(15, y, 360, y);
    yTenor = y;
    yCount = y;
    // Loop
    for (let i = 0; i < response.data.length; i++) {
      y += 8;
      getPenjualanPerCabang = await axios.post(
        `${tempUrl}/angsuransForRekapPenerimaan`,
        {
          dariTgl,
          sampaiTgl,
          id: user._id,
          token: user.token,
          kodeCabang: response.data[i]._id
        }
      );

      totalPenjualanTunai += getPenjualanPerCabang.data[0].penjualanTunai;
      doc.text(
        `${getPenjualanPerCabang.data[0].penjualanTunaiDoc}`,
        87.5,
        y - 2
      );

      totalUangMuka += getPenjualanPerCabang.data[0].uangMuka;
      doc.text(`${getPenjualanPerCabang.data[0].uangMukaDoc}`, 127.5, y - 2);

      totalAngModal += getPenjualanPerCabang.data[0].angModal;
      doc.text(`${getPenjualanPerCabang.data[0].angModalDoc}`, 167.5, y - 2);

      totalAngBunga += getPenjualanPerCabang.data[0].angBunga;
      doc.text(`${getPenjualanPerCabang.data[0].angBungaDoc}`, 207.5, y - 2);

      totalDenda += getPenjualanPerCabang.data[0].denda;
      doc.text(`${getPenjualanPerCabang.data[0].dendaDoc}`, 247.5, y - 2);

      totalBiayaTarik += getPenjualanPerCabang.data[0].biayaTarik;
      doc.text(`${getPenjualanPerCabang.data[0].biayaTarikDoc}`, 287.5, y - 2);

      for (let k = 0; k < getPenjualanPerCabang.data.length; k++) {
        total +=
          getPenjualanPerCabang.data[k].penjualanTunai +
          getPenjualanPerCabang.data[k].uangMuka +
          getPenjualanPerCabang.data[k].angModal +
          getPenjualanPerCabang.data[k].angBunga +
          getPenjualanPerCabang.data[k].denda +
          getPenjualanPerCabang.data[k].biayaTarik;
        totalAll +=
          getPenjualanPerCabang.data[k].penjualanTunai +
          getPenjualanPerCabang.data[k].uangMuka +
          getPenjualanPerCabang.data[k].angModal +
          getPenjualanPerCabang.data[k].angBunga +
          getPenjualanPerCabang.data[k].denda +
          getPenjualanPerCabang.data[k].biayaTarik;
      }
      doc.text(`${total.toLocaleString()}`, 325, y - 2);

      doc.text(`Cabang ${response.data[i]._id}`, 20, y - 2);
      doc.line(15, y, 360, y);
      total = 0;
    }
    y += 8;
    doc.setFont(undefined, "bold");
    doc.text(`TOTAL : `, 18, y - 2);
    doc.setFont(undefined, "normal");
    doc.text(`${totalAll.toLocaleString()}`, 325, y - 2);
    // Vertical Line
    doc.line(15, 55, 15, y);
    doc.line(80, 55, 80, y);
    doc.line(80, yTenor - 7, 360, yTenor - 7); // 1
    doc.text(`Penjualan Tunai`, 87.5, yTenor - 2);
    doc.text(`${totalPenjualanTunai.toLocaleString()}`, 87.5, y - 2);
    doc.line(120.5, yTenor - 7, 120.5, y); // 2
    doc.text(`Uang Muka`, 130.5, yTenor - 2);
    doc.text(`${totalUangMuka.toLocaleString()}`, 127.5, y - 2);
    doc.line(160, yTenor - 7, 160, y); // 3
    doc.text(`Angsuran Pokok`, 167.5, yTenor - 2);
    doc.text(`${totalAngModal.toLocaleString()}`, 167.5, y - 2);
    doc.line(200.5, yTenor - 7, 200.5, y); // 4
    doc.text(`Bunga`, 213.5, yTenor - 2);
    doc.text(`${totalAngBunga.toLocaleString()}`, 207.5, y - 2);
    doc.line(240, yTenor - 7, 240, y); // 5
    doc.text(`Denda`, 253.5, yTenor - 2);
    doc.text(`${totalDenda.toLocaleString()}`, 247.5, y - 2);
    doc.line(280.5, yTenor - 7, 280.5, y); // 6
    doc.text(`Biaya Tarik`, 290.5, yTenor - 2);
    doc.text(`${totalBiayaTarik.toLocaleString()}`, 287.5, y - 2);
    doc.line(320, 55, 320, y); // Last Vertical Line
    doc.line(360, 55, 360, y);
    doc.line(15, y, 360, y);
    doc.save(`laporanRekapPenerimaan.pdf`);
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <Box sx={container}>
      <Typography color="#757575">Laporan</Typography>
      <Typography variant="h4" sx={subTitleText}>
        Laporan Rekap Penerimaan
      </Typography>
      <Divider sx={dividerStyle} />
      <Box sx={showDataWrapper}>
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

export default RekapPenerimaan;

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
