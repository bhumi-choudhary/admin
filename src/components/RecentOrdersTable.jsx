import React from 'react';
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Button,
  Chip,
  TablePagination,
  TextField,
  InputAdornment,
  IconButton,
  Menu,
  MenuItem,
} from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

// ================= Styled Components =================
const StyledTableHead = styled(TableHead)(({ theme }) => ({
  '& th': {
    padding: theme.spacing(1.5),
    backgroundColor:
      theme.palette.mode === 'dark'
        ? theme.palette.grey[800]
        : theme.palette.grey[100],

    color:
      theme.palette.mode === 'dark'
        ? theme.palette.grey[200]
        : theme.palette.grey[900],
    fontWeight: 'bold',
  },
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  padding: theme.spacing(1),
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor:
      theme.palette.mode === 'dark'
        ? alpha(theme.palette.action.hover, 0.08)
        : theme.palette.grey[50],
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
  '&:hover': {
    backgroundColor: alpha(theme.palette.action.hover, 0.1),
  },
  borderBottom: `1px solid ${theme.palette.divider}`,
}));

const StatusChip = styled(Chip)(({ theme, status }) => {
  let backgroundColor, color;
  switch (status) {
    case 'Cancel':
      backgroundColor =
        theme.palette.mode === 'dark'
          ? alpha(theme.palette.error.dark, 0.3)
          : alpha(theme.palette.error.light, 0.5);
      color =
        theme.palette.mode === 'dark'
          ? theme.palette.error.light
          : theme.palette.error.dark;
      break;
    case 'Pending':
      backgroundColor =
        theme.palette.mode === 'dark'
          ? alpha(theme.palette.warning.dark, 0.3)
          : alpha(theme.palette.warning.light, 0.5);
      color =
        theme.palette.mode === 'dark'
          ? theme.palette.warning.light
          : theme.palette.warning.dark;
      break;
    case 'Success':
    case 'Delivered':
      backgroundColor =
        theme.palette.mode === 'dark'
          ? alpha(theme.palette.success.dark, 0.3)
          : alpha(theme.palette.success.light, 0.5);
      color =
        theme.palette.mode === 'dark'
          ? theme.palette.success.light
          : theme.palette.success.dark;
      break;
    default:
      backgroundColor = theme.palette.grey[300];
      color = theme.palette.grey[900];
  }
  return {
    backgroundColor,
    color,
    fontWeight: 'bold',
  };
});

const ActionButton = styled(Button)(({ theme, variantColor }) => ({
  borderRadius: 4,
  margin: theme.spacing(0.5),
  textTransform: 'none',
  minWidth: 'auto',
  padding: theme.spacing(0.5, 1.5),
  fontSize: '0.75rem',
  ...(variantColor === 'primary' && {
    backgroundColor: alpha(theme.palette.primary.main, 0.1),
    color: theme.palette.primary.main,
    border: `1px solid ${alpha(theme.palette.primary.main, 0.3)}`,
  }),
  ...(variantColor === 'secondary' && {
    backgroundColor: alpha(theme.palette.secondary.main, 0.1),
    color: theme.palette.secondary.main,
    border: `1px solid ${alpha(theme.palette.secondary.main, 0.3)}`,
  }),
}));

// ================= Dummy Data =================
const rows = [
  { id: '#348930/80', invoice: 'INV001', time: '2023-10-27 10:00', customer: 'John Doe', method: 'Credit Card', amount: '$150.00', status: 'Success' },
  { id: '#348931/81', invoice: 'INV002', time: '2023-10-27 09:30', customer: 'Jane Smith', method: 'PayPal', amount: '$75.50', status: 'Pending' },
  { id: '#348932/82', invoice: 'INV003', time: '2023-10-27 09:00', customer: 'Michael Lee', method: 'UPI', amount: '$120.00', status: 'Cancel' },
  { id: '#348933/83', invoice: 'INV004', time: '2023-10-27 08:45', customer: 'Sarah Connor', method: 'Cash', amount: '$200.00', status: 'Delivered' },
  { id: '#348934/84', invoice: 'INV005', time: '2023-10-27 08:20', customer: 'Bruce Wayne', method: 'Card', amount: '$500.00', status: 'Success' },
  { id: '#348935/85', invoice: 'INV006', time: '2023-10-27 07:50', customer: 'Clark Kent', method: 'Cash', amount: '$350.00', status: 'Pending' },
];

