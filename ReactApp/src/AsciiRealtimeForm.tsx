import { useEffect, useRef } from "react";
import { AsciiBaseForm } from "./AsciiBaseForm";
import { fetchAscii } from "./services/fetchAscii";

const video = document.createElement("video");
const imageCanvas = document.createElement("canvas");
imageCanvas.width = 640;
imageCanvas.height = 480;
const ctx = imageCanvas.getContext("2d");

interface AsciiRealtimeFormProps {
  onSuccess: (result: string) => void;
  onInvertChange: (checked: boolean) => void;
}
export const AsciiRealtimeForm = ({
  onSuccess,
  onInvertChange,
}: AsciiRealtimeFormProps) => {
  const formRef = useRef<HTMLFormElement>();

  useEffect(() => {
    (async () => {
      if (!formRef.current) return;
      const form = formRef.current;

      const stream = await navigator.mediaDevices.getUserMedia({
        video: { frameRate: 10 },
      });

      video.srcObject = stream;
      video.onloadedmetadata = (e) => {
        video.play();
      };

      setInterval(() => {
        ctx?.clearRect(0, 0, 640, 480);
        ctx?.drawImage(video, 0, 0, 640, 480);
        imageCanvas.toBlob(async blob => {
          if (!blob) return;
          const formData = new FormData(form);
          formData.append("file", blob);
          const response = await fetchAscii(formData);
          onSuccess(response);
        });
      }, 100);
    })();
  }, [onSuccess]);

  return (
    <AsciiBaseForm ref={formRef} onInvertChange={onInvertChange} />
  );
};
