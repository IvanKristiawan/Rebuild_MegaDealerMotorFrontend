import * as React from "react";
import { useNavigate } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { makeStyles } from "@mui/styles";
import { Colors } from "../constants/styles";

const useStyles = makeStyles({
  root: {
    "& .MuiTableCell-head": {
      color: "white",
      backgroundColor: Colors.blue700
    }
  },
  tableRightBorder: {
    borderWidth: 0,
    borderRightWidth: 1,
    borderColor: "white",
    borderStyle: "solid"
  }
});

export function ShowTableTipe({ currentPosts, searchTerm }) {
  let navigate = useNavigate();
  const classes = useStyles();
  return (
    <TableContainer component={Paper} sx={{ width: "100%" }}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow className={classes.root}>
            <TableCell
              sx={{ fontWeight: "bold" }}
              className={classes.tableRightBorder}
            >
              Kode
            </TableCell>
            <TableCell
              sx={{ fontWeight: "bold" }}
              className={classes.tableRightBorder}
            >
              Nama Tipe
            </TableCell>
            <TableCell
              sx={{ fontWeight: "bold" }}
              className={classes.tableRightBorder}
            >
              No. Rangka
            </TableCell>
            <TableCell
              sx={{ fontWeight: "bold" }}
              className={classes.tableRightBorder}
            >
              No. Mesin
            </TableCell>
            <TableCell
              sx={{ fontWeight: "bold" }}
              className={classes.tableRightBorder}
            >
              Isi (cc)
            </TableCell>
            <TableCell
              sx={{ fontWeight: "bold" }}
              className={classes.tableRightBorder}
            >
              Merk
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {currentPosts
            .filter((val) => {
              if (searchTerm === "") {
                return val;
              } else if (
                val.kodeTipe.toUpperCase().includes(searchTerm.toUpperCase()) ||
                val.namaTipe.toUpperCase().includes(searchTerm.toUpperCase()) ||
                val.noRangka.toUpperCase().includes(searchTerm.toUpperCase()) ||
                val.noMesin.toUpperCase().includes(searchTerm.toUpperCase()) ||
                val.isi.toUpperCase().includes(searchTerm.toUpperCase()) ||
                val.merk.toUpperCase().includes(searchTerm.toUpperCase())
              ) {
                return val;
              }
            })
            .map((user, index) => (
              <TableRow
                key={user._id}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                  "&:hover": { bgcolor: Colors.grey300 },
                  cursor: "pointer"
                }}
                onClick={() => {
                  navigate(`/tipe/${user._id}`);
                }}
              >
                <TableCell component="th" scope="row">
                  {user.kodeTipe}
                </TableCell>
                <TableCell>{user.namaTipe}</TableCell>
                <TableCell>{user.noRangka}</TableCell>
                <TableCell>{user.noMesin}</TableCell>
                <TableCell>{user.isi}</TableCell>
                <TableCell>{user.merk}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export function ShowTableWarna({ currentPosts, searchTerm }) {
  let navigate = useNavigate();
  const classes = useStyles();
  return (
    <TableContainer component={Paper} sx={{ width: "100%" }}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow className={classes.root}>
            <TableCell sx={{ fontWeight: "bold" }}>Nama Warna</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {currentPosts
            .filter((val) => {
              if (searchTerm === "") {
                return val;
              } else if (
                val.namaWarna.toUpperCase().includes(searchTerm.toUpperCase())
              ) {
                return val;
              }
            })
            .map((user, index) => (
              <TableRow
                key={user._id}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                  "&:hover": { bgcolor: Colors.grey300 },
                  cursor: "pointer"
                }}
                onClick={() => {
                  navigate(`/warna/${user._id}`);
                }}
              >
                <TableCell component="th" scope="row">
                  {user.namaWarna}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export function ShowTableCOA({ currentPosts, searchTerm }) {
  let navigate = useNavigate();
  const classes = useStyles();
  return (
    <TableContainer component={Paper} sx={{ width: "100%" }}>
      <Table aria-label="simple table">
        <TableHead className={classes.root}>
          <TableRow>
            <TableCell
              sx={{ fontWeight: "bold" }}
              className={classes.tableRightBorder}
            >
              Kode COA
            </TableCell>
            <TableCell
              sx={{ fontWeight: "bold" }}
              className={classes.tableRightBorder}
            >
              Nama COA
            </TableCell>
            <TableCell
              sx={{ fontWeight: "bold" }}
              className={classes.tableRightBorder}
            >
              Sub Group COA
            </TableCell>
            <TableCell
              sx={{ fontWeight: "bold" }}
              className={classes.tableRightBorder}
            >
              Group COA
            </TableCell>
            <TableCell
              sx={{ fontWeight: "bold" }}
              className={classes.tableRightBorder}
            >
              Jenis COA
            </TableCell>
            <TableCell
              sx={{ fontWeight: "bold" }}
              className={classes.tableRightBorder}
            >
              Jenis Saldo
            </TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Kas/Bank</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {currentPosts
            .filter((val) => {
              if (searchTerm === "") {
                return val;
              } else if (
                val.kodeCOA.toUpperCase().includes(searchTerm.toUpperCase()) ||
                val.namaCOA.toUpperCase().includes(searchTerm.toUpperCase()) ||
                val.jenisCOA.toUpperCase().includes(searchTerm.toUpperCase()) ||
                val.subGroupCOA
                  .toUpperCase()
                  .includes(searchTerm.toUpperCase()) ||
                val.groupCOA.toUpperCase().includes(searchTerm.toUpperCase()) ||
                val.jenisSaldo
                  .toUpperCase()
                  .includes(searchTerm.toUpperCase()) ||
                val.kasBank.toUpperCase().includes(searchTerm.toUpperCase())
              ) {
                return val;
              }
            })
            .map((user, index) => (
              <TableRow
                key={user._id}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                  "&:hover": { bgcolor: Colors.grey300 },
                  cursor: "pointer"
                }}
                onClick={() => {
                  navigate(`/COA/${user._id}`);
                }}
              >
                <TableCell component="th" scope="row">
                  {user.kodeCOA}
                </TableCell>
                <TableCell>{user.namaCOA}</TableCell>
                <TableCell>{user.subGroupCOA}</TableCell>
                <TableCell>{user.groupCOA}</TableCell>
                <TableCell>{user.jenisCOA}</TableCell>
                <TableCell>{user.jenisSaldo}</TableCell>
                <TableCell>{user.kasBank}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export function ShowTableJenisCOA({ currentPosts, searchTerm }) {
  let navigate = useNavigate();
  const classes = useStyles();
  return (
    <TableContainer component={Paper} sx={{ width: "100%" }}>
      <Table aria-label="simple table">
        <TableHead className={classes.root}>
          <TableRow>
            <TableCell
              sx={{ fontWeight: "bold" }}
              className={classes.tableRightBorder}
            >
              Kode
            </TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Nama Jenis COA</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {currentPosts
            .filter((val) => {
              if (searchTerm === "") {
                return val;
              } else if (
                val.kodeJenisCOA
                  .toUpperCase()
                  .includes(searchTerm.toUpperCase()) ||
                val.namaJenisCOA
                  .toUpperCase()
                  .includes(searchTerm.toUpperCase())
              ) {
                return val;
              }
            })
            .map((user, index) => (
              <TableRow
                key={user._id}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                  "&:hover": { bgcolor: Colors.grey300 },
                  cursor: "pointer"
                }}
                onClick={() => {
                  navigate(`/jenisCOA/${user._id}`);
                }}
              >
                <TableCell component="th" scope="row">
                  {user.kodeJenisCOA}
                </TableCell>
                <TableCell>{user.namaJenisCOA}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export function ShowTableGroupCOA({ currentPosts, searchTerm }) {
  let navigate = useNavigate();
  const classes = useStyles();
  return (
    <TableContainer component={Paper} sx={{ width: "100%" }}>
      <Table aria-label="simple table">
        <TableHead className={classes.root}>
          <TableRow>
            <TableCell
              sx={{ fontWeight: "bold" }}
              className={classes.tableRightBorder}
            >
              Kode Jenis
            </TableCell>
            <TableCell
              sx={{ fontWeight: "bold" }}
              className={classes.tableRightBorder}
            >
              Nama Jenis
            </TableCell>
            <TableCell
              sx={{ fontWeight: "bold" }}
              className={classes.tableRightBorder}
            >
              Kode Group
            </TableCell>
            <TableCell
              sx={{ fontWeight: "bold" }}
              className={classes.tableRightBorder}
            >
              Nama Group
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {currentPosts
            .filter((val) => {
              if (searchTerm === "") {
                return val;
              } else if (
                val.kodeJenisCOA
                  .toUpperCase()
                  .includes(searchTerm.toUpperCase()) ||
                val.namaJenisCOA
                  .toUpperCase()
                  .includes(searchTerm.toUpperCase()) ||
                val.kodeGroupCOA
                  .toUpperCase()
                  .includes(searchTerm.toUpperCase()) ||
                val.namaGroupCOA
                  .toUpperCase()
                  .includes(searchTerm.toUpperCase())
              ) {
                return val;
              }
            })
            .map((user, index) => (
              <TableRow
                key={user._id}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                  "&:hover": { bgcolor: Colors.grey300 },
                  cursor: "pointer"
                }}
                onClick={() => {
                  navigate(`/groupCOA/${user._id}`);
                }}
              >
                <TableCell component="th" scope="row">
                  {user.kodeJenisCOA}
                </TableCell>
                <TableCell>{user.namaJenisCOA}</TableCell>
                <TableCell>{user.kodeGroupCOA}</TableCell>
                <TableCell>{user.namaGroupCOA}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export function ShowTableSubGroupCOA({ currentPosts, searchTerm }) {
  let navigate = useNavigate();
  const classes = useStyles();
  return (
    <TableContainer component={Paper} sx={{ width: "100%" }}>
      <Table aria-label="simple table">
        <TableHead className={classes.root}>
          <TableRow>
            <TableCell
              sx={{ fontWeight: "bold" }}
              className={classes.tableRightBorder}
            >
              Kode Group
            </TableCell>
            <TableCell
              sx={{ fontWeight: "bold" }}
              className={classes.tableRightBorder}
            >
              Kode Sub Group
            </TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Nama Sub Group</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {currentPosts
            .filter((val) => {
              if (searchTerm === "") {
                return val;
              } else if (
                val.kodeGroupCOA
                  .toUpperCase()
                  .includes(searchTerm.toUpperCase()) ||
                val.namaGroupCOA
                  .toUpperCase()
                  .includes(searchTerm.toUpperCase()) ||
                val.kodeSubGroupCOA
                  .toUpperCase()
                  .includes(searchTerm.toUpperCase()) ||
                val.namaSubGroupCOA
                  .toUpperCase()
                  .includes(searchTerm.toUpperCase())
              ) {
                return val;
              }
            })
            .map((user, index) => (
              <TableRow
                key={user._id}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                  "&:hover": { bgcolor: Colors.grey300 },
                  cursor: "pointer"
                }}
                onClick={() => {
                  navigate(`/subGroupCOA/${user._id}`);
                }}
              >
                <TableCell component="th" scope="row">
                  {`${user.kodeGroupCOA} - ${user.namaGroupCOA}`}
                </TableCell>
                <TableCell>{user.kodeSubGroupCOA}</TableCell>
                <TableCell>{user.namaSubGroupCOA}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export function ShowTableWilayah({ currentPosts, searchTerm }) {
  let navigate = useNavigate();
  const classes = useStyles();
  return (
    <TableContainer component={Paper} sx={{ width: "100%" }}>
      <Table aria-label="simple table">
        <TableHead className={classes.root}>
          <TableRow>
            <TableCell
              sx={{ fontWeight: "bold" }}
              className={classes.tableRightBorder}
            >
              Kode
            </TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Nama Wilayah</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {currentPosts
            .filter((val) => {
              if (searchTerm === "") {
                return val;
              } else if (
                val.kodeWilayah
                  .toUpperCase()
                  .includes(searchTerm.toUpperCase()) ||
                val.namaWilayah.toUpperCase().includes(searchTerm.toUpperCase())
              ) {
                return val;
              }
            })
            .map((user, index) => (
              <TableRow
                key={user._id}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                  "&:hover": { bgcolor: Colors.grey300 },
                  cursor: "pointer"
                }}
                onClick={() => {
                  navigate(`/wilayah/${user._id}`);
                }}
              >
                <TableCell component="th" scope="row">
                  {user.kodeWilayah}
                </TableCell>
                <TableCell>{user.namaWilayah}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export function ShowTableKecamatan({ currentPosts, searchTerm }) {
  let navigate = useNavigate();
  const classes = useStyles();
  return (
    <TableContainer component={Paper} sx={{ width: "100%" }}>
      <Table aria-label="simple table">
        <TableHead className={classes.root}>
          <TableRow>
            <TableCell
              sx={{ fontWeight: "bold" }}
              className={classes.tableRightBorder}
            >
              Kode Kecamatan
            </TableCell>
            <TableCell
              sx={{ fontWeight: "bold" }}
              className={classes.tableRightBorder}
            >
              Nama Kecamatan
            </TableCell>
            <TableCell
              sx={{ fontWeight: "bold" }}
              className={classes.tableRightBorder}
            >
              Kode Wilayah
            </TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Nama Wilayah</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {currentPosts
            .filter((val) => {
              if (searchTerm === "") {
                return val;
              } else if (
                val.kodeWilayah
                  .toUpperCase()
                  .includes(searchTerm.toUpperCase()) ||
                val.kodeKecamatan
                  .toUpperCase()
                  .includes(searchTerm.toUpperCase()) ||
                val.namaKecamatan
                  .toUpperCase()
                  .includes(searchTerm.toUpperCase()) ||
                val.namaWilayah.toUpperCase().includes(searchTerm.toUpperCase())
              ) {
                return val;
              }
            })
            .map((user, index) => (
              <TableRow
                key={user._id}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                  "&:hover": { bgcolor: Colors.grey300 },
                  cursor: "pointer"
                }}
                onClick={() => {
                  navigate(`/kecamatan/${user._id}`);
                }}
              >
                <TableCell component="th" scope="row">
                  {user.kodeKecamatan}
                </TableCell>
                <TableCell>{user.namaKecamatan}</TableCell>
                <TableCell>{user.kodeWilayah}</TableCell>
                <TableCell>{user.namaWilayah}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export function ShowTableDealer({ currentPosts, searchTerm }) {
  let navigate = useNavigate();
  const classes = useStyles();
  return (
    <TableContainer component={Paper} sx={{ width: "100%" }}>
      <Table aria-label="simple table">
        <TableHead className={classes.root}>
          <TableRow>
            <TableCell
              sx={{ fontWeight: "bold" }}
              className={classes.tableRightBorder}
            >
              Kode
            </TableCell>
            <TableCell
              sx={{ fontWeight: "bold" }}
              className={classes.tableRightBorder}
            >
              Nama Dealer
            </TableCell>
            <TableCell
              sx={{ fontWeight: "bold" }}
              className={classes.tableRightBorder}
            >
              Alamat
            </TableCell>
            <TableCell
              sx={{ fontWeight: "bold" }}
              className={classes.tableRightBorder}
            >
              Telepon
            </TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>PIC</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {currentPosts
            .filter((val) => {
              if (searchTerm === "") {
                return val;
              } else if (
                val.kodeDealer
                  .toUpperCase()
                  .includes(searchTerm.toUpperCase()) ||
                val.namaDealer
                  .toUpperCase()
                  .includes(searchTerm.toUpperCase()) ||
                val.alamatDealer
                  .toUpperCase()
                  .includes(searchTerm.toUpperCase()) ||
                val.teleponDealer
                  .toUpperCase()
                  .includes(searchTerm.toUpperCase()) ||
                val.PICDealer.toUpperCase().includes(searchTerm.toUpperCase())
              ) {
                return val;
              }
            })
            .map((user, index) => (
              <TableRow
                key={user._id}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                  "&:hover": { bgcolor: Colors.grey300 },
                  cursor: "pointer"
                }}
                onClick={() => {
                  navigate(`/dealer/${user._id}`);
                }}
              >
                <TableCell component="th" scope="row">
                  {user.kodeDealer}
                </TableCell>
                <TableCell>{user.namaDealer}</TableCell>
                <TableCell>{user.alamatDealer}</TableCell>
                <TableCell>{user.teleponDealer}</TableCell>
                <TableCell>{user.PICDealer}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export function ShowTableRegister({ currentPosts, searchTerm }) {
  let navigate = useNavigate();
  const classes = useStyles();
  return (
    <TableContainer component={Paper} sx={{ width: "100%" }}>
      <Table aria-label="simple table">
        <TableHead className={classes.root}>
          <TableRow>
            <TableCell
              sx={{ fontWeight: "bold" }}
              className={classes.tableRightBorder}
            >
              No
            </TableCell>
            <TableCell
              sx={{ fontWeight: "bold" }}
              className={classes.tableRightBorder}
            >
              Tanggal
            </TableCell>
            <TableCell
              sx={{ fontWeight: "bold" }}
              className={classes.tableRightBorder}
            >
              Nama
            </TableCell>
            <TableCell
              sx={{ fontWeight: "bold" }}
              className={classes.tableRightBorder}
            >
              Alamat
            </TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Telepon</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Ktp</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {currentPosts
            .filter((val) => {
              if (searchTerm === "") {
                return val;
              } else if (
                val.noRegister
                  .toUpperCase()
                  .includes(searchTerm.toUpperCase()) ||
                val.tanggalRegister
                  .toUpperCase()
                  .includes(searchTerm.toUpperCase()) ||
                val.namaRegister
                  .toUpperCase()
                  .includes(searchTerm.toUpperCase()) ||
                val.almRegister
                  .toUpperCase()
                  .includes(searchTerm.toUpperCase()) ||
                val.tlpRegister
                  .toUpperCase()
                  .includes(searchTerm.toUpperCase()) ||
                val.noKtpRegister
                  .toUpperCase()
                  .includes(searchTerm.toUpperCase())
              ) {
                return val;
              }
            })
            .map((user, index) => (
              <TableRow
                key={user._id}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                  "&:hover": { bgcolor: Colors.grey300 },
                  cursor: "pointer"
                }}
                onClick={() => {
                  navigate(`/register/${user._id}`);
                }}
              >
                <TableCell component="th" scope="row">
                  {user.noRegister}
                </TableCell>
                <TableCell>{user.tanggalRegister}</TableCell>
                <TableCell>{user.namaRegister}</TableCell>
                <TableCell>{user.almRegister}</TableCell>
                <TableCell>{user.tlpRegister}</TableCell>
                <TableCell>{user.noKtpRegister}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export function ShowTableKolektor({ currentPosts, searchTerm }) {
  let navigate = useNavigate();
  const classes = useStyles();
  return (
    <TableContainer component={Paper} sx={{ width: "100%" }}>
      <Table aria-label="simple table">
        <TableHead className={classes.root}>
          <TableRow>
            <TableCell
              sx={{ fontWeight: "bold" }}
              className={classes.tableRightBorder}
            >
              Kode
            </TableCell>
            <TableCell
              sx={{ fontWeight: "bold" }}
              className={classes.tableRightBorder}
            >
              Nama Kolektor
            </TableCell>
            <TableCell
              sx={{ fontWeight: "bold" }}
              className={classes.tableRightBorder}
            >
              Telepon
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {currentPosts
            .filter((val) => {
              if (searchTerm === "") {
                return val;
              } else if (
                val.kodeKolektor
                  .toUpperCase()
                  .includes(searchTerm.toUpperCase()) ||
                val.namaKolektor
                  .toUpperCase()
                  .includes(searchTerm.toUpperCase()) ||
                val.teleponKolektor
                  .toUpperCase()
                  .includes(searchTerm.toUpperCase())
              ) {
                return val;
              }
            })
            .map((user, index) => (
              <TableRow
                key={user._id}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                  "&:hover": { bgcolor: Colors.grey300 },
                  cursor: "pointer"
                }}
                onClick={() => {
                  navigate(`/kolektor/${user._id}`);
                }}
              >
                <TableCell component="th" scope="row">
                  {user.kodeKolektor}
                </TableCell>
                <TableCell>{user.namaKolektor}</TableCell>
                <TableCell>{user.teleponKolektor}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export function ShowTableMarketing({ currentPosts, searchTerm }) {
  let navigate = useNavigate();
  const classes = useStyles();
  return (
    <TableContainer component={Paper} sx={{ width: "100%" }}>
      <Table aria-label="simple table">
        <TableHead className={classes.root}>
          <TableRow>
            <TableCell
              sx={{ fontWeight: "bold" }}
              className={classes.tableRightBorder}
            >
              Kode
            </TableCell>
            <TableCell
              sx={{ fontWeight: "bold" }}
              className={classes.tableRightBorder}
            >
              Nama Marketing
            </TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Telepon Marketing</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {currentPosts
            .filter((val) => {
              if (searchTerm === "") {
                return val;
              } else if (
                val.kodeMarketing
                  .toUpperCase()
                  .includes(searchTerm.toUpperCase()) ||
                val.namaMarketing
                  .toUpperCase()
                  .includes(searchTerm.toUpperCase()) ||
                val.teleponMarketing
                  .toUpperCase()
                  .includes(searchTerm.toUpperCase())
              ) {
                return val;
              }
            })
            .map((user, index) => (
              <TableRow
                key={user._id}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                  "&:hover": { bgcolor: Colors.grey300 },
                  cursor: "pointer"
                }}
                onClick={() => {
                  navigate(`/marketing/${user._id}`);
                }}
              >
                <TableCell component="th" scope="row">
                  {user.kodeMarketing}
                </TableCell>
                <TableCell>{user.namaMarketing}</TableCell>
                <TableCell>{user.teleponMarketing}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export function ShowTablePekerjaan({ currentPosts, searchTerm }) {
  let navigate = useNavigate();
  const classes = useStyles();
  return (
    <TableContainer component={Paper} sx={{ width: "100%" }}>
      <Table aria-label="simple table">
        <TableHead className={classes.root}>
          <TableRow>
            <TableCell
              sx={{ fontWeight: "bold" }}
              className={classes.tableRightBorder}
            >
              Kode
            </TableCell>
            <TableCell
              sx={{ fontWeight: "bold" }}
              className={classes.tableRightBorder}
            >
              Nama Pekerjaan
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {currentPosts
            .filter((val) => {
              if (searchTerm === "") {
                return val;
              } else if (
                val.kodePekerjaan
                  .toUpperCase()
                  .includes(searchTerm.toUpperCase()) ||
                val.namaPekerjaan
                  .toUpperCase()
                  .includes(searchTerm.toUpperCase())
              ) {
                return val;
              }
            })
            .map((user, index) => (
              <TableRow
                key={user._id}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                  "&:hover": { bgcolor: Colors.grey300 },
                  cursor: "pointer"
                }}
                onClick={() => {
                  navigate(`/pekerjaan/${user._id}`);
                }}
              >
                <TableCell component="th" scope="row">
                  {user.kodePekerjaan}
                </TableCell>
                <TableCell>{user.namaPekerjaan}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export function ShowTableSurveyor({ currentPosts, searchTerm }) {
  let navigate = useNavigate();
  const classes = useStyles();
  return (
    <TableContainer component={Paper} sx={{ width: "100%" }}>
      <Table aria-label="simple table">
        <TableHead className={classes.root}>
          <TableRow>
            <TableCell
              sx={{ fontWeight: "bold" }}
              className={classes.tableRightBorder}
            >
              Kode
            </TableCell>
            <TableCell
              sx={{ fontWeight: "bold" }}
              className={classes.tableRightBorder}
            >
              Nama Surveyor
            </TableCell>
            <TableCell
              sx={{ fontWeight: "bold" }}
              className={classes.tableRightBorder}
            >
              Telepon Surveyor
            </TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Jenis Surveyor</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {currentPosts
            .filter((val) => {
              if (searchTerm === "") {
                return val;
              } else if (
                val.kodeSurveyor
                  .toUpperCase()
                  .includes(searchTerm.toUpperCase()) ||
                val.namaSurveyor
                  .toUpperCase()
                  .includes(searchTerm.toUpperCase()) ||
                val.teleponSurveyor
                  .toUpperCase()
                  .includes(searchTerm.toUpperCase()) ||
                val.jenisSurveyor
                  .toUpperCase()
                  .includes(searchTerm.toUpperCase())
              ) {
                return val;
              }
            })
            .map((user, index) => (
              <TableRow
                key={user._id}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                  "&:hover": { bgcolor: Colors.grey300 },
                  cursor: "pointer"
                }}
                onClick={() => {
                  navigate(`/surveyor/${user._id}`);
                }}
              >
                <TableCell component="th" scope="row">
                  {user.kodeSurveyor}
                </TableCell>
                <TableCell>{user.namaSurveyor}</TableCell>
                <TableCell>{user.teleponSurveyor}</TableCell>
                <TableCell>{user.jenisSurveyor}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export function ShowTableUser({ currentPosts, searchTerm }) {
  let navigate = useNavigate();
  const classes = useStyles();
  return (
    <TableContainer component={Paper} sx={{ width: "100%" }}>
      <Table aria-label="simple table">
        <TableHead className={classes.root}>
          <TableRow>
            <TableCell
              sx={{ fontWeight: "bold" }}
              className={classes.tableRightBorder}
            >
              Username
            </TableCell>
            <TableCell
              sx={{ fontWeight: "bold" }}
              className={classes.tableRightBorder}
            >
              Tipe User
            </TableCell>
            <TableCell
              sx={{ fontWeight: "bold" }}
              className={classes.tableRightBorder}
            >
              Periode
            </TableCell>
            <TableCell
              sx={{ fontWeight: "bold" }}
              className={classes.tableRightBorder}
            >
              Kode Kwitansi
            </TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>No Terakhir</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Unit Bisnis</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Cabang</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {currentPosts
            .filter((val) => {
              if (searchTerm === "") {
                return val;
              } else if (
                val.username.toUpperCase().includes(searchTerm.toUpperCase()) ||
                val.tipeUser.toUpperCase().includes(searchTerm.toUpperCase()) ||
                val.periode.toUpperCase().includes(searchTerm.toUpperCase()) ||
                val.kodeKwitansi
                  .toUpperCase()
                  .includes(searchTerm.toUpperCase()) ||
                val.noTerakhir
                  .toUpperCase()
                  .includes(searchTerm.toUpperCase()) ||
                val.unitBisnis._id
                  .toUpperCase()
                  .includes(searchTerm.toUpperCase()) ||
                val.unitBisnis.namaUnitBisnis
                  .toUpperCase()
                  .includes(searchTerm.toUpperCase()) ||
                val.cabang._id
                  .toUpperCase()
                  .includes(searchTerm.toUpperCase()) ||
                val.cabang.namaCabang
                  .toUpperCase()
                  .includes(searchTerm.toUpperCase())
              ) {
                return val;
              }
            })
            .map((user, index) => (
              <TableRow
                key={user._id}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                  "&:hover": { bgcolor: Colors.grey300 },
                  cursor: "pointer"
                }}
                onClick={() => {
                  navigate(`/daftarUser/${user._id}`);
                }}
              >
                <TableCell component="th" scope="row">
                  {user.username}
                </TableCell>
                <TableCell>{user.tipeUser}</TableCell>
                <TableCell>{user.periode}</TableCell>
                <TableCell>{user.kodeKwitansi}</TableCell>
                <TableCell>{user.noTerakhir}</TableCell>
                <TableCell>
                  {user.unitBisnis._id} - {user.unitBisnis.namaUnitBisnis}
                </TableCell>
                <TableCell>
                  {user.cabang._id} - {user.cabang.namaCabang}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export function ShowTableCabang({ currentPosts, searchTerm }) {
  let navigate = useNavigate();
  const classes = useStyles();
  return (
    <TableContainer component={Paper} sx={{ width: "100%" }}>
      <Table aria-label="simple table">
        <TableHead className={classes.root}>
          <TableRow>
            <TableCell
              sx={{ fontWeight: "bold" }}
              className={classes.tableRightBorder}
            >
              Kode
            </TableCell>
            <TableCell
              sx={{ fontWeight: "bold" }}
              className={classes.tableRightBorder}
            >
              Nama Cabang
            </TableCell>
            <TableCell
              sx={{ fontWeight: "bold" }}
              className={classes.tableRightBorder}
            >
              Alamat
            </TableCell>
            <TableCell
              sx={{ fontWeight: "bold" }}
              className={classes.tableRightBorder}
            >
              Telepon
            </TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>PIC</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Unit Bisnis</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {currentPosts
            .filter((val) => {
              if (searchTerm === "") {
                return val;
              } else if (
                val._id.toUpperCase().includes(searchTerm.toUpperCase()) ||
                val.namaCabang
                  .toUpperCase()
                  .includes(searchTerm.toUpperCase()) ||
                val.alamatCabang
                  .toUpperCase()
                  .includes(searchTerm.toUpperCase()) ||
                val.teleponCabang
                  .toUpperCase()
                  .includes(searchTerm.toUpperCase()) ||
                val.picCabang
                  .toUpperCase()
                  .includes(searchTerm.toUpperCase()) ||
                val.unitBisnis._id
                  .toUpperCase()
                  .includes(searchTerm.toUpperCase()) ||
                val.unitBisnis.namaUnitBisnis
                  .toUpperCase()
                  .includes(searchTerm.toUpperCase())
              ) {
                return val;
              }
            })
            .map((user, index) => (
              <TableRow
                key={user._id}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                  "&:hover": { bgcolor: Colors.grey300 },
                  cursor: "pointer"
                }}
                onClick={() => {
                  navigate(`/cabang/${user._id}`);
                }}
              >
                <TableCell component="th" scope="row">
                  {user._id}
                </TableCell>
                <TableCell>{user.namaCabang}</TableCell>
                <TableCell>{user.alamatCabang}</TableCell>
                <TableCell>{user.teleponCabang}</TableCell>
                <TableCell>{user.picCabang}</TableCell>
                <TableCell>
                  {user.unitBisnis._id} - {user.unitBisnis.namaUnitBisnis}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export function ShowTableUnitBisnis({ currentPosts, searchTerm }) {
  let navigate = useNavigate();
  const classes = useStyles();
  return (
    <TableContainer component={Paper} sx={{ width: "100%" }}>
      <Table aria-label="simple table">
        <TableHead className={classes.root}>
          <TableRow>
            <TableCell
              sx={{ fontWeight: "bold" }}
              className={classes.tableRightBorder}
            >
              Kode
            </TableCell>
            <TableCell
              sx={{ fontWeight: "bold" }}
              className={classes.tableRightBorder}
            >
              Nama Unit Bisnis
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {currentPosts
            .filter((val) => {
              if (searchTerm === "") {
                return val;
              } else if (
                val._id.toUpperCase().includes(searchTerm.toUpperCase()) ||
                val.namaUnitBisnis
                  .toUpperCase()
                  .includes(searchTerm.toUpperCase())
              ) {
                return val;
              }
            })
            .map((user, index) => (
              <TableRow
                key={user._id}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                  "&:hover": { bgcolor: Colors.grey300 },
                  cursor: "pointer"
                }}
                onClick={() => {
                  navigate(`/unitBisnis/${user._id}`);
                }}
              >
                <TableCell component="th" scope="row">
                  {user._id}
                </TableCell>
                <TableCell>{user.namaUnitBisnis}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export function ShowTableLeasing({ currentPosts, searchTerm }) {
  let navigate = useNavigate();
  const classes = useStyles();
  return (
    <TableContainer component={Paper} sx={{ width: "100%" }}>
      <Table aria-label="simple table">
        <TableHead className={classes.root}>
          <TableRow>
            <TableCell
              sx={{ fontWeight: "bold" }}
              className={classes.tableRightBorder}
            >
              Kode Leasing
            </TableCell>
            <TableCell
              sx={{ fontWeight: "bold" }}
              className={classes.tableRightBorder}
            >
              Nama Leasing
            </TableCell>
            <TableCell
              sx={{ fontWeight: "bold" }}
              className={classes.tableRightBorder}
            >
              Alamat Leasing
            </TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Telepon Leasing</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>PIC</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {currentPosts
            .filter((val) => {
              if (searchTerm === "") {
                return val;
              } else if (
                val.kodeLeasing
                  .toUpperCase()
                  .includes(searchTerm.toUpperCase()) ||
                val.namaLeasing
                  .toUpperCase()
                  .includes(searchTerm.toUpperCase()) ||
                val.alamatLeasing
                  .toUpperCase()
                  .includes(searchTerm.toUpperCase()) ||
                val.teleponLeasing
                  .toUpperCase()
                  .includes(searchTerm.toUpperCase()) ||
                val.picLeasing.toUpperCase().includes(searchTerm.toUpperCase())
              ) {
                return val;
              }
            })
            .map((user, index) => (
              <TableRow
                key={user._id}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                  "&:hover": { bgcolor: Colors.grey300 },
                  cursor: "pointer"
                }}
                onClick={() => {
                  navigate(`/leasing/${user._id}`);
                }}
              >
                <TableCell component="th" scope="row">
                  {user.kodeLeasing}
                </TableCell>
                <TableCell>{user.namaLeasing}</TableCell>
                <TableCell>{user.alamatLeasing}</TableCell>
                <TableCell>{user.teleponLeasing}</TableCell>
                <TableCell>{user.picLeasing}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export function ShowTableSupplier({ currentPosts, searchTerm }) {
  let navigate = useNavigate();
  const classes = useStyles();
  return (
    <TableContainer component={Paper} sx={{ width: "100%" }}>
      <Table aria-label="simple table">
        <TableHead className={classes.root}>
          <TableRow>
            <TableCell
              sx={{ fontWeight: "bold" }}
              className={classes.tableRightBorder}
            >
              Kode
            </TableCell>
            <TableCell
              sx={{ fontWeight: "bold" }}
              className={classes.tableRightBorder}
            >
              Nama Supplier
            </TableCell>
            <TableCell
              sx={{ fontWeight: "bold" }}
              className={classes.tableRightBorder}
            >
              Alamat
            </TableCell>
            <TableCell
              sx={{ fontWeight: "bold" }}
              className={classes.tableRightBorder}
            >
              Kota
            </TableCell>
            <TableCell
              sx={{ fontWeight: "bold" }}
              className={classes.tableRightBorder}
            >
              Telepon
            </TableCell>
            <TableCell
              sx={{ fontWeight: "bold" }}
              className={classes.tableRightBorder}
            >
              PIC
            </TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>NPWP</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {currentPosts
            .filter((val) => {
              if (searchTerm === "") {
                return val;
              } else if (
                val.kodeSupplier
                  .toUpperCase()
                  .includes(searchTerm.toUpperCase()) ||
                val.namaSupplier
                  .toUpperCase()
                  .includes(searchTerm.toUpperCase()) ||
                val.alamatSupplier
                  .toUpperCase()
                  .includes(searchTerm.toUpperCase()) ||
                val.kotaSupplier
                  .toUpperCase()
                  .includes(searchTerm.toUpperCase()) ||
                val.teleponSupplier
                  .toUpperCase()
                  .includes(searchTerm.toUpperCase()) ||
                val.picSupplier
                  .toUpperCase()
                  .includes(searchTerm.toUpperCase()) ||
                val.npwpSupplier
                  .toUpperCase()
                  .includes(searchTerm.toUpperCase())
              ) {
                return val;
              }
            })
            .map((user, index) => (
              <TableRow
                key={user._id}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                  "&:hover": { bgcolor: Colors.grey300 },
                  cursor: "pointer"
                }}
                onClick={() => {
                  navigate(`/supplier/${user._id}`);
                }}
              >
                <TableCell component="th" scope="row">
                  {user.kodeSupplier}
                </TableCell>
                <TableCell>{user.namaSupplier}</TableCell>
                <TableCell>{user.alamatSupplier}</TableCell>
                <TableCell>{user.kotaSupplier}</TableCell>
                <TableCell>{user.teleponSupplier}</TableCell>
                <TableCell>{user.picSupplier}</TableCell>
                <TableCell>{user.npwpSupplier}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export function ShowTableDaftarBeli({ currentPosts, searchTerm }) {
  let navigate = useNavigate();
  const classes = useStyles();
  return (
    <TableContainer component={Paper} sx={{ width: "100%" }}>
      <Table aria-label="simple table">
        <TableHead className={classes.root}>
          <TableRow>
            <TableCell
              sx={{ fontWeight: "bold" }}
              className={classes.tableRightBorder}
            >
              No. Beli
            </TableCell>
            <TableCell
              sx={{ fontWeight: "bold" }}
              className={classes.tableRightBorder}
            >
              Kode Supplier
            </TableCell>
            <TableCell
              sx={{ fontWeight: "bold" }}
              className={classes.tableRightBorder}
            >
              Jumlah
            </TableCell>
            <TableCell
              sx={{ fontWeight: "bold" }}
              className={classes.tableRightBorder}
            >
              PPN
            </TableCell>
            <TableCell
              sx={{ fontWeight: "bold" }}
              className={classes.tableRightBorder}
            >
              Potongan
            </TableCell>
            <TableCell
              sx={{ fontWeight: "bold" }}
              className={classes.tableRightBorder}
            >
              Lama
            </TableCell>
            <TableCell
              sx={{ fontWeight: "bold" }}
              className={classes.tableRightBorder}
            >
              Tanggal
            </TableCell>
            <TableCell
              sx={{ fontWeight: "bold" }}
              className={classes.tableRightBorder}
            >
              Jatuh Tempo
            </TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Jenis</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {currentPosts
            .filter((val) => {
              if (searchTerm === "") {
                return val;
              } else if (
                val.noBeli.includes(searchTerm) ||
                val.tanggalBeli
                  .toUpperCase()
                  .includes(searchTerm.toUpperCase()) ||
                val.jumlahBeli.toString().includes(searchTerm) ||
                val.ppnBeli
                  .toString()
                  .toUpperCase()
                  .includes(searchTerm.toUpperCase()) ||
                val.potongan
                  .toString()
                  .toUpperCase()
                  .includes(searchTerm.toUpperCase()) ||
                val.lama
                  .toString()
                  .toUpperCase()
                  .includes(searchTerm.toUpperCase()) ||
                val.jenisBeli
                  .toUpperCase()
                  .includes(searchTerm.toUpperCase()) ||
                val.jatuhTempo
                  .toUpperCase()
                  .includes(searchTerm.toUpperCase()) ||
                val.supplier._id
                  .toUpperCase()
                  .includes(searchTerm.toUpperCase()) ||
                val.supplier.namaSupplier
                  .toUpperCase()
                  .includes(searchTerm.toUpperCase())
              ) {
                return val;
              }
            })
            .map((user, index) => (
              <TableRow
                key={user._id}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                  "&:hover": { bgcolor: Colors.grey300 },
                  cursor: "pointer"
                }}
                onClick={() => {
                  navigate(`/daftarBeli/beli/${user._id}`);
                }}
              >
                <TableCell component="th" scope="row">
                  {user.noBeli}
                </TableCell>
                <TableCell>
                  {user.supplier.kodeSupplier} - {user.supplier.namaSupplier}
                </TableCell>
                <TableCell>{user.jumlahBeli.toLocaleString()}</TableCell>
                <TableCell>{user.ppnBeli.toLocaleString()}</TableCell>
                <TableCell>{user.potongan.toLocaleString()}</TableCell>
                <TableCell>{user.lama.toLocaleString()}</TableCell>
                <TableCell>{user.tanggalBeli}</TableCell>
                <TableCell>{user.jatuhTempo}</TableCell>
                <TableCell>{user.jenisBeli}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export function ShowTableDaftarAngsuran({ currentPosts, searchTerm }) {
  let navigate = useNavigate();
  const classes = useStyles();
  return (
    <TableContainer component={Paper} sx={{ width: "100%" }}>
      <Table aria-label="simple table">
        <TableHead className={classes.root}>
          <TableRow>
            <TableCell
              sx={{ fontWeight: "bold" }}
              className={classes.tableRightBorder}
            >
              Nama Customer
            </TableCell>
            <TableCell
              sx={{ fontWeight: "bold" }}
              className={classes.tableRightBorder}
            >
              No. Jual
            </TableCell>
            <TableCell
              sx={{ fontWeight: "bold" }}
              className={classes.tableRightBorder}
            >
              Tanggal
            </TableCell>
            <TableCell
              sx={{ fontWeight: "bold" }}
              className={classes.tableRightBorder}
            >
              Nopol
            </TableCell>
            <TableCell
              sx={{ fontWeight: "bold" }}
              className={classes.tableRightBorder}
            >
              Alamat
            </TableCell>
            <TableCell
              sx={{ fontWeight: "bold" }}
              className={classes.tableRightBorder}
            >
              Tipe
            </TableCell>
            <TableCell
              sx={{ fontWeight: "bold" }}
              className={classes.tableRightBorder}
            >
              SP
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {currentPosts
            .filter((val) => {
              if (searchTerm === "") {
                return val;
              } else if (
                val.namaRegister.includes(searchTerm.toUpperCase()) ||
                val.almRegister
                  .toUpperCase()
                  .includes(searchTerm.toUpperCase()) ||
                val.nopol.toString().includes(searchTerm) ||
                val.noJual
                  .toString()
                  .toUpperCase()
                  .includes(searchTerm.toUpperCase()) ||
                val.tanggalJual
                  .toString()
                  .toUpperCase()
                  .includes(searchTerm.toUpperCase()) ||
                val.tipe
                  .toString()
                  .toUpperCase()
                  .includes(searchTerm.toUpperCase())
              ) {
                return val;
              }
            })
            .map((user, index) => (
              <TableRow
                key={user._id}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                  "&:hover": { bgcolor: Colors.grey300 },
                  cursor: "pointer",
                  backgroundColor: user.sisaBulan === 0 ? "#f79892" : "white"
                }}
                onClick={() => {
                  navigate(`/daftarAngsuran/angsuran/${user.noJual}`);
                }}
              >
                <TableCell component="th" scope="row">
                  {user.namaRegister}
                </TableCell>
                <TableCell>{user.noJual}</TableCell>
                <TableCell>{user.tanggalJual}</TableCell>
                <TableCell>{user.nopol}</TableCell>
                <TableCell>{user.almRegister}</TableCell>
                <TableCell>{user.tipe}</TableCell>
                <TableCell>{user.spKe}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export function ShowTableBeli({ id, currentPosts, nomorNota }) {
  let navigate = useNavigate();
  const classes = useStyles();
  return (
    <TableContainer component={Paper} sx={{ width: "100%" }}>
      <Table aria-label="simple table">
        <TableHead className={classes.root}>
          <TableRow>
            <TableCell
              sx={{ fontWeight: "bold" }}
              className={classes.tableRightBorder}
            >
              Kode Tipe
            </TableCell>
            <TableCell
              sx={{ fontWeight: "bold" }}
              className={classes.tableRightBorder}
            >
              Tahun
            </TableCell>
            <TableCell
              sx={{ fontWeight: "bold" }}
              className={classes.tableRightBorder}
            >
              Warna
            </TableCell>
            <TableCell
              sx={{ fontWeight: "bold" }}
              className={classes.tableRightBorder}
            >
              No. Rangka
            </TableCell>
            <TableCell
              sx={{ fontWeight: "bold" }}
              className={classes.tableRightBorder}
            >
              No. Mesin
            </TableCell>
            <TableCell
              sx={{ fontWeight: "bold" }}
              className={classes.tableRightBorder}
            >
              Nopol
            </TableCell>
            <TableCell
              sx={{ fontWeight: "bold" }}
              className={classes.tableRightBorder}
            >
              Nama STNK
            </TableCell>
            <TableCell
              sx={{ fontWeight: "bold" }}
              className={classes.tableRightBorder}
            >
              Tgl. STNK
            </TableCell>
            <TableCell
              sx={{ fontWeight: "bold" }}
              className={classes.tableRightBorder}
            >
              Jenis
            </TableCell>
            <TableCell
              sx={{ fontWeight: "bold" }}
              className={classes.tableRightBorder}
            >
              Harga Satuan
            </TableCell>
            <TableCell
              sx={{ fontWeight: "bold" }}
              className={classes.tableRightBorder}
            >
              PPN
            </TableCell>
            <TableCell
              sx={{ fontWeight: "bold" }}
              className={classes.tableRightBorder}
            >
              Tanggal Jual
            </TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>No. Jual</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {currentPosts.map((aBeli, index) => (
            <TableRow
              key={aBeli.kodeStok}
              sx={{
                "&:last-child td, &:last-child th": { border: 0 },
                "&:hover": { bgcolor: Colors.grey300 },
                cursor: "pointer"
              }}
              onClick={() => {
                navigate(`/daftarBeli/beli/${id}/${aBeli._id}`);
              }}
            >
              <TableCell component="th" scope="row">
                {aBeli.tipe}
              </TableCell>
              <TableCell>{aBeli.tahun}</TableCell>
              <TableCell>{aBeli.namaWarna}</TableCell>
              <TableCell>{aBeli.noRangka}</TableCell>
              <TableCell>{aBeli.noMesin}</TableCell>
              <TableCell>{aBeli.nopol}</TableCell>
              <TableCell>{aBeli.namaStnk}</TableCell>
              <TableCell>{aBeli.tglStnk}</TableCell>
              <TableCell>{aBeli.jenisABeli}</TableCell>
              <TableCell>{aBeli.hargaSatuan.toLocaleString()}</TableCell>
              <TableCell>{aBeli.ppnABeli.toLocaleString()}</TableCell>
              <TableCell>{aBeli.tanggalJual}</TableCell>
              <TableCell>{aBeli.noJual}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export function ShowTableAngsuran({ id, currentPosts }) {
  let navigate = useNavigate();
  const classes = useStyles();
  return (
    <TableContainer component={Paper} sx={{ width: "100%" }}>
      <Table aria-label="simple table">
        <TableHead className={classes.root}>
          <TableRow>
            <TableCell
              sx={{ fontWeight: "bold" }}
              className={classes.tableRightBorder}
            >
              Tgl. Bayar
            </TableCell>
            <TableCell
              sx={{ fontWeight: "bold" }}
              className={classes.tableRightBorder}
            >
              Tgl. Jt
            </TableCell>
            <TableCell
              sx={{ fontWeight: "bold" }}
              className={classes.tableRightBorder}
            >
              No. Kwitansi
            </TableCell>
            <TableCell
              sx={{ fontWeight: "bold" }}
              className={classes.tableRightBorder}
            >
              No
            </TableCell>
            <TableCell
              sx={{ fontWeight: "bold" }}
              className={classes.tableRightBorder}
            >
              A. Modal
            </TableCell>
            <TableCell
              sx={{ fontWeight: "bold" }}
              className={classes.tableRightBorder}
            >
              A. Bunga
            </TableCell>
            <TableCell
              sx={{ fontWeight: "bold" }}
              className={classes.tableRightBorder}
            >
              A/bulan
            </TableCell>
            <TableCell
              sx={{ fontWeight: "bold" }}
              className={classes.tableRightBorder}
            >
              Md1
            </TableCell>
            <TableCell
              sx={{ fontWeight: "bold" }}
              className={classes.tableRightBorder}
            >
              Md2
            </TableCell>
            <TableCell
              sx={{ fontWeight: "bold" }}
              className={classes.tableRightBorder}
            >
              Md3
            </TableCell>
            <TableCell
              sx={{ fontWeight: "bold" }}
              className={classes.tableRightBorder}
            >
              SP
            </TableCell>
            <TableCell
              sx={{ fontWeight: "bold" }}
              className={classes.tableRightBorder}
            >
              ST
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {currentPosts.map((angsuran, index) => (
            <TableRow
              key={angsuran._id}
              sx={{
                "&:last-child td, &:last-child th": { border: 0 },
                "&:hover": { bgcolor: Colors.grey300 },
                cursor: "pointer"
              }}
              onClick={() => {
                navigate(`/daftarAngsuran/angsuran/${id}/${angsuran._id}`);
              }}
            >
              <TableCell component="th" scope="row">
                {angsuran.tglBayar}
              </TableCell>
              <TableCell>{angsuran.tglJatuhTempo}</TableCell>
              <TableCell>{angsuran.noKwitansi}</TableCell>
              <TableCell>{angsuran._id}</TableCell>
              <TableCell>{angsuran.angModal.toLocaleString()}</TableCell>
              <TableCell>{angsuran.angBunga.toLocaleString()}</TableCell>
              <TableCell>{angsuran.angPerBulan.toLocaleString()}</TableCell>
              <TableCell>{angsuran.md1}</TableCell>
              <TableCell>{angsuran.md2}</TableCell>
              <TableCell>{angsuran.md3}</TableCell>
              <TableCell>{angsuran.sp}</TableCell>
              <TableCell>{angsuran.st}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export function ShowTableDaftarStok({ currentPosts, searchTerm, tipes }) {
  let navigate = useNavigate();
  const classes = useStyles();
  return (
    <TableContainer component={Paper} sx={{ width: "100%" }}>
      <Table aria-label="simple table">
        <TableHead className={classes.root}>
          <TableRow>
            <TableCell
              sx={{ fontWeight: "bold" }}
              className={classes.tableRightBorder}
            >
              No. Beli
            </TableCell>
            <TableCell
              sx={{ fontWeight: "bold" }}
              className={classes.tableRightBorder}
            >
              Tanggal Beli
            </TableCell>
            <TableCell
              sx={{ fontWeight: "bold" }}
              className={classes.tableRightBorder}
            >
              Supplier
            </TableCell>
            <TableCell
              sx={{ fontWeight: "bold" }}
              className={classes.tableRightBorder}
            >
              Merk
            </TableCell>
            <TableCell
              sx={{ fontWeight: "bold" }}
              className={classes.tableRightBorder}
            >
              Tipe
            </TableCell>
            <TableCell
              sx={{ fontWeight: "bold" }}
              className={classes.tableRightBorder}
            >
              No. Rangka
            </TableCell>
            <TableCell
              sx={{ fontWeight: "bold" }}
              className={classes.tableRightBorder}
            >
              No. Mesin
            </TableCell>
            <TableCell
              sx={{ fontWeight: "bold" }}
              className={classes.tableRightBorder}
            >
              Nopol
            </TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Nama Stnk</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Jenis</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {currentPosts
            .filter((val) => {
              if (searchTerm === "") {
                return val;
              } else if (
                val.merk.toUpperCase().includes(searchTerm.toUpperCase()) ||
                val.noRangka.toUpperCase().includes(searchTerm.toUpperCase()) ||
                val.noMesin.toUpperCase().includes(searchTerm.toUpperCase()) ||
                val.nopol.toUpperCase().includes(searchTerm.toUpperCase()) ||
                val.namaStnk.toUpperCase().includes(searchTerm.toUpperCase()) ||
                val.jenisBeli
                  .toUpperCase()
                  .includes(searchTerm.toUpperCase()) ||
                val.supplier.kodeSupplier
                  .toUpperCase()
                  .includes(searchTerm.toUpperCase()) ||
                val.supplier.namaSupplier
                  .toUpperCase()
                  .includes(searchTerm.toUpperCase()) ||
                val.tipe.toUpperCase().includes(searchTerm.toUpperCase()) ||
                tipes
                  .filter((tipe) => tipe.kodeTipe === val.tipe)
                  .map((sup) => sup.namaTipe)
                  .includes(searchTerm.toUpperCase())
              ) {
                return val;
              }
            })
            .map((user, index) => (
              <TableRow
                key={user._id}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                  "&:hover": { bgcolor: Colors.grey300 },
                  cursor: "pointer"
                }}
                onClick={() => {
                  navigate(`/daftarStok/${user._id}`);
                }}
              >
                <TableCell component="th" scope="row">
                  {user.noBeli}
                </TableCell>
                <TableCell>{user.tanggalBeli}</TableCell>
                <TableCell>
                  {user.supplier.kodeSupplier} - {user.supplier.namaSupplier}
                </TableCell>
                <TableCell>{user.merk}</TableCell>
                <TableCell>
                  {user.tipe} -
                  {tipes
                    .filter((tipe) => tipe.kodeTipe === user.tipe)
                    .map((sup) => ` ${sup.namaTipe}`)}
                </TableCell>
                <TableCell>{user.noRangka}</TableCell>
                <TableCell>{user.noMesin}</TableCell>
                <TableCell>{user.nopol}</TableCell>
                <TableCell>{user.namaStnk}</TableCell>
                <TableCell>{user.jenisBeli}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export function ShowTableJual({ currentPosts, searchTerm, leasings, tipes }) {
  let navigate = useNavigate();
  const classes = useStyles();
  return (
    <TableContainer component={Paper} sx={{ width: "100%" }}>
      <Table aria-label="simple table">
        <TableHead className={classes.root}>
          <TableRow>
            <TableCell
              sx={{ fontWeight: "bold" }}
              className={classes.tableRightBorder}
            >
              No. Jual
            </TableCell>
            <TableCell
              sx={{ fontWeight: "bold" }}
              className={classes.tableRightBorder}
            >
              Tanggal
            </TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Customer</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Leasing</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Tipe</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {currentPosts
            .filter((val) => {
              if (searchTerm === "") {
                return val;
              } else if (
                val.noJual.toUpperCase().includes(searchTerm.toUpperCase()) ||
                val.tglInput.toUpperCase().includes(searchTerm.toUpperCase()) ||
                val.namaRegister
                  .toUpperCase()
                  .includes(searchTerm.toUpperCase()) ||
                val.kodeLeasing._id
                  .toUpperCase()
                  .includes(searchTerm.toUpperCase()) ||
                val.kodeLeasing.namaLeasing
                  .toUpperCase()
                  .includes(searchTerm.toUpperCase()) ||
                val.tipe.toUpperCase().includes(searchTerm.toUpperCase()) ||
                tipes
                  .filter((tipe) => tipe.kodeTipe === val.tipe)
                  .map((sup) => sup.namaTipe)
                  .includes(searchTerm.toUpperCase())
              ) {
                return val;
              }
            })
            .map((user, index) => (
              <TableRow
                key={user._id}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                  "&:hover": { bgcolor: Colors.grey300 },
                  cursor: "pointer"
                }}
                onClick={() => {
                  navigate(`/jual/${user._id}`);
                }}
              >
                <TableCell component="th" scope="row">
                  {user.noJual}
                </TableCell>
                <TableCell>{user.tglInput}</TableCell>
                <TableCell>{user.namaRegister}</TableCell>
                <TableCell>
                  {user.kodeLeasing._id} - {user.kodeLeasing.namaLeasing}
                </TableCell>
                <TableCell>
                  {user.tipe} -
                  {tipes
                    .filter((tipe) => tipe.kodeTipe === user.tipe)
                    .map((sup) => ` ${sup.namaTipe}`)}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export function ShowTableSuratPemberitahuan({ currentPosts, searchTerm }) {
  let navigate = useNavigate();
  const classes = useStyles();
  return (
    <TableContainer component={Paper} sx={{ width: "100%" }}>
      <Table aria-label="simple table">
        <TableHead className={classes.root}>
          <TableRow>
            <TableCell
              sx={{ fontWeight: "bold" }}
              className={classes.tableRightBorder}
            >
              No. Jual
            </TableCell>
            <TableCell
              sx={{ fontWeight: "bold" }}
              className={classes.tableRightBorder}
            >
              Nama
            </TableCell>
            <TableCell
              sx={{ fontWeight: "bold" }}
              className={classes.tableRightBorder}
            >
              Alamat
            </TableCell>
            <TableCell
              sx={{ fontWeight: "bold" }}
              className={classes.tableRightBorder}
            >
              Tgl. Angsuran
            </TableCell>
            <TableCell
              sx={{ fontWeight: "bold" }}
              className={classes.tableRightBorder}
            >
              Tgl. SP
            </TableCell>
            <TableCell
              sx={{ fontWeight: "bold" }}
              className={classes.tableRightBorder}
            >
              SP Ke-
            </TableCell>
            <TableCell
              sx={{ fontWeight: "bold" }}
              className={classes.tableRightBorder}
            >
              Angsuran
            </TableCell>
            <TableCell
              sx={{ fontWeight: "bold" }}
              className={classes.tableRightBorder}
            >
              Bln
            </TableCell>
            <TableCell
              sx={{ fontWeight: "bold" }}
              className={classes.tableRightBorder}
            >
              Nopol
            </TableCell>
            <TableCell
              sx={{ fontWeight: "bold" }}
              className={classes.tableRightBorder}
            >
              Kolektor
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {currentPosts
            .filter((val) => {
              if (searchTerm === "") {
                return val;
              } else if (
                val.noJual.toUpperCase().includes(searchTerm.toUpperCase()) ||
                val.idJual.namaRegister
                  .toUpperCase()
                  .includes(searchTerm.toUpperCase()) ||
                val.idJual.almRegister
                  .toUpperCase()
                  .includes(searchTerm.toUpperCase()) ||
                val.idJual.tglAng
                  .toUpperCase()
                  .includes(searchTerm.toUpperCase()) ||
                val.tglSp.toUpperCase().includes(searchTerm.toUpperCase()) ||
                val.idJual.nopol
                  .toUpperCase()
                  .includes(searchTerm.toUpperCase())
              ) {
                return val;
              }
            })
            .map((user, index) => (
              <TableRow
                key={user._id}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                  "&:hover": { bgcolor: Colors.grey300 },
                  cursor: "pointer"
                }}
                onClick={() => {
                  navigate(`/suratPemberitahuan/${user._id}`);
                }}
              >
                <TableCell component="th" scope="row">
                  {user.noJual}
                </TableCell>
                <TableCell>{user.idJual.namaRegister}</TableCell>
                <TableCell>{user.idJual.almRegister}</TableCell>
                <TableCell>{user.idJual.tglAng}</TableCell>
                <TableCell>{user.tglSp}</TableCell>
                <TableCell>{user.spKe}</TableCell>
                <TableCell>
                  {user.idJual.angPerBulan.toLocaleString()}
                </TableCell>
                <TableCell>
                  {user.idJual.tenor - user.idJual.sisaBulan}
                </TableCell>
                <TableCell>{user.idJual.nopol}</TableCell>
                <TableCell>{`${user.kodeKolektor._id} - ${user.kodeKolektor.namaKolektor}`}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export function ShowTableSuratPenarikan({ currentPosts, searchTerm }) {
  let navigate = useNavigate();
  const classes = useStyles();
  return (
    <TableContainer component={Paper} sx={{ width: "100%" }}>
      <Table aria-label="simple table">
        <TableHead className={classes.root}>
          <TableRow>
            <TableCell
              sx={{ fontWeight: "bold" }}
              className={classes.tableRightBorder}
            >
              No. Jual
            </TableCell>
            <TableCell
              sx={{ fontWeight: "bold" }}
              className={classes.tableRightBorder}
            >
              No. ST
            </TableCell>
            <TableCell
              sx={{ fontWeight: "bold" }}
              className={classes.tableRightBorder}
            >
              Tgl. ST
            </TableCell>
            <TableCell
              sx={{ fontWeight: "bold" }}
              className={classes.tableRightBorder}
            >
              Kolektor
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {currentPosts
            .filter((val) => {
              if (searchTerm === "") {
                return val;
              } else if (
                val.noSt.toUpperCase().includes(searchTerm.toUpperCase()) ||
                val.tglSt.toUpperCase().includes(searchTerm.toUpperCase()) ||
                val.noJual.toUpperCase().includes(searchTerm.toUpperCase())
              ) {
                return val;
              }
            })
            .map((user, index) => (
              <TableRow
                key={user._id}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                  "&:hover": { bgcolor: Colors.grey300 },
                  cursor: "pointer"
                }}
                onClick={() => {
                  navigate(`/suratPenarikan/${user._id}`);
                }}
              >
                <TableCell component="th" scope="row">
                  {user.noJual}
                </TableCell>
                <TableCell>{user.noSt}</TableCell>
                <TableCell>{user.tglSt}</TableCell>
                <TableCell>{`${user.kodeKolektor._id} - ${user.kodeKolektor.namaKolektor}`}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export function ShowTableBiayaPerawatan({ currentPosts, searchTerm }) {
  let navigate = useNavigate();
  const classes = useStyles();
  return (
    <TableContainer component={Paper} sx={{ width: "100%" }}>
      <Table aria-label="simple table">
        <TableHead className={classes.root}>
          <TableRow>
            <TableCell
              sx={{ fontWeight: "bold" }}
              className={classes.tableRightBorder}
            >
              No. Bukti
            </TableCell>
            <TableCell
              sx={{ fontWeight: "bold" }}
              className={classes.tableRightBorder}
            >
              Nopol
            </TableCell>
            <TableCell
              sx={{ fontWeight: "bold" }}
              className={classes.tableRightBorder}
            >
              Tanggal
            </TableCell>
            <TableCell
              sx={{ fontWeight: "bold" }}
              className={classes.tableRightBorder}
            >
              Keterangan
            </TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Biaya</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {currentPosts
            .filter((val) => {
              if (searchTerm === "") {
                return val;
              } else if (
                val.noBukti.toUpperCase().includes(searchTerm.toUpperCase()) ||
                val.nopol.toUpperCase().includes(searchTerm.toUpperCase()) ||
                val.tglPerawatan
                  .toUpperCase()
                  .includes(searchTerm.toUpperCase()) ||
                val.keterangan.toUpperCase().includes(searchTerm.toUpperCase())
              ) {
                return val;
              }
            })
            .map((user, index) => (
              <TableRow
                key={user._id}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                  "&:hover": { bgcolor: Colors.grey300 },
                  cursor: "pointer"
                }}
                onClick={() => {
                  navigate(`/biayaPerawatan/${user._id}`);
                }}
              >
                <TableCell component="th" scope="row">
                  {user.noBukti}
                </TableCell>
                <TableCell>{user.nopol}</TableCell>
                <TableCell>{user.tglPerawatan}</TableCell>
                <TableCell>{user.keterangan}</TableCell>
                <TableCell>{user.biayaPerawatan.toLocaleString()}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export function ShowTableDaftarKasMasuk({ currentPosts, searchTerm }) {
  let navigate = useNavigate();
  const classes = useStyles();
  return (
    <TableContainer component={Paper} sx={{ width: "100%" }}>
      <Table aria-label="simple table">
        <TableHead className={classes.root}>
          <TableRow>
            <TableCell
              sx={{ fontWeight: "bold" }}
              className={classes.tableRightBorder}
            >
              No. Bukti
            </TableCell>
            <TableCell
              sx={{ fontWeight: "bold" }}
              className={classes.tableRightBorder}
            >
              Tgl. Kas Masuk
            </TableCell>
            <TableCell
              sx={{ fontWeight: "bold" }}
              className={classes.tableRightBorder}
            >
              COA
            </TableCell>
            <TableCell
              sx={{ fontWeight: "bold" }}
              className={classes.tableRightBorder}
            >
              Keterangan
            </TableCell>
            <TableCell
              sx={{ fontWeight: "bold" }}
              className={classes.tableRightBorder}
            >
              Jumlah
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {currentPosts
            .filter((val) => {
              if (searchTerm === "") {
                return val;
              } else if (
                val.noBukti.toUpperCase().includes(searchTerm.toUpperCase()) ||
                val.tglKasMasuk.toString().includes(searchTerm) ||
                val.COA.kodeCOA.toString().includes(searchTerm) ||
                val.COA.namaCOA.toString().includes(searchTerm) ||
                val.keterangan
                  .toString()
                  .toUpperCase()
                  .includes(searchTerm.toUpperCase())
              ) {
                return val;
              }
            })
            .map((user, index) => (
              <TableRow
                key={user._id}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                  "&:hover": { bgcolor: Colors.grey300 },
                  cursor: "pointer"
                }}
                onClick={() => {
                  navigate(`/daftarKasMasuk/kasMasuk/${user._id}`);
                }}
              >
                <TableCell component="th" scope="row">
                  {user.noBukti}
                </TableCell>
                <TableCell>{user.tglKasMasuk}</TableCell>
                <TableCell>{`${user.COA.kodeCOA} - ${user.COA.namaCOA}`}</TableCell>
                <TableCell>{user.keterangan}</TableCell>
                <TableCell>{user.jumlah.toLocaleString()}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export function ShowTableKasMasuk({ id, currentPosts }) {
  let navigate = useNavigate();
  const classes = useStyles();
  return (
    <TableContainer component={Paper} sx={{ width: "100%" }}>
      <Table aria-label="simple table">
        <TableHead className={classes.root}>
          <TableRow>
            <TableCell
              sx={{ fontWeight: "bold" }}
              className={classes.tableRightBorder}
            >
              No. Bukti
            </TableCell>
            <TableCell
              sx={{ fontWeight: "bold" }}
              className={classes.tableRightBorder}
            >
              Tgl. Kas Masuk
            </TableCell>
            <TableCell
              sx={{ fontWeight: "bold" }}
              className={classes.tableRightBorder}
            >
              COA
            </TableCell>
            <TableCell
              sx={{ fontWeight: "bold" }}
              className={classes.tableRightBorder}
            >
              Keterangan
            </TableCell>
            <TableCell
              sx={{ fontWeight: "bold" }}
              className={classes.tableRightBorder}
            >
              Jumlah
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {currentPosts.map((kasMasukChild, index) => (
            <TableRow
              key={kasMasukChild.kodeStok}
              sx={{
                "&:last-child td, &:last-child th": { border: 0 },
                "&:hover": { bgcolor: Colors.grey300 },
                cursor: "pointer"
              }}
              onClick={() => {
                navigate(`/daftarKasMasuk/kasMasuk/${id}/${kasMasukChild._id}`);
              }}
            >
              <TableCell component="th" scope="row">
                {kasMasukChild.noBukti}
              </TableCell>
              <TableCell>{kasMasukChild.tglKasMasuk}</TableCell>
              <TableCell>{`${kasMasukChild.COA.kodeCOA} - ${kasMasukChild.COA.namaCOA}`}</TableCell>
              <TableCell>{kasMasukChild.keterangan}</TableCell>
              <TableCell>{kasMasukChild.jumlah.toLocaleString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export function ShowTableDaftarKasKeluar({ currentPosts, searchTerm }) {
  let navigate = useNavigate();
  const classes = useStyles();
  return (
    <TableContainer component={Paper} sx={{ width: "100%" }}>
      <Table aria-label="simple table">
        <TableHead className={classes.root}>
          <TableRow>
            <TableCell
              sx={{ fontWeight: "bold" }}
              className={classes.tableRightBorder}
            >
              No. Bukti
            </TableCell>
            <TableCell
              sx={{ fontWeight: "bold" }}
              className={classes.tableRightBorder}
            >
              Tgl. Kas Keluar
            </TableCell>
            <TableCell
              sx={{ fontWeight: "bold" }}
              className={classes.tableRightBorder}
            >
              COA
            </TableCell>
            <TableCell
              sx={{ fontWeight: "bold" }}
              className={classes.tableRightBorder}
            >
              Keterangan
            </TableCell>
            <TableCell
              sx={{ fontWeight: "bold" }}
              className={classes.tableRightBorder}
            >
              Jumlah
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {currentPosts
            .filter((val) => {
              if (searchTerm === "") {
                return val;
              } else if (
                val.noBukti.toUpperCase().includes(searchTerm.toUpperCase()) ||
                val.tglKasKeluar.toString().includes(searchTerm) ||
                val.COA.kodeCOA.toString().includes(searchTerm) ||
                val.COA.namaCOA.toString().includes(searchTerm) ||
                val.keterangan
                  .toString()
                  .toUpperCase()
                  .includes(searchTerm.toUpperCase())
              ) {
                return val;
              }
            })
            .map((user, index) => (
              <TableRow
                key={user._id}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                  "&:hover": { bgcolor: Colors.grey300 },
                  cursor: "pointer"
                }}
                onClick={() => {
                  navigate(`/daftarKasKeluar/kasKeluar/${user._id}`);
                }}
              >
                <TableCell component="th" scope="row">
                  {user.noBukti}
                </TableCell>
                <TableCell>{user.tglKasKeluar}</TableCell>
                <TableCell>{`${user.COA.kodeCOA} - ${user.COA.namaCOA}`}</TableCell>
                <TableCell>{user.keterangan}</TableCell>
                <TableCell>{user.jumlah.toLocaleString()}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export function ShowTableKasKeluar({ id, currentPosts }) {
  let navigate = useNavigate();
  const classes = useStyles();
  return (
    <TableContainer component={Paper} sx={{ width: "100%" }}>
      <Table aria-label="simple table">
        <TableHead className={classes.root}>
          <TableRow>
            <TableCell
              sx={{ fontWeight: "bold" }}
              className={classes.tableRightBorder}
            >
              No. Bukti
            </TableCell>
            <TableCell
              sx={{ fontWeight: "bold" }}
              className={classes.tableRightBorder}
            >
              Tgl. Kas Keluar
            </TableCell>
            <TableCell
              sx={{ fontWeight: "bold" }}
              className={classes.tableRightBorder}
            >
              COA
            </TableCell>
            <TableCell
              sx={{ fontWeight: "bold" }}
              className={classes.tableRightBorder}
            >
              Keterangan
            </TableCell>
            <TableCell
              sx={{ fontWeight: "bold" }}
              className={classes.tableRightBorder}
            >
              Jumlah
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {currentPosts.map((kasKeluarChild, index) => (
            <TableRow
              key={kasKeluarChild.kodeStok}
              sx={{
                "&:last-child td, &:last-child th": { border: 0 },
                "&:hover": { bgcolor: Colors.grey300 },
                cursor: "pointer"
              }}
              onClick={() => {
                navigate(
                  `/daftarKasKeluar/kasKeluar/${id}/${kasKeluarChild._id}`
                );
              }}
            >
              <TableCell component="th" scope="row">
                {kasKeluarChild.noBukti}
              </TableCell>
              <TableCell>{kasKeluarChild.tglKasKeluar}</TableCell>
              <TableCell>{`${kasKeluarChild.COA.kodeCOA} - ${kasKeluarChild.COA.namaCOA}`}</TableCell>
              <TableCell>{kasKeluarChild.keterangan}</TableCell>
              <TableCell>{kasKeluarChild.jumlah.toLocaleString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export function ShowTableDaftarBankMasuk({ currentPosts, searchTerm }) {
  let navigate = useNavigate();
  const classes = useStyles();
  return (
    <TableContainer component={Paper} sx={{ width: "100%" }}>
      <Table aria-label="simple table">
        <TableHead className={classes.root}>
          <TableRow>
            <TableCell
              sx={{ fontWeight: "bold" }}
              className={classes.tableRightBorder}
            >
              No. Bukti
            </TableCell>
            <TableCell
              sx={{ fontWeight: "bold" }}
              className={classes.tableRightBorder}
            >
              Tgl. Bank Masuk
            </TableCell>
            <TableCell
              sx={{ fontWeight: "bold" }}
              className={classes.tableRightBorder}
            >
              COA
            </TableCell>
            <TableCell
              sx={{ fontWeight: "bold" }}
              className={classes.tableRightBorder}
            >
              Keterangan
            </TableCell>
            <TableCell
              sx={{ fontWeight: "bold" }}
              className={classes.tableRightBorder}
            >
              Jumlah
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {currentPosts
            .filter((val) => {
              if (searchTerm === "") {
                return val;
              } else if (
                val.noBukti.toUpperCase().includes(searchTerm.toUpperCase()) ||
                val.tglBankMasuk.toString().includes(searchTerm) ||
                val.COA.kodeCOA.toString().includes(searchTerm) ||
                val.COA.namaCOA.toString().includes(searchTerm) ||
                val.keterangan
                  .toString()
                  .toUpperCase()
                  .includes(searchTerm.toUpperCase())
              ) {
                return val;
              }
            })
            .map((user, index) => (
              <TableRow
                key={user._id}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                  "&:hover": { bgcolor: Colors.grey300 },
                  cursor: "pointer"
                }}
                onClick={() => {
                  navigate(`/daftarBankMasuk/bankMasuk/${user._id}`);
                }}
              >
                <TableCell component="th" scope="row">
                  {user.noBukti}
                </TableCell>
                <TableCell>{user.tglBankMasuk}</TableCell>
                <TableCell>{`${user.COA.kodeCOA} - ${user.COA.namaCOA}`}</TableCell>
                <TableCell>{user.keterangan}</TableCell>
                <TableCell>{user.jumlah.toLocaleString()}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export function ShowTableBankMasuk({ id, currentPosts }) {
  let navigate = useNavigate();
  const classes = useStyles();
  return (
    <TableContainer component={Paper} sx={{ width: "100%" }}>
      <Table aria-label="simple table">
        <TableHead className={classes.root}>
          <TableRow>
            <TableCell
              sx={{ fontWeight: "bold" }}
              className={classes.tableRightBorder}
            >
              No. Bukti
            </TableCell>
            <TableCell
              sx={{ fontWeight: "bold" }}
              className={classes.tableRightBorder}
            >
              Tgl. Bank Masuk
            </TableCell>
            <TableCell
              sx={{ fontWeight: "bold" }}
              className={classes.tableRightBorder}
            >
              COA
            </TableCell>
            <TableCell
              sx={{ fontWeight: "bold" }}
              className={classes.tableRightBorder}
            >
              Keterangan
            </TableCell>
            <TableCell
              sx={{ fontWeight: "bold" }}
              className={classes.tableRightBorder}
            >
              Jumlah
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {currentPosts.map((bankMasukChild, index) => (
            <TableRow
              key={bankMasukChild.kodeStok}
              sx={{
                "&:last-child td, &:last-child th": { border: 0 },
                "&:hover": { bgcolor: Colors.grey300 },
                cursor: "pointer"
              }}
              onClick={() => {
                navigate(
                  `/daftarBankMasuk/bankMasuk/${id}/${bankMasukChild._id}`
                );
              }}
            >
              <TableCell component="th" scope="row">
                {bankMasukChild.noBukti}
              </TableCell>
              <TableCell>{bankMasukChild.tglBankMasuk}</TableCell>
              <TableCell>{`${bankMasukChild.COA.kodeCOA} - ${bankMasukChild.COA.namaCOA}`}</TableCell>
              <TableCell>{bankMasukChild.keterangan}</TableCell>
              <TableCell>{bankMasukChild.jumlah.toLocaleString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export function ShowTableDaftarBankKeluar({ currentPosts, searchTerm }) {
  let navigate = useNavigate();
  const classes = useStyles();
  return (
    <TableContainer component={Paper} sx={{ width: "100%" }}>
      <Table aria-label="simple table">
        <TableHead className={classes.root}>
          <TableRow>
            <TableCell
              sx={{ fontWeight: "bold" }}
              className={classes.tableRightBorder}
            >
              No. Bukti
            </TableCell>
            <TableCell
              sx={{ fontWeight: "bold" }}
              className={classes.tableRightBorder}
            >
              Tgl. Bank Keluar
            </TableCell>
            <TableCell
              sx={{ fontWeight: "bold" }}
              className={classes.tableRightBorder}
            >
              COA
            </TableCell>
            <TableCell
              sx={{ fontWeight: "bold" }}
              className={classes.tableRightBorder}
            >
              Keterangan
            </TableCell>
            <TableCell
              sx={{ fontWeight: "bold" }}
              className={classes.tableRightBorder}
            >
              Jumlah
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {currentPosts
            .filter((val) => {
              if (searchTerm === "") {
                return val;
              } else if (
                val.noBukti.toUpperCase().includes(searchTerm.toUpperCase()) ||
                val.tglBankKeluar.toString().includes(searchTerm) ||
                val.COA.kodeCOA.toString().includes(searchTerm) ||
                val.COA.namaCOA.toString().includes(searchTerm) ||
                val.keterangan
                  .toString()
                  .toUpperCase()
                  .includes(searchTerm.toUpperCase())
              ) {
                return val;
              }
            })
            .map((user, index) => (
              <TableRow
                key={user._id}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                  "&:hover": { bgcolor: Colors.grey300 },
                  cursor: "pointer"
                }}
                onClick={() => {
                  navigate(`/daftarBankKeluar/bankKeluar/${user._id}`);
                }}
              >
                <TableCell component="th" scope="row">
                  {user.noBukti}
                </TableCell>
                <TableCell>{user.tglBankKeluar}</TableCell>
                <TableCell>{`${user.COA.kodeCOA} - ${user.COA.namaCOA}`}</TableCell>
                <TableCell>{user.keterangan}</TableCell>
                <TableCell>{user.jumlah.toLocaleString()}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export function ShowTableBankKeluar({ id, currentPosts }) {
  let navigate = useNavigate();
  const classes = useStyles();
  return (
    <TableContainer component={Paper} sx={{ width: "100%" }}>
      <Table aria-label="simple table">
        <TableHead className={classes.root}>
          <TableRow>
            <TableCell
              sx={{ fontWeight: "bold" }}
              className={classes.tableRightBorder}
            >
              No. Bukti
            </TableCell>
            <TableCell
              sx={{ fontWeight: "bold" }}
              className={classes.tableRightBorder}
            >
              Tgl. Bank Keluar
            </TableCell>
            <TableCell
              sx={{ fontWeight: "bold" }}
              className={classes.tableRightBorder}
            >
              COA
            </TableCell>
            <TableCell
              sx={{ fontWeight: "bold" }}
              className={classes.tableRightBorder}
            >
              Keterangan
            </TableCell>
            <TableCell
              sx={{ fontWeight: "bold" }}
              className={classes.tableRightBorder}
            >
              Jumlah
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {currentPosts.map((bankKeluarChild, index) => (
            <TableRow
              key={bankKeluarChild.kodeStok}
              sx={{
                "&:last-child td, &:last-child th": { border: 0 },
                "&:hover": { bgcolor: Colors.grey300 },
                cursor: "pointer"
              }}
              onClick={() => {
                navigate(
                  `/daftarBankKeluar/bankKeluar/${id}/${bankKeluarChild._id}`
                );
              }}
            >
              <TableCell component="th" scope="row">
                {bankKeluarChild.noBukti}
              </TableCell>
              <TableCell>{bankKeluarChild.tglBankKeluar}</TableCell>
              <TableCell>{`${bankKeluarChild.COA.kodeCOA} - ${bankKeluarChild.COA.namaCOA}`}</TableCell>
              <TableCell>{bankKeluarChild.keterangan}</TableCell>
              <TableCell>{bankKeluarChild.jumlah.toLocaleString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
