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
import { ShowTableSupplier } from "../../../components/ShowTable";
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

const TampilSupplier = () => {
  const { user } = useContext(AuthContext);
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const { screenSize } = useStateContext();

  const [isFetchError, setIsFetchError] = useState(false);
  const [kodeSupplier, setKodeSupplier] = useState("");
  const [namaSupplier, setNamaSupplier] = useState("");
  const [alamatSupplier, setAlamatSupplier] = useState("");
  const [kotaSupplier, setKotaSupplier] = useState("");
  const [teleponSupplier, setTeleponSupplier] = useState("");
  const [picSupplier, setPicSupplier] = useState("");
  const [npwpSupplier, setNpwpSupplier] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [suppliersData, setSuppliersData] = useState([]);
  const navigate = useNavigate();
  let isSupplierExist = kodeSupplier.length !== 0;

  const columns = [
    { title: "Kode", field: "_id" },
    { title: "Nama Supplier", field: "namaSupplier" },
    { title: "Alamat", field: "alamatSupplier" },
    { title: "Kota", field: "kotaSupplier" },
    { title: "Telepon", field: "teleponSupplier" },
    { title: "PIC", field: "picSupplier" },
    { title: "NPWP", field: "npwpSupplier" }
  ];

  const [loading, setLoading] = useState(false);
  let [page, setPage] = useState(1);
  const PER_PAGE = 20;

  // Get current posts
  const indexOfLastPost = page * PER_PAGE;
  const indexOfFirstPost = indexOfLastPost - PER_PAGE;
  const tempPosts = suppliersData.filter((val) => {
    if (searchTerm === "") {
      return val;
    } else if (
      val._id.toUpperCase().includes(searchTerm.toUpperCase()) ||
      val.namaSupplier.toUpperCase().includes(searchTerm.toUpperCase()) ||
      val.alamatSupplier.toUpperCase().includes(searchTerm.toUpperCase()) ||
      val.kotaSupplier.toUpperCase().includes(searchTerm.toUpperCase()) ||
      val.teleponSupplier.toUpperCase().includes(searchTerm.toUpperCase()) ||
      val.picSupplier.toUpperCase().includes(searchTerm.toUpperCase()) ||
      val.npwpSupplier.toUpperCase().includes(searchTerm.toUpperCase())
    ) {
      return val;
    }
  });
  const currentPosts = tempPosts.slice(indexOfFirstPost, indexOfLastPost);

  const count = Math.ceil(tempPosts.length / PER_PAGE);
  const _DATA = usePagination(suppliersData, PER_PAGE);

  const handleChange = (e, p) => {
    setPage(p);
    _DATA.jump(p);
  };

  useEffect(() => {
    getSuppliersData();
    id && getSupplierById();
  }, [id]);

  const getSuppliersData = async () => {
    setLoading(true);
    try {
      const allSuppliers = await axios.post(`${tempUrl}/suppliers`, {
        id: user._id,
        token: user.token,
        kodeUnitBisnis: user.unitBisnis._id,
        kodeCabang: user.cabang._id
      });
      setSuppliersData(allSuppliers.data);
    } catch (err) {
      setIsFetchError(true);
    }
    setLoading(false);
  };

  const getSupplierById = async () => {
    if (id) {
      const pickedSupplier = await axios.post(`${tempUrl}/suppliers/${id}`, {
        id: user._id,
        token: user.token
      });
      setKodeSupplier(pickedSupplier.data._id);
      setNamaSupplier(pickedSupplier.data.namaSupplier);
      setAlamatSupplier(pickedSupplier.data.alamatSupplier);
      setKotaSupplier(pickedSupplier.data.kotaSupplier);
      setTeleponSupplier(pickedSupplier.data.teleponSupplier);
      setPicSupplier(pickedSupplier.data.picSupplier);
      setNpwpSupplier(pickedSupplier.data.npwpSupplier);
    }
  };

  const deleteSupplier = async (id) => {
    try {
      setLoading(true);
      await axios.post(`${tempUrl}/deleteSupplier/${id}`, {
        id: user._id,
        token: user.token
      });
      setKodeSupplier("");
      setNamaSupplier("");
      setAlamatSupplier("");
      setKotaSupplier("");
      setTeleponSupplier("");
      setPicSupplier("");
      setNpwpSupplier("");
      setLoading(false);
      navigate("/supplier");
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
    doc.text(`Daftar Supplier`, 90, 30);
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
      body: suppliersData,
      headStyles: {
        fillColor: [117, 117, 117],
        color: [0, 0, 0]
      }
    });
    doc.save(`daftarSupplier.pdf`);
  };

  const downloadExcel = () => {
    const workSheet = XLSX.utils.json_to_sheet(suppliersData);
    const workBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workBook, workSheet, `Supplier`);
    // Buffer
    let buf = XLSX.write(workBook, { bookType: "xlsx", type: "buffer" });
    // Binary String
    XLSX.write(workBook, { bookType: "xlsx", type: "binary" });
    // Download
    XLSX.writeFile(workBook, `daftarSupplier.xlsx`);
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
        Supplier
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
          kode={kodeSupplier}
          addLink={`/supplier/tambahSupplier`}
          editLink={`/supplier/${id}/edit`}
          deleteUser={deleteSupplier}
          nameUser={kodeSupplier}
        />
      </Box>
      <Divider sx={dividerStyle} />
      {isSupplierExist && (
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
                value={kodeSupplier}
              />
              <Typography sx={[labelInput, spacingTop]}>
                Nama Supplier
              </Typography>
              <TextField
                size="small"
                id="outlined-basic"
                variant="filled"
                InputProps={{
                  readOnly: true
                }}
                value={namaSupplier}
              />
              <Typography sx={[labelInput, spacingTop]}>Alamat</Typography>
              <TextField
                size="small"
                id="outlined-basic"
                variant="filled"
                InputProps={{
                  readOnly: true
                }}
                value={alamatSupplier}
              />
              <Typography sx={[labelInput, spacingTop]}>Kota</Typography>
              <TextField
                size="small"
                id="outlined-basic"
                variant="filled"
                InputProps={{
                  readOnly: true
                }}
                value={kotaSupplier}
              />
            </Box>
            <Box sx={[showDataWrapper, secondWrapper]}>
              <Typography sx={labelInput}>Telepon</Typography>
              <TextField
                size="small"
                id="outlined-basic"
                variant="filled"
                InputProps={{
                  readOnly: true
                }}
                value={teleponSupplier}
              />
              <Typography sx={[labelInput, spacingTop]}>PIC</Typography>
              <TextField
                size="small"
                id="outlined-basic"
                variant="filled"
                InputProps={{
                  readOnly: true
                }}
                value={picSupplier}
              />
              <Typography sx={[labelInput, spacingTop]}>NPWP</Typography>
              <TextField
                size="small"
                id="outlined-basic"
                variant="filled"
                InputProps={{
                  readOnly: true
                }}
                value={npwpSupplier}
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
        <ShowTableSupplier
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

export default TampilSupplier;

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

const secondWrapper = {
  marginLeft: {
    sm: 4
  },
  marginTop: {
    sm: 0,
    xs: 4
  }
};

const downloadButtons = {
  mt: 4,
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "center"
};
