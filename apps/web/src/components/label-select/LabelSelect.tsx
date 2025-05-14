import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface LabelSelectProps {
  label: string;
  options: string[];
  onChange?: (value: string) => void;
}

export function LabelSelect({ label, options, onChange }: LabelSelectProps) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">{label}</label>
      <Select onValueChange={onChange}>
        <SelectTrigger className="w-full bg-background border-none">
          <SelectValue placeholder="Select option" />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option} value={option}>
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
