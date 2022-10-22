import "./styles.css";
import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Routes, Route, Navigate, BrowserRouter } from "react-router-dom";
import { Header } from "./components";
import {
  Sidebar,
  Menu,
  SubMenu,
  MenuItem,
  useProSidebar
} from "react-pro-sidebar";
import MenuIcon from "@mui/icons-material/Menu";
import ClassIcon from "@mui/icons-material/Class";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import MopedIcon from "@mui/icons-material/Moped";
import PublicIcon from "@mui/icons-material/Public";
import PersonPinIcon from "@mui/icons-material/PersonPin";
import AddBusinessIcon from "@mui/icons-material/AddBusiness";
import HailIcon from "@mui/icons-material/Hail";
import AddHomeWorkIcon from "@mui/icons-material/AddHomeWork";
import CarRentalIcon from "@mui/icons-material/CarRental";
import AddReactionIcon from "@mui/icons-material/AddReaction";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import ElevatorIcon from "@mui/icons-material/Elevator";
import InventoryIcon from "@mui/icons-material/Inventory";
import EngineeringIcon from "@mui/icons-material/Engineering";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import SellIcon from "@mui/icons-material/Sell";
import SensorOccupiedIcon from "@mui/icons-material/SensorOccupied";
import ApartmentIcon from "@mui/icons-material/Apartment";
import { Divider, Box, Typography, CssBaseline, Tooltip } from "@mui/material";
import { Colors } from "./constants/styles";
import { AuthContext } from "./contexts/AuthContext";
import { useStateContext } from "./contexts/ContextProvider";
import {
  Login,
  TampilTipe,
  TambahTipe,
  UbahTipe,
  TampilWarna,
  TambahWarna,
  UbahWarna,
  TampilWilayah,
  TambahWilayah,
  UbahWilayah,
  TampilKecamatan,
  TambahKecamatan,
  UbahKecamatan,
  TampilDealer,
  TambahDealer,
  UbahDealer,
  TampilKolektor,
  TambahKolektor,
  UbahKolektor,
  TampilMarketing,
  TambahMarketing,
  UbahMarketing,
  TampilPekerjaan,
  TambahPekerjaan,
  UbahPekerjaan,
  TampilSurveyor,
  TambahSurveyor,
  UbahSurveyor,
  TampilCabang,
  TambahCabang,
  UbahCabang,
  TampilUnitBisnis,
  TambahUnitBisnis,
  UbahUnitBisnis,
  TampilLeasing,
  TambahLeasing,
  UbahLeasing,
  ProfilUser,
  UbahProfilUser,
  DaftarUser,
  TambahUser,
  UbahUser,
  TampilRegister,
  TambahRegister,
  UbahRegister,
  TampilJual,
  TambahJualBekas,
  TambahJualBaru,
  UbahJualBekas,
  UbahJualBaru,
  TampilSupplier,
  TambahSupplier,
  UbahSupplier,
  TampilDaftarBeli,
  TambahBeli,
  TampilBeli,
  UbahBeli,
  TampilABeli,
  TambahABeli,
  TampilDaftarStok
} from "./pages/index";

