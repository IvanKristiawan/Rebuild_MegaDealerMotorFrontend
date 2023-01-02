import React, { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../../contexts/AuthContext";
import { tempUrl } from "../../../contexts/ContextProvider";
import {
  namaPerusahaan,
  lokasiPerusahaan,
  lokasiSP,
  kotaPerusahaan,
  refCOA
} from "../../../constants/GeneralSetting";
import { Loader } from "../../../components";
import {
  Box,
  Typography,
  TextField,
  Button,
  Divider,
  Snackbar,
  Alert,
  FormGroup,
  FormControlLabel,
  Checkbox
} from "@mui/material";
import jsPDF from "jspdf";
import PrintIcon from "@mui/icons-material/Print";

const AktivitasBukuBesar = () => {
  const { user } = useContext(AuthContext);
  let curr = new Date();
  let date = curr.toISOString().substring(0, 10);
  const [dariTgl, setDariTgl] = useState(date);
  const [sampaiTgl, setSampaiTgl] = useState(date);

  // COA
  const [coaPersediaanMotorBaru, setCoaPersediaanMotorBaru] = useState(false);
  const [coaPersediaanMotorBekas, setCoaPersediaanMotorBekas] = useState(false);
  const [hutangDagang, setHutangDagang] = useState(false);
  const [ppnMasukkan, setPpnMasukkan] = useState(false);

  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [vertical] = useState("bottom");
  const [horizontal] = useState("center");

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const downloadPdf = async () => {
    let aktivitasBukuBesars = await axios.post(
      `${tempUrl}/aktivitasBukuBesars`,
      {
        dariTgl,
        sampaiTgl,
        id: user._id,
        token: user.token,
        kodeCabang: user.cabang._id
      }
    );

    let totalDebet = 0;
    let totalKredit = 0;
    let makeDariTgl = new Date(dariTgl);
    let makeSampaiTgl = new Date(sampaiTgl);
    let tempDariTgl =
      makeDariTgl.getDate() +
      "-" +
      (makeDariTgl.getMonth() + 1) +
      "-" +
      makeDariTgl.getFullYear();
    let tempSampaiTgl =
      makeSampaiTgl.getDate() +
      "-" +
      (makeSampaiTgl.getMonth() + 1) +
      "-" +
      makeSampaiTgl.getFullYear();

    let tempY = 5;
    var date = new Date();
    var current_date =
      date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear();
    var current_time =
      date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
    const doc = new jsPDF();
    doc.setFontSize(9);
    doc.text(`${namaPerusahaan} - ${kotaPerusahaan}`, 10, tempY);
    tempY += 5;
    doc.text(`${lokasiPerusahaan}`, 10, tempY);
    tempY += 5;
    doc.text(`${lokasiSP}`, 10, tempY);
    tempY += 5;
    doc.text(`${kotaPerusahaan}`, 10, tempY);
    tempY += 10;
    doc.text(`Laporan Aktivitas Buku Besar`, 10, tempY);
    tempY += 5;
    doc.text(`Periode`, 10, tempY);
    tempY += 5;
    doc.text(`Dari Tanggal : ${tempDariTgl} S/D : ${tempSampaiTgl}`, 10, tempY);
    tempY += 5;
    doc.line(10, tempY, 200, tempY);
    doc.line(30, tempY, 30, tempY + 8);
    doc.line(70, tempY, 70, tempY + 8);
    doc.line(130, tempY, 130, tempY + 8);
    doc.line(165, tempY, 165, tempY + 8);
    tempY += 5.5;
    doc.text(`Tg.`, 12, tempY);
    doc.text(`No.Bukti`, 40, tempY);
    doc.text(`Keterangan Jurnal`, 85, tempY);
    doc.text(`Debet`, 140, tempY);
    doc.text(`Kredit`, 175, tempY);
    tempY += 2.5;
    doc.line(10, tempY, 200, tempY);
    if (coaPersediaanMotorBaru === true) {
      let tempDebet = 0;
      let tempKredit = 0;
      tempY += 5;
      doc.setFont(undefined, "bold");
      doc.text(
        `Account : ${refCOA["COA PERSEDIAAN MOTOR BARU"].kodeCOA} - COA PERSEDIAAN MOTOR BARU`,
        10,
        tempY
      );
      doc.setFont(undefined, "normal");
      tempY += 5;
      doc.text(`01`, 12, tempY);
      doc.text(`S. AWAL`, 32, tempY);
      doc.text(`Saldo Awal Tanggal ${tempDariTgl}`, 72, tempY);
      for (let i = 0; i < aktivitasBukuBesars.data["IN1"].length; i++) {
        tempY += 5;
        doc.text(`${aktivitasBukuBesars.data["IN1"][i].tglJurnal}`, 12, tempY);
        doc.text(`${aktivitasBukuBesars.data["IN1"][i].noBukti}`, 32, tempY);
        doc.setFontSize(7);
        doc.text(
          `${aktivitasBukuBesars.data["IN1"][i].keterangan.slice(0, 35)}`,
          72,
          tempY
        );
        doc.setFontSize(9);
        if (aktivitasBukuBesars.data["IN1"][i].jenis === "D") {
          doc.text(
            `${aktivitasBukuBesars.data["IN1"][i].jumlah.toLocaleString()}`,
            132,
            tempY
          );
          tempDebet += aktivitasBukuBesars.data["IN1"][i].jumlah;
          totalDebet += aktivitasBukuBesars.data["IN1"][i].jumlah;
        } else {
          doc.text(
            `${aktivitasBukuBesars.data["IN1"][i].jumlah.toLocaleString()}`,
            168,
            tempY
          );
          tempKredit += aktivitasBukuBesars.data["IN1"][i].jumlah;
          totalKredit += aktivitasBukuBesars.data["IN1"][i].jumlah;
        }
      }
      tempY += 5;
      doc.text(
        `-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------`,
        10,
        tempY
      );
      tempY += 5;
      doc.setFont(undefined, "bold");
      doc.text(
        `SubTotal Account : ${refCOA["COA PERSEDIAAN MOTOR BARU"].kodeCOA} - COA PERSEDIAAN MOTOR BARU`,
        10,
        tempY
      );
      doc.setFont(undefined, "normal");
      doc.text(`${tempDebet.toLocaleString()}`, 132, tempY);
      doc.text(`${tempKredit.toLocaleString()}`, 168, tempY);
    }
    if (coaPersediaanMotorBekas === true) {
      let tempDebet = 0;
      let tempKredit = 0;
      tempY += 10;
      doc.setFont(undefined, "bold");
      doc.text(
        `Account : ${refCOA["COA PERSEDIAAN MOTOR BEKAS"].kodeCOA} - COA PERSEDIAAN MOTOR BEKAS`,
        10,
        tempY
      );
      doc.setFont(undefined, "normal");
      tempY += 5;
      doc.text(`01`, 12, tempY);
      doc.text(`S. AWAL`, 32, tempY);
      doc.text(`Saldo Awal Tanggal ${tempDariTgl}`, 72, tempY);
      for (let i = 0; i < aktivitasBukuBesars.data["IN2"].length; i++) {
        tempY += 5;
        doc.text(`${aktivitasBukuBesars.data["IN2"][i].tglJurnal}`, 12, tempY);
        doc.text(`${aktivitasBukuBesars.data["IN2"][i].noBukti}`, 32, tempY);
        doc.setFontSize(7);
        doc.text(
          `${aktivitasBukuBesars.data["IN2"][i].keterangan.slice(0, 35)}`,
          72,
          tempY
        );
        doc.setFontSize(9);
        if (aktivitasBukuBesars.data["IN2"][i].jenis === "D") {
          doc.text(
            `${aktivitasBukuBesars.data["IN2"][i].jumlah.toLocaleString()}`,
            132,
            tempY
          );
          tempDebet += aktivitasBukuBesars.data["IN2"][i].jumlah;
          totalDebet += aktivitasBukuBesars.data["IN2"][i].jumlah;
        } else {
          doc.text(
            `${aktivitasBukuBesars.data["IN2"][i].jumlah.toLocaleString()}`,
            168,
            tempY
          );
          tempKredit += aktivitasBukuBesars.data["IN2"][i].jumlah;
          totalKredit += aktivitasBukuBesars.data["IN2"][i].jumlah;
        }
      }
      tempY += 5;
      doc.text(
        `-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------`,
        10,
        tempY
      );
      tempY += 5;
      doc.setFont(undefined, "bold");
      doc.text(
        `SubTotal Account : ${refCOA["COA PERSEDIAAN MOTOR BEKAS"].kodeCOA} - COA PERSEDIAAN MOTOR BEKAS`,
        10,
        tempY
      );
      doc.setFont(undefined, "normal");
      doc.text(`${tempDebet.toLocaleString()}`, 132, tempY);
      doc.text(`${tempKredit.toLocaleString()}`, 168, tempY);
    }
    if (hutangDagang === true) {
      let tempDebet = 0;
      let tempKredit = 0;
      tempY += 10;
      doc.setFont(undefined, "bold");
      doc.text(
        `Account : ${refCOA["HUTANG DAGANG"].kodeCOA} - HUTANG DAGANG`,
        10,
        tempY
      );
      doc.setFont(undefined, "normal");
      tempY += 5;
      doc.text(`01`, 12, tempY);
      doc.text(`S. AWAL`, 32, tempY);
      doc.text(`Saldo Awal Tanggal ${tempDariTgl}`, 72, tempY);
      for (let i = 0; i < aktivitasBukuBesars.data["HD"].length; i++) {
        tempY += 5;
        doc.text(`${aktivitasBukuBesars.data["HD"][i].tglJurnal}`, 12, tempY);
        doc.text(`${aktivitasBukuBesars.data["HD"][i].noBukti}`, 32, tempY);
        doc.setFontSize(7);
        doc.text(
          `${aktivitasBukuBesars.data["HD"][i].keterangan.slice(0, 35)}`,
          72,
          tempY
        );
        doc.setFontSize(9);
        if (aktivitasBukuBesars.data["HD"][i].jenis === "D") {
          doc.text(
            `${aktivitasBukuBesars.data["HD"][i].jumlah.toLocaleString()}`,
            132,
            tempY
          );
          tempDebet += aktivitasBukuBesars.data["HD"][i].jumlah;
          totalDebet += aktivitasBukuBesars.data["HD"][i].jumlah;
        } else {
          doc.text(
            `${aktivitasBukuBesars.data["HD"][i].jumlah.toLocaleString()}`,
            168,
            tempY
          );
          tempKredit += aktivitasBukuBesars.data["HD"][i].jumlah;
          totalKredit += aktivitasBukuBesars.data["HD"][i].jumlah;
        }
      }
      tempY += 5;
      doc.text(
        `-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------`,
        10,
        tempY
      );
      tempY += 5;
      doc.setFont(undefined, "bold");
      doc.text(
        `SubTotal Account : ${refCOA["HUTANG DAGANG"].kodeCOA} - HUTANG DAGANG`,
        10,
        tempY
      );
      doc.setFont(undefined, "normal");
      doc.text(`${tempDebet.toLocaleString()}`, 132, tempY);
      doc.text(`${tempKredit.toLocaleString()}`, 168, tempY);
    }
    if (ppnMasukkan === true) {
      let tempDebet = 0;
      let tempKredit = 0;
      tempY += 10;
      doc.setFont(undefined, "bold");
      doc.text(
        `Account : ${refCOA["PPN MASUKKAN"].kodeCOA} - PPN MASUKKAN`,
        10,
        tempY
      );
      doc.setFont(undefined, "normal");
      tempY += 5;
      doc.text(`01`, 12, tempY);
      doc.text(`S. AWAL`, 32, tempY);
      doc.text(`Saldo Awal Tanggal ${tempDariTgl}`, 72, tempY);
      for (let i = 0; i < aktivitasBukuBesars.data["PM"].length; i++) {
        tempY += 5;
        doc.text(`${aktivitasBukuBesars.data["PM"][i].tglJurnal}`, 12, tempY);
        doc.text(`${aktivitasBukuBesars.data["PM"][i].noBukti}`, 32, tempY);
        doc.setFontSize(7);
        doc.text(
          `${aktivitasBukuBesars.data["PM"][i].keterangan.slice(0, 35)}`,
          72,
          tempY
        );
        doc.setFontSize(9);
        if (aktivitasBukuBesars.data["PM"][i].jenis === "D") {
          doc.text(
            `${aktivitasBukuBesars.data["PM"][i].jumlah.toLocaleString()}`,
            132,
            tempY
          );
          tempDebet += aktivitasBukuBesars.data["PM"][i].jumlah;
          totalDebet += aktivitasBukuBesars.data["PM"][i].jumlah;
        } else {
          doc.text(
            `${aktivitasBukuBesars.data["PM"][i].jumlah.toLocaleString()}`,
            168,
            tempY
          );
          tempKredit += aktivitasBukuBesars.data["PM"][i].jumlah;
          totalKredit += aktivitasBukuBesars.data["PM"][i].jumlah;
        }
      }
      tempY += 5;
      doc.text(
        `-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------`,
        10,
        tempY
      );
      tempY += 5;
      doc.setFont(undefined, "bold");
      doc.text(
        `SubTotal Account : ${refCOA["PPN MASUKKAN"].kodeCOA} - PPN MASUKKAN`,
        10,
        tempY
      );
      doc.setFont(undefined, "normal");
      doc.text(`${tempDebet.toLocaleString()}`, 132, tempY);
      doc.text(`${tempKredit.toLocaleString()}`, 168, tempY);
    }

    tempY += 10;
    doc.text(
      `-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------`,
      10,
      tempY
    );
    tempY += 5;
    doc.setFont(undefined, "bold");
    doc.text(`BALANCE :`, 10, tempY);
    doc.setFont(undefined, "normal");
    doc.text(`${totalDebet.toLocaleString()}`, 132, tempY);
    doc.text(`${totalKredit.toLocaleString()}`, 168, tempY);

    doc.text(
      `Dicetak Oleh: ${user.username} | Tanggal : ${current_date} | Jam : ${current_time}`,
      10,
      280
    );
    doc.save(`aktivitasBukuBesar.pdf`);
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <Box sx={container}>
      <Typography color="#757575">Accounting</Typography>
      <Typography variant="h4" sx={subTitleText}>
        Aktivitas Buku Besar
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
        <Box sx={showDataWrapper}>
          <Typography variant="p" sx={[spacingTop]}>
            Pilih Account
          </Typography>
          <FormGroup>
            <FormControlLabel
              control={<Checkbox checked={coaPersediaanMotorBaru} />}
              label="COA PERSEDIAAN MOTOR BARU"
              onChange={() =>
                setCoaPersediaanMotorBaru(!coaPersediaanMotorBaru)
              }
            />
          </FormGroup>
          <FormGroup>
            <FormControlLabel
              control={<Checkbox checked={coaPersediaanMotorBekas} />}
              label="COA PERSEDIAAN MOTOR BEKAS"
              onChange={() =>
                setCoaPersediaanMotorBekas(!coaPersediaanMotorBekas)
              }
            />
          </FormGroup>
          <FormGroup>
            <FormControlLabel
              control={<Checkbox checked={hutangDagang} />}
              label="HUTANG DAGANG"
              onChange={() => setHutangDagang(!hutangDagang)}
            />
          </FormGroup>
          <FormGroup>
            <FormControlLabel
              control={<Checkbox checked={ppnMasukkan} />}
              label="PPN MASUKKAN"
              onChange={() => setPpnMasukkan(!ppnMasukkan)}
            />
          </FormGroup>
        </Box>
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
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical, horizontal }}
        key={vertical + horizontal}
      >
        <Alert
          onClose={handleClose}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          Jurnal berhasil diposting!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default AktivitasBukuBesar;

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
