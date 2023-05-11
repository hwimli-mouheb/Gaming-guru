import React from 'react'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import DeleteOutlined from '@material-ui/icons/DeleteOutlined'
import { makeStyles } from '@material-ui/core'
import Avatar from '@material-ui/core/Avatar'
import { format } from 'date-fns'
import { yellow, green, pink, blue } from '@material-ui/core/colors'

const useStyles = makeStyles({
  avatar: {
    backgroundColor: (index) => {
      if (index % 4 == 0) {
        return yellow[700]
      }
      if (index % 4 == 1) {
        return green[500]
      }
      if (index % 4 == 2) {
        return pink[500]
      }
      return blue[500]
    },
  }
})

export default function NoteCard({ note, handleDelete,index }) {
  const classes = useStyles(index)

  const getDate = (timestamp) => {
    const date = new Date(timestamp);
    return (
      date.getHours() + ":" + date.getMinutes() + ", " + date.toDateString()
    );
  };
  return (
    <div>
      <Card elevation={1}>
        <CardHeader
          avatar={
            <Avatar className={classes.avatar}>
              {note.parent_id}
            </Avatar>}
          title={note.created}
          subheader={"posted at : " + getDate(note.createdAt)}
        />
        <CardContent>
          <Typography variant="body2" color="textSecondary">
            { note.post }
          </Typography>
        </CardContent>
      </Card>
    </div>
  )
}