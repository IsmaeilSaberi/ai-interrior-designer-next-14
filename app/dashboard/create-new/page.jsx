"use client";
import React, { useState } from "react";
import ImageSelection from "./_components/ImageSelection";
import InteriorType from "./_components/InteriorType";
import DesignType from "./_components/DesignType";
import AdditionalRequirements from "./_components/AdditionalRequirements";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { S3 } from "aws-sdk";

function CreateNew() {
  const [formData, setFormData] = useState([]);
  const [uploadError, setUploadError] = useState(null);
  const [uploadFile, setUploadFile] = useState(null);
  const [uploadLink, setUploadLink] = useState(null);

  const onHandleInputChange = (value, fieldName) => {
    setFormData((prev) => ({
      ...prev,
      [fieldName]: value,
    }));
  };

  const GenerateAiImage = async () => {
    const rawImageUrl = await SaveRawImageToLiara();
    console.log(rawImageUrl);

    const result = await axios.post("/api/redesign-room", {
      imageUrl: rawImageUrl,
      interiorType: formData?.interiorType,
      designType: formData?.designType,
      additionalRequirements: formData?.additionalRequirements,
    });
    console.log(result);
  };

  // a function for uploading file or image to liara
  const SaveRawImageToLiara = async () => {
    try {
      if (!uploadFile) {
        setUploadError("Please select a file");
        return;
      }

      const accessKeyId = process.env.NEXT_PUBLIC_LIARA_ACCESS_KEY;
      const secretAccessKey = process.env.NEXT_PUBLIC_LIARA_SECRET_KEY;
      const endpoint = process.env.NEXT_PUBLIC_LIARA_ENDPOINT;
      const bucket = process.env.NEXT_PUBLIC_LIARA_BUCKET_NAME;

      const s3 = new S3({
        accessKeyId,
        secretAccessKey,
        endpoint,
      });

      const params = {
        Bucket: bucket,
        Key: uploadFile.name,
        Body: uploadFile,
      };

      const response = await s3.upload(params).promise();
      const signedUrl = s3.getSignedUrl("getObject", {
        Bucket: bucket,
        Key: uploadFile.name,
        Expires: 3600,
      });

      setUploadLink(signedUrl);

      // Get permanent link
      const permanentSignedUrl = s3.getSignedUrl("getObject", {
        Bucket: bucket,
        Key: uploadFile.name,
        Expires: 31536000, // 1 year
      });

      // onUpload(response);

      console.log("File uploaded successfully");
      return permanentSignedUrl;
    } catch (error) {
      console.log(error);
      setUploadError("Error uploading file: " + error.message);
    }
  };

  return (
    <div>
      <h2 className="font-bold text-4xl text-primary text-center">
        Experience the Magic of AI Remodeling
      </h2>
      <p className="text-center text-gray-500">
        Transform any interior with a click. Select a space, choose a style, and
        watch as AI instantly reimagines your environment.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 mt-10 gap-10">
        {/* Image Selection */}
        <ImageSelection
          setUploadFile={setUploadFile}
          selectedImage={(value) => onHandleInputChange(value, "image")}
        />
        {/* Form Input Section */}
        <div>
          {/* Interior Type */}
          <InteriorType
            selectedInteriorType={(value) =>
              onHandleInputChange(value, "interiorType")
            }
          />
          {/* Design Type */}
          <DesignType
            selectedDesignType={(value) =>
              onHandleInputChange(value, "designType")
            }
          />

          {/* Additional Requirements Textarea(optional) */}
          <AdditionalRequirements
            additionalRequirementsInput={(value) =>
              onHandleInputChange(value, "additionalRequirements")
            }
          />
          {/* Button To Generate Image */}
          <Button onClick={GenerateAiImage} className="w-full mt-5">
            Generate
          </Button>
          <p className="text-sm text-gray-400 mb-52">
            NOTE: 1 Credit will use to redesign your interior
          </p>
        </div>
      </div>
    </div>
  );
}

export default CreateNew;
