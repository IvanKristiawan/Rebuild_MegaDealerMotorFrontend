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
  Paper
} from "@mui/material";
import { ShowTableJual } from "../../../components/ShowTable";
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
import * as XLSX from "xlsx";
import DownloadIcon from "@mui/icons-material/Download";
import PrintIcon from "@mui/icons-material/Print";

const TampilJual = () => {
  const { user, dispatch } = useContext(AuthContext);
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const { screenSize } = useStateContext();

  // Data Register/Pembeli
  const [noRegister, setNoRegister] = useState("");
  const [namaRegister, setNamaRegister] = useState("");
  const [almRegister, setAlmRegister] = useState("");
  const [almKantor, setAlmKantor] = useState("");
  const [tlpRegister, setTlpRegister] = useState("");
  const [noKtpRegister, setNoKtpRegister] = useState("");
  const [noKKRegister, setNoKKRegister] = useState("");
  const [namaPjmRegister, setNamaPjmRegister] = useState("");
  const [noKtpPjmRegister, setNoKtpPjmRegister] = useState("");
  const [namaRefRegister, setNamaRefRegister] = useState("");
  const [almRefRegister, setAlmRefRegister] = useState("");
  const [tlpRefRegister, setTlpRefRegister] = useState("");
  const [kodeMarketing, setKodeMarketing] = useState("");
  const [kodeSurveyor, setKodeSurveyor] = useState("");
  const [kodePekerjaan, setKodePekerjaan] = useState("");
  const [kodeKecamatan, setKodeKecamatan] = useState("");
  const [kodeLeasing, setKodeLeasing] = useState("");

  // Data Motor -> Dari Stok
  const [noRangka, setNoRangka] = useState("");
  const [noMesin, setNoMesin] = useState("");
  const [nopol, setNopol] = useState("");
  const [tipe, setTipe] = useState("");
  const [namaWarna, setNamaWarna] = useState("");
  const [tahun, setTahun] = useState("");

  // Data Penjualan -> dari input
  const [hargaTunai, setHargaTunai] = useState("");
  const [uangMuka, setUangMuka] = useState("");
  const [sisaPiutang, setSisaPiutang] = useState("");
  const [angPerBulan, setAngPerBulan] = useState("");
  const [tenor, setTenor] = useState("");
  const [bunga, setBunga] = useState("");
  const [jumlahPiutang, setJumlahPiutang] = useState("");
  const [angModal, setAngModal] = useState("");
  const [angBunga, setAngBunga] = useState("");
  const [noJual, setNoJual] = useState("");
  const [noKwitansi, setNoKwitansi] = useState("");
  const [tglJual, setTglJual] = useState("");
  const [jenisJual, setJenisJual] = useState("");
  const [leasing, setLeasing] = useState("");
  const [tglAng, setTglAng] = useState("");
  const [tglAngAkhir, setTglAngAkhir] = useState("");
  const [tglInput, setTglInput] = useState("");

  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUser] = useState([]);
  const [jualsForTable, setJualsForTable] = useState([]);
  const [jualsForDoc, setJualsForDoc] = useState([]);
  const navigate = useNavigate();

  const columns = [
    { title: "No. Jual", field: "noJual" },
    { title: "Tanggal Input", field: "tglInput" },
    { title: "Nama Register", field: "namaRegister" },
    { title: "Kode Leasing", field: "kodeLeasing" },
    { title: "Tipe", field: "tipe" }
  ];

  const [loading, setLoading] = useState(false);
  let [page, setPage] = useState(1);
  const PER_PAGE = 20;

  // Get current posts
  const indexOfLastPost = page * PER_PAGE;
  const indexOfFirstPost = indexOfLastPost - PER_PAGE;
  const tempPosts = jualsForTable.filter((val) => {
    if (searchTerm === "") {
      return val;
    } else if (
      val.noJual.toUpperCase().includes(searchTerm.toUpperCase()) ||
      val.namaRegister.toUpperCase().includes(searchTerm.toUpperCase())
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
    getJualsForDoc();
    id && getUserById();
  }, [id]);

  const getUsers = async () => {
    setLoading(true);
    const response = await axios.post(`${tempUrl}/jualsForTable`, {
      id: user._id,
      token: user.token
    });
    setJualsForTable(response.data);
    setLoading(false);
  };

  const getJualsForDoc = async () => {
    setLoading(true);
    const response = await axios.post(`${tempUrl}/jualsForDoc`, {
      id: user._id,
      token: user.token
    });
    setJualsForDoc(response.data);
    setLoading(false);
  };

  const getUserById = async () => {
    if (id) {
      const response = await axios.post(`${tempUrl}/juals/${id}`, {
        id: user._id,
        token: user.token
      });
      // Data Register/Pembeli
      setNoRegister(response.data.noRegister);
      setNamaRegister(response.data.namaRegister);
      setAlmRegister(response.data.almRegister);
      setAlmKantor(response.data.almKantor);
      setTlpRegister(response.data.tlpRegister);
      setNoKtpRegister(response.data.noKtpRegister);
      setNoKKRegister(response.data.noKKRegister);
      setNamaPjmRegister(response.data.namaPjmRegister);
      setNoKtpPjmRegister(response.data.noKtpPjmRegister);
      setNamaRefRegister(response.data.namaRefRegister);
      setAlmRefRegister(response.data.almRefRegister);
      setTlpRefRegister(response.data.tlpRefRegister);
      setKodeMarketing(response.data.kodeMarketing);
      setKodeSurveyor(response.data.kodeSurveyor);
      setKodePekerjaan(response.data.kodePekerjaan);
      setKodeKecamatan(response.data.kodeKecamatan);
      setKodeLeasing(response.data.kodeLeasing);

      // Data Motor -> Dari Stok
      setNoRangka(response.data.noRangka);
      setNoMesin(response.data.noMesin);
      setNopol(response.data.nopol);
      setTipe(response.data.tipe);
      setNamaWarna(response.data.namaWarna);
      setTahun(response.data.tahun);

      // Data Penjualan -> dari input
      setHargaTunai(response.data.hargaTunai);
      setUangMuka(response.data.uangMuka);
      setSisaPiutang(response.data.sisaPiutang);
      setAngPerBulan(response.data.angPerBulan);
      setTenor(response.data.tenor);
      setBunga(response.data.bunga);
      setJumlahPiutang(response.data.jumlahPiutang);
      setAngModal(response.data.angModal);
      setAngBunga(response.data.angBunga);
      setNoJual(response.data.noJual);
      setNoKwitansi(response.data.noKwitansi);
      setTglJual(response.data.tglJual);
      setJenisJual(response.data.jenisJual);
      setLeasing(response.data.leasing);
      setTglAng(response.data.tglAng);
      setTglAngAkhir(response.data.tglAngAkhir);
      setTglInput(response.data.tglInput);
    }
  };

  const deleteUser = async (id) => {
    try {
      setLoading(true);
      await axios.post(`${tempUrl}/deleteJual/${id}`, {
        id: user._id,
        token: user.token
      });
      getUsers();
      // Data Register/Pembeli
      setNoRegister("");
      setNamaRegister("");
      setAlmRegister("");
      setAlmKantor("");
      setTlpRegister("");
      setNoKtpRegister("");
      setNoKKRegister("");
      setNamaPjmRegister("");
      setNoKtpPjmRegister("");
      setNamaRefRegister("");
      setAlmRefRegister("");
      setTlpRefRegister("");
      setKodeMarketing("");
      setKodeSurveyor("");
      setKodePekerjaan("");
      setKodeKecamatan("");
      setKodeLeasing("");

      // Data Motor -> Dari Stok
      setNoRangka("");
      setNoMesin("");
      setNopol("");
      setTipe("");
      setNamaWarna("");
      setTahun("");

      // Data Penjualan -> dari input
      setHargaTunai("");
      setUangMuka("");
      setSisaPiutang("");
      setAngPerBulan("");
      setTenor("");
      setBunga("");
      setJumlahPiutang("");
      setAngModal("");
      setAngBunga("");
      setNoJual("");
      setNoKwitansi("");
      setTglJual("");
      setJenisJual("");
      setLeasing("");
      setTglAng("");
      setTglAngAkhir("");
      setTglInput("");
      setLoading(false);
      navigate("/jual");
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
    doc.text(`Daftar Jual`, 90, 30);
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
      body: jualsForTable,
      headStyles: {
        fillColor: [117, 117, 117],
        color: [0, 0, 0]
      }
    });
    doc.save(`daftarJual.pdf`);
  };

  const downloadExcel = () => {
    const workSheet = XLSX.utils.json_to_sheet(jualsForDoc);
    const workBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workBook, workSheet, `Jual`);
    // Buffer
    let buf = XLSX.write(workBook, { bookType: "xlsx", type: "buffer" });
    // Binary String
    XLSX.write(workBook, { bookType: "xlsx", type: "binary" });
    // Download
    XLSX.writeFile(workBook, `daftarJual.xlsx`);
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <Box sx={container}>
      <Typography color="#757575">Penjualan</Typography>
      <Typography variant="h4" sx={subTitleText}>
        Jual
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
          kode={noJual}
          tambahBaru={`/jual/tambahJualBaru`}
          addLink={`/jual/tambahJualBekas`}
          editLink={`/jual/${id}/edit`}
          deleteUser={deleteUser}
          nameUser={noJual}
        />
      </Box>
      <Divider sx={dividerStyle} />
      {noJual.length !== 0 && (
        <>
          <Box sx={contentContainer}>
            {/* Data Penjualan */}
            <Paper elevation={6} sx={mainContainer}>
              <Typography variant="h5" sx={titleStyle} color="primary">
                DATA PENJUALAN
              </Typography>
              <Box sx={showDataContainer}>
                <Box sx={showDataWrapper}>
                  <Typography sx={labelInput}>No. Jual</Typography>
                  <TextField
                    size="small"
                    id="outlined-basic"
                    variant="outlined"
                    value={noJual}
                    InputProps={{
                      readOnly: true
                    }}
                  />
                  <Typography sx={[labelInput, spacingTop]}>
                    No. Kwitansi
                  </Typography>
                  <TextField
                    size="small"
                    id="outlined-basic"
                    variant="outlined"
                    value={noKwitansi}
                    InputProps={{
                      readOnly: true
                    }}
                  />
                  <Typography sx={[labelInput, spacingTop]}>
                    Tanggal Jual
                  </Typography>
                  <TextField
                    size="small"
                    id="outlined-basic"
                    variant="outlined"
                    value={tglJual}
                    InputProps={{
                      readOnly: true
                    }}
                  />
                  <Typography sx={[labelInput, spacingTop]}>
                    Jenis Jual
                  </Typography>
                  <TextField
                    size="small"
                    id="outlined-basic"
                    variant="outlined"
                    value={jenisJual}
                    InputProps={{
                      readOnly: true
                    }}
                  />
                </Box>
                <Box sx={[showDataWrapper, secondWrapper]}>
                  <Typography sx={labelInput}>Leasing</Typography>
                  <TextField
                    size="small"
                    id="outlined-basic"
                    variant="outlined"
                    value={leasing}
                    InputProps={{
                      readOnly: true
                    }}
                  />
                  <Typography sx={[labelInput, spacingTop]}>
                    Tanggal Angsuran I
                  </Typography>
                  <TextField
                    size="small"
                    id="outlined-basic"
                    variant="outlined"
                    value={tglAng}
                    InputProps={{
                      readOnly: true
                    }}
                  />
                  <Typography sx={[labelInput, spacingTop]}>
                    Tanggal Angsuran Akhir
                  </Typography>
                  <TextField
                    size="small"
                    id="outlined-basic"
                    variant="outlined"
                    value={tglAngAkhir}
                    InputProps={{
                      readOnly: true
                    }}
                  />
                  <Typography sx={[labelInput, spacingTop]}>
                    Tanggal Input
                  </Typography>
                  <TextField
                    size="small"
                    id="outlined-basic"
                    variant="outlined"
                    value={tglInput}
                    InputProps={{
                      readOnly: true
                    }}
                  />
                </Box>
              </Box>
            </Paper>

            {/* Data Pembeli */}
            <Paper elevation={6} sx={mainContainer}>
              <Typography variant="h5" sx={titleStyle} color="primary">
                DATA PEMBELI
              </Typography>
              <Box sx={showDataContainer}>
                <Box sx={showDataWrapper}>
                  <Typography sx={labelInput}>Kode Register</Typography>
                  <TextField
                    size="small"
                    id="outlined-basic"
                    variant="outlined"
                    value={noRegister}
                    InputProps={{
                      readOnly: true
                    }}
                  />
                  <Typography sx={[labelInput, spacingTop]}>
                    Nama Register
                  </Typography>
                  <TextField
                    size="small"
                    id="outlined-basic"
                    variant="outlined"
                    value={namaRegister}
                    InputProps={{
                      readOnly: true
                    }}
                  />
                  <Typography sx={[labelInput, spacingTop]}>
                    Alamat Register
                  </Typography>
                  <TextField
                    size="small"
                    id="outlined-basic"
                    variant="outlined"
                    value={almRegister}
                    InputProps={{
                      readOnly: true
                    }}
                  />
                  <Typography sx={[labelInput, spacingTop]}>
                    Alamat Kantor
                  </Typography>
                  <TextField
                    size="small"
                    id="outlined-basic"
                    variant="outlined"
                    value={almKantor}
                    InputProps={{
                      readOnly: true
                    }}
                  />
                  <Typography sx={[labelInput, spacingTop]}>
                    Telepon Register
                  </Typography>
                  <TextField
                    size="small"
                    id="outlined-basic"
                    variant="outlined"
                    value={tlpRegister}
                    InputProps={{
                      readOnly: true
                    }}
                  />
                  <Typography sx={[labelInput, spacingTop]}>
                    No. KTP Register
                  </Typography>
                  <TextField
                    size="small"
                    id="outlined-basic"
                    variant="outlined"
                    value={noKtpRegister}
                    InputProps={{
                      readOnly: true
                    }}
                  />
                  <Typography sx={[labelInput, spacingTop]}>
                    No. KK Register
                  </Typography>
                  <TextField
                    size="small"
                    id="outlined-basic"
                    variant="outlined"
                    value={noKKRegister}
                    InputProps={{
                      readOnly: true
                    }}
                  />
                  <Typography sx={[labelInput, spacingTop]}>
                    Nama Penjamin Register
                  </Typography>
                  <TextField
                    size="small"
                    id="outlined-basic"
                    variant="outlined"
                    value={namaPjmRegister}
                    InputProps={{
                      readOnly: true
                    }}
                  />
                  <Typography sx={[labelInput, spacingTop]}>
                    No. KTP Penjamin Register
                  </Typography>
                  <TextField
                    size="small"
                    id="outlined-basic"
                    variant="outlined"
                    value={noKtpPjmRegister}
                    InputProps={{
                      readOnly: true
                    }}
                  />
                </Box>
                <Box sx={[showDataWrapper, secondWrapper]}>
                  <Typography sx={labelInput}>Nama Ref. Register</Typography>
                  <TextField
                    size="small"
                    id="outlined-basic"
                    variant="outlined"
                    value={namaRefRegister}
                    InputProps={{
                      readOnly: true
                    }}
                  />
                  <Typography sx={[labelInput, spacingTop]}>
                    Alamat Ref. Register
                  </Typography>
                  <TextField
                    size="small"
                    id="outlined-basic"
                    variant="outlined"
                    value={almRefRegister}
                    InputProps={{
                      readOnly: true
                    }}
                  />
                  <Typography sx={[labelInput, spacingTop]}>
                    Telepon Ref. Register
                  </Typography>
                  <TextField
                    size="small"
                    id="outlined-basic"
                    variant="outlined"
                    value={tlpRefRegister}
                    InputProps={{
                      readOnly: true
                    }}
                  />
                  <Typography sx={[labelInput, spacingTop]}>
                    Kode Marketing
                  </Typography>
                  <TextField
                    size="small"
                    id="outlined-basic"
                    variant="outlined"
                    value={kodeMarketing}
                    InputProps={{
                      readOnly: true
                    }}
                  />
                  <Typography sx={[labelInput, spacingTop]}>
                    Kode Surveyor
                  </Typography>
                  <TextField
                    size="small"
                    id="outlined-basic"
                    variant="outlined"
                    value={kodeSurveyor}
                    InputProps={{
                      readOnly: true
                    }}
                  />
                  <Typography sx={[labelInput, spacingTop]}>
                    Kode Pekerjaan
                  </Typography>
                  <TextField
                    size="small"
                    id="outlined-basic"
                    variant="outlined"
                    value={kodePekerjaan}
                    InputProps={{
                      readOnly: true
                    }}
                  />
                  <Typography sx={[labelInput, spacingTop]}>
                    Kode Kecamatan
                  </Typography>
                  <TextField
                    size="small"
                    id="outlined-basic"
                    variant="outlined"
                    value={kodeKecamatan}
                    InputProps={{
                      readOnly: true
                    }}
                  />
                  <Typography sx={[labelInput, spacingTop]}>
                    Kode Leasing
                  </Typography>
                  <TextField
                    size="small"
                    id="outlined-basic"
                    variant="outlined"
                    value={kodeLeasing}
                    InputProps={{
                      readOnly: true
                    }}
                  />
                </Box>
              </Box>
            </Paper>

            {/* Data Motor */}
            <Paper elevation={6} sx={mainContainer}>
              <Typography variant="h5" sx={titleStyle} color="primary">
                DATA MOTOR
              </Typography>
              <Box sx={showDataContainer}>
                <Box sx={showDataWrapper}>
                  <Typography sx={labelInput}>Nopol</Typography>
                  <TextField
                    size="small"
                    id="outlined-basic"
                    variant="outlined"
                    value={nopol}
                    InputProps={{
                      readOnly: true
                    }}
                  />
                  <Typography sx={[labelInput, spacingTop]}>
                    No. Rangka
                  </Typography>
                  <TextField
                    size="small"
                    id="outlined-basic"
                    variant="outlined"
                    value={noRangka}
                    InputProps={{
                      readOnly: true
                    }}
                  />
                  <Typography sx={[labelInput, spacingTop]}>
                    No. Mesin
                  </Typography>
                  <TextField
                    size="small"
                    id="outlined-basic"
                    variant="outlined"
                    value={noMesin}
                    InputProps={{
                      readOnly: true
                    }}
                  />
                </Box>
                <Box sx={[showDataWrapper, secondWrapper]}>
                  <Typography sx={labelInput}>Tipe</Typography>
                  <TextField
                    size="small"
                    id="outlined-basic"
                    variant="outlined"
                    value={tipe}
                    InputProps={{
                      readOnly: true
                    }}
                  />
                  <Typography sx={[labelInput, spacingTop]}>
                    Nama Warna
                  </Typography>
                  <TextField
                    size="small"
                    id="outlined-basic"
                    variant="outlined"
                    value={namaWarna}
                    InputProps={{
                      readOnly: true
                    }}
                  />
                  <Typography sx={[labelInput, spacingTop]}>
                    Tahun Perakitan
                  </Typography>
                  <TextField
                    size="small"
                    id="outlined-basic"
                    variant="outlined"
                    value={tahun}
                    InputProps={{
                      readOnly: true
                    }}
                  />
                </Box>
              </Box>
            </Paper>

            {/* Data Rincian Harga (Input) */}
            <Paper elevation={6} sx={mainContainer}>
              <Typography variant="h5" sx={titleStyle} color="primary">
                RINCIAN HARGA
              </Typography>
              <Box sx={showDataContainer}>
                <Box sx={showDataWrapper}>
                  <Typography sx={[labelInput]}>
                    Harga Tunai
                    {hargaTunai !== 0 &&
                      !isNaN(parseInt(hargaTunai)) &&
                      ` : Rp ${parseInt(hargaTunai).toLocaleString()}`}
                  </Typography>
                  <TextField
                    type="number"
                    size="small"
                    id="outlined-basic"
                    variant="outlined"
                    value={hargaTunai}
                    InputProps={{
                      readOnly: true
                    }}
                  />
                  <Typography sx={[labelInput, spacingTop]}>
                    Uang Muka
                    {uangMuka !== 0 &&
                      !isNaN(parseInt(uangMuka)) &&
                      ` : Rp ${parseInt(uangMuka).toLocaleString()}`}
                  </Typography>
                  <TextField
                    type="number"
                    size="small"
                    id="outlined-basic"
                    variant="outlined"
                    value={uangMuka}
                    InputProps={{
                      readOnly: true
                    }}
                  />
                  <Typography sx={[labelInput, spacingTop]}>
                    Sisa Piutang
                    {sisaPiutang !== 0 &&
                      !isNaN(parseInt(sisaPiutang)) &&
                      ` : Rp ${parseInt(sisaPiutang).toLocaleString()}`}
                  </Typography>
                  <TextField
                    size="small"
                    id="outlined-basic"
                    variant="outlined"
                    value={sisaPiutang}
                    InputProps={{
                      readOnly: true
                    }}
                  />
                </Box>
                <Box sx={[showDataWrapper, secondWrapper]}>
                  <Typography sx={labelInput}>
                    Angsuran/bulan
                    {angPerBulan !== 0 &&
                      !isNaN(parseInt(angPerBulan)) &&
                      ` : Rp ${parseInt(angPerBulan).toLocaleString()}`}
                  </Typography>
                  <TextField
                    size="small"
                    id="outlined-basic"
                    variant="outlined"
                    value={angPerBulan}
                    InputProps={{
                      readOnly: true
                    }}
                  />
                  <Typography sx={[labelInput, spacingTop]}>
                    Tenor
                    {tenor !== 0 &&
                      !isNaN(parseInt(tenor)) &&
                      ` : ${parseInt(tenor).toLocaleString()}`}
                  </Typography>
                  <TextField
                    size="small"
                    id="outlined-basic"
                    variant="outlined"
                    value={tenor}
                    InputProps={{
                      readOnly: true
                    }}
                  />
                  <Typography sx={[labelInput, spacingTop]}>
                    Total Piutang
                    {jumlahPiutang !== 0 &&
                      !isNaN(parseInt(jumlahPiutang)) &&
                      ` : ${parseInt(jumlahPiutang).toLocaleString()}`}
                  </Typography>
                  <TextField
                    size="small"
                    id="outlined-basic"
                    variant="outlined"
                    value={jumlahPiutang}
                    InputProps={{
                      readOnly: true
                    }}
                  />
                </Box>
              </Box>
            </Paper>
          </Box>
          <Divider sx={dividerStyle} />
        </>
      )}
      <Box sx={searchBarContainer}>
        <SearchBar setSearchTerm={setSearchTerm} />
      </Box>
      <Box sx={tableContainer}>
        <ShowTableJual currentPosts={currentPosts} searchTerm={searchTerm} />
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

export default TampilJual;

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

const mainContainer = {
  padding: 3,
  borderRadius: "20px",
  margin: 4
};

const titleStyle = {
  textAlign: "center",
  fontWeight: "600"
};

const contentContainer = {
  p: 3,
  pt: 1,
  mt: 2
};
