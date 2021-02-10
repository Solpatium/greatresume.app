import React, { useCallback, useEffect, useRef, useState } from "react";
import AvatarEditor from "react-avatar-editor";
import { Button, Modal, Slider, Upload } from "antd";
import styled from "styled-components";
import { useDropzone } from "react-dropzone";
import {
  CloseOutlined,
  SmileOutlined,
  UploadOutlined,
  ZoomInOutlined,
  ZoomOutOutlined,
} from "@ant-design/icons/lib";
import { base64ToDataUrl, blobToBase64 } from "../../utils/blob";

interface PhotoProps {
  image?: string;
  setImage: (value: string) => void;
}

const EditorWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const UploadIcon = styled(UploadOutlined)`
  margin-top: 20px;
  font-size: 4rem;
  color: lightgray;
`;

const UploadZone = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 300px;
  border: dashed 2px gray;
  border-radius: 10px;
  cursor: pointer;
`;

const SliderWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-top: 20px;
`;

const StyledSlider = styled(Slider)`
  flex: 1;
  margin: 15px;
`;

const EditModal: React.FC<PhotoProps & { close: () => void }> = ({ close, image, setImage }) => {
  const [file, setFile] = useState<File>();
  const onImageSave = useCallback(() => {
    if (editorRef.current) {
      return new Promise((res, rej) => {
        editorRef.current.getImage().toBlob(blob =>
          blobToBase64(blob)
            .then(base64 => {
              setImage(base64);
              res();
            })
            .catch(rej)
            .finally(close),
        );
      });
    }
  }, [close, setImage]);

  const editorRef = useRef<AvatarEditor>();
  const [zoom, setZoom] = useState(1);
  const onDrop = useCallback(([file]: File[]) => {
    setFile(file);
    // Do something with the files
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: "image/*",
    multiple: false,
  });
  return (
    <Modal title="Add your picture" visible onOk={onImageSave} onCancel={close}>
      {isDragActive && "DRAGGING"}
      {!file && (
        <UploadZone {...getRootProps()}>
          <input {...getInputProps()} />
          Click or drag your file here
          <UploadIcon />
        </UploadZone>
      )}
      {file && (
        <>
          <EditorWrapper>
            <AvatarEditor
              ref={editorRef}
              image={file}
              width={250}
              height={250}
              border={50}
              color={[255, 255, 255, 0.6]} // RGBA
              scale={zoom}
              rotate={0}
            />
          </EditorWrapper>
          <SliderWrapper>
            <ZoomOutOutlined />
            <StyledSlider onChange={setZoom} min={1} max={10} step={0.1} />
            <ZoomInOutlined />
          </SliderWrapper>
        </>
      )}
    </Modal>
  );
};

const PreviewWrapper = styled.div`
  position: relative;
  width: 120px;
  height: 120px;
  border-radius: 10px;
`;

const Icon = styled(SmileOutlined)`
  display: block;
  margin-top: 10px;
  svg {
    width: 50px;
    height: 50px;
    color: #8b8b8b;
  }
`;

export const PhotoEditor: React.FC<PhotoProps> = ({ image, setImage }) => {
  const [url, setUrl] = useState("");
  const urlsToRevoke = useRef<string[]>([]);
  useEffect(() => {
    if (image) {
      console.log("CREATING data url");
      // TODO: Error handling
      base64ToDataUrl(image).then(url => {
        setUrl(url);
        urlsToRevoke.current.push(url);
      });
      return () => {
        urlsToRevoke.current.forEach(url => URL.revokeObjectURL(url));
        urlsToRevoke.current = [];
      };
    } else {
      setUrl("");
    }
  }, [image]);
  const [isEditing, setIsEditing] = useState(false);
  const openModal = useCallback(() => {
    setIsEditing(true);
  }, [setIsEditing]);
  const closeModal = useCallback(() => {
    setIsEditing(false);
  }, [setIsEditing]);
  const deleteImage = useCallback(() => {
    setImage(undefined);
  }, [setImage]);

  return (
    <PreviewWrapper className="picture h-32 w-32 flex relative">
      {url ? (
        <>
          <img
            style={{ maxWidth: "300px" }}
            alt="Selected image"
            src={url}
            className="rounded-xl mw-full w-full h-full border-2 border-solid border-gray-100"
          />
          <button
            type="button"
            onClick={deleteImage}
            className="font-semibold rounded-xl bg-gray-100 py-2 px-4 my-2 mx-auto absolute bottom-0 inset-x-0  flex items-center justify-center">
            Remove
          </button>
        </>
      ) : (
        <button
          onClick={openModal}
          type="button"
          className="font-semibold flex flex-col items-center justify-center w-full h-full rounded-xl bg-gray-100">
          Add image
          <Icon />
        </button>
      )}
      {isEditing && <EditModal setImage={setImage} close={closeModal} image={image} />}
    </PreviewWrapper>
  );
};
