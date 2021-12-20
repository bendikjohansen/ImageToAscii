import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  Slider,
} from "@mui/material";
import { useRef } from "react";

interface AsciiFormProps {
  onSuccess: (result: string) => void;
  onInvertChange: (checked: boolean) => void;
}
export const AsciiForm = ({ onSuccess, onInvertChange }: AsciiFormProps) => {
  const formRef = useRef<any>();

  const handleSubmit: React.FormEventHandler = async (e) => {
    e.preventDefault();
    if (!formRef.current) return;
    const response = await fetchAscii(formRef.current);
    onSuccess(response);
  };

  const handleChange = async () => {
    if (!formRef.current) return;
    const response = await fetchAscii(formRef.current);
    onSuccess(response);
  };

  const fetchAscii = async (form: HTMLFormElement) => {
    const formData = new FormData(form);

    const response = await fetch("https://localhost:7291/api/ascii", {
      method: "POST",
      body: formData,
      mode: "cors",
    });

    return await response.text();
  };

  return (
    <Container>
      <form ref={formRef} method="POST" onSubmit={handleSubmit}>
        <Box>
          <label>Brightness</label>
          <Slider
            name="brightness"
            defaultValue={1}
            min={0}
            max={5}
            step={0.1}
            size="small"
            onChange={handleChange}
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
            onChange={handleChange}
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
            onChange={handleChange}
          />
        </Box>
        <Box>
          <FormControlLabel
            control={<Checkbox onChange={e => onInvertChange(e.currentTarget.checked)} />}
            label="Invert"
          />
        </Box>
        <Box>
          <input required name="file" accept="image/*" type="file" />
        </Box>
        <Box>
          <Button variant="contained" type="submit">
            Submit
          </Button>
        </Box>
      </form>
    </Container>
  );
};
