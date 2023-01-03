import React from "react"
import { List, ListItem, ListItemText, Divider, Button, TextField } from "@mui/material"
import Title from "./Title"
import CreateModal from "./CreateModal"
import { Project } from "./react-app-env"

interface IProjectsProps {
  handleProjectClick: (projectId: string) => void
}

const defaultValues = {
  name: "",
  expense1: 0,
  expense2: 0,
  expense3: 0,
  expense4: 0,
}

const style = {
  list: {
    paddingLeft: '4em',
    fontSize: '16px',
    fontWeight: 'bolder',
    color: '#1875D1'
  },
  projectBar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginTop: '10px',
    height: '34px', 
    width: '100%'
  },
  title: {
    position: 'fixed',
    left: 0,
    top: 65
  },
  button: {
    height: '38px',
    marginTop: '5px'
  },
  textField:{
    marginLeft: '10px', 
    marginTop: '5px',
    marginRight: '15px',
  },
}

const Projects = (props: IProjectsProps) => {
  const [projects, setProjects] = React.useState<Project[]>()
  const [projectsSearchArray, setProjectsSearchArray] = React.useState<Project[]>()
  const [open, setOpen] = React.useState<boolean>(false)
  const [formValues, setFormValues] = React.useState(defaultValues)

  React.useEffect(() => {
    const fetchProjects = async () => {
      await fetch('http://localhost:3001/projects')
        .then(res => res.json())
        .then(data => {
          setProjects(Object.values(data))
          setProjectsSearchArray(Object.values(data))
        })
        .catch(err => console.error(err))
    }
    fetchProjects()
  }, [])

  const refresh = () => {
    fetch('http://localhost:3001/projects')
    .then(res => res.json())
    .then(data => console.log(Object.values(data)))
    // setProjects([...projects as Project[], formValues] )
    // setProjectsSearchArray(Object.values(data))
  }

  const handleSearch = async (evt: React.ChangeEvent<HTMLInputElement>) => {
    if(evt.target.value.length > 0) {
      let results: Project[] = []
      projectsSearchArray?.forEach(proj => {
        if(proj.metadata.includes(evt.target.value))
          results.push(proj)
      })
      setProjects(results)
    }
    else {
      await fetch('http://localhost:3001/projects')
      .then(res => res.json())
      .then(data => setProjects(Object.values(data)))
      .catch(err => console.error(err))
    }
  }

  const handleSubmit = async (evt: React.SyntheticEvent) => {
    evt.preventDefault()
    if(formValues.name.length < 1) return
    await fetch('http://localhost:3001/projects', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formValues)
    })
    .then(res => {
      setOpen(false)
      setFormValues(defaultValues)
      res.json().then(response => {
        setProjects([...projects as Project[], response])
        setProjectsSearchArray([...projects as Project[], response])
      })
    })
    .catch(err => console.error(err))
  }

  const handleFormInput = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = evt.currentTarget
    setFormValues({
      ...formValues,
      [name]: value,
    })
  }

  const handleOpen = () => setOpen(true)

  const handleClose = () => setOpen(false)

  return( <>
    <div style={style.projectBar}>
      <Title style={style.title} title="PROJECTS" />
      <Button variant='contained' onClick={handleOpen} sx={style.button}>CREATE</Button>
      <TextField
        id="outlined-search"
        label="Search"
        size = 'small'
        sx={style.textField}
        onChange={handleSearch}>
      </TextField>
    </div>
    <List sx={{width: '100%'}} component="nav" aria-label="mailbox folders">
      {projects?.map((project: Project) => { return (<React.Fragment key={project.name+project.id}>
        <ListItem key={project.name} sx={style.list} button onClick={() => {props.handleProjectClick(project.id)}}>
          <ListItemText  primary={project.name} />
        </ListItem>
        <Divider key={project.id}/>
        </React.Fragment>
      )})}
    </List>
      <CreateModal 
        handleFormInput={handleFormInput}
        handleSubmit={handleSubmit}
        handleOpen={handleOpen}
        handleClose={handleClose}
        open={open}
      />
    </>
  )
}

export default Projects