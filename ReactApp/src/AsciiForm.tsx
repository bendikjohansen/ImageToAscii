import { useRef } from "react";
import { AsciiBaseForm } from "./AsciiBaseForm";
import { fetchAscii } from "./services/fetchAscii";

interface AsciiFormProps {
  onSuccess: (result: string) => void;
  onInvertChange: (checked: boolean) => void;
}
export const AsciiForm = ({ onSuccess, onInvertChange }: AsciiFormProps) => {
  const formRef = useRef();

  const handleChange = async () => {
    if (!formRef.current) return;
    const formData = new FormData(formRef.current);
    const response = await fetchAscii(formData);
    onSuccess(response);
  };

  return (
    <AsciiBaseForm ref={formRef} onChange={handleChange} onInvertChange={onInvertChange}>
      <input
        required
        name="file"
        accept="image/*"
        type="file"
        onChange={handleChange}
      />
    </AsciiBaseForm>
  );
};
