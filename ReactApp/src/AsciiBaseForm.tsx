import { Box, Checkbox, Container, FormControlLabel, Slider } from "@mui/material";
import React from "react";

interface AsciiBaseFormProps {
  onChange?: () => void;
  onInvertChange: (inverted: boolean) => void;
  children?: JSX.Element;
}
export const AsciiBaseForm = React.forwardRef(({ onChange, onInvertChange, children }: AsciiBaseFormProps, ref) => (
  <Container>
    <form ref={ref as any} method="POST">
      <Box>
        <label>Brightness</label>
        <Slider
          name="brightness"
          defaultValue={1}
          min={0}
          max={5}
          step={0.1}
          size="small"
          onChange={onChange}
        />
      </Box>
      <Box>
        <label>Contrast</label>
        <Slider
          name="contrast"
          defaultValue={1}
          min={0}
          max={5}
          step={0.1}
          size="small"
          onChange={onChange}
        />
      </Box>
      <Box>
        <label>Width</label>
        <Slider
          name="width"
          defaultValue={100}
          min={1}
          max={1000}
          step={10}
          size="small"
          onChange={onChange}
        />
      </Box>
      <Box>
        <FormControlLabel
          control={
            <Checkbox
              onChange={(e) => onInvertChange(e.currentTarget.checked)}
            />
          }
          label="Invert"
        />
      </Box>
      <Box>
        {children}
      </Box>
    </form>
  </Container>
));
