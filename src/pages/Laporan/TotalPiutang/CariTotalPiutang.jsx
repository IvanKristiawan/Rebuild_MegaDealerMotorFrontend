import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../../contexts/AuthContext";
import {
  namaPerusahaan,
  lokasiPerusahaan,
  kotaPerusahaan
} from "../../../constants/GeneralSetting";
import { useNavigate } from "react-router-dom";
import { tempUrl } from "../../../contexts/ContextProvider";
import { Loader } from "../../../components";
import {
  Box,
  Typography,
  TextField,
  Button,
  Divider,
  Snackbar,
  Alert,
  Autocomplete,
  Paper
} from "@mui/material";
import PrintIcon from "@mui/icons-material/Print";
import { Colors } from "../../../constants/styles";
import jsPDF from "jspdf";
import "jspdf-autotable";

const CariTotalPiutang = () => {
  const { user } = useContext(AuthContext);
  const [sisaBulan, setSisaBulan] = useState("");
  const [kodeMarketing, setKodeMarketing] = useState("");
  const [kodeSurveyor, setKodeSurveyor] = useState("");
  const [marketings, setMarketings] = useState([]);
  const [surveyors, setSurveyors] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const columns = [
    { title: "No", field: "no" },
    { title: "Tanggal", field: "tglAng" },
    { title: "No. Kon", field: "noRegister" },
    { title: "No. Telp", field: "tlpRegister" },
    { title: "Nopol", field: "nopol" },
    { title: "Tipe", field: "tipe" },
    { title: "Thn", field: "tahun" },
    { title: "P. Modal", field: "pModal" },
    { title: "P. Bunga", field: "pBunga" },
    { title: "Total", field: "total" },
    { title: "Bln", field: "bulan" }
  ];

  const marketingOptions = marketings.map((marketing) => ({
    label: `${marketing._id} - ${marketing.namaMarketing}`
  }));

  const surveyorOptions = surveyors.map((surveyor) => ({
    label: `${surveyor._id} - ${surveyor.namaSurveyor}`
  }));

  useEffect(() => {
    getMarketing();
    getSurveyor();
  }, []);

  const getMarketing = async () => {
    setLoading(true);
    const response = await axios.post(`${tempUrl}/marketings`, {
      id: user._id,
      token: user.token,
      kodeUnitBisnis: user.unitBisnis._id,
      kodeCabang: user.cabang._id
    });
    setMarketings(response.data);
    setLoading(false);
  };

  const getSurveyor = async () => {
    setLoading(true);
    const response = await axios.post(`${tempUrl}/surveyors`, {
      id: user._id,
      token: user.token,
      kodeUnitBisnis: user.unitBisnis._id,
      kodeCabang: user.cabang._id
    });
    setSurveyors(response.data);
    setLoading(false);
  };

  const downloadPdf = async () => {
    const response = await axios.post(`${tempUrl}/totalPiutangs`, {
      sisaBulan,
      kodeMarketing,
      kodeSurveyor,
      id: user._id,
      token: user.token,
      kodeUnitBisnis: user.unitBisnis._id,
      kodeCabang: user.cabang._id
    });

    let tempTotal = 0;
    let tempPModal = 0;
    let tempPBunga = 0;
    let tempSubGroupHeight = 35;
    let tempHeight = 35;
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
    doc.text(`Total Piutang`, 90, 30);
    doc.setFontSize(10);
    doc.text(`Sisa Bulan : ${sisaBulan}`, 15, 35);
    doc.text(
      `Marketing : ${kodeMarketing === "" ? "SEMUA MARKETING" : kodeMarketing}`,
      15,
      40
    );
    doc.text(
      `Surveyor : ${kodeSurveyor === "" ? "SEMUA SURVEYOR" : kodeSurveyor}`,
      15,
      45
    );
    doc.text(
      `Dicetak Oleh: ${user.username} | Tanggal : ${current_date} | Jam : ${current_time}`,
      15,
      280
    );
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
        tempSubGroupHeight = d.cursor.y;
        tempHeight = d.cursor.y;
      }
    });
    response.data.map((val) => {
      tempPModal += val.pModal;
      tempPBunga += val.pBunga;
      tempTotal += val.pModal + val.pBunga;
    });
    doc.setFontSize(8);
    doc.text(
      `P. Modal : Rp ${tempPModal.toLocaleString()}`,
      15,
      tempHeight + 4
    );
    doc.text(
      `P. Bunga : Rp ${tempPBunga.toLocaleString()}`,
      15,
      tempHeight + 8
    );
    doc.text(`Total : Rp ${tempTotal.toLocaleString()}`, 15, tempHeight + 12);
    doc.save(`totalPiutang.pdf`);
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <Box sx={container}>
      <Typography color="#757575">Laporan</Typography>
      <Typography variant="h4" sx={subTitleText}>
        Cari Total Piutang
      </Typography>
      <Divider sx={dividerStyle} />
      <Box sx={showDataWrapper}>
        <Typography sx={[labelInput, spacingTop]}>Sisa Bulan</Typography>
        <TextField
          type="number"
          size="small"
          error={error && sisaBulan.length === 0 && true}
          helperText={
            error && sisaBulan.length === 0 && "Sisa Bulan harus diisi!"
          }
          id="outlined-basic"
          variant="outlined"
          value={sisaBulan}
          onChange={(e) => setSisaBulan(e.target.value)}
        />
        <Typography sx={[labelInput, spacingTop]}>Kode Marketing</Typography>
        <Autocomplete
          size="small"
          disablePortal
          id="combo-box-demo"
          options={marketingOptions}
          renderInput={(params) => (
            <TextField
              size="small"
              error={error && kodeMarketing.length === 0 && true}
              helperText={
                error &&
                kodeMarketing.length === 0 &&
                "Kode Marketing harus diisi!"
              }
              placeholder="SEMUA MARKETING"
              {...params}
            />
          )}
          onInputChange={(e, value) => setKodeMarketing(value.split(" ", 1)[0])}
        />
        <Typography sx={[labelInput, spacingTop]}>Kode Surveyor</Typography>
        <Autocomplete
          size="small"
          disablePortal
          id="combo-box-demo"
          options={surveyorOptions}
          renderInput={(params) => (
            <TextField
              size="small"
              error={error && kodeSurveyor.length === 0 && true}
              helperText={
                error &&
                kodeSurveyor.length === 0 &&
                "Kode Surveyor harus diisi!"
              }
              placeholder="SEMUA SURVEYOR"
              {...params}
            />
          )}
          onInputChange={(e, value) => setKodeSurveyor(value.split(" ", 1)[0])}
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

export default CariTotalPiutang;

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
