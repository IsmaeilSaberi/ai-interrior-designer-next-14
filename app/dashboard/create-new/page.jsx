"use client";
import React from "react";
import ImageSelection from "./_components/ImageSelection";
import InterriorType from "./_components/InterriorType";

function CreateNew() {
  const onHandleInputChange = (value, fieldNmae) => {};
  return (
    <div>
      <h2 className="font-bold text-4xl text-primary text-center">
        Experience the Magic of AI Remodeling
      </h2>
      <p className="text-center text-gray-500">
        Transform any interrior with a click. Select a space, choose a style,
        and watch as AI instantly reimagines your environment.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 mt-10 gap-10">
        {/* Image Selection */}
        <ImageSelection
          selectedImage={(value) => onHandleInputChange(value, "image")}
        />
        {/* Form Input Section */}
        <div>
          {/* Interior Type */}
          <InterriorType
            selectedInterriorType={(value) =>
              onHandleInputChange(value, "interriorType")
            }
          />
          {/* Design Type */}

          {/* Additional Requirement Textarea(optional) */}

          {/* Button To Generate Image */}
        </div>
      </div>
    </div>
  );
}

export default CreateNew;
