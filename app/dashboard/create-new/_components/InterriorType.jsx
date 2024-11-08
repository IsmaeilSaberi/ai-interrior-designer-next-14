import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function InterriorType({ selectedInterriorType }) {
  return (
    <div>
      <label className="text-slate-400">Select Interrior Type *</label>
      <Select onValueChange={(value) => selectedInterriorType(value)}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Interrior Type" />
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

export default InterriorType;
