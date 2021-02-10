import React, { useEffect, useState } from "react";
import Head from "next/head";
import { Theme } from "../src/utils/theme";
import { TwoPanes } from "../src/components/layout/twoPanes";
import styled from "styled-components";
import { SectionSet } from "../src/components/organisms/steps";
import { emptyResume, ResumeModel } from "../src/models/v1";
import exampleResume from "../src/models/example.json";
import { useIsMounted } from "../src/utils/ssr";
import { useRouter } from "next/router";
import { PagePreview } from "../src/components/layout/pagePreview";
import Preview from "../src/templates";
import { ExportForm } from "../src/components/organisms/exportForm";
import { Button, Card, Divider } from "antd";
import { DownloadOutlined, LeftOutlined, RightOutlined } from "@ant-design/icons/lib";
import classNames from "classnames";
import { useLocalStorage, useThrottleFn } from "react-use";

const Wrapper = styled.div`
  @media print {
    .hide-on-print {
      display: none;
    }
    ${TwoPanes} {
      display: block;
      margin: 0;
      padding: 0;
    }
  }
`;

const Pre = styled.pre`
  max-width: 600px;
  margin: 120px;
  background: #ddd;
  padding: 20px;
`;

const PreviewWrapper = styled.div`
  position: relative;
`;

const ToolsCard = styled(Card)`
  position: absolute;
  top: 90vh;
  width: 60%;
  left: 20%;
  right: 0;
  display: flex;
  justfy-items: center;
`;

const Export = styled(ExportForm)`
  // position: absolute;
  // top: 90vh;
  // left: 0;
  // right: 0;
`;

const Creator: React.FC = () => {
  const [isPreviewing, setIsPreviewing] = useState(false);
  const mounted = useIsMounted();
  const { query } = useRouter();
  const [storedData, storeData] = useLocalStorage("resume-data", emptyResume);
  const [data, setData] = useState<ResumeModel>(
    "example" in query ? (exampleResume as ResumeModel) : storedData,
  );
  // Save data in local storage
  useThrottleFn(
    data => {
      console.log("STORING DATA");
      storeData(data);
    },
    5000,
    [data],
  );
  const isExample = "example" in query;
  useEffect(() => {
    if (isExample) {
      setData(exampleResume as ResumeModel);
    }
  }, [isExample]);

  if (!mounted) {
    return null;
  }

  return (
    <Wrapper>
      <Head>
        <title>Resume creator</title>
      </Head>
      <Theme>
        <div className="pb-20 lg:pb-0 grid grid-cols-1 lg:grid-cols-2 gap-2">
          <SectionSet
            className={classNames(isPreviewing ? "hidden" : "block", "lg:ml-4")}
            state={data}
            setState={setData}
          />
          <div
            className={classNames(
              isPreviewing ? "block" : "hidden",
              "relative max-w-full overflow-hidden hidden lg:block",
            )}>
            <PagePreview>
              <Preview data={data} />
            </PagePreview>
            <ToolsCard>
              {/*<Button disabled type="ghost" shape="circle" icon={<LeftOutlined />} size="large" />*/}
              {/*<Button type="ghost" shape="circle" icon={<RightOutlined />} size="large" />*/}

              {/*<Divider type="vertical" />*/}

              <Export data={data} />
            </ToolsCard>
          </div>
          <div className="lg:hidden fixed bottom-2 right-2">
            <button type="button" className="text-white font-bold rounded-3xl bg-blue-600 p-4">
              Preview
            </button>
          </div>
        </div>
      </Theme>
    </Wrapper>
  );
};

export default Creator;
