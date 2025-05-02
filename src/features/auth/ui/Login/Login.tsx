import Button from "@mui/material/Button"
import Checkbox from "@mui/material/Checkbox"
import FormControl from "@mui/material/FormControl"
import FormControlLabel from "@mui/material/FormControlLabel"
import FormGroup from "@mui/material/FormGroup"
import FormLabel from "@mui/material/FormLabel"
import Grid from "@mui/material/Grid2"
import TextField from "@mui/material/TextField"
import { useAppDispatch, useAppSelector } from "common/hooks"
import { selectThemeMode } from "app/model/appSelectors"
import { getTheme } from "common/lib/theme"
import styled from "styled-components"
import { Controller, SubmitHandler, useForm } from "react-hook-form"
import { loginTC, selectIsLoggedIn } from "../../model/authSlice"
import { useEffect } from "react"
import { useNavigate } from "react-router"
import { Path } from "common/routing"

export type Inputs = {
  email: string
  password: string
  rememberMe: boolean
}

const rememberEmail = localStorage.getItem("rememberEmail") || "free@samuraijs.com"

const defaultFormValues: Inputs = {
  email: rememberEmail,
  password: "",
  rememberMe: false,
}

export const Login = () => {
  const themeMode = useAppSelector(selectThemeMode)
  const theme = getTheme(themeMode)
  const dispatch = useAppDispatch()
  const isLoggedIn = useAppSelector(selectIsLoggedIn)
  let navigate = useNavigate()

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: defaultFormValues,
  })

  // При монтировании подгружаем состояние rememberMe из localStorage
  useEffect(() => {
    const remember = localStorage.getItem("rememberMe") === "true"
    if (remember) {
      reset({ ...defaultFormValues, rememberMe: true })
    }
  }, [reset])

  useEffect(() => {
    if (isLoggedIn) {
      navigate(Path.Main)
    }
  }, [isLoggedIn, navigate])

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    dispatch(loginTC(data))
    if (data.rememberMe) {
      localStorage.setItem("rememberMe", data.rememberMe.toString())
      localStorage.setItem("rememberEmail", data.email)
    } else if (!data.rememberMe) {
      localStorage.removeItem("rememberMe")
      localStorage.removeItem("rememberEmail")
    }
    reset({ password: "" })
  }

  return (
    <Grid container justifyContent={"center"}>
      <Grid justifyContent={"center"}>
        <FormControl>
          <FormLabel>
            <p>
              To login get registered
              <a
                style={{ color: theme.palette.text.primary, marginLeft: "5px" }}
                href={"https://social-network.samuraijs.com/"}
                target={"_blank"}
                rel="noreferrer"
              >
                here
              </a>
            </p>
            <p>or use common test account credentials:</p>
            <p>
              <b>Email:</b> free@samuraijs.com
            </p>
            <p>
              <b>Password:</b> free
            </p>
          </FormLabel>

          <form onSubmit={handleSubmit(onSubmit)}>
            <FormGroup>
              <TextField
                label="Email"
                margin="normal"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                    message: "Incorrect email address",
                  },
                })}
              />
              {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}

              <TextField
                type="password"
                label="Password"
                margin="normal"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 3,
                    message: "Password must be at least 3 characters long",
                  },
                })}
              />
              {errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}
              <FormControlLabel
                sx={{ color: theme.palette.primary.contrastText }}
                label={"Remember me"}
                control={
                  <Controller
                    name={"rememberMe"}
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <Checkbox
                        onChange={(e) => {
                          const checked = e.target.checked
                          onChange(checked)
                        }}
                        checked={value}
                      />
                    )}
                  />
                }
              />
              <Button type={"submit"} variant={"contained"} color={"primary"}>
                Login
              </Button>
            </FormGroup>
          </form>
        </FormControl>
      </Grid>
    </Grid>
  )
}

const ErrorMessage = styled.span`
  color: red;
  font-size: 14px;
`
