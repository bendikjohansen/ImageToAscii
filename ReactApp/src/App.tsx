import { ThemeProvider } from "@emotion/react";
import { createTheme, CssBaseline } from "@mui/material";
import { useState } from "react";
import { AsciiOutput } from "./AsciiOutput";
import { AsciiRealtimeForm } from "./AsciiRealtimeForm";

const theme = createTheme();

export const App = () => {
  const [asciiOutput, setAsciiOutput] = useState("");
  const [invert, setInvert] = useState(false);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AsciiRealtimeForm onInvertChange={setInvert} onSuccess={setAsciiOutput} />
      <AsciiOutput invert={invert}>{asciiOutput}</AsciiOutput>
    </ThemeProvider>
  );
};
