import { Container, Theme } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles<Theme, { invert: boolean }>((theme) => ({
  output: {
    fontSize: 4,
    letterSpacing: 1,
    lineHeight: 1,
    backgroundColor: ({ invert }) => (invert ? "black" : "white"),
    color: ({ invert }) => (invert ? "white" : "black"),
  },
}));

interface AsciiOutputProps {
  children: string;
  invert: boolean;
}
export const AsciiOutput = ({ children, invert }: AsciiOutputProps) => {
  const classes = useStyles({ invert });

  return (
    <Container>
      <pre className={classes.output}>{children}</pre>
    </Container>
  );
};
