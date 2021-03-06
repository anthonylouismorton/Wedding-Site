import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import { visuallyHidden } from '@mui/utils';
import {useState} from 'react';
import {
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
import{ Delete, FilterList, Edit, ViewCarousel, Add } from '@material-ui/icons'
import axios from 'axios'
import '../styling/photoList.css'
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
  box: {
    width: '70%',
    marginLeft: 'auto',
    marginRight: 'auto',
    paddingTop: '50px',
    paddingBottom: '50px'
  }
});

function PhotoList(props){
const classes = useStyles();
const [order, setOrder] = useState('asc');
const [orderBy, setOrderBy] = useState('name');
const [page, setPage] = useState(0);
const [dense] = useState(false);
const [rowsPerPage, setRowsPerPage] = useState(5);
    
const handleOpen = async () => { 
  props.setPhotoOpen(true)
  let photo = await axios.get(`${process.env.REACT_APP_DATABASE}/photo/${props.selected[0]}`)
  props.setSelectedPhoto(photo.data)
};

const handleCarousel = () => {
  props.setShowCarousel(!props.showCarousel)
}

const handleAddPhoto = () => {
  props.setShowAddPhoto(!props.showAddphoto)
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
    id: 'photoURL',
    numeric: true,
    disablePadding: true,
    label: 'Photo',
  },
  {
    id: 'category',
    numeric: false,
    disablePadding: false,
    label: 'Category',
  },
  {
    id: 'caption',
    numeric: false,
    disablePadding: false,
    label: 'Caption',
  },
  {
    id: 'tags',
    numeric: false,
    disablePadding: false,
    label: 'Tags',
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
        <>
          <Typography
            sx={{ flex: '1 1 100%', textAlign: 'center'}}
            variant="h6"
            id="tableTitle"
            component="div"
          >
            Photos
          </Typography>
          <Tooltip title="Add Photo">
            <IconButton onClick={handleAddPhoto}>
              <Add />
            </IconButton>
          </Tooltip>
          <Tooltip title="Toggle Carousel">
            <IconButton onClick={handleCarousel}>
              <ViewCarousel />
            </IconButton>
          </Tooltip>
        </>
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
        </>
      : numSelected > 1 ?
        <Tooltip title="Delete">
          <IconButton onClick={handleDelete}>
            <Delete />
          </IconButton>
        </Tooltip>
       : 
        <Tooltip title="Filter list">
          <IconButton>
            <FilterList />
          </IconButton>
        </Tooltip>
      }
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

  const handleDelete = async () => {
    const requests = props.selected.map((photo) => axios.delete(`${process.env.REACT_APP_DATABASE}/photo/${photo}`))
    await Promise.all(requests)
    props.setSelected([])
    props.getPhotos();
  }
 
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = props.photos.map((n) => n._id);
      props.setSelected(newSelecteds);
      return;
    }
    props.setSelected([]);
  };

  const handleClick = (event, photoInfo) => {
    const selectedIndex = props.selected.indexOf(photoInfo._id);
    let newSelected = [];
    
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(props.selected, photoInfo._id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(props.selected.slice(1));
    } else if (selectedIndex === props.selected.length - 1) {
      newSelected = newSelected.concat(props.selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        props.selected.slice(0, selectedIndex),
        props.selected.slice(selectedIndex + 1),
      );
    }
    props.setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // const handleChangeDense = (event) => {
  //   setDense(event.target.checked);
  // };

  const isSelected = (name) => props.selected.indexOf(name) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - props.photos.length) : 0;
    
  return (
    <Box className={classes.box}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <EnhancedTableToolbar numSelected={props.selected.length} />
        <TableContainer>
          <Table
            // sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
          >
            <EnhancedTableHead
              numSelected={props.selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={props.photos.length}
            />
            <TableBody>

              {stableSort(props.photos, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row._id);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row._id}
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
                      <TableCell align="left">
                        <img id="thumbnail" src={row.photoUrl} alt ={row.photoUrl}/>
                      </TableCell>
                      <TableCell align="center">{row.category}</TableCell>
                      <TableCell align="center">{row.caption}</TableCell>
                      <TableCell align="center">{row.tags.join(', ')}</TableCell>
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
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, 50]}
          component="div"
          count={props.photos.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      {/* <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      /> */}
    </Box>
  );

}

export default PhotoList;