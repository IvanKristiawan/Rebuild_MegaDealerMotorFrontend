import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../../contexts/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";
import { Box, TextField, Typography, Divider, Pagination } from "@mui/material";
import { ShowTableSuratPemberitahuan } from "../../../components/ShowTable";
import { FetchErrorHandling } from "../../../components/FetchErrorHandling";
import {
  SearchBar,
  Loader,
  usePagination,
  ButtonModifier,
} from "../../../components";
import { tempUrl } from "../../../contexts/ContextProvider";
import { useStateContext } from "../../../contexts/ContextProvider";
import "jspdf-autotable";
import { Colors } from "../../../constants/styles";

const TampilSuratPemberitahuan = () => {
  const { user, dispatch } = useContext(AuthContext);
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const { screenSize } = useStateContext();

  const [isFetchError, setIsFetchError] = useState(false);
  const [noJual, setNoJual] = useState("");
  const [namaRegister, setNamaRegister] = useState("");
  const [almRegister, setAlmRegister] = useState("");
  const [tglAng, setTglAng] = useState("");
  const [tenor, setTenor] = useState("");
  const [bulan, setBulan] = useState("");
  const [sisaBulan, setSisaBulan] = useState("");
  const [tglSp, setTglSp] = useState("");
  const [spKe, setSpKe] = useState("");

  const [kodeKolektor, setKodeKolektor] = useState("");
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
      val.noJual.toUpperCase().includes(searchTerm.toUpperCase()) ||
      val.idJual.namaRegister
        .toUpperCase()
        .includes(searchTerm.toUpperCase()) ||
      val.idJual.almRegister.toUpperCase().includes(searchTerm.toUpperCase()) ||
      val.idJual.tglAng.toUpperCase().includes(searchTerm.toUpperCase()) ||
      val.tglSp.toUpperCase().includes(searchTerm.toUpperCase()) ||
      val.idJual.nopol.toUpperCase().includes(searchTerm.toUpperCase())
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
      const response = await axios.post(`${tempUrl}/sps`, {
        id: user._id,
        token: user.token,
        kodeUnitBisnis: user.unitBisnis._id,
        kodeCabang: user.cabang._id,
      });
      setUser(response.data);
    } catch (err) {
      setIsFetchError(true);
    }
    setLoading(false);
  };

  const getUserById = async () => {
    if (id) {
      const response = await axios.post(`${tempUrl}/sps/${id}`, {
        id: user._id,
        token: user.token,
      });
      setNoJual(response.data.noJual);
      setNamaRegister(response.data.idJual.namaRegister);
      setAlmRegister(response.data.idJual.almRegister);
      setTglAng(response.data.idJual.tglAng);
      setTenor(response.data.idJual.tenor);
      setBulan(response.data.idJual.tenor - response.data.idJual.sisaBulan);
      setSisaBulan(response.data.idJual.sisaBulan);
      setTglSp(response.data.tglSp);
      setSpKe(response.data.spKe);

      setKodeKolektor(
        `${response.data.kodeKolektor._id} - ${response.data.kodeKolektor.namaKolektor}`
      );
      setTipe(response.data.idJual.tipe);
      setNoRangka(response.data.idJual.noRangka);
      setTahun(response.data.idJual.tahun);
      setNamaWarna(response.data.idJual.namaWarna);
      setNopol(response.data.idJual.nopol);
    }
  };

  const deleteUser = async (id) => {
    try {
      setLoading(true);
      await axios.post(`${tempUrl}/deleteSp/${id}`, {
        id: user._id,
        token: user.token,
      });
      // Find Jual
      const response = await axios.post(`${tempUrl}/jualsByNoJual`, {
        noJual,
        id: user._id,
        token: user.token,
        kodeUnitBisnis: user.unitBisnis._id,
        kodeCabang: user.cabang._id,
      });
      await axios.post(`${tempUrl}/updateJual/${response.data._id}`, {
        spKe: response.data.spKe - 1,
        tglSpTerakhir: "",
        kodeUnitBisnis: user.unitBisnis._id,
        kodeCabang: user.cabang._id,
        id: user._id,
        token: user.token,
      });
      setNoJual("");
      setNamaRegister("");
      setAlmRegister("");
      setTglAng("");
      setTenor("");
      setBulan("");
      setSisaBulan("");
      setTglSp("");
      setSpKe("");

      setKodeKolektor("");
      setTipe("");
      setNoRangka("");
      setTahun("");
      setNamaWarna("");
      setNopol("");
      setLoading(false);
      navigate("/suratPemberitahuan");
    } catch (error) {
      console.log(error);
    }
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
        Surat Pemberitahuan
      </Typography>
      <Box sx={buttonModifierContainer}>
        <ButtonModifier
          id={id}
          kode={noJual}
          addLink={`/suratPemberitahuan/tambahSuratPemberitahuan`}
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
                  readOnly: true,
                }}
                value={noJual}
              />
              <Typography sx={[labelInput, spacingTop]}>Nama</Typography>
              <TextField
                size="small"
                id="outlined-basic"
                variant="filled"
                InputProps={{
                  readOnly: true,
                }}
                value={namaRegister}
              />
              <Typography sx={[labelInput, spacingTop]}>Alamat</Typography>
              <TextField
                size="small"
                id="outlined-basic"
                variant="filled"
                InputProps={{
                  readOnly: true,
                }}
                value={almRegister}
              />
              <Typography sx={[labelInput, spacingTop]}>
                Tgl. Angsuran
              </Typography>
              <TextField
                size="small"
                id="outlined-basic"
                variant="filled"
                InputProps={{
                  readOnly: true,
                }}
                value={tglAng}
              />
              <Typography sx={[labelInput, spacingTop]}>
                Angs. / Bulan / Sisa
              </Typography>
              <Box sx={{ display: "flex" }}>
                <TextField
                  size="small"
                  id="outlined-basic"
                  variant="outlined"
                  InputProps={{
                    readOnly: true,
                  }}
                  value={tenor}
                  sx={{ backgroundColor: Colors.grey400 }}
                />
                <TextField
                  size="small"
                  id="outlined-basic"
                  variant="outlined"
                  InputProps={{
                    readOnly: true,
                  }}
                  value={bulan}
                  sx={{ ml: 2, backgroundColor: Colors.grey400 }}
                />
                <TextField
                  size="small"
                  id="outlined-basic"
                  variant="outlined"
                  InputProps={{
                    readOnly: true,
                  }}
                  value={sisaBulan}
                  sx={{ ml: 2, backgroundColor: Colors.grey400 }}
                />
              </Box>
              <Typography sx={[labelInput, spacingTop]}>
                Tgl. SP / Ke
              </Typography>
              <Box sx={{ display: "flex" }}>
                <TextField
                  size="small"
                  id="outlined-basic"
                  variant="outlined"
                  InputProps={{
                    readOnly: true,
                  }}
                  value={tglSp}
                  sx={{ backgroundColor: Colors.grey400 }}
                />
                <TextField
                  size="small"
                  id="outlined-basic"
                  variant="outlined"
                  InputProps={{
                    readOnly: true,
                  }}
                  value={spKe}
                  sx={{ ml: 2, backgroundColor: Colors.grey400 }}
                />
              </Box>
            </Box>
            <Box sx={[showDataWrapper, secondWrapper]}>
              <Typography sx={labelInput}>Kolektor</Typography>
              <TextField
                size="small"
                id="outlined-basic"
                variant="filled"
                InputProps={{
                  readOnly: true,
                }}
                value={kodeKolektor}
              />
              <Typography sx={[labelInput, spacingTop]}>Tipe</Typography>
              <TextField
                size="small"
                id="outlined-basic"
                variant="filled"
                InputProps={{
                  readOnly: true,
                }}
                value={tipe}
              />
              <Typography sx={[labelInput, spacingTop]}>No. Rangka</Typography>
              <TextField
                size="small"
                id="outlined-basic"
                variant="filled"
                InputProps={{
                  readOnly: true,
                }}
                value={noRangka}
              />
              <Typography sx={[labelInput, spacingTop]}>Nopol</Typography>
              <TextField
                size="small"
                id="outlined-basic"
                variant="filled"
                InputProps={{
                  readOnly: true,
                }}
                value={nopol}
              />
              <Typography sx={[labelInput, spacingTop]}>
                Tahun / Warna
              </Typography>
              <Box sx={{ display: "flex" }}>
                <TextField
                  size="small"
                  id="outlined-basic"
                  variant="outlined"
                  InputProps={{
                    readOnly: true,
                  }}
                  value={tahun}
                  sx={{ backgroundColor: Colors.grey400 }}
                />
                <TextField
                  size="small"
                  id="outlined-basic"
                  variant="outlined"
                  InputProps={{
                    readOnly: true,
                  }}
                  value={namaWarna}
                  sx={{ ml: 2, backgroundColor: Colors.grey400 }}
                />
              </Box>
            </Box>
          </Box>
          <Divider sx={dividerStyle} />
        </>
      )}
      <Box sx={searchBarContainer}>
        <SearchBar setSearchTerm={setSearchTerm} />
      </Box>
      <Box sx={tableContainer}>
        <ShowTableSuratPemberitahuan
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

export default TampilSuratPemberitahuan;

const container = {
  p: 4,
};

const subTitleText = {
  fontWeight: "900",
};

const buttonModifierContainer = {
  mt: 4,
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "center",
};

const dividerStyle = {
  pt: 4,
};

const showDataContainer = {
  mt: 4,
  display: "flex",
  flexDirection: {
    xs: "column",
    sm: "row",
  },
};

const showDataWrapper = {
  display: "flex",
  flex: 1,
  flexDirection: "column",
  maxWidth: {
    md: "40vw",
  },
};

const searchBarContainer = {
  pt: 6,
  display: "flex",
  justifyContent: "center",
};

const tableContainer = {
  pt: 4,
  display: "flex",
  justifyContent: "center",
};

const labelInput = {
  fontWeight: "600",
  marginLeft: 1,
};

const spacingTop = {
  mt: 4,
};

const secondWrapper = {
  marginLeft: {
    md: 4,
  },
  marginTop: {
    md: 0,
    xs: 4,
  },
};

const downloadButtons = {
  mt: 4,
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "center",
};
