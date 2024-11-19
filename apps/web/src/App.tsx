import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Index, TimeoutPage } from "./pages";
import { PropsWithChildren } from "react";
import { GenerateQR } from "./pages/qr";

const AppInternal: React.FC<PropsWithChildren> = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/timeoutPage" element={<TimeoutPage />} />
        <Route path="/generateqrcode" element={<GenerateQR />} />
      </Routes>
    </BrowserRouter>
  );
};

export function App() {
  return <AppInternal></AppInternal>;
}
