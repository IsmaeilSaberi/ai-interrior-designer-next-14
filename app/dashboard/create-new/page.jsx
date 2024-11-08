"use client";
import React, { useState } from "react";
import ImageSelection from "./_components/ImageSelection";
import InteriorType from "./_components/InteriorType";
import DesignType from "./_components/DesignType";
import AdditionalRequirements from "./_components/AdditionalRequirements";
import { Button } from "@/components/ui/button";

function CreateNew() {
  const [formData, setFormData] = useState([]);
  const onHandleInputChange = (value, fieldNmae) => {
    setFormData((prev) => ({
      ...prev,
      [fieldNmae]: value,
    }));
    console.log(formData);
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
          <Button className="w-full mt-5">Generate</Button>
          <p className="text-sm text-gray-400 mb-52">
            NOTE: 1 Credit will use to redesign your interior
          </p>
        </div>
      </div>
    </div>
  );
}

export default CreateNew;
