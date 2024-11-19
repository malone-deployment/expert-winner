import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export function GenerateQR() {
  const [image, setImage] = useState<string | null>(null);
  const [url, setUrl] = useState<string | null>(null);
  const navigate = useNavigate();
  useEffect(() => {
    const qrCodeLocalStorage = localStorage.getItem("qrCode");
    const urlLocalStorage = localStorage.getItem("url");
    if (!qrCodeLocalStorage) return;
    if (!urlLocalStorage) return;

    setImage(JSON.parse(qrCodeLocalStorage));
    setUrl(JSON.parse(urlLocalStorage));
  }, []);

  return (
    <>
      <h1>QR Code Generator</h1>
      <form id="qr-form">
        <button type="submit" className="content">
          Generate QR Code
        </button>
      </form>
      <div>{image && <img src={image} width={100} height={100} />}</div>
      <div>
        {url && (
          <Button
            variant="contained"
            onClick={() => {
              const { pathname, search } = new URL(url);
              const redirectUrl = `${pathname}${search}`;

              localStorage.removeItem("rentSessionData");
              navigate(redirectUrl);
            }}
          >
            Redirect
          </Button>
        )}
      </div>
    </>
  );
}
