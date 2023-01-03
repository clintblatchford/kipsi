import React from 'react'
import { Tab, Tabs } from '@mui/material'
import Title from './Title'
import ExpenseTable from './ExpenseTable'
import { Expense, Project } from './react-app-env'

interface IExpensesProps {
  projectId: string
}

const style = {
  tab: {
    paddingLeft: '2em'
  }
}

const Expenses = (props: IExpensesProps) => {
  const [expenses, setExpenses] = React.useState<Expense[]>([])
  const [value, setValue] = React.useState(0)
  const [tabs, setTabs] = React.useState<any>()

  React.useEffect(() => {
    fetch(`http://localhost:3001/projects`)
    .then(res => res.json())
    .then(data => renderTabs(Object.values(data)))
    .catch(err => console.error(err))
  }, [])

  React.useEffect(() => {
    fetch(`http://localhost:3001/projects/${props.projectId}`)
    .then(res => res.json())
    .then(data => setExpenses(data.project.expenses))
    .catch(err => console.error(err))
    setValue(parseInt(props.projectId))
  }, [props.projectId])

  const renderTabs = (projects: Project[]) => {
    setTabs(projects.map(proj => { 
      return <Tab id={proj.id} key={proj.name} label={proj.name} />
    }))
  }

  const handleChange = async (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
    await fetch(`http://localhost:3001/projects/${event.currentTarget.id}`)
    .then(res => res.json())
    .then(data => setExpenses(data.project.expenses))
    .catch(err => console.error(err))
  }

  return(<>
    <Title title='EXPENSES' />
    <Tabs 
      sx={style.tab} 
      value={value} 
      onChange={handleChange}   
      variant='scrollable'
      scrollButtons='auto'
    >
      {tabs}
    </Tabs>
    <div>
      <ExpenseTable expenses={expenses} />
    </div>
    </>
  )
}

export default Expenses