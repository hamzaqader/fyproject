import { React } from "react";
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { db, set, ref, onChildAdded, auth, onAuthStateChanged ,remove} from "../config/firebase";
import { v4 as uuidv4 } from "uuid";
import UpdateIcon from '@mui/icons-material/Update';
import Navbar from "../comp2/navbar";
import { useNavigate } from "react-router";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

function Foodstock() {
  const [sno, setSno] = useState("");
  const [breedname, setBreedname] = useState("");
  const [quantity, setQuantity] = useState("");
  const [purchaseDate, setpurchaseDate] = useState("");
  const [breedCost, setbreedCost] = useState("");
  const [userList, setUserList] = useState([]);
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
  const navigate = useNavigate()
  const add = () => {

    let obj = {
      sno,
      breedname,
      quantity,
      purchaseDate,
      breedCost,
      key: updatebutton ? updatebutton : uuidv4(),
    };

    const refrence = ref(
      db,
      `/foodstock/${updatebutton ? updatebutton : obj.key}`
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

    setSno("");
    setBreedname("");
    setQuantity("");
    setpurchaseDate("");
    setbreedCost("");
  };
  const deleteUser = (key) => {
    const refrence = ref(db, "foodstock/" + key);
    remove(refrence);
  };
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate("/");
      }
    });
    let refrence = ref(db, "foodstock/");
    let arr = [];
    onChildAdded(refrence, (snapshot) => {
      if (snapshot.exists()) {
        arr.push(snapshot.val());
        setUserList([...arr]);
      }
    });

  }, []);


  let upDate = (data) => {
    setupdatebutton(data.key);

    setSno(data.sno);
    setBreedname(data.breedname);
    setQuantity(data.quantity);
    setpurchaseDate(data.purchaseDate);
    setbreedCost(data.breedCost);
    handleOpen();
  };
  return (
    <>
     <Navbar />
      <div className="home">
        <center>
          <h1 style={{ color: "white" }}>FOOD STOCK</h1>
        </center>
        <center>
          <Button style={{ color: "white" }} onClick={handleOpen}>
            ADD Foodstock
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
                label="Sno"
                variant="outlined"
                value={sno}
                onChange={(e) => setSno(e.target.value)}
              />

              <TextField
                sx={{ mt: 4 }}
                id="outlined-basic"
                label="BreedName"
                variant="outlined"
                value={breedname}
                onChange={(e) => setBreedname(e.target.value)}
              />
              <TextField
                sx={{ mt: 2 }}
                id="outlined-basic"
                label="Quantity"
                variant="outlined"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
              <TextField
                sx={{ mt: 2 }}
                id="outlined-basic"
                label="PurchaseDate"
                variant="outlined"
                value={purchaseDate}
                onChange={(e) => setpurchaseDate(e.target.value)}
              />
              <TextField
                sx={{ mt: 2 }}
                id="outlined-basic"
                label="BreedCost"
                variant="outlined"
                value={breedCost}
                onChange={(e) => setbreedCost(e.target.value)}
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
        <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>CATTLE ID</TableCell>
            <TableCell align="center">BREEDNAME</TableCell>
            <TableCell align="center">QUANTITY</TableCell>
            <TableCell align="center">PURCHASEDATE</TableCell>
            <TableCell align="center">BREEDCOST</TableCell>
            
            <TableCell align="center"></TableCell>
            
          </TableRow>
        </TableHead>
        <TableBody>
          {userList.map((e, i) => (
            <TableRow
            key={i}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {e.sno}
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

        </TableBody>
      </Table>
    </TableContainer>
      </div>
    </>
  );
}
export default Foodstock;
