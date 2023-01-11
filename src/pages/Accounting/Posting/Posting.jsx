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
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";

const Posting = () => {
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

  const posting = async () => {
    var date = new Date();
    var current_date =
      date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear();
    var current_time =
      date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();

    let isFailedValidation = bulanTahun.length === 0;
    if (isFailedValidation) {
      setError(true);
    } else {
      setLoading(true);
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

      // await axios.post(`${tempUrl}/saveLastNeracaSaldo`, {
      //   id: user._id,
      //   token: user.token,
      //   kodeCabang: user.cabang._id
      // });
      // Jurnal Posting Pembelian
      await axios.post(`${tempUrl}/saveJurnalPostingPembelian`, {
        dariTgl,
        sampaiTgl,
        tglInput: current_date,
        jamInput: current_time,
        userInput: user.username,
        id: user._id,
        token: user.token,
        kodeCabang: user.cabang._id
      });
      setLoading(false);
      setOpen(true);
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box sx={container}>
        <Typography color="#757575">Accounting</Typography>
        <Typography variant="h4" sx={subTitleText}>
          Posting
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
              <TextField
                {...params}
                error={error && bulanTahun.length === 0 && true}
                helperText={
                  error && bulanTahun.length === 0 && "Bulan Tahun harus diisi!"
                }
              />
            )}
          />
        </Box>
        <Box sx={spacingTop}>
          <Button
            variant="contained"
            startIcon={<DriveFileRenameOutlineIcon />}
            onClick={() => posting()}
          >
            POSTING
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
            Jurnal berhasil diposting!
          </Alert>
        </Snackbar>
      </Box>
    </LocalizationProvider>
  );
};

export default Posting;

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
