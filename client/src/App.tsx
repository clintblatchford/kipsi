import React from 'react'
import Header from './Header'
import Projects from './Projects'
import Expenses from './Expenses'

function App() {
  const [currentPanel, setCurrentPanel] = React.useState<string>('Projects')
  const [projectId, setProjectId] = React.useState<string>('0')
  const handleNavClick =(currentNav: string) => {
    setCurrentPanel(currentNav)
  }

  const handleProjectClick = (projectId: string) => {
    setProjectId(projectId)
    setCurrentPanel('Expenses')
  }

  return (<>
    <Header handleNavClick={handleNavClick}/>
    {currentPanel !== '' ? (
      currentPanel === 'Projects' ?  <Projects handleProjectClick={handleProjectClick} /> : <Expenses projectId={projectId}/>
    ) : <></>
    }
    </>
  )
}

export default App