const App = () => {
  const { screenSize, setScreenSize } = useStateContext();
  const { collapseSidebar } = useProSidebar();
  const { user } = useContext(AuthContext);
  const [open, setOpen] = useState(true);

  const USERRoute = ({ children }) => {
    const { user } = useContext(AuthContext);

    if (user) {
      return children;
    }

    return <Navigate to="/unauthorized" />;
  };
  const MGRRoute = ({ children }) => {
    const { user } = useContext(AuthContext);

    if (user && user.tipeUser === "MGR") {
      return children;
    }

    return <Navigate to="/unauthorized" />;
  };

  const openMenuFunction = () => {
    setOpen(!open);
    collapseSidebar();
  };

  const contentWrapper = {
    minHeight: "100vh",
    width: open ? "80vw" : "100vw"
  };

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Box>
      <BrowserRouter>
        <CssBaseline />
        <Header />
        <div style={container}>
          {user && (
            <Sidebar
              backgroundColor={Colors.blue50}
              defaultCollapsed={screenSize >= 650 ? false : true}
              collapsedWidth="0px"
            >
              <Menu>
                <SubMenu label="Master" icon={<ClassIcon name="master-icon" />}>
                  <SubMenu label="Motor" icon={<MopedIcon name="motor-icon" />}>
                    <Divider />
                    <Link to="/tipe" style={linkText}>
                      <MenuItem>
                        <Typography
                          variant="body2"
                          sx={{ paddingLeft: "70px" }}
                        >
                          Tipe/Merk
                        </Typography>
                      </MenuItem>
                    </Link>
                    <Divider />
                    <Link to="/warna" style={linkText}>
                      <MenuItem>
                        <Typography
                          variant="body2"
                          sx={{ paddingLeft: "70px" }}
                        >
                          Warna
                        </Typography>
                      </MenuItem>
                    </Link>
                    <Divider />
                  </SubMenu>
                  <SubMenu label="Area" icon={<PublicIcon name="area-icon" />}>
                    <Divider />
                    <Link to="/wilayah" style={linkText}>
                      <MenuItem>
                        <Typography
                          variant="body2"
                          sx={{ paddingLeft: "70px" }}
                        >
                          Wilayah
                        </Typography>
                      </MenuItem>
                    </Link>
                    <Divider />
                    <Link to="/kecamatan" style={linkText}>
                      <MenuItem>
                        <Typography
                          variant="body2"
                          sx={{ paddingLeft: "70px" }}
                        >
                          Kecamatan
                        </Typography>
                      </MenuItem>
                    </Link>
                    <Divider />
                  </SubMenu>
                  <Link to="/dealer" style={linkText}>
                    <Box sx={{ paddingLeft: "20px" }}>
                      <MenuItem icon={<PersonPinIcon name="dealer-icon" />}>
                        Dealer
                      </MenuItem>
                    </Box>
                  </Link>
                  <Link to="/kolektor" style={linkText}>
                    <Box sx={{ paddingLeft: "20px" }}>
                      <MenuItem
                        icon={<SensorOccupiedIcon name="dealer-icon" />}
                      >
                        Kolektor
                      </MenuItem>
                    </Box>
                  </Link>
                  <Link to="/marketing" style={linkText}>
                    <Box sx={{ paddingLeft: "20px" }}>
                      <MenuItem
                        icon={<AddBusinessIcon name="marketing-icon" />}
                      >
                        Marketing
                      </MenuItem>
                    </Box>
                  </Link>
                  <Link to="/pekerjaan" style={linkText}>
                    <Box sx={{ paddingLeft: "20px" }}>
                      <MenuItem
                        icon={<EngineeringIcon name="pekerjaan-icon" />}
                      >
                        Pekerjaan
                      </MenuItem>
                    </Box>
                  </Link>
                  <Link to="/surveyor" style={linkText}>
                    <Box sx={{ paddingLeft: "20px" }}>
                      <MenuItem icon={<HailIcon name="surveyor-icon" />}>
                        Surveyor
                      </MenuItem>
                    </Box>
                  </Link>
                  <Link to="/leasing" style={linkText}>
                    <Box sx={{ paddingLeft: "20px" }}>
                      <MenuItem icon={<CarRentalIcon name="leasing-icon" />}>
                        Leasing
                      </MenuItem>
                    </Box>
                  </Link>
                  <Link to="/supplier" style={linkText}>
                    <Box sx={{ paddingLeft: "20px" }}>
                      <MenuItem icon={<AddReactionIcon name="supplier-icon" />}>
                        Supplier
                      </MenuItem>
                    </Box>
                  </Link>
                  <Divider />
                  <Link to="/cabang" style={linkText}>
                    <Box sx={{ paddingLeft: "20px" }}>
                      <MenuItem icon={<AddHomeWorkIcon name="cabang-icon" />}>
                        Cabang
                      </MenuItem>
                    </Box>
                  </Link>
                  <Link to="/unitBisnis" style={linkText}>
                    <Box sx={{ paddingLeft: "20px" }}>
                      <MenuItem icon={<ApartmentIcon name="cabang-icon" />}>
                        Unit Bisnis
                      </MenuItem>
                    </Box>
                  </Link>
                </SubMenu>
                <Divider />
                <SubMenu
                  label="Pembelian"
                  icon={<AddShoppingCartIcon name="pembelian-icon" />}
                >
                  <Link to="/daftarBeli" style={linkText}>
                    <Box sx={{ paddingLeft: "20px" }}>
                      <MenuItem icon={<ShoppingBagIcon name="beli-icon" />}>
                        Beli
                      </MenuItem>
                    </Box>
                  </Link>
                </SubMenu>
                <Divider />
                <SubMenu
                  label="Penjualan"
                  icon={<CurrencyExchangeIcon name="penjualan-icon" />}
                >
                  <Link to="/register" style={linkText}>
                    <Box sx={{ paddingLeft: "20px" }}>
                      <MenuItem
                        icon={<AppRegistrationIcon name="register-icon" />}
                      >
                        Register
                      </MenuItem>
                    </Box>
                  </Link>
                  <Link to="/jual" style={linkText}>
                    <Box sx={{ paddingLeft: "20px" }}>
                      <MenuItem icon={<SellIcon name="register-icon" />}>
                        Jual
                      </MenuItem>
                    </Box>
                  </Link>
                </SubMenu>
                <Divider />
                <SubMenu
                  label="Laporan"
                  icon={<InventoryIcon name="utility-icon" />}
                >
                  <Link to="/daftarStok" style={linkText}>
                    <Box sx={{ paddingLeft: "20px" }}>
                      <MenuItem
                        icon={<FormatListNumberedIcon name="profil-icon" />}
                      >
                        Daftar Stok
                      </MenuItem>
                    </Box>
                  </Link>
                </SubMenu>
                <Divider />
                <SubMenu
                  label="Utility"
                  icon={<ManageAccountsIcon name="utility-icon" />}
                >
                  <Link to="/profilUser" style={linkText}>
                    <Box sx={{ paddingLeft: "20px" }}>
                      <MenuItem icon={<PersonSearchIcon name="profil-icon" />}>
                        Profil User
                      </MenuItem>
                    </Box>
                  </Link>
                  <Link to="/daftarUser" style={linkText}>
                    <Box sx={{ paddingLeft: "20px" }}>
                      <MenuItem icon={<ElevatorIcon name="daftar-icon" />}>
                        Daftar User
                      </MenuItem>
                    </Box>
                  </Link>
                </SubMenu>
                <Divider />
              </Menu>
            </Sidebar>
          )}
          <main>
            {user && (
              <Tooltip title="Menu">
                <MenuIcon
                  onClick={() => openMenuFunction()}
                  sx={sidebarIcon}
                  fontSize="large"
                />
              </Tooltip>
            )}
            <Box sx={contentWrapper}>
              <Routes>
                <Route path="/" />
                <Route path="/login" element={<Login />} />
                <Route path="/unauthorized" element={<Login />} />
                {/* Tipe */}
                <Route
                  path="/tipe"
                  element={
                    <USERRoute>
                      <TampilTipe />
                    </USERRoute>
                  }
                />
                <Route
                  path="/tipe/tambahTipe"
                  element={
                    <USERRoute>
                      <TambahTipe />
                    </USERRoute>
                  }
                />
                <Route
                  path="/tipe/:id"
                  element={
                    <USERRoute>
                      <TampilTipe />
                    </USERRoute>
                  }
                />
                <Route
                  path="/tipe/:id/edit"
                  element={
                    <USERRoute>
                      <UbahTipe />
                    </USERRoute>
                  }
                />
                {/* Warna */}
                <Route
                  path="/warna"
                  element={
                    <USERRoute>
                      <TampilWarna />
                    </USERRoute>
                  }
                />
                <Route
                  path="/warna/:id"
                  element={
                    <USERRoute>
                      <TampilWarna />
                    </USERRoute>
                  }
                />
                <Route
                  path="/warna/tambahWarna"
                  element={
                    <USERRoute>
                      <TambahWarna />
                    </USERRoute>
                  }
                />
                <Route
                  path="/warna/:id/edit"
                  element={
                    <USERRoute>
                      <UbahWarna />
                    </USERRoute>
                  }
                />
                {/* Wilayah */}
                <Route
                  path="/wilayah"
                  element={
                    <USERRoute>
                      <TampilWilayah />
                    </USERRoute>
                  }
                />
                <Route
                  path="/wilayah/:id"
                  element={
                    <USERRoute>
                      <TampilWilayah />
                    </USERRoute>
                  }
                />
                <Route
                  path="/wilayah/tambahWilayah"
                  element={
                    <USERRoute>
                      <TambahWilayah />
                    </USERRoute>
                  }
                />
                <Route
                  path="/wilayah/:id/edit"
                  element={
                    <USERRoute>
                      <UbahWilayah />
                    </USERRoute>
                  }
                />
                {/* Kecamatan */}
                <Route
                  path="/kecamatan"
                  element={
                    <USERRoute>
                      <TampilKecamatan />
                    </USERRoute>
                  }
                />
                <Route
                  path="/kecamatan/:id"
                  element={
                    <USERRoute>
                      <TampilKecamatan />
                    </USERRoute>
                  }
                />
                <Route
                  path="/kecamatan/tambahKecamatan"
                  element={
                    <USERRoute>
                      <TambahKecamatan />
                    </USERRoute>
                  }
                />
                <Route
                  path="/kecamatan/:id/edit"
                  element={
                    <USERRoute>
                      <UbahKecamatan />
                    </USERRoute>
                  }
                />
                {/* Dealer */}
                <Route
                  path="/dealer"
                  element={
                    <USERRoute>
                      <TampilDealer />
                    </USERRoute>
                  }
                />
                <Route
                  path="/dealer/:id"
                  element={
                    <USERRoute>
                      <TampilDealer />
                    </USERRoute>
                  }
                />
                <Route
                  path="/dealer/tambahDealer"
                  element={
                    <USERRoute>
                      <TambahDealer />
                    </USERRoute>
                  }
                />
                <Route
                  path="/dealer/:id/edit"
                  element={
                    <USERRoute>
                      <UbahDealer />
                    </USERRoute>
                  }
                />
                {/* Kolektor */}
                <Route
                  path="/kolektor"
                  element={
                    <USERRoute>
                      <TampilKolektor />
                    </USERRoute>
                  }
                />
                <Route
                  path="/kolektor/:id"
                  element={
                    <USERRoute>
                      <TampilKolektor />
                    </USERRoute>
                  }
                />
                <Route
                  path="/kolektor/tambahKolektor"
                  element={
                    <USERRoute>
                      <TambahKolektor />
                    </USERRoute>
                  }
                />
                <Route
                  path="/kolektor/:id/edit"
                  element={
                    <USERRoute>
                      <UbahKolektor />
                    </USERRoute>
                  }
                />
                {/* Marketing */}
                <Route
                  path="/marketing"
                  element={
                    <USERRoute>
                      <TampilMarketing />
                    </USERRoute>
                  }
                />
                <Route
                  path="/marketing/:id"
                  element={
                    <USERRoute>
                      <TampilMarketing />
                    </USERRoute>
                  }
                />
                <Route
                  path="/marketing/tambahMarketing"
                  element={
                    <USERRoute>
                      <TambahMarketing />
                    </USERRoute>
                  }
                />
                <Route
                  path="/marketing/:id/edit"
                  element={
                    <USERRoute>
                      <UbahMarketing />
                    </USERRoute>
                  }
                />
                {/* Pekerjaan */}
                <Route
                  path="/pekerjaan"
                  element={
                    <USERRoute>
                      <TampilPekerjaan />
                    </USERRoute>
                  }
                />
                <Route
                  path="/pekerjaan/:id"
                  element={
                    <USERRoute>
                      <TampilPekerjaan />
                    </USERRoute>
                  }
                />
                <Route
                  path="/pekerjaan/tambahPekerjaan"
                  element={
                    <USERRoute>
                      <TambahPekerjaan />
                    </USERRoute>
                  }
                />
                <Route
                  path="/pekerjaan/:id/edit"
                  element={
                    <USERRoute>
                      <UbahPekerjaan />
                    </USERRoute>
                  }
                />
                {/* Surveyor */}
                <Route
                  path="/surveyor"
                  element={
                    <USERRoute>
                      <TampilSurveyor />
                    </USERRoute>
                  }
                />
                <Route
                  path="/surveyor/:id"
                  element={
                    <USERRoute>
                      <TampilSurveyor />
                    </USERRoute>
                  }
                />
                <Route
                  path="/surveyor/tambahSurveyor"
                  element={
                    <USERRoute>
                      <TambahSurveyor />
                    </USERRoute>
                  }
                />
                <Route
                  path="/surveyor/:id/edit"
                  element={
                    <USERRoute>
                      <UbahSurveyor />
                    </USERRoute>
                  }
                />
                {/* Cabang */}
                <Route
                  path="/cabang"
                  element={
                    <USERRoute>
                      <TampilCabang />
                    </USERRoute>
                  }
                />
                <Route
                  path="/cabang/:id"
                  element={
                    <USERRoute>
                      <TampilCabang />
                    </USERRoute>
                  }
                />
                <Route
                  path="/cabang/tambahCabang"
                  element={
                    <USERRoute>
                      <TambahCabang />
                    </USERRoute>
                  }
                />
                <Route
                  path="/cabang/:id/edit"
                  element={
                    <USERRoute>
                      <UbahCabang />
                    </USERRoute>
                  }
                />
                {/* Unit Bisnis */}
                <Route
                  path="/unitBisnis"
                  element={
                    <USERRoute>
                      <TampilUnitBisnis />
                    </USERRoute>
                  }
                />
                <Route
                  path="/unitBisnis/:id"
                  element={
                    <USERRoute>
                      <TampilUnitBisnis />
                    </USERRoute>
                  }
                />
                <Route
                  path="/unitBisnis/tambahUnitBisnis"
                  element={
                    <USERRoute>
                      <TambahUnitBisnis />
                    </USERRoute>
                  }
                />
                <Route
                  path="/unitBisnis/:id/edit"
                  element={
                    <USERRoute>
                      <UbahUnitBisnis />
                    </USERRoute>
                  }
                />
                {/* Leasing */}
                <Route
                  path="/leasing"
                  element={
                    <USERRoute>
                      <TampilLeasing />
                    </USERRoute>
                  }
                />
                <Route
                  path="/leasing/:id"
                  element={
                    <USERRoute>
                      <TampilLeasing />
                    </USERRoute>
                  }
                />
                <Route
                  path="/leasing/tambahLeasing"
                  element={
                    <USERRoute>
                      <TambahLeasing />
                    </USERRoute>
                  }
                />
                <Route
                  path="/leasing/:id/edit"
                  element={
                    <USERRoute>
                      <UbahLeasing />
                    </USERRoute>
                  }
                />
                {/* Supplier */}
                <Route
                  path="/supplier"
                  element={
                    <USERRoute>
                      <TampilSupplier />
                    </USERRoute>
                  }
                />
                <Route
                  path="/supplier/:id"
                  element={
                    <USERRoute>
                      <TampilSupplier />
                    </USERRoute>
                  }
                />
                <Route
                  path="/supplier/tambahSupplier"
                  element={
                    <USERRoute>
                      <TambahSupplier />
                    </USERRoute>
                  }
                />
                <Route
                  path="/supplier/:id/edit"
                  element={
                    <USERRoute>
                      <UbahSupplier />
                    </USERRoute>
                  }
                />
                {/* PEMBELIAN */}
                {/* Beli */}
                <Route
                  path="/daftarBeli"
                  element={
                    <USERRoute>
                      <TampilDaftarBeli />
                    </USERRoute>
                  }
                />
                <Route
                  path="/daftarBeli/beli/tambahBeli"
                  element={
                    <USERRoute>
                      <TambahBeli />
                    </USERRoute>
                  }
                />
                <Route
                  path="/daftarBeli/beli/:id"
                  element={
                    <USERRoute>
                      <TampilBeli />
                    </USERRoute>
                  }
                />
                <Route
                  path="/daftarBeli/beli/:id/edit"
                  element={
                    <USERRoute>
                      <UbahBeli />
                    </USERRoute>
                  }
                />
                {/* A Beli */}
                <Route
                  path="/daftarBeli/beli/:id/tambahABeli"
                  element={
                    <USERRoute>
                      <TambahABeli />
                    </USERRoute>
                  }
                />
                <Route
                  path="/daftarBeli/beli/:id/:idABeli"
                  element={
                    <USERRoute>
                      <TampilABeli />
                    </USERRoute>
                  }
                />
                {/* Daftar Stok */}
                <Route
                  path="/daftarStok"
                  element={
                    <USERRoute>
                      <TampilDaftarStok />
                    </USERRoute>
                  }
                />
                <Route
                  path="/daftarStok/:id"
                  element={
                    <USERRoute>
                      <TampilDaftarStok />
                    </USERRoute>
                  }
                />
                {/* Profil User */}
                <Route
                  path="/profilUser"
                  element={
                    <USERRoute>
                      <ProfilUser />
                    </USERRoute>
                  }
                />
                <Route
                  path="/profilUser/:id/edit"
                  element={
                    <USERRoute>
                      <UbahProfilUser />
                    </USERRoute>
                  }
                />
                {/* Daftar User */}
                <Route
                  path="/daftarUser"
                  element={
                    <MGRRoute>
                      <DaftarUser />
                    </MGRRoute>
                  }
                />
                <Route
                  path="/daftarUser/:id"
                  element={
                    <MGRRoute>
                      <DaftarUser />
                    </MGRRoute>
                  }
                />
                <Route
                  path="/daftarUser/:id/edit"
                  element={
                    <MGRRoute>
                      <UbahUser />
                    </MGRRoute>
                  }
                />
                <Route
                  path="/daftarUser/tambahUser"
                  element={
                    <MGRRoute>
                      <TambahUser />
                    </MGRRoute>
                  }
                />
                {/* PENJUALAN */}
                {/* Register */}
                <Route
                  path="/register"
                  element={
                    <USERRoute>
                      <TampilRegister />
                    </USERRoute>
                  }
                />
                <Route
                  path="/register/:id"
                  element={
                    <USERRoute>
                      <TampilRegister />
                    </USERRoute>
                  }
                />
                <Route
                  path="/register/tambahRegister"
                  element={
                    <USERRoute>
                      <TambahRegister />
                    </USERRoute>
                  }
                />
                <Route
                  path="/register/:id/edit"
                  element={
                    <USERRoute>
                      <UbahRegister />
                    </USERRoute>
                  }
                />
                {/* Jual */}
                <Route
                  path="/jual"
                  element={
                    <USERRoute>
                      <TampilJual />
                    </USERRoute>
                  }
                />
                <Route
                  path="/jual/:id"
                  element={
                    <USERRoute>
                      <TampilJual />
                    </USERRoute>
                  }
                />
                <Route
                  path="/jual/tambahJualBekas"
                  element={
                    <USERRoute>
                      <TambahJualBekas />
                    </USERRoute>
                  }
                />
                <Route
                  path="/jual/tambahJualBaru"
                  element={
                    <USERRoute>
                      <TambahJualBaru />
                    </USERRoute>
                  }
                />
                <Route
                  path="/jual/:id/editBekas"
                  element={
                    <USERRoute>
                      <UbahJualBekas />
                    </USERRoute>
                  }
                />
                <Route
                  path="/jual/:id/editBaru"
                  element={
                    <USERRoute>
                      <UbahJualBaru />
                    </USERRoute>
                  }
                />
                <Route path="*" element={<p>Halaman tidak ditemukan!</p>} />
              </Routes>
            </Box>
          </main>
        </div>
      </BrowserRouter>
    </Box>
  );
};

export default App;

const container = {
  display: "flex",
  height: "100%",
  minHeight: "100vh"
};

const sidebarIcon = {
  backgroundColor: Colors.grey300,
  borderRadius: "20px",
  padding: 1,
  marginLeft: 1,
  marginTop: 1,
  cursor: "pointer"
};

const linkText = {
  textDecoration: "none",
  color: "inherit"
};
