import React from 'react'
import { Typography, Button } from '@mui/material'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'

const HEADER_TEXT = 'R&D TAX CREDIT'
const pages = ['Projects', 'Expenses']

interface IHeaderProps {
  handleNavClick: (currentNav: string) => void
}

const style = {
  container: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    height: '65px',
    paddingLeft: '8px',
    color: '#ffffff',
    backgroundColor: '#1875D1'
  },
  title: {
    position: 'fixed',
    right: 20,
    fontSize: '24px', 
    fontWeight:'bold'
  }
}

const Header = (props: IHeaderProps) => {
  const handleNavClick = (event: React.MouseEvent<HTMLElement>) => {
    props.handleNavClick(event.currentTarget.id)
  }

  return (
      <div style={style.container}>
        <AttachMoneyIcon fontSize='large' />
          {pages.map((page) => (
            <Button
              key={page}
              id={page}
              onClick={handleNavClick}
              sx={{ my: 2, color: 'white', display: 'block', fontSize: 16}}
            >
              {page}
            </Button>
          ))}
          <Typography sx={style.title}>{HEADER_TEXT}</Typography>
      </div>
  )
}
  
export default Header