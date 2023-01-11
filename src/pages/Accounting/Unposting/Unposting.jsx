import React, { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../../contexts/AuthContext";
import { tempUrl } from "../../../contexts/ContextProvider";
import { Loader } from "../../../components";
import {
  Box,
  Typography,
  TextField,
  Button,
  Divider,
  Snackbar,
  Alert
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import DeleteSweepIcon from "@mui/icons-material/DeleteSweep";

const Unposting = () => {
  const { user } = useContext(AuthContext);
  const [bulanTahun, setBulanTahun] = useState("");

  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [vertical] = useState("bottom");
  const [horizontal] = useState("center");

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const unposting = async () => {
    var newBulanTahun = new Date(bulanTahun);
    var tempBulanTahun =
      newBulanTahun.getFullYear() +
      "-" +
      (newBulanTahun.getMonth() + 1) +
      "-" +
      newBulanTahun.getDate();
    var dariTgl = tempBulanTahun;

    var lastday = function (y, m) {
      return new Date(y, m, 0).getDate();
    };
    var sampaiTgl =
      newBulanTahun.getFullYear() +
      "-" +
      (newBulanTahun.getMonth() + 1) +
      "-" +
      lastday(newBulanTahun.getDate(), newBulanTahun.getMonth() + 1);

    setLoading(true);
    // Jurnal Unposting Pembelian
    await axios.post(`${tempUrl}/jurnalUnposting`, {
      dariTgl,
      sampaiTgl,
      id: user._id,
      token: user.token,
      kodeCabang: user.cabang._id
    });
    setLoading(false);
    setOpen(true);
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box sx={container}>
        <Typography color="#757575">Accounting</Typography>
        <Typography variant="h4" sx={subTitleText}>
          Unposting
        </Typography>
        <Divider sx={dividerStyle} />
        <Box sx={showDataWrapper}>
          <Typography sx={[labelInput, spacingTop]}>Periode</Typography>
          <DatePicker
            views={["year", "month"]}
            label="Bulan dan Tahun"
            value={bulanTahun}
            onChange={(newValue) => {
              setBulanTahun(newValue);
            }}
            renderInput={(params) => (
              <TextField {...params} helperText={null} />
            )}
          />
        </Box>
        <Box sx={spacingTop}>
          <Button
            variant="contained"
            startIcon={<DeleteSweepIcon />}
            onClick={() => unposting()}
          >
            UNPOSTING
          </Button>
        </Box>
        <Snackbar
          open={open}
          autoHideDuration={6000}
          onClose={handleClose}
          anchorOrigin={{ vertical, horizontal }}
          key={vertical + horizontal}
        >
          <Alert
            onClose={handleClose}
            severity="success"
            variant="filled"
            sx={{ width: "100%" }}
          >
            Jurnal berhasil diunposting!
          </Alert>
        </Snackbar>
      </Box>
    </LocalizationProvider>
  );
};

export default Unposting;

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
  mt: 4,
  mb: 2
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
