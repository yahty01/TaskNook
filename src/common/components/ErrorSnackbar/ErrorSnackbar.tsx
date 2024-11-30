import Snackbar, { SnackbarCloseReason } from "@mui/material/Snackbar"
import Alert from "@mui/material/Alert"
import { SyntheticEvent } from "react"
import { AppDispatch } from "app/store"
import { setAppErrorAC } from "app/model/app-reducer"

type Props = {
  error: string | null
  dispatch: AppDispatch
}

export default function ErrorSnackbar(props: Props) {
  const handleClose = (_: SyntheticEvent | Event, reason?: SnackbarCloseReason) => {
    if (reason === "clickaway") {
      return
    }
    props.dispatch(setAppErrorAC(null))
  }

  return (
    <div>
      <Snackbar open={props.error !== null} autoHideDuration={4000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" variant="filled" sx={{ width: "100%" }}>
          {props.error}
        </Alert>
      </Snackbar>
    </div>
  )
}
