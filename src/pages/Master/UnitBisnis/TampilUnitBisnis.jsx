import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../../contexts/AuthContext";
import { tempUrl, useStateContext } from "../../../contexts/ContextProvider";
import {
  namaPerusahaan,
  lokasiPerusahaan,
  kotaPerusahaan
} from "../../../constants/GeneralSetting";
import { ShowTableUnitBisnis } from "../../../components/ShowTable";
import { FetchErrorHandling } from "../../../components/FetchErrorHandling";
import {
  SearchBar,
  Loader,
  usePagination,
  ButtonModifier
} from "../../../components";
import {
  Box,
  TextField,
  Typography,
  Divider,
  Pagination,
  Button,
  ButtonGroup
} from "@mui/material";
import jsPDF from "jspdf";
import "jspdf-autotable";
import * as XLSX from "xlsx";
import DownloadIcon from "@mui/icons-material/Download";
import PrintIcon from "@mui/icons-material/Print";

const TampilUnitBisnis = () => {
  const { user } = useContext(AuthContext);
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const { screenSize } = useStateContext();

  const [isFetchError, setIsFetchError] = useState(false);
  const [kodeUnitBisnis, setKodeUnitBisnis] = useState("");
  const [namaUnitBisnis, setNamaUnitBisnis] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [unitBisnisData, setUnitBisnisData] = useState([]);
  const navigate = useNavigate();
  let isUnitBisnisExist = kodeUnitBisnis.length !== 0;

  const columns = [
    { title: "Kode", field: "_id" },
    { title: "Nama Unit Bisnis", field: "namaUnitBisnis" }
  ];

  const [loading, setLoading] = useState(false);
  let [page, setPage] = useState(1);
  const PER_PAGE = 20;

  // Get current posts
  const indexOfLastPost = page * PER_PAGE;
  const indexOfFirstPost = indexOfLastPost - PER_PAGE;
  const tempPosts = unitBisnisData.filter((val) => {
    if (searchTerm === "") {
      return val;
    } else if (
      val._id.toUpperCase().includes(searchTerm.toUpperCase()) ||
      val.namaUnitBisnis.toUpperCase().includes(searchTerm.toUpperCase())
    ) {
      return val;
    }
  });
  const currentPosts = tempPosts.slice(indexOfFirstPost, indexOfLastPost);

  const count = Math.ceil(tempPosts.length / PER_PAGE);
  const _DATA = usePagination(unitBisnisData, PER_PAGE);

  const handleChange = (e, p) => {
    setPage(p);
    _DATA.jump(p);
  };

  useEffect(() => {
    getUnitBisnisData();
    id && getUnitBisnisById();
  }, [id]);

  const getUnitBisnisData = async () => {
    setLoading(true);
    try {
      const allUnitBisnis = await axios.post(`${tempUrl}/unitBisnis`, {
        id: user._id,
        token: user.token
      });
      setUnitBisnisData(allUnitBisnis.data);
    } catch (err) {
      setIsFetchError(true);
    }
    setLoading(false);
  };

  const getUnitBisnisById = async () => {
    if (id) {
      const pickedUnitBisnis = await axios.post(`${tempUrl}/unitBisnis/${id}`, {
        id: user._id,
        token: user.token
      });
      setKodeUnitBisnis(pickedUnitBisnis.data._id);
      setNamaUnitBisnis(pickedUnitBisnis.data.namaUnitBisnis);
    }
  };

  const deleteUnitBisnis = async (id) => {
    try {
      setLoading(true);
      await axios.post(`${tempUrl}/deleteUnitBisnis/${id}`, {
        id: user._id,
        token: user.token
      });
      setKodeUnitBisnis("");
      setNamaUnitBisnis("");
      setLoading(false);
      navigate("/unitBisnis");
    } catch (error) {
      console.log(error);
    }
  };

  const downloadPdf = () => {
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
    doc.text(`Daftar Unit Bisnis`, 90, 30);
    doc.setFontSize(10);
    doc.text(
      `Dicetak Oleh: ${user.username} | Tanggal : ${current_date} | Jam : ${current_time}`,
      15,
      280
    );
    doc.setFontSize(12);
    doc.autoTable({
      margin: { top: 45 },
      columns: columns.map((col) => ({ ...col, dataKey: col.field })),
      body: unitBisnisData,
      headStyles: {
        fillColor: [117, 117, 117],
        color: [0, 0, 0]
      }
    });
    doc.save(`daftarUnitBisnis.pdf`);
  };

  const downloadExcel = () => {
    const workSheet = XLSX.utils.json_to_sheet(unitBisnisData);
    const workBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workBook, workSheet, `Unit Bisnis`);
    // Buffer
    let buf = XLSX.write(workBook, { bookType: "xlsx", type: "buffer" });
    // Binary String
    XLSX.write(workBook, { bookType: "xlsx", type: "binary" });
    // Download
    XLSX.writeFile(workBook, `daftarUnitBisnis.xlsx`);
  };

  if (loading) {
    return <Loader />;
  }

  if (isFetchError) {
    return <FetchErrorHandling />;
  }

  return (
    <Box sx={container}>
      <Typography color="#757575">Master</Typography>
      <Typography variant="h4" sx={subTitleText}>
        Unit Bisnis
      </Typography>
      <Box sx={downloadButtons}>
        <ButtonGroup variant="outlined" color="secondary">
          <Button startIcon={<PrintIcon />} onClick={() => downloadPdf()}>
            CETAK
          </Button>
          <Button startIcon={<DownloadIcon />} onClick={() => downloadExcel()}>
            EXCEL
          </Button>
        </ButtonGroup>
      </Box>
      <Box sx={buttonModifierContainer}>
        <ButtonModifier
          id={id}
          kode={kodeUnitBisnis}
          addLink={`/unitBisnis/tambahUnitBisnis`}
          editLink={`/unitBisnis/${id}/edit`}
          deleteUser={deleteUnitBisnis}
          nameUser={kodeUnitBisnis}
        />
      </Box>
      <Divider sx={dividerStyle} />
      {isUnitBisnisExist && (
        <>
          <Box sx={showDataContainer}>
            <Box sx={showDataWrapper}>
              <Typography sx={labelInput}>Kode</Typography>
              <TextField
                size="small"
                id="outlined-basic"
                variant="filled"
                InputProps={{
                  readOnly: true
                }}
                value={kodeUnitBisnis}
              />
              <Typography sx={[labelInput, spacingTop]}>
                Nama Unit Bisnis
              </Typography>
              <TextField
                size="small"
                id="outlined-basic"
                variant="filled"
                InputProps={{
                  readOnly: true
                }}
                value={namaUnitBisnis}
              />
            </Box>
          </Box>
          <Divider sx={dividerStyle} />
        </>
      )}
      <Box sx={searchBarContainer}>
        <SearchBar setSearchTerm={setSearchTerm} />
      </Box>
      <Box sx={tableContainer}>
        <ShowTableUnitBisnis
          currentPosts={currentPosts}
          searchTerm={searchTerm}
        />
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
  );
};

export default TampilUnitBisnis;

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

const showDataContainer = {
  mt: 4,
  display: "flex",
  flexDirection: {
    xs: "column",
    sm: "row"
  }
};

const showDataWrapper = {
  display: "flex",
  flex: 1,
  flexDirection: "column",
  maxWidth: {
    md: "40vw"
  }
};

const searchBarContainer = {
  pt: 6,
  display: "flex",
  justifyContent: "center"
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

const downloadButtons = {
  mt: 4,
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "center"
};
