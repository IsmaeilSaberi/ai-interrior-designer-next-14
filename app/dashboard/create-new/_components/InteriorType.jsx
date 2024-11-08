import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function interiorType({ selectedInteriorType }) {
  return (
    <div>
      <label className="text-slate-400">Select Interior Type *</label>
      <Select onValueChange={(value) => selectedInteriorType(value)}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Interior Type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="Living Room">Living Room</SelectItem>
          <SelectItem value="Bedroom">Bedroom</SelectItem>
          <SelectItem value="Kitchen">Kitchen</SelectItem>
          <SelectItem value="Office">Office</SelectItem>
          <SelectItem value="Bathroom">Bathroom</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}

export default interiorType;
