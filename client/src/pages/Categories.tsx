import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { serviceCategories, type ServiceItem, type ServiceCategory } from "@/components/sidebar/SidebarData";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { ChevronRight } from "lucide-react";

const Categories = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<ServiceCategory | null>(null);

  const filteredCategories = search.trim()
    ? serviceCategories.map((cat) => ({
        ...cat,
        items: cat.items.filter((item) => 
          item.label.toLowerCase().includes(search.toLowerCase()) ||
          cat.title.toLowerCase().includes(search.toLowerCase())
        ),
      })).filter((cat) => cat.items.length > 0)
    : serviceCategories;

  const handleServiceClick = (item: ServiceItem) => {
    navigate(`/?service=${encodeURIComponent(item.query)}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="pt-16 flex">
        {/* Left Sidebar - Categories */}
        <div className="w-[280px] h-[calc(100vh-4rem)] sticky top-16 border-r bg-card flex flex-col">
          {/* Search */}
          <div className="p-4 border-b">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search categories"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 h-9 text-sm bg-muted/50"
              />
            </div>
          </div>

          {/* Categories List */}
          <ScrollArea className="flex-1 p-2">
            <div className="space-y-1">
              {filteredCategories.map((category) => (
                <button
                  key={category.title}
                  onClick={() => setSelectedCategory(category)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-left transition-colors ${
                    selectedCategory?.title === category.title
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-muted"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <category.icon className="w-5 h-5" />
                    <span className="text-sm font-medium">{category.title}</span>
                  </div>
                  {selectedCategory?.title === category.title && (
                    <ChevronRight className="w-4 h-4" />
                  )}
                </button>
              ))}
            </div>
          </ScrollArea>
        </div>

        {/* Right Content - Subcategories */}
        <div className="flex-1 p-6">
          <div className="max-w-4xl mx-auto">
            {selectedCategory ? (
              <>
                <div className="flex items-center gap-3 mb-6">
                  <selectedCategory.icon className="w-8 h-8 text-primary" />
                  <h1 className="text-2xl font-bold">{selectedCategory.title}</h1>
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {selectedCategory.items.map((item) => (
                    <button
                      key={item.label}
                      onClick={() => handleServiceClick(item)}
                      className="flex items-center gap-3 p-4 rounded-lg border bg-card hover:bg-accent hover:text-accent-foreground transition-colors text-left"
                    >
                      <item.icon className="w-5 h-5 text-muted-foreground" />
                      <span className="font-medium">{item.label}</span>
                    </button>
                  ))}
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center h-[60vh] text-center">
                <h2 className="text-xl font-semibold mb-2">Select a Category</h2>
                <p className="text-muted-foreground">
                  Choose a category from the left sidebar to view available services
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Categories;
