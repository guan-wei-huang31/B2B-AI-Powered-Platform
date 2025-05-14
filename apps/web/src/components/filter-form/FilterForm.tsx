'use client';

import {
  FilterKey,
  FilterOption,
  FilterOptionItem,
  SelectedFilterOptions,
} from '@/model/filter-option';

import {
  MultiSelector,
  MultiSelectorContent,
  MultiSelectorInput,
  MultiSelectorItem,
  MultiSelectorList,
  MultiSelectorTrigger,
} from '../ui/extension/multi-select';

const FilterKeyMapping = {
  [FilterKey.cid]: 'Material Category',
  [FilterKey.fid]: 'Material Form',
  [FilterKey.aid]: 'Application',
  [FilterKey.iid]: 'Ingredients',
  [FilterKey.sid]: 'Supplier',
  [FilterKey.hid]: 'Health Claim',
} as const;
interface FilterFormProps {
  value: SelectedFilterOptions;
  onChange: (key: FilterKey, value: FilterOptionItem[]) => void;
  filterOptions: FilterOption[];
  onClearAll: () => void;
}

export function FilterForm({ value, onChange, filterOptions, onClearAll }: FilterFormProps) {
  return (
    <form className="w-full p-6 rounded-lg bg-primary/70 dark:bg-primary">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-border">Filter</h1>
        <button
          type="button"
          onClick={onClearAll}
          className="hover:bg-white/50 py-1 px-2 rounded-full text-sm shadow-float ease-in-out duration-500"
        >
          Clear All
        </button>
      </div>

      <div>
        {filterOptions.map((item) => {
          const key = item.key;
          const options = item.options;
          const selectedOptions = value[key] || [];

          return (
            <div key={key}>
              <p className="text-border mb-2">{FilterKeyMapping[key]}</p>
              <MultiSelector
                key={key}
                values={selectedOptions}
                onValuesChange={(newValues) => {
                  onChange(key, newValues);
                }}
                loop
              >
                <MultiSelectorTrigger
                  className={options.length === 0 ? 'bg-gray-50 opacity-50 cursor-not-allowed' : ''}
                >
                  <MultiSelectorInput
                    disabled={options.length === 0}
                    placeholder={
                      options.length === 0
                        ? 'No options available'
                        : `Select ${FilterKeyMapping[key]}`
                    }
                  />
                </MultiSelectorTrigger>
                <MultiSelectorContent>
                  <MultiSelectorList>
                    {options.map((option) => (
                      <MultiSelectorItem key={option.id} value={option}>
                        {option.name}
                      </MultiSelectorItem>
                    ))}
                  </MultiSelectorList>
                </MultiSelectorContent>
              </MultiSelector>
            </div>
          );
        })}
      </div>
    </form>
  );
}
