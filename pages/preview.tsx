import React, { ReactElement } from "react";
import { TwoPanes } from "../src/components/layout/twoPanes";
import styled from "styled-components";
import exampleResume from "../src/models/example.json";
import { ConstantPage } from "../src/components/layout/pagePreview";
import Preview from "../src/templates";
import { GetServerSideProps } from "next";
import * as cache from "../src/utils/cache";

export const getServerSideProps: GetServerSideProps = async ctx => {
  const { key } = ctx.query;
  const data = cache.pop(key as string) || exampleResume;
  return {
    props: {
      data,
    },
  };
};

export default ({ data }): ReactElement => {
  return (
    <ConstantPage>
      <Preview data={data} />
    </ConstantPage>
  );
};
