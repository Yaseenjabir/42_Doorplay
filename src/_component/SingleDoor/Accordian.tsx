import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../components/ui/accordion";
import { FaLayerGroup } from "react-icons/fa";
import { BsBricks } from "react-icons/bs";
import { PiMagicWand } from "react-icons/pi";
import { LiaThermometerFullSolid } from "react-icons/lia";
import { BsWind } from "react-icons/bs";
interface DoorSchema {
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
  subCategory: string;
  title: string;
  media: Array<{
    _id: string;
    public_id: string;
    url: string;
  }>;
}

interface SingleDoorSchema {
  singleDoor: DoorSchema;
}

const AccordionComponent: React.FC<SingleDoorSchema> = ({ singleDoor }) => {
  return (
    <>
      <Accordion type="single" collapsible>
        <AccordionItem value="overview">
          <AccordionTrigger className="text-xl font-bold py-9 md:text-2xl lg:text-xl accordion-trigger hover:no-underline">
            Overview
          </AccordionTrigger>
          <AccordionContent className="flex flex-col gap-10">
            {/* Construction Layer  */}
            {(singleDoor?.construction?.title ||
              singleDoor?.construction?.description) && (
              <div>
                <div className="flex items-start gap-2 text-gray-700">
                  <FaLayerGroup className="w-[32px] h-[32px]" />
                  <h1 className="text-base font-semibold md:text-lg lg:text-base">
                    {singleDoor?.construction?.title}
                  </h1>
                </div>
                <p className="text-base pl-10 mt-3 md:text-lg lg:text-base">
                  {singleDoor?.construction?.description}
                </p>
              </div>
            )}

            {/* Faux Wood-Look Composite */}
            {(singleDoor?.material?.title ||
              singleDoor?.material?.description) && (
              <div>
                <div className="flex items-start gap-2 text-gray-700">
                  <BsBricks className="w-[32px] h-[32px]" />
                  <h1 className="text-base font-semibold md:text-lg lg:text-base">
                    {singleDoor && singleDoor?.material?.title}
                  </h1>
                </div>
                <p className="text-base pl-10 mt-3 md:text-lg lg:text-base">
                  {singleDoor && singleDoor?.material?.description}
                </p>
              </div>
            )}

            {/* Design Costumization  */}
            {(singleDoor?.customization?.title ||
              singleDoor?.customization?.description) && (
              <div>
                <div className="flex items-start gap-2 text-gray-700">
                  <PiMagicWand className="w-[32px] h-[32px]" />
                  <h1 className="text-base font-semibold md:text-lg lg:text-base">
                    {singleDoor?.customization?.title}
                  </h1>
                </div>
                <p className="text-base pl-10 mt-3 md:text-lg lg:text-base">
                  {singleDoor?.customization?.description}
                </p>
              </div>
            )}

            {/* Insulation  */}
            {(singleDoor?.insulation?.title ||
              singleDoor?.insulation?.description) && (
              <div>
                <div className="flex items-start gap-2 text-gray-700">
                  <LiaThermometerFullSolid className="w-[32px] h-[32px]" />
                  <h1 className="text-base font-semibold md:text-lg lg:text-base">
                    {singleDoor?.insulation?.title}
                  </h1>
                </div>
                <p className="text-base pl-10 mt-3 md:text-lg lg:text-base">
                  {singleDoor?.insulation?.description}
                </p>
              </div>
            )}

            {/* Door Reinforcement  */}
            {(singleDoor?.reinforcement?.title ||
              singleDoor?.reinforcement?.description) && (
              <div>
                <div className="flex items-start gap-2 text-gray-700">
                  <BsWind className="w-[32px] h-[32px]" />
                  <h1 className="text-base font-semibold md:text-lg lg:text-base">
                    {singleDoor?.reinforcement?.title}
                  </h1>
                </div>
                <p className="text-base pl-10 mt-3 md:text-lg lg:text-base">
                  {singleDoor?.reinforcement?.description}
                </p>
              </div>
            )}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </>
  );
};

export default AccordionComponent;
