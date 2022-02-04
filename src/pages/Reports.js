import { React } from "react";
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { db, set, ref, onChildAdded,remove,onValue } from "../config/firebase";
import UpdateIcon from '@mui/icons-material/Update';
import DeleteIcon from "@mui/icons-material/Delete";
import { v4 as uuidv4 } from "uuid";
import Navbar from  "../comp2/navbar";
import IconButton from "@mui/material/IconButton";
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

function Health() {
  const [CattleID, setCattleID] = useState("");
  const [CattleName, setCattleName] = useState("");
  const [Cattlecolor, setCattlecolor] = useState("");
  const [Temprature, setTemprature] = useState("");
  const [Status, setStatus] = useState("");
  const [userList, setUserList] = useState();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  var [updatebutton, setupdatebutton] = useState();

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  const add = () => {
    let obj = {
      CattleID,
      CattleName,
      Cattlecolor,
      Temprature,
      Status,
      key: updatebutton ? updatebutton : uuidv4(),
    };
    const refrence = ref(
      db,
      `/health/${updatebutton ? updatebutton : obj.key}`
    );

    set(refrence, obj)
      .then(() => {
        console.log("added");
      })
      .catch((err) => {
        console.log(err.message);
      });

    handleClose();
    setupdatebutton();

    setCattleID("");
    setCattleName("");
    setCattlecolor("");
    setTemprature("");
    setStatus("");
  };
  const deleteUser = (key) => {
    const refrence = ref(db, "health/" + key);
    remove(refrence);
  };
  useEffect(() => {
      let refrence = ref(db, "health/");
     
      onValue(refrence, (snapshot) => {
        
          
          
          let arr=Object.values(snapshot.val()).map((value)=>value);
          setUserList(arr);
      });

  }, []);
  function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
  }
  const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
  ];
  let upDate = (data) => {
    setupdatebutton(data.key);

    setCattleID(data.CattleID);
    setCattleName(data.CattleName);
    setCattlecolor(data.Cattlecolor);
    setTemprature(data.Temprature);
    setStatus(data.Status);
    handleOpen();
  };
  return (
    <>
    <Navbar />
    <div className="home">
      <center>
        <h1 style={{ color: "white" }}>Cattle health</h1>
      </center>
      <center>
        <Button style={{ color: "white" }} onClick={handleOpen}>
          ADD Cattle Health
          <AddCircleOutlineIcon />
        </Button>
        <Modal
          open={open}
          onClose={() => {
            handleClose();
            setupdatebutton();
          }}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Enter New Stock
            </Typography>
            <TextField
              sx={{ mt: 4 }}
              id="outlined-basic"
              label="CattleID"
              variant="outlined"
              value={CattleID}
              onChange={(e) => setCattleID(e.target.value)}
            />

            <TextField
              sx={{ mt: 4 }}
              id="outlined-basic"
              label="CattleName"
              variant="outlined"
              value={CattleName}
              onChange={(e) => setCattleName(e.target.value)}
            />
            <TextField
              sx={{ mt: 2 }}
              id="outlined-basic"
              label="Cattlecolor"
              variant="outlined"
              value={Cattlecolor}
              onChange={(e) => setCattlecolor(e.target.value)}
            />
            <TextField
              sx={{ mt: 2 }}
              id="outlined-basic"
              label="Temprature"
              variant="outlined"
              value={Temprature}
              onChange={(e) => setTemprature(e.target.value)}
            />
            
             <TextField
              sx={{ mt: 2 }}
              id="outlined-basic"
              label="Status"
              variant="outlined"
              value={Status}
              onChange={(e) => setStatus(e.target.value)}
            />
            <br />
            <Button
              onClick={add}
              sx={{
                mt: 2,
              }}
              variant="contained"
            >
              {updatebutton ? "Update" : <AddCircleOutlineIcon />}
            </Button>
          </Box>
        </Modal>
      </center>
      <div class="table-responsive-sm">
 
      <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>CATTLE RFID</TableCell>
            <TableCell align="center">CATTLE NAME</TableCell>
            <TableCell align="center">CATTLE COLOR</TableCell>
            <TableCell align="center">TEMPERATURE</TableCell>
            <TableCell align="center">STATUS</TableCell>
            
          </TableRow>
        </TableHead>
        <TableBody>
          {userList && (
            <>
            {userList.map((e,i) => (
              <TableRow
              key={i}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                
                <TableCell component="th" scope="row">
                  {e.CattleID}
                </TableCell>
                <TableCell align="center">{e.CattleName}</TableCell>
                <TableCell align="center">{e.Cattlecolor}</TableCell>
                <TableCell align="center">{e.Temprature}</TableCell>
                <TableCell align="center">{e.Status}</TableCell>
                
                <TableCell>
                <Button onClick={() => upDate(e)}><UpdateIcon/></Button>
                    </TableCell>
                    <TableCell>
                    <IconButton
                  onClick={() => deleteUser(e.key)}
                  aria-label="delete"
                  color="primary"
                >
                  <DeleteIcon />
                </IconButton>
            </TableCell>
              </TableRow>
            ))}
  </>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  
</div>
    </div>
    </>
  );
}
export default Health;
