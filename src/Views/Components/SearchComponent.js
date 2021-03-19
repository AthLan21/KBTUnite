import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import SearchIcon from '@material-ui/icons/Search';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';

import { firestore } from "../../firebase";


const useStyles = makeStyles((theme) => ({
  root: {
    // padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 400,
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
}));


export default function CustomizedInputBase() {
    const [text, setText] = useState('');
    const [list, setList] = useState([]);
    const classes = useStyles();

    useEffect(() => {
        if(text.length>0){
            firestore.collection('users')
            .where('name', '>=', text)
            .get()
            .then((snapshot) => {
                const data = [];
                snapshot.forEach((doc) => {
                    // doc.data() is never undefined for query doc snapshots
                    console.log(doc.id, " => ", doc.data());
                    data.push(doc.data());
                });
                setList([...data]);
            })
            .catch(err => {
                console.log(err);
            })
        }else if(text.length === 0){
            setList(prev => [])
        }
    }, [text])

    const handleChange = (event) => {
        const value = event.target.value;
        setText(value);
    }

    return (
    <Grid 
        container 
        direction='column' 
        justify="center"
        alignItems="center" 
    >
        <Grid item>
            <Paper component="form" className={classes.root}>
                <InputBase
                    className={classes.input}
                    placeholder="Search Users"
                    inputProps={{ 'aria-label': 'search users' }}
                    onChange={handleChange}
                />
                <Divider className={classes.divider} orientation="vertical" />
                <IconButton type="submit" className={classes.iconButton} aria-label="search">
                    <SearchIcon />
                </IconButton>
            </Paper>
        </Grid>
        <Grid item >
            <List>
                {list.map(item => <SearchCard key={item.email} item={item} />)}
            </List>
        </Grid>
    </Grid>
    );
}


const SearchCard = (props) => {
    const {email, name} = props.item;

    return (
    <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
        </ListItemAvatar>
        <ListItemText
          primary={name}
          secondary={
            <React.Fragment>
              <Typography
                component="span"
                variant="body2"
                color="textPrimary"
              >
                Student
              </Typography>
              {email}
            </React.Fragment>
          }
        />
    </ListItem>
    );
}