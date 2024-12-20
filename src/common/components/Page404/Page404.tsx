import styled from "styled-components"

export const Page404 = () => {
  return (
    <>
      <Title>404</Title>
      <SubTitle>page not found</SubTitle>
    </>
  )
}

const Title = styled.h2`
  margin: 0;
  text-align: center;
  font-size: 250px;
`

const SubTitle = styled.h2`
  text-align: center;
  font-size: 50px;
  margin: 0;
  text-transform: uppercase;
`
