import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../../contexts/AuthContext";
import {
  namaPerusahaan,
  lokasiPerusahaan,
  kotaPerusahaan
} from "../../../constants/GeneralSetting";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Box,
  TextField,
  Typography,
  Divider,
  Pagination,
  Button,
  ButtonGroup,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions
} from "@mui/material";
import { ShowTableUser } from "../../../components/ShowTable";
import { tempUrl } from "../../../contexts/ContextProvider";
import { useStateContext } from "../../../contexts/ContextProvider";
import { SearchBar, Loader, usePagination } from "../../../components";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import jsPDF from "jspdf";
import "jspdf-autotable";
import * as XLSX from "xlsx";
import DownloadIcon from "@mui/icons-material/Download";
import PrintIcon from "@mui/icons-material/Print";

const DaftarUser = () => {
  const { user, dispatch } = useContext(AuthContext);
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const { screenSize } = useStateContext();

  const [kodeUnitBisnis, setKodeUnitBisnis] = useState("");
  const [kodeCabang, setKodeCabang] = useState("");
  const [username, setUsername] = useState("");
  const [tipeUser, setTipeUser] = useState("");
  const [periode, setPeriode] = useState("");
  const [kodeKwitansi, setKodeKwitansi] = useState("");
  const [noTerakhir, setNoTerakhir] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUser] = useState([]);
  const [usersForDoc, setUsersForDoc] = useState([]);
  const navigate = useNavigate();

  const columns = [
    { title: "Username", field: "username" },
    { title: "Tipe User", field: "tipeUser" },
    { title: "Periode", field: "periode" },
    { title: "Kode Kwitansi", field: "kodeKwitansi" },
    { title: "No. Terakhir", field: "noTerakhir" },
    { title: "Unit Bisnis", field: "unitBisnis" },
    { title: "Cabang", field: "cabang" }
  ];

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [loading, setLoading] = useState(false);
  let [page, setPage] = useState(1);
  const PER_PAGE = 20;

  // Get current posts
  const indexOfLastPost = page * PER_PAGE;
  const indexOfFirstPost = indexOfLastPost - PER_PAGE;
  const tempPosts = users.filter((val) => {
    if (searchTerm === "") {
      return val;
    } else if (
      val.username.toUpperCase().includes(searchTerm.toUpperCase()) ||
      val.tipeUser.toUpperCase().includes(searchTerm.toUpperCase()) ||
      val.periode.toUpperCase().includes(searchTerm.toUpperCase()) ||
      val.kodeKwitansi.toUpperCase().includes(searchTerm.toUpperCase()) ||
      val.noTerakhir.toUpperCase().includes(searchTerm.toUpperCase()) ||
      val.unitBisnis._id.toUpperCase().includes(searchTerm.toUpperCase()) ||
      val.unitBisnis.namaUnitBisnis
        .toUpperCase()
        .includes(searchTerm.toUpperCase()) ||
      val.cabang._id.toUpperCase().includes(searchTerm.toUpperCase()) ||
      val.cabang.namaCabang.toUpperCase().includes(searchTerm.toUpperCase())
    ) {
      return val;
    }
  });
  const currentPosts = tempPosts.slice(indexOfFirstPost, indexOfLastPost);

  const count = Math.ceil(tempPosts.length / PER_PAGE);
  const _DATA = usePagination(users, PER_PAGE);

  const handleChange = (e, p) => {
    setPage(p);
    _DATA.jump(p);
  };

  useEffect(() => {
    getUsers();
    getUsersForDoc();
    id && getUserById();
  }, [id]);

  const getUsers = async () => {
    setLoading(true);
    const response = await axios.post(`${tempUrl}/users`, {
      tipeAdmin: user.tipeUser,
      id: user._id,
      token: user.token
    });
    setUser(response.data);
    setLoading(false);
  };

  const getUsersForDoc = async () => {
    setLoading(true);
    const response = await axios.post(`${tempUrl}/users/usersForDoc`, {
      tipeAdmin: user.tipeUser,
      id: user._id,
      token: user.token
    });
    setUsersForDoc(response.data);
    setLoading(false);
  };

  const getUserById = async () => {
    if (id) {
      const response = await axios.post(`${tempUrl}/findUser/${id}`, {
        tipeAdmin: user.tipeUser,
        id: user._id,
        token: user.token
      });
      setUsername(response.data.username);
      setTipeUser(response.data.tipeUser);
      setPeriode(response.data.periode);
      setKodeKwitansi(response.data.kodeKwitansi);
      setNoTerakhir(response.data.noTerakhir);
      setKodeUnitBisnis(response.data.unitBisnis);
      setKodeCabang(response.data.cabang);
    }
  };

  const deleteUser = async (id) => {
    try {
      setLoading(true);
      await axios.post(`${tempUrl}/users/deleteUser/${id}`, {
        tipeAdmin: user.tipeUser,
        id: user._id,
        token: user.token
      });
      getUsers();
      setUsername("");
      setTipeUser("");
      setPeriode("");
      setKodeKwitansi("");
      setNoTerakhir("");
      setKodeUnitBisnis("");
      setKodeCabang("");
      setLoading(false);
      navigate("/daftarUser");
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
    doc.text(`Daftar User`, 90, 30);
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
      body: usersForDoc,
      headStyles: {
        fillColor: [117, 117, 117],
        color: [0, 0, 0]
      }
    });
    doc.save(`daftarUser.pdf`);
  };

  const downloadExcel = () => {
    const workSheet = XLSX.utils.json_to_sheet(usersForDoc);
    const workBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workBook, workSheet, `User`);
    // Buffer
    let buf = XLSX.write(workBook, { bookType: "xlsx", type: "buffer" });
    // Binary String
    XLSX.write(workBook, { bookType: "xlsx", type: "binary" });
    // Download
    XLSX.writeFile(workBook, `daftarUser.xlsx`);
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <Box sx={container}>
      <Typography color="#757575">User</Typography>
      <Typography variant="h4" sx={subTitleText}>
        Daftar User
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
        <Button
          variant="contained"
          color="success"
          sx={{ bgcolor: "success.light", textTransform: "none" }}
          startIcon={<AddCircleOutlineIcon />}
          size="small"
          onClick={() => {
            navigate(`/daftarUser/tambahUser`);
          }}
        >
          Tambah
        </Button>
        {id && (
          <>
            <ButtonGroup variant="contained">
              <Button
                color="primary"
                startIcon={<EditIcon />}
                sx={{ textTransform: "none" }}
                onClick={() => {
                  navigate(`/daftarUser/${id}/edit`);
                }}
              >
                Ubah
              </Button>
              <Button
                color="error"
                startIcon={<DeleteOutlineIcon />}
                sx={{ textTransform: "none" }}
                onClick={handleClickOpen}
              >
                Hapus
              </Button>
            </ButtonGroup>
            <Dialog
              open={open}
              onClose={handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">{`Hapus Data`}</DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                  {`Yakin ingin menghapus data ${username}?`}
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={() => deleteUser(id)}>Ok</Button>
                <Button onClick={handleClose}>Cancel</Button>
              </DialogActions>
            </Dialog>
          </>
        )}
      </Box>
      <Divider sx={dividerStyle} />
      {username.length !== 0 && (
        <>
          <Box sx={showDataContainer}>
            <Box sx={showDataWrapper}>
              <Typography sx={labelInput}>Username</Typography>
              <TextField
                size="small"
                id="outlined-basic"
                variant="filled"
                InputProps={{
                  readOnly: true
                }}
                value={username}
              />
              <Typography sx={[labelInput, spacingTop]}>Tipe User</Typography>
              <TextField
                size="small"
                id="outlined-basic"
                variant="filled"
                InputProps={{
                  readOnly: true
                }}
                value={tipeUser}
              />
              <Typography sx={[labelInput, spacingTop]}>Periode</Typography>
              <TextField
                size="small"
                id="outlined-basic"
                variant="filled"
                InputProps={{
                  readOnly: true
                }}
                value={periode}
              />
              <Typography sx={[labelInput, spacingTop]}>Unit Bisnis</Typography>
              <TextField
                size="small"
                id="outlined-basic"
                variant="filled"
                InputProps={{
                  readOnly: true
                }}
                value={`${kodeUnitBisnis._id} - ${kodeUnitBisnis.namaUnitBisnis}`}
              />
              <Typography sx={[labelInput, spacingTop]}>Cabang</Typography>
              <TextField
                size="small"
                id="outlined-basic"
                variant="filled"
                InputProps={{
                  readOnly: true
                }}
                value={`${kodeCabang._id} - ${kodeCabang.namaCabang}`}
              />
            </Box>
            <Box sx={[showDataWrapper, secondWrapper]}>
              <Typography sx={labelInput}>Kode Kwitansi</Typography>
              <TextField
                size="small"
                id="outlined-basic"
                variant="filled"
                InputProps={{
                  readOnly: true
                }}
                value={kodeKwitansi}
              />
              <Typography sx={[labelInput, spacingTop]}>No Terakhir</Typography>
              <TextField
                size="small"
                id="outlined-basic"
                variant="filled"
                InputProps={{
                  readOnly: true
                }}
                value={noTerakhir}
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
        <ShowTableUser currentPosts={currentPosts} searchTerm={searchTerm} />
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

export default DaftarUser;

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

const textFieldStyle = {
  display: "flex",
  mt: 4
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
