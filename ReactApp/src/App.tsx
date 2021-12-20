import { ThemeProvider } from "@emotion/react";
import { createTheme, CssBaseline } from "@mui/material";
import { useState } from "react";
import { AsciiForm } from "./AsciiForm";
import { AsciiOutput } from "./AsciiOutput";

const theme = createTheme();

export const App = () => {
  const [asciiOutput, setAsciiOutput] = useState("");
  const [invert, setInvert] = useState(false);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AsciiForm onInvertChange={setInvert} onSuccess={setAsciiOutput} />
      <AsciiOutput invert={invert}>{asciiOutput}</AsciiOutput>
    </ThemeProvider>
  );
};
