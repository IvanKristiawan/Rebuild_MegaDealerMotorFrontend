import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import {
  namaPerusahaan,
  lokasiPerusahaan,
  kotaPerusahaan,
  lokasiSP
} from "../../../constants/GeneralSetting";
import { AuthContext } from "../../../contexts/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Box,
  TextField,
  Typography,
  Divider,
  Pagination,
  ButtonGroup,
  Button
} from "@mui/material";
import { ShowTableSuratPenarikan } from "../../../components/ShowTable";
import { FetchErrorHandling } from "../../../components/FetchErrorHandling";
import {
  SearchBar,
  Loader,
  usePagination,
  ButtonModifier
} from "../../../components";
import { tempUrl } from "../../../contexts/ContextProvider";
import { useStateContext } from "../../../contexts/ContextProvider";
import { Colors } from "../../../constants/styles";
import jsPDF from "jspdf";
import "jspdf-autotable";
import PrintIcon from "@mui/icons-material/Print";

const TampilSuratPenarikan = () => {
  const { user, dispatch } = useContext(AuthContext);
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const { screenSize } = useStateContext();

  const [isFetchError, setIsFetchError] = useState(false);
  const [noSt, setNoSt] = useState("");
  const [tglSt, setTglSt] = useState("");
  const [noJual, setNoJual] = useState("");
  const [kodeKolektor, setKodeKolektor] = useState("");
  const [angPerBulan, setAngPerBulan] = useState("");
  const [jmlBlnTelat, setJmlBlnTelat] = useState("");
  const [totalDenda, setTotalDenda] = useState("");
  const [biayaTarik, setBiayaTarik] = useState("");

  // Delete it
  const [namaRegister, setNamaRegister] = useState("");
  const [almRegister, setAlmRegister] = useState("");
  const [tlpRegister, setTlpRegister] = useState("");
  const [tglAng, setTglAng] = useState("");
  const [tenor, setTenor] = useState("");
  const [bulan, setBulan] = useState("");
  const [sisaBulan, setSisaBulan] = useState("");
  const [tglSp, setTglSp] = useState("");
  const [spKe, setSpKe] = useState("");

  const [tipe, setTipe] = useState("");
  const [noRangka, setNoRangka] = useState("");
  const [tahun, setTahun] = useState("");
  const [namaWarna, setNamaWarna] = useState("");
  const [nopol, setNopol] = useState("");

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
      val.noSt.toUpperCase().includes(searchTerm.toUpperCase()) ||
      val.tglSt.toUpperCase().includes(searchTerm.toUpperCase()) ||
      val.noJual.toUpperCase().includes(searchTerm.toUpperCase())
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
    try {
      const response = await axios.post(`${tempUrl}/sts`, {
        id: user._id,
        token: user.token,
        kodeUnitBisnis: user.unitBisnis._id,
        kodeCabang: user.cabang._id
      });
      setUser(response.data);
    } catch (err) {
      setIsFetchError(true);
    }
    setLoading(false);
  };

  const getUserById = async () => {
    if (id) {
      const response = await axios.post(`${tempUrl}/sts/${id}`, {
        id: user._id,
        token: user.token
      });
      setNoSt(response.data.noSt);
      setTglSt(response.data.tglSt);
      setNoJual(response.data.noJual);
      setKodeKolektor(
        `${response.data.kodeKolektor._id} - ${response.data.kodeKolektor.namaKolektor}`
      );
      setAngPerBulan(response.data.angPerBulan);
      setJmlBlnTelat(response.data.jmlBlnTelat);
      setTotalDenda(response.data.totalDenda);
      setBiayaTarik(response.data.biayaTarik);
    }
  };

  const deleteUser = async (id) => {
    try {
      setLoading(true);
      await axios.post(`${tempUrl}/deleteSt/${id}`, {
        id: user._id,
        token: user.token
      });
      setNoSt("");
      setTglSt("");
      setNoJual("");
      setKodeKolektor("");
      setAngPerBulan("");
      setJmlBlnTelat("");
      setTotalDenda("");
      setBiayaTarik("");
      setLoading(false);
      navigate("/suratPenarikan");
    } catch (error) {
      console.log(error);
    }
  };

  const downloadPdf = async () => {
    let tempY = 15;
    var date = new Date();
    var current_date =
      date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear();
    var tempDate;
    var tempDateName;
    const response = await axios.post(`${tempUrl}/angsuransChildTunggak`, {
      tglInput: date,
      noJual,
      id: user._id,
      token: user.token
    });

    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.setFont(undefined, "bold");
    doc.text(`SURAT PEMBERITAHUAN`, 75, tempY);
    tempY += 20;
    doc.setFont(undefined, "normal");
    doc.setFontSize(12);
    doc.text(`${lokasiSP}, ${current_date}`, 15, tempY);
    tempY += 15;
    doc.text(`Kepada Yth. Bapak / Ibu`, 15, tempY);
    doc.setFont(undefined, "bold");
    doc.text(`${namaRegister} - ${noJual}`, 64, tempY);
    doc.setFont(undefined, "normal");
    tempY += 6;
    doc.text(`${almRegister}`, 15, tempY);
    tempY += 6;
    doc.text(`(${tlpRegister})`, 15, tempY);
    tempY += 15;
    doc.text(`Dengan Hormat,`, 15, tempY);
    tempY += 6;
    doc.text(
      `Bersama dengan ini kami sampaikan bahwa Bapak / Ibu telah melakukan pembayaran`,
      15,
      tempY
    );
    tempY += 6;
    doc.text(
      `sewa sepeda motor dan untuk menghindari dari biaya pengambilan kembali sepeda motor,`,
      15,
      tempY
    );
    tempY += 6;
    doc.text(
      `dengan ini kami sampaikan bahwa Bapak / Ibu telah menunggak ${response.data.length} bulan.`,
      15,
      tempY
    );
    tempY += 6;
    doc.text(`( sepeda motor ${tipe})`, 15, tempY);
    tempY += 12;
    for (let i = 0; i < response.data.length; i++) {
      tempDate = new Date(response.data[i].tglJatuhTempo);

      switch (tempDate.getMonth()) {
        case 1:
          tempDateName = "JANUARI";
          break;
        case 2:
          tempDateName = "FEBRUARI";
          break;
        case 3:
          tempDateName = "MARET";
          break;
        case 4:
          tempDateName = "APRIL";
          break;
        case 5:
          tempDateName = "MEI";
          break;
        case 6:
          tempDateName = "JUNI";
          break;
        case 7:
          tempDateName = "JULI";
          break;
        case 8:
          tempDateName = "AGUSTUS";
          break;
        case 9:
          tempDateName = "SEPTEMBER";
          break;
        case 10:
          tempDateName = "OKTOBER";
          break;
        case 11:
          tempDateName = "NOVEMBER";
          break;
        case 12:
          tempDateName = "DESEMBER";
          break;
        default:
          break;
      }

      doc.text(
        `${i + 1}.  Angsuran ke ${
          i + 1
        } ${tempDateName} ${tempDate.getFullYear()}`,
        30,
        tempY
      );
      doc.text(`( ${response.data[i].tglJatuhTempo} )`, 120, tempY);
      doc.text(
        `Rp. ${response.data[i].angPerBulan.toLocaleString()}`,
        150,
        tempY
      );
      tempY += 6;
    }
    tempY += 6;
    doc.text(`Jumlah di atas belum termasuk denda tunggakan.`, 15, tempY);
    tempY += 12;
    doc.text(
      `Demikian surat pemberitahuan ini kami sampaikan kepada Bapak / Ibu, dan kami`,
      15,
      tempY
    );
    tempY += 6;
    doc.text(
      `menunggu 3 hari dari surat ini diterima. Apabila dalam 3 hari Bapak / Ibu tidak datang`,
      15,
      tempY
    );
    tempY += 6;
    doc.text(
      `ke kantor kami, maka kami akan menarik kembali sepeda motor tersebut.`,
      15,
      tempY
    );
    tempY += 6;
    doc.text(`Atas kerjasamanya kami ucapkan terimakasih.`, 15, tempY);
    tempY += 30;
    doc.text(`Hormat kami,`, 15, tempY);
    tempY += 30;
    doc.text(`${user.username}`, 15, tempY);
    doc.setFontSize(12);
    doc.save(`suratPemberitahuan.pdf`);
  };

  if (loading) {
    return <Loader />;
  }

  if (isFetchError) {
    return <FetchErrorHandling />;
  }

  return (
    <Box sx={container}>
      <Typography color="#757575">Piutang</Typography>
      <Typography variant="h4" sx={subTitleText}>
        Surat Penarikan
      </Typography>
      {noJual.length !== 0 && (
        <Box sx={downloadButtons}>
          <ButtonGroup variant="outlined" color="secondary">
            <Button startIcon={<PrintIcon />} onClick={() => downloadPdf()}>
              CETAK
            </Button>
          </ButtonGroup>
        </Box>
      )}
      <Box sx={buttonModifierContainer}>
        <ButtonModifier
          id={id}
          kode={noJual}
          addLink={`/suratPenarikan/tambahSuratPenarikan`}
          deleteUser={deleteUser}
          nameUser={noJual}
        />
      </Box>
      <Divider sx={dividerStyle} />
      {noJual.length !== 0 && (
        <>
          <Box sx={showDataContainer}>
            <Box sx={showDataWrapper}>
              <Typography sx={labelInput}>No. Jual</Typography>
              <TextField
                size="small"
                id="outlined-basic"
                variant="filled"
                InputProps={{
                  readOnly: true
                }}
                value={noJual}
              />
              <Typography sx={[labelInput, spacingTop]}>
                No. Surat Penarikan
              </Typography>
              <TextField
                size="small"
                id="outlined-basic"
                variant="filled"
                InputProps={{
                  readOnly: true
                }}
                value={noSt}
              />
              <Typography sx={[labelInput, spacingTop]}>
                Tgl. Surat Penarikan
              </Typography>
              <TextField
                size="small"
                id="outlined-basic"
                variant="filled"
                InputProps={{
                  readOnly: true
                }}
                value={tglSt}
              />
              <Typography sx={[labelInput, spacingTop]}>Kolektor</Typography>
              <TextField
                size="small"
                id="outlined-basic"
                variant="filled"
                InputProps={{
                  readOnly: true
                }}
                value={kodeKolektor}
              />
            </Box>
            <Box sx={[showDataWrapper, secondWrapper]}>
              <Typography sx={labelInput}>Jml Bulan Telat</Typography>
              <TextField
                size="small"
                id="outlined-basic"
                variant="filled"
                InputProps={{
                  readOnly: true
                }}
                value={`${jmlBlnTelat} bulan`}
              />
              <Typography sx={[labelInput, spacingTop]}>
                Angsuran / Bulan
              </Typography>
              <TextField
                size="small"
                id="outlined-basic"
                variant="filled"
                InputProps={{
                  readOnly: true
                }}
                value={angPerBulan.toLocaleString()}
              />
              <Typography sx={[labelInput, spacingTop]}>
                Denda Tunggakan
              </Typography>
              <TextField
                size="small"
                id="outlined-basic"
                variant="filled"
                InputProps={{
                  readOnly: true
                }}
                value={totalDenda.toLocaleString()}
              />
              <Typography sx={[labelInput, spacingTop]}>Biaya Tarik</Typography>
              <TextField
                size="small"
                id="outlined-basic"
                variant="filled"
                InputProps={{
                  readOnly: true
                }}
                value={biayaTarik.toLocaleString()}
              />
              <Typography sx={[labelInput, spacingTop]}>Total</Typography>
              <TextField
                size="small"
                id="outlined-basic"
                variant="filled"
                InputProps={{
                  readOnly: true
                }}
                value={(biayaTarik + totalDenda).toLocaleString()}
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
        <ShowTableSuratPenarikan
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

export default TampilSuratPenarikan;

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
