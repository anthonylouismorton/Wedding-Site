import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import { visuallyHidden } from '@mui/utils';
import { useState} from 'react';
import {
  Switch,
  FormControlLabel,
  Tooltip,
  IconButton,
  Checkbox,
  Paper,
  Typography,
  Toolbar,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
} from '@mui/material';
import{Delete, FilterList, Edit, Send, Add} from '@material-ui/icons'
import axios from 'axios'
import {send} from 'emailjs-com'
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
  box: {
    width: '75%',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: '50px'
  }
});

function GuestList(props){
const classes = useStyles();
const [order, setOrder] = useState('asc');
const [orderBy, setOrderBy] = useState('name');
const [page, setPage] = useState(0);
const [dense, setDense] = useState(false);
const [rowsPerPage, setRowsPerPage] = useState(5);

const handleOpen = async () => {
  props.setOpen(true);
  let guest = await axios.get(`${process.env.REACT_APP_DATABASE}/invitee/id/${props.guestSelected[0].id}`)
  props.setSelectedInvitee(guest.data)
}
const handleAddGuest = () => {
  console.log('in the handler')
  props.setShowAddGuest(!props.showAddGuest)
}
const handleSend = async () => {
  console.log(props.guestSelected)
  let toSend = {
    to_name: '',
    guest: '',
    rsvp_code: '',
    to_email: '',
  }
  const guests = props.guestSelected.map((invitee) => {
    let sO;
    let plusOne ='';
    if(invitee.sO !== 'none'){
      sO = ` & ${invitee.sO}`
    }
    else{
      sO = ''
    }
    if(invitee.plusOne !== 'none'){
      plusOne = ' and a guest'
    }
    toSend = {
      to_name: `${invitee.name}${sO}`,
      guest: plusOne,
      rsvp_code: invitee.rsvpCode,
      to_email: invitee.email
    }
    let updateGuest;
    if(invitee.rsvpSend === "No"){
      send(
        'service_kpczsow',
        'template_9g5vasq',
        toSend,
        'user_ae534oceyDw5ZzqpjncZ7'
      )
      .then((response) => {
        console.log('SUCCESS!', response.status, response.text);
      })
      .catch((err) => {
        console.log('FAILED...', err);
      });
      updateGuest = axios.put(`${process.env.REACT_APP_DATABASE}/invitee/send/${invitee.id}`)
    }
    return updateGuest;
  })
  await Promise.all(guests)
  props.setGuestSelected([])
  props.getGuests();
}
function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}
function stableSort(array, comparator) {
  let stabilizedThis = [];
  if(array.length > 0){
  stabilizedThis = array.map((el, index) => [el, index]);
  }
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: 'name',
    numeric: true,
    disablePadding: true,
    label: 'Name',
  },
  {
    id: 'so',
    numeric: false,
    disablePadding: false,
    label: 'Significant Other',
  },
  {
    id: 'plusOne',
    numeric: false,
    disablePadding: false,
    label: '+1',
  },
  {
    id: 'rsvp',
    numeric: false,
    disablePadding: false,
    label: 'RSVP',
  },
  {
    id: 'rsvpCode',
    numeric: false,
    disablePadding: false,
    label: 'RSVP Code',
  },
  {
    id: 'rsvpSend',
    numeric: false,
    disablePadding: false,
    label: 'RSVP Sent',
  },
  {
    id: 'email',
    numeric: false,
    disablePadding: false,
    label: 'Email',
  },
];

function EnhancedTableHead(props) {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
    props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all desserts',
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'left' : 'center'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const EnhancedTableToolbar = (props) => {
  const { numSelected } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: '1 1 100%' }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
        sx={{ flex: '1 1 100%', textAlign: 'center'}}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Guest List
        </Typography>
      )}

      {numSelected === 1 ? 
        <>
        <Tooltip title="Delete">
          <IconButton onClick={handleDelete}>
            <Delete />
          </IconButton>
        </Tooltip>
        <Tooltip title="Edit">
          <IconButton onClick={handleOpen}>
            <Edit />
          </IconButton>
        </Tooltip>
        <Tooltip title="Send">
          <IconButton onClick={handleSend}>
            <Send/>
          </IconButton>
        </Tooltip>
        </>
        : numSelected > 1 ?
        <>
          <Tooltip title="Delete">
            <IconButton onClick={handleDelete}>
              <Delete />
            </IconButton>
          </Tooltip>
          <Tooltip title="Send">
            <IconButton onClick={handleSend}>
              <Send/>
            </IconButton>
          </Tooltip>
        </>
        : 
        <>
        <Tooltip title="Add Guest">
          <IconButton onClick={handleAddGuest}>
            <Add />
          </IconButton>
        </Tooltip>
        
        <Tooltip title="Filter list">
          <IconButton>
            <FilterList/>
          </IconButton>
        </Tooltip>
        </>
      }
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

  const handleDelete = async () => {
    const deleteGuests = props.guestSelected.map((guest) => axios.delete(`${process.env.REACT_APP_DATABASE}/invitee/${guest.rsvpCode}`))
    await Promise.all(deleteGuests)
    props.setGuestSelected([])
    props.getGuests();
  }

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

    //All checkboxes only highlight when newSeelcteds is set to an id. Need to figure out why
  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = props.rows;
      props.setGuestSelected(newSelecteds);
      return;
    }
    props.setGuestSelected([]);
  };

  const handleClick = (event, inviteeInfo) => {
    const selectedIndex = props.guestSelected.indexOf(inviteeInfo);
    let newSelected = [];
    
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(props.guestSelected, inviteeInfo);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(props.guestSelected.slice(1));
    } else if (selectedIndex === props.guestSelected.length - 1) {
      newSelected = newSelected.concat(props.guestSelected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        props.guestSelected.slice(0, selectedIndex),
        props.guestSelected.slice(selectedIndex + 1),
      );
    }
    props.setGuestSelected(newSelected);
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const isSelected = (name) => props.guestSelected.indexOf(name) !== -1;
  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - props.rows.length) : 0;
  return (
    <Box className={classes.box}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <EnhancedTableToolbar numSelected={props.guestSelected.length} />
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
          >
            <EnhancedTableHead
              numSelected={props.guestSelected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={props.rows.length}
            />
            <TableBody>

              {stableSort(props.rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row);
                  const labelId = `enhanced-table-checkbox-${index}`;
                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.id}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          color="primary"
                          checked={isItemSelected}
                          inputProps={{
                            'aria-labelledby': labelId,
                          }}
                        />
                      </TableCell>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                      >
                        {row.name}
                      </TableCell>
                      <TableCell align="center">{row.sO}</TableCell>
                      <TableCell align="center">{row.plusOne}</TableCell>
                      <TableCell align="center">{row.rsvp}</TableCell>
                      <TableCell align="center">{row.rsvpCode}</TableCell>
                      <TableCell align="center">{row.rsvpSend}</TableCell>
                      <TableCell align="center">{row.email}</TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        {/* <FormControlLabel
          control={<Switch checked={dense} onChange={handleChangeDense} />}
          label="Dense padding"
        /> */}
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, 50]}
          component="div"
          count={props.rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );

}

export default GuestList;