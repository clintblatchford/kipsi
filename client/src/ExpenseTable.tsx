import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material'
import { Expense } from "./react-app-env"

interface IExpenseTableProps {
  expenses: Expense[]
}

const style = {
  container: {
    paddingLeft: '3em'
  },
  header: {
    fontSize: '16px',
    fontWeight: 'bolder',
    width: '33%',
  }
}

const ExpenseTable = (props: IExpenseTableProps) => {
  return (
    <TableContainer sx={style.container}>
    <Table sx={{width: '90%' }}>
      <TableHead>
        <TableRow >
          <TableCell sx={style.header}>Name</TableCell>
          <TableCell align="left" sx={style.header}>Amount</TableCell>
          <TableCell align="left" sx={style.header}>Date</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {props.expenses.map((exp) => {
          let date = new Date(exp.timestamp)
          return (
            <TableRow key={exp.name}>
              <TableCell component="th" scope="row">{exp.name}</TableCell>
              <TableCell align="left">{`$${exp.amount}`}</TableCell>
              <TableCell align="left">{`${date.getMonth()}/${date.getDate()}/${date.getFullYear()}`}</TableCell>
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
  </TableContainer>
  )
}

export default ExpenseTable