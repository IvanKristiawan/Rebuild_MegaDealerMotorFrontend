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
  Button
} from "@mui/material";
import {
  SearchBar,
  Loader,
  usePagination,
  ButtonModifier
} from "../../../components";
import { tempUrl } from "../../../contexts/ContextProvider";
import { useStateContext } from "../../../contexts/ContextProvider";
import jsPDF from "jspdf";
import "jspdf-autotable";
import html2canvas from "html2canvas";
import PrintIcon from "@mui/icons-material/Print";

const TampilRegister = () => {
  const { user, dispatch } = useContext(AuthContext);
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const { screenSize } = useStateContext();

  const [noRegister, setNoRegister] = useState("");
  const [tanggalRegister, setTanggalRegister] = useState("");
  const [namaRegister, setNamaRegister] = useState("");
  const [almRegister, setAlmRegister] = useState("");
  const [tlpRegister, setTlpRegister] = useState("");
  const [noKtpRegister, setNoKtpRegister] = useState("");
  const [almKtpRegister, setAlmKtpRegister] = useState("");
  const [noKKRegister, setNoKKRegister] = useState("");
  const [namaPjmRegister, setNamaPjmRegister] = useState("");
  const [almPjmRegister, setAlmPjmRegister] = useState("");
  const [tlpPjmRegister, setTlpPjmRegister] = useState("");
  const [hubunganRegister, setHubunganRegister] = useState("");
  const [noKtpPjmRegister, setNoKtpPjmRegister] = useState("");
  const [pkjRegister, setPkjRegister] = useState("");
  const [namaRefRegister, setNamaRefRegister] = useState("");
  const [almRefRegister, setAlmRefRegister] = useState("");
  const [tlpRefRegister, setTlpRefRegister] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUser] = useState([]);
  const navigate = useNavigate();

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
      val.noRegister.toUpperCase().includes(searchTerm.toUpperCase()) ||
      val.tanggalRegister.toUpperCase().includes(searchTerm.toUpperCase()) ||
      val.namaRegister.toUpperCase().includes(searchTerm.toUpperCase()) ||
      val.almRegister.toUpperCase().includes(searchTerm.toUpperCase()) ||
      val.tlpRegister.toUpperCase().includes(searchTerm.toUpperCase()) ||
      val.noKtpRegister.toUpperCase().includes(searchTerm.toUpperCase()) ||
      val.almKtpRegister.toUpperCase().includes(searchTerm.toUpperCase()) ||
      val.noKKRegister.toUpperCase().includes(searchTerm.toUpperCase()) ||
      val.namaPjmRegister.toUpperCase().includes(searchTerm.toUpperCase()) ||
      val.almPjmRegister.toUpperCase().includes(searchTerm.toUpperCase()) ||
      val.tlpPjmRegister.toUpperCase().includes(searchTerm.toUpperCase()) ||
      val.hubunganRegister.toUpperCase().includes(searchTerm.toUpperCase()) ||
      val.noKtpPjmRegister.toUpperCase().includes(searchTerm.toUpperCase()) ||
      val.pkjRegister.toUpperCase().includes(searchTerm.toUpperCase()) ||
      val.namaRefRegister.toUpperCase().includes(searchTerm.toUpperCase()) ||
      val.almRefRegister.toUpperCase().includes(searchTerm.toUpperCase()) ||
      val.tlpRefRegister.toUpperCase().includes(searchTerm.toUpperCase())
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
    id && getUserById();
  }, [id]);

  const getUsers = async () => {
    setLoading(true);
    const response = await axios.post(`${tempUrl}/registers`, {
      id: user._id,
      token: user.token
    });
    setUser(response.data);
    setLoading(false);
  };

  const getUserById = async () => {
    if (id) {
      const response = await axios.post(`${tempUrl}/registers/${id}`, {
        id: user._id,
        token: user.token
      });
      setNoRegister(response.data.noRegister);
      setTanggalRegister(response.data.tanggalRegister);
      setNamaRegister(response.data.namaRegister);
      setAlmRegister(response.data.almRegister);
      setTlpRegister(response.data.tlpRegister);
      setNoKtpRegister(response.data.noKtpRegister);
      setAlmKtpRegister(response.data.almKtpRegister);
      setNoKKRegister(response.data.noKKRegister);
      setNamaPjmRegister(response.data.namaPjmRegister);
      setAlmPjmRegister(response.data.almPjmRegister);
      setTlpPjmRegister(response.data.tlpPjmRegister);
      setHubunganRegister(response.data.hubunganRegister);
      setNoKtpPjmRegister(response.data.noKtpPjmRegister);
      setPkjRegister(response.data.pkjRegister);
      setNamaRefRegister(response.data.namaRefRegister);
      setAlmRefRegister(response.data.almRefRegister);
      setTlpRefRegister(response.data.tlpRefRegister);
    }
  };

  const deleteUser = async (id) => {
    try {
      setLoading(true);
      await axios.post(`${tempUrl}/deleteRegister/${id}`, {
        id: user._id,
        token: user.token
      });
      getUsers();
      setNoRegister("");
      setTanggalRegister("");
      setNamaRegister("");
      setAlmRegister("");
      setTlpRegister("");
      setNoKtpRegister("");
      setAlmKtpRegister("");
      setNoKKRegister("");
      setNamaPjmRegister("");
      setAlmPjmRegister("");
      setTlpPjmRegister("");
      setHubunganRegister("");
      setNoKtpPjmRegister("");
      setPkjRegister("");
      setNamaRefRegister("");
      setAlmRefRegister("");
      setTlpRefRegister("");
      setLoading(false);
      navigate("/register");
    } catch (error) {
      console.log(error);
    }
  };

  const generatePDF = () => {
    var date = new Date();
    var current_date =
      date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear();
    var current_time =
      date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
    const quality = 1; // Higher the better but larger file
    html2canvas(document.querySelector("#content"), { scale: quality }).then(
      (canvas) => {
        const pdf = new jsPDF("p", "mm", "a4");
        pdf.setFontSize(12);
        pdf.text(`${namaPerusahaan} - ${kotaPerusahaan}`, 15, 10);
        pdf.text(`${lokasiPerusahaan}`, 15, 15);
        pdf.setFontSize(16);
        pdf.text(`Daftar Register Penjualan`, 80, 30);
        pdf.addImage(canvas.toDataURL("image/png"), "PNG", 10, 40, 190, 90);
        pdf.setFontSize(10);
        pdf.text(
          `Dicetak Oleh: ${user.username} | Tanggal : ${current_date} | Jam : ${current_time}`,
          15,
          280
        );
        pdf.save("daftarRegisterPenjualan.pdf");
      }
    );
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <Box sx={container}>
      <Typography color="#757575">Penjualan</Typography>
      <Typography variant="h4" sx={subTitleText}>
        Register Penjualan
      </Typography>
      <Box sx={buttonModifierContainer}>
        <Button
          variant="outlined"
          color="secondary"
          startIcon={<PrintIcon />}
          onClick={() => generatePDF()}
        >
          Cetak
        </Button>
      </Box>
      <Box sx={buttonModifierContainer}>
        <ButtonModifier
          id={id}
          kode={noRegister}
          addLink={`/register/tambahRegister`}
          editLink={`/register/${id}/edit`}
          deleteUser={deleteUser}
          nameUser={noRegister}
        />
      </Box>
      {noRegister.length !== 0 && (
        <>
          <Divider sx={dividerStyle} />
          <Box sx={showDataContainer}>
            <Box sx={showDataWrapper}>
              <Typography sx={labelInput}>No</Typography>
              <TextField
                size="small"
                id="outlined-basic"
                variant="filled"
                InputProps={{
                  readOnly: true
                }}
                value={noRegister}
              />
              <Typography sx={[labelInput, spacingTop]}>Tanggal</Typography>
              <TextField
                size="small"
                id="outlined-basic"
                variant="filled"
                InputProps={{
                  readOnly: true
                }}
                value={tanggalRegister}
              />
              <Typography sx={[labelInput, spacingTop]}>
                Nama Register
              </Typography>
              <TextField
                size="small"
                id="outlined-basic"
                variant="filled"
                InputProps={{
                  readOnly: true
                }}
                value={namaRegister}
              />
              <Typography sx={[labelInput, spacingTop]}>
                Alamat Register
              </Typography>
              <TextField
                size="small"
                id="outlined-basic"
                variant="filled"
                InputProps={{
                  readOnly: true
                }}
                value={almRegister}
              />
              <Typography sx={[labelInput, spacingTop]}>
                Telepon Register
              </Typography>
              <TextField
                size="small"
                id="outlined-basic"
                variant="filled"
                InputProps={{
                  readOnly: true
                }}
                value={tlpRegister}
              />
              <Typography sx={[labelInput, spacingTop]}>
                No. KTP Register
              </Typography>
              <TextField
                size="small"
                id="outlined-basic"
                variant="filled"
                InputProps={{
                  readOnly: true
                }}
                value={noKtpRegister}
              />
              <Typography sx={[labelInput, spacingTop]}>
                Alamat KTP Register
              </Typography>
              <TextField
                size="small"
                id="outlined-basic"
                variant="filled"
                InputProps={{
                  readOnly: true
                }}
                value={almKtpRegister}
              />
              <Typography sx={[labelInput, spacingTop]}>
                No. KK Register
              </Typography>
              <TextField
                size="small"
                id="outlined-basic"
                variant="filled"
                InputProps={{
                  readOnly: true
                }}
                value={noKKRegister}
              />
              <Typography sx={[labelInput, spacingTop]}>
                Nama Penjamin
              </Typography>
              <TextField
                size="small"
                id="outlined-basic"
                variant="filled"
                InputProps={{
                  readOnly: true
                }}
                value={namaPjmRegister}
              />
            </Box>
            <Box sx={[showDataWrapper, secondWrapper]}>
              <Typography sx={labelInput}>Alamat Penjamin</Typography>
              <TextField
                size="small"
                id="outlined-basic"
                variant="filled"
                InputProps={{
                  readOnly: true
                }}
                value={almPjmRegister}
              />
              <Typography sx={[labelInput, spacingTop]}>
                Telepon Penjamin
              </Typography>
              <TextField
                size="small"
                id="outlined-basic"
                variant="filled"
                InputProps={{
                  readOnly: true
                }}
                value={tlpPjmRegister}
              />
              <Typography sx={[labelInput, spacingTop]}>
                Hubungan Penjamin
              </Typography>
              <TextField
                size="small"
                id="outlined-basic"
                variant="filled"
                InputProps={{
                  readOnly: true
                }}
                value={hubunganRegister}
              />
              <Typography sx={[labelInput, spacingTop]}>
                No. KTP Penjamin
              </Typography>
              <TextField
                size="small"
                id="outlined-basic"
                variant="filled"
                InputProps={{
                  readOnly: true
                }}
                value={noKtpPjmRegister}
              />
              <Typography sx={[labelInput, spacingTop]}>
                Pekerjaan Penjamin
              </Typography>
              <TextField
                size="small"
                id="outlined-basic"
                variant="filled"
                InputProps={{
                  readOnly: true
                }}
                value={pkjRegister}
              />
              <Typography sx={[labelInput, spacingTop]}>
                Nama Referensi
              </Typography>
              <TextField
                size="small"
                id="outlined-basic"
                variant="filled"
                InputProps={{
                  readOnly: true
                }}
                value={namaRefRegister}
              />
              <Typography sx={[labelInput, spacingTop]}>
                Alamat Referensi
              </Typography>
              <TextField
                size="small"
                id="outlined-basic"
                variant="filled"
                InputProps={{
                  readOnly: true
                }}
                value={almRefRegister}
              />
              <Typography sx={[labelInput, spacingTop]}>
                Telepon Referensi
              </Typography>
              <TextField
                size="small"
                id="outlined-basic"
                variant="filled"
                InputProps={{
                  readOnly: true
                }}
                value={tlpRefRegister}
              />
            </Box>
          </Box>
        </>
      )}
      <Divider sx={dividerStyle} />
      <Box sx={searchBarContainer}>
        <SearchBar setSearchTerm={setSearchTerm} />
      </Box>
      <Box sx={tableContainer}>
        <table id="content">
          <tr>
            <th style={thTable}>No</th>
            <th style={thTable}>Tanggal</th>
            <th style={thTable}>Nama</th>
            <th style={thTable}>Alamat</th>
            <th style={thTable}>Telepon</th>
            <th style={thTable}>No. KTP</th>
            <th style={thTable}>Alm. KTP</th>
            <th style={thTable}>No. KK</th>
            <th style={thTable}>Nama Penjamin</th>
          </tr>
          <tr>
            <th style={thTable}></th>
            <th style={thTable}>Alm. Penjamin</th>
            <th style={thTable}>Tlp. Penjamin</th>
            <th style={thTable}>Hubungan</th>
            <th style={thTable}>No. KTP Penjamin</th>
            <th style={thTable}>Pekerjaan Penjamin</th>
            <th style={thTable}>Nama Ref.</th>
            <th style={thTable}>Alm. Ref.</th>
            <th style={thTable}>Tlp. Ref.</th>
          </tr>
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
                  .includes(searchTerm.toUpperCase()) ||
                val.almKtpRegister
                  .toUpperCase()
                  .includes(searchTerm.toUpperCase()) ||
                val.noKKRegister
                  .toUpperCase()
                  .includes(searchTerm.toUpperCase()) ||
                val.namaPjmRegister
                  .toUpperCase()
                  .includes(searchTerm.toUpperCase()) ||
                val.almPjmRegister
                  .toUpperCase()
                  .includes(searchTerm.toUpperCase()) ||
                val.tlpPjmRegister
                  .toUpperCase()
                  .includes(searchTerm.toUpperCase()) ||
                val.hubunganRegister
                  .toUpperCase()
                  .includes(searchTerm.toUpperCase()) ||
                val.noKtpPjmRegister
                  .toUpperCase()
                  .includes(searchTerm.toUpperCase()) ||
                val.pkjRegister
                  .toUpperCase()
                  .includes(searchTerm.toUpperCase()) ||
                val.namaRefRegister
                  .toUpperCase()
                  .includes(searchTerm.toUpperCase()) ||
                val.almRefRegister
                  .toUpperCase()
                  .includes(searchTerm.toUpperCase()) ||
                val.tlpRefRegister
                  .toUpperCase()
                  .includes(searchTerm.toUpperCase())
              ) {
                return val;
              }
            })
            .map((user, index) => (
              <>
                <tr
                  style={{
                    cursor: "pointer",
                    height: "100px",
                    backgroundColor: index % 2 === 0 && "#dddddd"
                  }}
                  onClick={() => {
                    navigate(`/register/${user._id}`);
                  }}
                >
                  <td style={tdTable}>{user.noRegister}</td>
                  <td style={tdTable}>{user.tanggalRegister}</td>
                  <td style={tdTable}>{user.namaRegister}</td>
                  <td style={tdTable}>{user.almRegister}</td>
                  <td style={tdTable}>{user.tlpRegister}</td>
                  <td style={tdTable}>{user.noKtpRegister}</td>
                  <td style={tdTable}>{user.almKtpRegister}</td>
                  <td style={tdTable}>{user.noKKRegister}</td>
                  <td style={tdTable}>{user.namaPjmRegister}</td>
                </tr>
                <tr
                  style={{
                    cursor: "pointer",
                    height: "100px",
                    backgroundColor: index % 2 === 0 && "#dddddd"
                  }}
                  onClick={() => {
                    navigate(`/register/${user._id}`);
                  }}
                >
                  <td style={tdTable}></td>
                  <td style={tdTable}>{user.almPjmRegister}</td>
                  <td style={tdTable}>{user.tlpPjmRegister}</td>
                  <td style={tdTable}>{user.hubunganRegister}</td>
                  <td style={tdTable}>{user.noKtpPjmRegister}</td>
                  <td style={tdTable}>{user.pkjRegister}</td>
                  <td style={tdTable}>{user.namaRefRegister}</td>
                  <td style={tdTable}>{user.almRefRegister}</td>
                  <td style={tdTable}>{user.tlpRefRegister}</td>
                </tr>
              </>
            ))}
        </table>
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

export default TampilRegister;

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

const tdTable = {
  border: "1px solid #dddddd",
  textAlign: "left",
  padding: "8px"
};

const thTable = {
  border: "1px solid #dddddd",
  textAlign: "left",
  padding: "8px",
  backgroundColor: "gray",
  color: "white"
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
