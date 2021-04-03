import React, {useEffect, useState} from "react";
import {
  AppBar,
  Avatar,
  Box,
  Breadcrumbs,
  Card,
  Container,
  Grid,
  IconButton,
  Link,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Toolbar,
  Typography
} from "@material-ui/core";
import { drive } from "srpcd-example-http-client";
import {isLoggedIn, useService} from "../auth";
import {Redirect} from "react-router-dom";
import FolderIcon from '@material-ui/icons/Folder';

export function Drive() {
  const {drive} = useService();
  const [navigation, setNavigation] = useState<drive.DriveFile[]>([]);
  const [cd, setCd] = useState<drive.DriveFile>();
  const [files, setFiles] = useState<drive.DriveFile[]>([]);

  useEffect(() => {
    if (!cd) return

    cd.getFilename().then(console.log)
    cd.files().then(files => {
      setFiles(files)
    })
  }, [ cd ])

  useEffect(() => {
    drive.rootFolder()
      .then(async root => {
        setCd(root)
      })
    drive.getDetails().then(console.log)
  }, [])

  const open = (file: drive.DriveFile) => {
    if (cd) setNavigation([ ...(navigation || []), cd ])
    setCd(file);
  }

  if (!isLoggedIn()) return <Redirect to={'/login'}/>;

  return <>
    <AppBar position="fixed">
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu">
          <FolderIcon />
        </IconButton>
        <Typography variant="h6" >
          Drive
        </Typography>
      </Toolbar>
    </AppBar>
    <Box height={82}/>
    <Container>
      <Grid container spacing={2} direction={"row"}>
        <Grid item md={12}>
          <Breadcrumbs aria-label="breadcrumb">
            {
              cd && [ ...navigation, cd ].map((n, i) => <Link key={i} color="inherit" href="/">
                {n.getData().name}
              </Link>)
            }
          </Breadcrumbs>
        </Grid>
      {
        files.map((f, i) => <Grid item md={3} key={i}>
          <FileComponent onClick={open} file={f}/>
        </Grid>)
      }
    </Grid>
    </Container>
  </>
}

export function FileComponent({file, onClick }: { onClick: any, file: drive.DriveFile }) {
  const {drive} = useService();
  const [data, setData] = useState<drive.DriveFileDetails>();

  useEffect(() => {
    setData(file.getData())
  }, [file])

  return data ? <Card onClick={() => onClick(file)} variant={"outlined"}>
    <ListItem>
      <ListItemAvatar>
        <Avatar>
          <FolderIcon/>
        </Avatar>
      </ListItemAvatar>
      <ListItemText primary={data.name}/>
    </ListItem>
  </Card> : <></>
}
