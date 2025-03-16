"use client"

import { Button } from "@/components/ui/button"
import { Upload } from "lucide-react"
import { CldUploadWidget, CloudinaryUploadWidgetInfo, CloudinaryUploadWidgetResults } from 'next-cloudinary';
import type React from "react"
const UPLOAD_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_PRESET_NAME
interface FileUploadProps {
    onChange: (value: string) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ onChange }) => {
    const onUpload = (result: CloudinaryUploadWidgetResults) => {
        if (result.event === "success") {
          const info = result.info as CloudinaryUploadWidgetInfo; // ✅ Ensure info is correctly typed
          if (info && "secure_url" in info) {
            onChange(info.secure_url);
            console.log(info.secure_url);
          }
        }
      };
    return (
        <div
            className={`border-2 border-dashed rounded-lg p-4 text-center `}
        >
            <p className="mb-2 text-sm text-gray-500">Click on the button to upload documents</p>
            <p className="text-xs text-gray-500 mb-4">Supported formats: PDF, JPG, PNG</p>
            <CldUploadWidget onSuccess={onUpload} uploadPreset={UPLOAD_PRESET} options={{ multiple: false }}>
                {({ open }) => {
                    const onClick = () => {
                        open();
                    };

                    return (
                        <Button
                            type="button"
                            // disabled={disabled}
                            variant="secondary"
                            onClick={onClick}
                        >
                            <Upload className="h-4 w-4 mr-2" />
                            Upload an Attachment
                        </Button>
                    );
                }}
            </CldUploadWidget>
        </div>
    )
}

export default FileUpload