import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../../contexts/AuthContext";
import {
  namaPerusahaan,
  lokasiPerusahaan,
  kotaPerusahaan
} from "../../../constants/GeneralSetting";
import { tempUrl } from "../../../contexts/ContextProvider";
import { Loader } from "../../../components";
import {
  Box,
  Typography,
  TextField,
  Button,
  Divider,
  Autocomplete
} from "@mui/material";
import PrintIcon from "@mui/icons-material/Print";
import jsPDF from "jspdf";
import "jspdf-autotable";

const CariTunggakan = () => {
  const { user } = useContext(AuthContext);
  const [sisaBulan, setSisaBulan] = useState("");
  const [perTanggal, setPerTanggal] = useState("");
  const [lebihDari, setLebihDari] = useState("");
  const [sampaiDengan, setSampaiDengan] = useState("");
  const [kodeMarketing, setKodeMarketing] = useState("");
  const [kodeSurveyor, setKodeSurveyor] = useState("");
  const [marketings, setMarketings] = useState([]);
  const [surveyors, setSurveyors] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const columns = [
    { title: "No", field: "no" },
    { title: "No. Kon", field: "noJual" },
    { title: "Nama", field: "namaRegister" },
    { title: "Alm", field: "almRegister" },
    { title: "Tlp", field: "tlpRegister" },
    { title: "Tipe", field: "tipe" },
    { title: "Thn", field: "tahun" },
    { title: "Ang", field: "angPerBulan" },
    { title: "Surveyor", field: "kodeSurveyor" },
    { title: "Tenor", field: "tenor" },
    { title: "Sisa Bln", field: "sisaBulan" },
    { title: "JTO", field: "tglJatuhTempo" },
    { title: "MD1", field: "MD1" },
    { title: "MD2", field: "MD2" },
    { title: "MD3", field: "MD3" },
    { title: "SP", field: "SP" },
    { title: "ST", field: "ST" },
    { title: "HR", field: "hr" }
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
    const response = await axios.post(`${tempUrl}/jualsForTunggakan`, {
      perTanggal,
      lebihDari,
      sampaiDengan,
      kodeMarketing,
      kodeSurveyor,
      id: user._id,
      token: user.token,
      kodeUnitBisnis: user.unitBisnis._id,
      kodeCabang: user.cabang._id
    });

    var date = new Date();
    var current_date =
      date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear();
    var current_time =
      date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
    const doc = new jsPDF("l", "mm", [400, 210]);
    doc.setFontSize(12);
    doc.text(`${namaPerusahaan} - ${kotaPerusahaan}`, 15, 10);
    doc.text(`${lokasiPerusahaan}`, 15, 15);
    doc.setFontSize(16);
    doc.text(`Laporan Tunggakan`, 180, 30);
    doc.setFontSize(10);
    doc.text(`Per Tanggal : ${perTanggal}`, 15, 35);
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
      }
    });
    doc.save(`laporanTunggakan.pdf`);
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <Box sx={container}>
      <Typography color="#757575">Laporan</Typography>
      <Typography variant="h4" sx={subTitleText}>
        Cari Tunggakan
      </Typography>
      <Divider sx={dividerStyle} />
      <Box sx={showDataWrapper}>
        <Typography sx={[labelInput, spacingTop]}>Per. Tanggal</Typography>
        <TextField
          type="date"
          size="small"
          error={error && perTanggal.length === 0 && true}
          helperText={
            error && perTanggal.length === 0 && "Per. Tanggal harus diisi!"
          }
          id="outlined-basic"
          variant="outlined"
          value={perTanggal}
          onChange={(e) => setPerTanggal(e.target.value)}
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
        <Typography sx={[labelInput, spacingTop]}>Lebih dari</Typography>
        <TextField
          type="number"
          size="small"
          error={error && lebihDari.length === 0 && true}
          helperText={
            error && lebihDari.length === 0 && "Lebih dari harus diisi!"
          }
          id="outlined-basic"
          variant="outlined"
          value={lebihDari}
          onChange={(e) => setLebihDari(e.target.value)}
        />
        <Typography sx={[labelInput, spacingTop]}>Sampai dengan</Typography>
        <TextField
          type="number"
          size="small"
          error={error && sampaiDengan.length === 0 && true}
          helperText={
            error && sampaiDengan.length === 0 && "Sampai dengan harus diisi!"
          }
          id="outlined-basic"
          variant="outlined"
          value={sampaiDengan}
          onChange={(e) => setSampaiDengan(e.target.value)}
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

export default CariTunggakan;

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
