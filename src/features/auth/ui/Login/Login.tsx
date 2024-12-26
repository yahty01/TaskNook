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
import { loginTC } from "../../model/auth-reducer"
import { selectIsLoggedIn } from "../../model/authSelectors"
import { useEffect } from "react"
import { useNavigate } from "react-router"
import { Path } from "common/routing"

//react hook form это настраиваемый хук для удобного управления формами.

// Он принимает один объект в качестве необязательного аргумента.

export type Inputs = {
  email: string
  password: string
  rememberMe: boolean
}

const defaultFormValues = {
  email: "free@samuraijs.com",
  password: "",
  rememberMe: false,
}

export const Login = () => {
  const themeMode = useAppSelector(selectThemeMode)
  const theme = getTheme(themeMode)
  const dispatch = useAppDispatch()
  const isLoggedIn = useAppSelector(selectIsLoggedIn)
  let navigate = useNavigate()

  useEffect(() => {
    if (isLoggedIn) {
      navigate(Path.Main)
    }
  }, [isLoggedIn, navigate])

  const {
    register, // {...register("name-input")} в внутри <div тут>, для регистрации ввода в объект
    handleSubmit, // - эта функция получит данные формы, если валидация формы пройдет успешно
    // watch, // - функция отслеживает ввод в определенном поле или всей формы
    reset,
    control,
    formState: { errors },
  } = useForm<Inputs>({ defaultValues: defaultFormValues }) //def значение подставляеться пр  рендаре компаненты

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    dispatch(loginTC(data))
    reset({ password: "" })
  }

  //todo: Почему при клике на чекбокс, форм лейбл окрашиваеться в мейн цвет???
  return (
    <Grid container justifyContent={"center"}>
      <Grid justifyContent={"center"}>
        <FormControl>
          <FormLabel>
            <p>
              To login get registered
              <a
                style={{ color: theme.palette.secondary.main, marginLeft: "5px" }}
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
                    // render={({ field: { value, ...rest } }) => <Checkbox {...rest} checked={value} />}
                    render={({ field: { onChange, value } }) => (
                      <Checkbox onChange={(e) => onChange(e.target.checked)} checked={value} />
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
