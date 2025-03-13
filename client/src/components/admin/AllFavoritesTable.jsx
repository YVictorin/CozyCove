import ActionButton from "./ActionButton"

export default function AllFavoritesTable() {
    const favorites = [
      {
        title: "Sensory Box - Ocean Theme",
        type: "DIY Project",
        category: "Sensory",
        date: "March 12, 2025",
        likes: 462,
        featured: true
      },
      {
        title: "Finding Your Calm Space",
        type: "Interactive Story",
        category: "Calming",
        date: "March 10, 2025",
        likes: 385,
        featured: true
      },
      {
        title: "Weighted Blanket DIY",
        type: "DIY Project",
        category: "Sensory",
        date: "March 8, 2025",
        likes: 328,
        featured: true
      },
      {
        title: "Ocean Friends Adventure",
        type: "Animated Video",
        category: "Social Skills",
        date: "March 5, 2025",
        likes: 312,
        featured: true
      }
    ];
  
    return (
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="p-4 text-left border-b border-gray-200 text-gray-500 font-semibold">Title</th>
              <th className="p-4 text-left border-b border-gray-200 text-gray-500 font-semibold">Type</th>
              <th className="p-4 text-left border-b border-gray-200 text-gray-500 font-semibold">Category</th>
              <th className="p-4 text-left border-b border-gray-200 text-gray-500 font-semibold">Added Date</th>
              <th className="p-4 text-left border-b border-gray-200 text-gray-500 font-semibold">Likes</th>
              <th className="p-4 text-left border-b border-gray-200 text-gray-500 font-semibold">Featured</th>
              <th className="p-4 text-left border-b border-gray-200 text-gray-500 font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {favorites.map((item, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="p-4 border-b border-gray-200">{item.title}</td>
                <td className="p-4 border-b border-gray-200">{item.type}</td>
                <td className="p-4 border-b border-gray-200">{item.category}</td>
                <td className="p-4 border-b border-gray-200">{item.date}</td>
                <td className="p-4 border-b border-gray-200">{item.likes}</td>
                <td className="p-4 border-b border-gray-200">
                  {item.featured && (
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-purple-50 text-purple-700">
                      Featured
                    </span>
                  )}
                </td>
                <td className="p-4 border-b border-gray-200">
                  <div className="flex gap-2">
                    <ActionButton icon="fa-edit" />
                    <ActionButton icon="fa-eye" />
                    <ActionButton icon="fa-star" />
                    <ActionButton icon="fa-trash" danger />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }