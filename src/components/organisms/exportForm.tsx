import React, { FormEvent, useCallback, useState } from "react";
import { ResumeModel } from "../../models/v1";
import { Button } from "antd";
import { DownloadOutlined } from "@ant-design/icons";

export const ExportForm: React.FC<{ className?: string; data: ResumeModel }> = ({
  data,
  className,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const onExport = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      setIsLoading(true);
      console.log("EXPORT", data);
      e.preventDefault();
      return fetch("/api/generate", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then(response => response.blob())
        .then(blob => {
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = "export.pdf";
          document.body.appendChild(a);
          a.click();
          a.remove();
          URL.revokeObjectURL(url);
        })
        .finally(() => {
          setIsLoading(false);
        });
    },
    [data],
  );

  return (
    <form onSubmit={onExport} className={className}>
      <Button
        type="primary"
        htmlType="submit"
        icon={<DownloadOutlined />}
        size="large"
        loading={isLoading}>
        Export to PDF
      </Button>
    </form>
  );
};
