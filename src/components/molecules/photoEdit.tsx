import React, { useCallback, useRef, useState } from "react";
import AvatarEditor from "react-avatar-editor";
import {
  FaceSmileIcon,
  MagnifyingGlassPlusIcon,
  MagnifyingGlassMinusIcon,
} from "@heroicons/react/24/outline";
import { blobToBase64 } from "../../utils/blob";
import { Modal } from "../layout/modal";
import { Button } from "../atoms/button";
import { DropZone } from "../atoms/dropZone";
import { useToggle } from "react-use";
import useTranslation from "next-translate/useTranslation";
import { BigModal } from "../layout/bigModal";
import { TrashIcon } from "@heroicons/react/24/outline";

interface PhotoProps {
  image?: string;
  setImage: (value: string | undefined) => void;
}

const EditModalContent: React.FC<Pick<PhotoProps, "setImage"> & { close: () => void }> = ({
  close,
  setImage,
}) => {
  const { t } = useTranslation("app");
  const [file, setFile] = useState<File>();
  const onImageSave = useCallback(() => {
    const editor = editorRef.current;
    if (!editor) {
      return;
    }
    return new Promise((res, rej) => {
      editor.getImageScaledToCanvas().toBlob(blob =>
        blobToBase64(blob)
          .then(base64 => {
            setImage(base64);
            res(base64);
          })
          .catch(rej)
          .finally(close),
        "image/jpeg",
        0.8,
      );
    });
  }, [close, setImage]);

  const editorRef = useRef<AvatarEditor>();
  const [zoom, setZoom] = useState(1);
  const onDrop = useCallback(([file]: File[]) => {
    setFile(file);
    // Do something with the files
  }, []);

  return (
    <>
      {!file && <DropZone onDrop={onDrop} accept="image/*" multiple={false} />}
      {file && (
        <>
          <div className="flex justify-center">
            <AvatarEditor
              ref={editorRef}
              image={file}
              width={300}
              height={300}
              border={50}
              color={[255, 255, 255, 0.6]} // RGBA
              scale={zoom}
              rotate={0}
            />
          </div>
          <div className="flex mt-2">
            <MagnifyingGlassMinusIcon className="h-5 w-5" />
            <input
              onChange={e => setZoom(1 + (parseInt(e.target.value) - 1) / 10)}
              type="range"
              min="1"
              max="100"
              step="1"
              defaultValue="1"
              className="flex-1 mx-2"
            />
            <MagnifyingGlassPlusIcon className="h-5 w-5" />
          </div>
          <div className="mt-5 sm:mt-6 grid grid-cols-2 gap-3 sm:grid-flow-row-dense">
            <Button secondary onClick={close}>
              {t("cancel")}
            </Button>
            <Button type="button" onClick={onImageSave}>
              {t("save")}
            </Button>
          </div>
        </>
      )}
    </>
  );
};

export const PhotoEditor: React.FC<PhotoProps & { buttonId?: string }> = React.memo(({
  buttonId,
  image,
  setImage,
}) => {
  const { t } = useTranslation("app");
  const [isEditing, toggleEditing] = useToggle(false);
  const deleteImage = useCallback(() => {
    setImage(undefined);
  }, [setImage]);
  return (
    <div className="picture aspect-square w-32 flex relative">
      {image ? (
        <>
          <img
            style={{ maxWidth: "300px" }}
            alt={t("yourPhoto")}
            src={image}
            className="rounded-xl mw-full w-full h-full border-2 border-solid border-gray-100"
          />
          <Button icon={TrashIcon} tertiary id={buttonId} onClick={deleteImage} className="absolute bottom-0 inset-x-0  flex items-center justify-center">{t("delete")}</Button>
        </>
      ) : (
        <Button
          secondary
          id={buttonId}
          onClick={toggleEditing}
          type="button"
          className="font-semibold flex flex-col items-center justify-center w-full h-full rounded-xl">
          {t("addPhoto")}
          <FaceSmileIcon aria-hidden className="w-10 h-10" />
        </Button>
      )}
      <BigModal show={isEditing} historyKey="photo-edit" onClose={toggleEditing} title={t("addPhoto")}>
        <EditModalContent setImage={setImage} close={toggleEditing} />
      </BigModal>
    </div>
  );
});
