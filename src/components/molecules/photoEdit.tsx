import React, { useCallback, useRef, useState } from "react";
import AvatarEditor from "react-avatar-editor";
import {
  FaceSmileIcon,
  MagnifyingGlassPlusIcon,
  MagnifyingGlassMinusIcon,
} from "@heroicons/react/20/solid";
import { blobToBase64 } from "../../utils/blob";
import { Modal } from "../layout/modal";
import { Button } from "../atoms/button";
import { DropZone } from "../atoms/dropZone";
import { useToggle } from "react-use";

interface PhotoProps {
  image?: string;
  setImage: (value: string | undefined) => void;
}

const EditModal: React.FC<Pick<PhotoProps, "setImage"> & { close: () => void }> = ({
  close,
  setImage,
}) => {
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
    <Modal title="Add your picture" onClose={close}>
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
          <div className="mt-5 sm:mt-6 grid grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
            <Button secondary onClick={close}>
              Cancel
            </Button>
            <Button type="button" onClick={onImageSave}>
              Save
            </Button>
          </div>
        </>
      )}
    </Modal>
  );
};

export const PhotoEditor: React.FC<PhotoProps & { buttonId?: string }> = ({
  buttonId,
  image,
  setImage,
}) => {
  const [isEditing, toggleEditing] = useToggle(false);
  const deleteImage = useCallback(() => {
    setImage(undefined);
  }, [setImage]);
  return (
    <div className="picture h-32 w-32 flex relative">
      {image ? (
        <>
          <img
            style={{ maxWidth: "300px" }}
            alt="Selected image"
            src={image}
            className="rounded-xl mw-full w-full h-full border-2 border-solid border-gray-100"
          />
          <button
            id={buttonId}
            type="button"
            onClick={deleteImage}
            className="font-semibold rounded-xl bg-gray-100 py-2 px-4 my-2 mx-auto absolute bottom-0 inset-x-0  flex items-center justify-center">
            Remove
          </button>
        </>
      ) : (
        <button
          id={buttonId}
          onClick={toggleEditing}
          type="button"
          className="font-semibold flex flex-col items-center justify-center w-full h-full rounded-xl bg-gray-100 ">
          Add image
          <FaceSmileIcon className="w-10 h-10 text-gray-700" />
        </button>
      )}
      {isEditing && <EditModal setImage={setImage} close={toggleEditing} />}
    </div>
  );
};
