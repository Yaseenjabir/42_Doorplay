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
