import { Search, Filter } from 'lucide-react';

const PostsFilter = ({ 
  searchTerm, 
  setSearchTerm, 
  filterCategory, 
  setFilterCategory, 
  categories 
}) => {
  return (
    <div className="bg-white rounded-lg p-4 shadow-lg border border-[var(--accent)]/20">
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[var(--text-dark)]/40" />
            <input
              type="text"
              placeholder="Search posts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-[var(--accent)]/50 rounded-lg focus:border-[var(--dark-btn)] focus:outline-none font-sans"
            />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-[var(--text-dark)]/40" />
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="px-3 py-2 border border-[var(--accent)]/50 rounded-lg focus:border-[var(--dark-btn)] focus:outline-none bg-white font-sans"
          >
            {categories.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default PostsFilter;