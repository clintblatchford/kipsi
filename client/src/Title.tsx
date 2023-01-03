import { Typography } from '@mui/material'

interface ITitleProps {
  title: string
  style?: object
}

const style = {
  title: {
    paddingLeft: '2em',
    paddingTop: '10px',
    fontWeight: 'bolder',
    color: '#1875D1'
  }
}

const Title = (props: ITitleProps) => {
  return (
    <div style={props.style}>
      <Typography variant='h5' sx={style.title}>
        {props.title}
      </Typography>
    </div>
  )
}

export default Title