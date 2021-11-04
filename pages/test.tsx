import React, { useEffect, useRef, useState } from "react";
import { Document, Page, StyleSheet, Text, usePDF, View } from "@react-pdf/renderer";
import { isClient } from "react-use/lib/util";
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
      <ZoomArea>{url && <PdfViewer paperSize={paperSize} url={url} />}</ZoomArea>
      {/*<iframe*/}
      {/*  style={{ width: "50%", height: "100vh" }}*/}
      {/*  src={url + "#toolbar=1&navpanes=1&scrollbar=1"}*/}
      {/*/>*/}
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
