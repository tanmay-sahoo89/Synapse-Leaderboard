import { Search, X } from "lucide-react";

interface SearchBarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  selectedDepartment: string;
  onDepartmentChange: (value: string) => void;
  departments: string[];
}

export default function SearchBar({
  searchTerm,
  onSearchChange,
  selectedDepartment,
  onDepartmentChange,
  departments,
}: SearchBarProps) {
  return (
    <div className="glassmorphism rounded-xl shadow-lg p-5 mb-8 border border-cyan-neon/20">
      <div className="flex gap-4 flex-wrap lg:flex-nowrap">
        <div className="relative flex-grow">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-cyan-neon" />
          <input
            type="text"
            placeholder="Search participants..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-12 pr-12 py-3 bg-navy-deep border-2 border-cyan-neon/30 rounded-lg focus:outline-none focus:border-cyan-neon focus:shadow-glow-cyan transition-all text-white placeholder-white/50"
          />
          {searchTerm && (
            <button
              onClick={() => onSearchChange("")}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-orange-neon transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        <select
          value={selectedDepartment}
          onChange={(e) => onDepartmentChange(e.target.value)}
          className="px-5 py-3 border-2 border-cyan-neon/30 rounded-lg focus:outline-none focus:border-cyan-neon focus:shadow-glow-cyan bg-navy-deep text-white font-medium min-w-[200px] transition-all cursor-pointer"
        >
          <option value="">All Departments</option>
          {departments.map((dept) => (
            <option key={dept} value={dept}>
              {dept}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
