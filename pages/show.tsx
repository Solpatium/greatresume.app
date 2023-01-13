import React, { useMemo } from "react";
import { useIsMounted } from "../src/utils/ssr";
import { useResumeData } from "../src/utils/storage";
import { Aleksandra } from "../src/resumes/templates/aleksandra";
import { Document, PDFViewer } from "@react-pdf/renderer";

const Creator: React.FC = () => {
  const mounted = useIsMounted();
  const [data] = useResumeData();

  if (!mounted) {
    return null;
  }

  return (
    <PDFViewer style={{ width: "90%", height: "100vh" }}>
      <Document>
        <Aleksandra data={data} />
      </Document>
    </PDFViewer>
  );
};

export const Loader: React.FC = () => {
  const mounted = useIsMounted();

  if (!mounted) {
    return null;
  }

  return <Creator />;
};

export default Loader;
