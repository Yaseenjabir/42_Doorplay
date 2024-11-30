import { useEffect } from "react";

export interface DoorSchema {
  _id: string;
  category: string;
  construction: {
    title: string | undefined;
    description: string | undefined;
  };
  customization: {
    title: string | undefined;
    description: string | undefined;
  };
  insulation: {
    title: string | undefined;
    description: string | undefined;
  };
  material: {
    title: string | undefined;
    description: string | undefined;
  };
  reinforcement: {
    title: string | undefined;
    description: string | undefined;
  };
  isFavourited: boolean;
  shortPreview: string;
  stockCount: number;
  subcategory: string;
  description: string;
  title: string;
  media: Array<{
    _id: string;
    public_id: string;
    url: string;
  }>;
}

export interface UserModel {
  name: string;
  email: string;
  userRole: string;
}

export interface DoorModel {
  _id: string;
  title: string;
}

export interface ReviewModel {
  _id: string;
  description: string;
  title: string;
  door: DoorModel;
  email: string;
  name: string;
  rating: number;
}

export const imageReplacement =
  "https://media.istockphoto.com/id/1409329028/vector/no-picture-available-placeholder-thumbnail-icon-illustration-design.webp?s=1024x1024&w=is&k=20&c=Bs1RdueQnaAcO888WBIQsC6NvA7aVTzeRVzSd8sJfUg=";

export const useProcessData = (
  category: string,
  setState: any,
  data: DoorSchema[]
) => {
  useEffect(() => {
    const processData = () => {
      const filteredData = data.filter((item) => item.category === category);

      const categoryMap = new Map();

      filteredData.forEach((item) => {
        const { category, subcategory } = item;

        if (!categoryMap.has(category)) {
          categoryMap.set(category, new Set());
        }

        categoryMap.get(category).add(subcategory);
      });
      const result: any = [];
      categoryMap.forEach((subcategories, category) => {
        subcategories.forEach((subcategory: string) => {
          result.push({ category, subcategory });
        });
      });
      setState(result);
    };
    processData();
  }, [category, setState, data]);
};

export async function deleteCache(cacheKey: string) {
  const cache = await caches.open("A&R-Doors");
  cache.delete(cacheKey);
}
