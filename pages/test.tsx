import React, { useEffect, useState } from "react";
import { Document, Image, Page, StyleSheet, Text, usePDF, View } from "@react-pdf/renderer";
import { useCounter } from "react-use";
import { ZoomArea } from "../src/components/layout/zoomArea";
import { PdfViewer } from "../src/components/organisms/pdfViewer";
import Head from "next/head";

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "white",
    border: "solid",
    borderColor: "red",
    borderWidth: "10px",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  red: {
    color: "red",
    fontSize: "50px",
  },
  blue: {
    color: "blue",
    fontSize: "50px",
  },
  yellow: {
    color: "yellow",
    fontSize: "50px",
  },
  brown: {
    color: "brown",
    fontSize: "50px",
  },
});

const Wrapper = () => {
  const [counter, { inc }] = useCounter();
  const paperSize = counter % 2 === 0 ? "A4" : "letter";
  const [{ url }, refreshPdf] = usePDF({
    document: (
      <Document>
        <Page size={paperSize} style={styles.page}>
          <View style={styles.section}>
            <Image src="https://picsum.photos/536/354" cache={false} />
            <Text style={styles.red}>1 page {paperSize}</Text>
            <Text style={styles.blue}>2 page {paperSize}</Text>
            <Text style={styles.brown}>3 page {paperSize}</Text>
            <Text style={styles.blue}>4 page {paperSize}</Text>
            <Text style={styles.red}>5 page {paperSize}</Text>
            <Text style={styles.blue}>6 page {paperSize}</Text>
            <Text style={styles.brown}>7 page {paperSize}</Text>
            <Text style={styles.blue}>8 page {paperSize}</Text>
            <Text style={styles.red}>9page {paperSize}</Text>
            <Text style={styles.blue}>10 page {paperSize}</Text>
            <Text style={styles.brown}>page {paperSize}</Text>
            <Text style={styles.blue}>page {paperSize}</Text>
          </View>
          <View style={styles.section}>
            <Text>Section #2</Text>
          </View>
        </Page>
        <Page size={paperSize} style={styles.page}>
          <View style={styles.section}>
            <Text style={styles.red}>page {paperSize}</Text>
            <Text style={styles.blue}>page {paperSize}</Text>
            <Text style={styles.brown}>page {paperSize}</Text>
            <Text style={styles.blue}>page {paperSize}</Text>
            <Text style={styles.red}>page {paperSize}</Text>
            <Text style={styles.blue}>page {paperSize}</Text>
            <Text style={styles.brown}>page {paperSize}</Text>
            <Text style={styles.blue}>page {paperSize}</Text>
            <Text style={styles.red}>page {paperSize}</Text>
            <Text style={styles.blue}>page {paperSize}</Text>
            <Text style={styles.brown}>page {paperSize}</Text>
            <Text style={styles.blue}>page {paperSize}</Text>
          </View>
        </Page>
      </Document>
    ),
  });
  return (
    <div
      onClick={() => {
        inc();
        refreshPdf();
      }}>
      iframe
      {url}
      <div style={{ height: "800px" }} className="overflow-scroll">
        <ZoomArea>{url && <PdfViewer url={url} />}</ZoomArea>
      </div>
      {url}
    </div>
  );
};

export default () => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
        />
      </Head>
      <div>{mounted && <Wrapper />}</div>
    </>
  );
};
