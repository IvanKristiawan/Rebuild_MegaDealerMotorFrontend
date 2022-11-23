import React, { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../../../contexts/AuthContext";
import {
  namaPerusahaan,
  lokasiPerusahaan,
  kotaPerusahaan,
  lokasiSP
} from "../../../../constants/GeneralSetting";
import { tempUrl } from "../../../../contexts/ContextProvider";
import { Loader } from "../../../../components";
import {
  Box,
  Typography,
  TextField,
  Button,
  Divider,
  ButtonGroup
} from "@mui/material";
import PrintIcon from "@mui/icons-material/Print";
import jsPDF from "jspdf";
import "jspdf-autotable";

const CariLapPenjualanPerMarketing = () => {
  const { user } = useContext(AuthContext);
  let curr = new Date();
  let date = curr.toISOString().substring(0, 10);
  const [dariTgl, setDariTgl] = useState(date);
  const [sampaiTgl, setSampaiTgl] = useState(date);

  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const columns = [
    { title: "No", field: "no" },
    { title: "Kode", field: "kodeMarketing" },
    { title: "Nama Marketing", field: "namaMarketing" },
    { title: "Jumlah", field: "total" },
    { title: "%", field: "persen" }
  ];

  const downloadPdfRekap = async () => {
    const response = await axios.post(
      `${tempUrl}/jualsForLaporanPenjualanByMarketingRekap`,
      {
        dariTgl,
        sampaiTgl,
        id: user._id,
        token: user.token,
        kodeUnitBisnis: user.unitBisnis._id,
        kodeCabang: user.cabang._id
      }
    );

    let tempTotal = 0;
    let tempHeight = 50;
    var date = new Date();
    var current_date =
      date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear();
    var current_time =
      date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
    const doc = new jsPDF();
    doc.setFontSize(12);
    doc.text(
      `Dicetak Oleh: ${user.username} | Tanggal : ${current_date} | Jam : ${current_time}`,
      15,
      280
    );
    doc.setFontSize(12);
    doc.text(`${namaPerusahaan} - ${kotaPerusahaan}`, 15, 10);
    doc.text(`${lokasiPerusahaan}`, 15, 15);
    doc.setFontSize(16);
    doc.text(`Laporan Penjualan Per Marketing Rekap`, 60, 30);
    doc.setFontSize(10);
    doc.text(`Dari Tanggal : ${dariTgl} s/d ${sampaiTgl}`, 15, 40);
    doc.text(`Periode : `, 15, 45);
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
        1: { cellWidth: 50 },
        2: { cellWidth: 80 },
        3: { cellWidth: 20 },
        4: { cellWidth: 20 }
        // etc
      }
    });
    response.data.map((val) => {
      tempTotal += val.total;
    });
    doc.setDrawColor(0, 0, 0);
    doc.setFontSize(10);
    tempHeight += 2;
    doc.line(15, tempHeight, 195, tempHeight);
    tempHeight += 6;
    doc.text(`TOTAL : `, 15, tempHeight);
    doc.text(`${tempTotal}`, 155, tempHeight);
    doc.text(`100`, 175, tempHeight);
    tempHeight += 4;
    doc.line(15, tempHeight, 195, tempHeight);
    doc.save(`laporanPenjualanPerMarketingRekap.pdf`);
  };

  const downloadPdfRinci = async () => {
    const response = await axios.post(
      `${tempUrl}/jualsForLaporanPenjualanByMarketingRinci`,
      {
        dariTgl,
        sampaiTgl,
        id: user._id,
        token: user.token,
        kodeUnitBisnis: user.unitBisnis._id,
        kodeCabang: user.cabang._id
      }
    );

    let y = 55;
    let total = 0;
    let totalValue = 0;
    let total0 = 0;
    let total3 = 0;
    let total4 = 0;
    let total5 = 0;
    let total6 = 0;
    let total7 = 0;
    let total8 = 0;
    let total9 = 0;
    let total10 = 0;
    let total11 = 0;
    let total12 = 0;
    let total15 = 0;
    let total16 = 0;
    let total17 = 0;
    let total18 = 0;
    let total21 = 0;
    let total24 = 0;
    let yCount = 0;
    let yTenor = 0;
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
    doc.text(`Laporan Penjualan Per Marketing Rinci`, 170, 30);
    doc.setFontSize(10);
    doc.text(`Dari Tanggal : ${dariTgl} s/d ${sampaiTgl}`, 15, 40);
    doc.text(`Periode : `, 15, 45);
    doc.line(15, y, 380, y);
    y += 5;
    doc.text(`Marketing`, 38, y + 8);
    doc.text(`Tenor (Bulan)`, 180, y);
    doc.text(`Total`, 306, y + 8);
    doc.text(`Value`, 350, y + 8);
    y += 10;
    doc.line(15, y, 380, y);
    yTenor = y;
    yCount = y;
    for (let i = 0; i < response.data.length; i++) {
      y += 8;
      totalValue += response.data[i].hargaTunai;
      total += response.data[i].total;
      doc.text(
        `${response.data[i].kodeMarketing} - ${response.data[i].namaMarketing}`,
        20,
        y - 2
      );
      doc.text(`${response.data[i].total}`, 310, y - 2);
      doc.text(`${response.data[i].hargaTunaiDoc}`, 347, y - 2);
      doc.line(15, y, 380, y);

      for (let name in response.data[i].allTenor) {
        let value = response.data[i].allTenor[name];
        if (name === "0") {
          total0 += 1;
          doc.text(`${value}`, 85.5, y - 2);
        }
      }

      for (let name in response.data[i].allTenor) {
        let value = response.data[i].allTenor[name];
        if (name === "3") {
          total3 += 1;
          doc.text(`${value}`, 97.5, y - 2);
        }
      }

      for (let name in response.data[i].allTenor) {
        let value = response.data[i].allTenor[name];
        if (name === "4") {
          total4 += 1;
          doc.text(`${value}`, 110.5, y - 2);
        }
      }

      for (let name in response.data[i].allTenor) {
        let value = response.data[i].allTenor[name];
        if (name === "5") {
          total5 += 1;
          doc.text(`${value}`, 122.5, y - 2);
        }
      }

      for (let name in response.data[i].allTenor) {
        let value = response.data[i].allTenor[name];
        if (name === "6") {
          // yCount += 8;
          total6 += 1;
          doc.text(`${value}`, 135.5, y - 2);
        }
      }

      for (let name in response.data[i].allTenor) {
        let value = response.data[i].allTenor[name];
        if (name === "7") {
          total7 += 1;
          doc.text(`${value}`, 147.5, y - 2);
        }
      }

      for (let name in response.data[i].allTenor) {
        let value = response.data[i].allTenor[name];
        if (name === "8") {
          total8 += 1;
          doc.text(`${value}`, 160.5, y - 2);
        }
      }

      for (let name in response.data[i].allTenor) {
        let value = response.data[i].allTenor[name];
        if (name === "9") {
          total9 += 1;
          doc.text(`${value}`, 171.5, y - 2);
        }
      }

      for (let name in response.data[i].allTenor) {
        let value = response.data[i].allTenor[name];
        if (name === "10") {
          total10 += 1;
          doc.text(`${value}`, 184.5, y - 2);
        }
      }

      for (let name in response.data[i].allTenor) {
        let value = response.data[i].allTenor[name];
        if (name === "11") {
          total11 += 1;
          doc.text(`${value}`, 196.5, y - 2);
        }
      }

      for (let name in response.data[i].allTenor) {
        let value = response.data[i].allTenor[name];
        if (name === "12") {
          // yCount += 8;
          total12 += 1;
          doc.text(`${value}`, 209.5, y - 2);
        }
      }

      for (let name in response.data[i].allTenor) {
        let value = response.data[i].allTenor[name];
        if (name === "15") {
          total15 += 1;
          doc.text(`${value}`, 221.5, y - 2);
        }
      }

      for (let name in response.data[i].allTenor) {
        let value = response.data[i].allTenor[name];
        if (name === "16") {
          total16 += 1;
          doc.text(`${value}`, 234.5, y - 2);
        }
      }

      for (let name in response.data[i].allTenor) {
        let value = response.data[i].allTenor[name];
        if (name === "17") {
          total17 += 1;
          doc.text(`${value}`, 246.5, y - 2);
        }
      }

      for (let name in response.data[i].allTenor) {
        let value = response.data[i].allTenor[name];
        if (name === "18") {
          total18 += 1;
          doc.text(`${value}`, 259.5, y - 2);
        }
      }

      for (let name in response.data[i].allTenor) {
        let value = response.data[i].allTenor[name];
        if (name === "21") {
          total21 += 1;
          doc.text(`${value}`, 271.5, y - 2);
        }
      }

      for (let name in response.data[i].allTenor) {
        let value = response.data[i].allTenor[name];
        if (name === "24") {
          total24 += 1;
          doc.text(`${value}`, 284, y - 2);
        }
      }
    }
    y += 8;
    doc.setFont(undefined, "bold");
    doc.text(`TOTAL : `, 18, y - 2);
    doc.setFont(undefined, "normal");
    doc.text(`${total}`, 310, y - 2);
    doc.text(`${totalValue.toLocaleString()}`, 347, y - 2);
    // Vertical Line
    doc.line(15, 55, 15, y);
    doc.line(80, 55, 80, y);
    doc.line(80, yTenor - 7, 292.5, yTenor - 7); // 1
    doc.text(`0`, 85.5, yTenor - 2);
    doc.text(`${total0}`, 85.5, y - 2);
    doc.line(92.5, yTenor - 7, 92.5, y); // 2
    doc.text(`3`, 97.5, yTenor - 2);
    doc.text(`${total3}`, 97.5, y - 2);
    doc.line(105, yTenor - 7, 105, y); // 3
    doc.text(`4`, 110.5, yTenor - 2);
    doc.text(`${total4}`, 110.5, y - 2);
    doc.line(117.5, yTenor - 7, 117.5, y); // 4
    doc.text(`5`, 122.5, yTenor - 2);
    doc.text(`${total5}`, 122.5, y - 2);
    doc.line(130, yTenor - 7, 130, y); // 5
    doc.text(`6`, 135.5, yTenor - 2);
    doc.text(`${total6}`, 135.5, y - 2);
    doc.line(142.5, yTenor - 7, 142.5, y); // 6
    doc.text(`7`, 147.5, yTenor - 2);
    doc.text(`${total7}`, 147.5, y - 2);
    doc.line(155, yTenor - 7, 155, y); // 7
    doc.text(`8`, 160.5, yTenor - 2);
    doc.text(`${total8}`, 160.5, y - 2);
    doc.line(167.5, yTenor - 7, 167.5, y); // 8
    doc.text(`9`, 171.5, yTenor - 2);
    doc.text(`${total9}`, 171.5, y - 2);
    doc.line(180, yTenor - 7, 180, y); // 9
    doc.text(`10`, 184.5, yTenor - 2);
    doc.text(`${total10}`, 184.5, y - 2);
    doc.line(192.5, yTenor - 7, 192.5, y); // 10
    doc.text(`11`, 196.5, yTenor - 2);
    doc.text(`${total11}`, 196.5, y - 2);
    doc.line(205, yTenor - 7, 205, y); // 11
    doc.text(`12`, 209.5, yTenor - 2);
    doc.text(`${total12}`, 209.5, y - 2);
    doc.line(217.5, yTenor - 7, 217.5, y); // 12
    doc.text(`15`, 221.5, yTenor - 2);
    doc.text(`${total15}`, 221.5, y - 2);
    doc.line(230, yTenor - 7, 230, y); // 13
    doc.text(`16`, 234.5, yTenor - 2);
    doc.text(`${total16}`, 234.5, y - 2);
    doc.line(242.5, yTenor - 7, 242.5, y); // 14
    doc.text(`17`, 246.5, yTenor - 2);
    doc.text(`${total17}`, 246.5, y - 2);
    doc.line(255, yTenor - 7, 255, y); // 15
    doc.text(`18`, 259.5, yTenor - 2);
    doc.text(`${total18}`, 259.5, y - 2);
    doc.line(267.5, yTenor - 7, 267.5, y); // 16
    doc.text(`21`, 271.5, yTenor - 2);
    doc.text(`${total21}`, 271.5, y - 2);
    doc.line(280, yTenor - 7, 280, y); // 17
    doc.text(`24`, 284, yTenor - 2);
    doc.text(`${total24}`, 284.5, y - 2);
    doc.line(292.5, 55, 292.5, y); // 18
    doc.line(330, 55, 330, y);
    doc.line(380, 55, 380, y);
    doc.line(15, y, 380, y);
    doc.save(`laporanPenjualanPerMarketingRinci.pdf`);
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <Box sx={container}>
      <Typography color="#757575">Laporan</Typography>
      <Typography variant="h4" sx={subTitleText}>
        Cari Penjualan Per Marketing
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
        <ButtonGroup
          variant="contained"
          aria-label="outlined primary button group"
        >
          <Button startIcon={<PrintIcon />} onClick={() => downloadPdfRekap()}>
            Rekap
          </Button>
          <Button
            color="secondary"
            startIcon={<PrintIcon />}
            onClick={() => downloadPdfRinci()}
          >
            Rinci
          </Button>
        </ButtonGroup>
      </Box>
    </Box>
  );
};

export default CariLapPenjualanPerMarketing;

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
