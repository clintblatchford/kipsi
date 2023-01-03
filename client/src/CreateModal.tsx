import { Modal, Box, Typography, TextField, Button } from "@mui/material"

interface ICreateModalProps {
  handleFormInput: (evt: React.ChangeEvent<HTMLInputElement>) => void
  handleSubmit: (evt: React.SyntheticEvent) => void 
  handleOpen: () => void
  handleClose: () => void
  open: boolean
}

const style = {
  modal: {
    position: 'absolute',
    top: '40%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: '#dddddd',
    border: '2px solid #1875D1',
    borderRadius: 4,
    boxShadow: 24,
    p: 2
  },
  modalButtons: {
    display: 'flex',
    width: '100%',
    justifyContent: 'flex-end',
    gap: '10px'
  },
  button: {
    height: '38px',
    marginTop: '5px'
  },
}

const CreateModal = (props: ICreateModalProps) => {
  return (
    <Modal
    open={props.open}
    onClose={props.handleClose}
  >
    <Box sx={style.modal}>
      <Typography style={{fontWeight: 'bolder', color: '#1875D1'}} variant="h6">
        CREATE PROJECT
      </Typography>
      <form onSubmit={props.handleSubmit}>
      <div style={{display: 'flex', gap: '8px', flexDirection: 'column'}}>
        <TextField
          id="outlined-name"
          label="Name"
          name="name"
          size = 'small'
          onChange={props.handleFormInput}
          >
        </TextField>
        <TextField
          id="expense-1"
          label="Expense 1"
          name="expense1"
          size = 'small'
          type='number'
          onChange={props.handleFormInput}
          >
        </TextField>
        <TextField
          id="expense-2"
          label="Expense 2"
          size = 'small'
          type='number'
          name="expense2"
          onChange={props.handleFormInput}
          >
        </TextField>
        <TextField
          id="expense-3"
          label="Expense 3"
          name="expense3"
          type='number'
          size = 'small'
          onChange={props.handleFormInput}
          >
        </TextField>
        <TextField
          id="expense-4"
          label="Expense 4"
          name="expense4"
          type='number'
          size = 'small'
          onChange={props.handleFormInput}
          >
        </TextField>
      </div>
      <div style={style.modalButtons}>
        <Button variant='contained' onClick={props.handleClose} sx={style.button}>CANCEL</Button>
        <Button variant='contained' type="submit" onClick={props.handleSubmit} sx={style.button}>SUBMIT</Button>
      </div>
      </form>
    </Box>
  </Modal>
  )
}

export default CreateModal