// Icons
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';

const RecentOrdersTable = () => {
  const navigate = useNavigate();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (_, newPage) => setPage(newPage);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const openMenu = Boolean(anchorEl);

  const handleChangeRowsPerPage = (e) => {
    setRowsPerPage(parseInt(e.target.value, 10));
    setPage(0);
  };

  const visibleRows = React.useMemo(
    () => rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [page, rowsPerPage]
  );
  const [searchTerm, setSearchTerm] = React.useState('');

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setPage(0); // Reset pagination on search
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDownload = () => {
    console.log('Download clicked');
    handleClose();
  };

  const handleExport = () => {
    console.log('Export clicked');
    handleClose();
  };

  const handleImport = () => {
    console.log('Import clicked');
    handleClose();
  };

  const filteredAndSearchedRows = React.useMemo(() => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    return rows.filter(row =>
      Object.values(row).some(value =>
        String(value).toLowerCase().includes(lowerCaseSearchTerm)
      )
    );
  }, [searchTerm, rows]);

  return (
    <Paper sx={{ boxShadow: 3, borderRadius: 2, mt: 4, overflowX: 'auto' }}>
      <Box sx={{ p: 2, bgcolor: 'background.paper', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
        <Typography variant="h6" gutterBottom={false}>
          Recent Orders
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
          <TextField
            variant="outlined"
            size="small"
            placeholder="Search orders"
            value={searchTerm}
            onChange={handleSearchChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
          <IconButton
            aria-label="filter/actions"
            id="actions-button"
            aria-controls={openMenu ? 'actions-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={openMenu ? 'true' : undefined}
            onClick={handleClick}
          >
            <FilterListIcon />
          </IconButton>
          <Menu
            id="actions-menu"
            anchorEl={anchorEl}
            open={openMenu}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'actions-button',
            }}
          >
            <MenuItem onClick={handleDownload}>Download</MenuItem>
            <MenuItem onClick={handleExport}>Export</MenuItem>
            <MenuItem onClick={handleImport}>Import</MenuItem>
          </Menu>
        </Box>
      </Box>

      <TableContainer>
        <Table sx={{ minWidth: 800 }} aria-label="recent orders table">
          <StyledTableHead>
            <TableRow>
              <StyledTableCell>ID</StyledTableCell>
              <StyledTableCell>Invoice No</StyledTableCell>
              <StyledTableCell>Order Time</StyledTableCell>
              <StyledTableCell>Customer Name</StyledTableCell>
              <StyledTableCell>Method</StyledTableCell>
              <StyledTableCell align="right">Amount</StyledTableCell>
              <StyledTableCell>Status</StyledTableCell>
              <StyledTableCell align="center">Action</StyledTableCell>
              <StyledTableCell align="center">Invoice</StyledTableCell>
            </TableRow>
          </StyledTableHead>

          <TableBody>
            {visibleRows.map((row) => (
              <StyledTableRow key={row.id}>
                <StyledTableCell>{row.id}</StyledTableCell>
                <StyledTableCell>{row.invoice}</StyledTableCell>
                <StyledTableCell>{row.time}</StyledTableCell>
                <StyledTableCell>{row.customer}</StyledTableCell>
                <StyledTableCell>{row.method}</StyledTableCell>
                <StyledTableCell align="right">{row.amount}</StyledTableCell>
                <StyledTableCell>
                  <StatusChip label={row.status} status={row.status} />
                </StyledTableCell>
                <StyledTableCell align="center">
                  <ActionButton
                    variant="contained"
                    variantColor="primary"
                    size="small"
                    onClick={() => navigate(`/admin/order-details/${row.id}`)}
                  >
                    View
                  </ActionButton>
                </StyledTableCell>
                <StyledTableCell align="center">
                  <ActionButton
                    variant="outlined"
                    variantColor="primary"
                    size="small"
                    onClick={() => navigate(`/admin/invoices/${row.invoice}`)}
                  >
                    Details
                  </ActionButton>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={filteredAndSearchedRows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default RecentOrdersTable;
