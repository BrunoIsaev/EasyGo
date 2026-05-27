"use client";

import Image from "next/image";
import { Search } from "lucide-react";
import { AFISHA_STORIES, LOCATIONS } from "@/lib/constants";

function LocationTile({
  name,
  image,
  className,
}: {
  name: string;
  image: string;
  className: string;
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-2xl ${className}`}
    >
      <Image src={image} alt={name} fill className="object-cover" sizes="140px" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />
      <span className="absolute bottom-2 left-2 right-2 text-[10px] font-semibold leading-tight text-white">
        {name}
      </span>
    </div>
  );
}

export function HomeScreenMock() {
  const [makhachkala, sulak, karadakh, derbent] = LOCATIONS;

  return (
    <div className="flex h-full flex-col overflow-hidden bg-white px-3 pb-3 pt-9">
      <div className="mb-3 flex gap-2 overflow-hidden">
        {AFISHA_STORIES.map((story) => (
          <div
            key={story.id}
            className={`h-11 w-11 shrink-0 overflow-hidden rounded-full p-[2px] ${
              "active" in story && story.active
                ? "bg-gradient-to-tr from-emerald to-emerald-light"
                : "bg-gray-200"
            }`}
          >
            <div className="relative h-full w-full overflow-hidden rounded-full bg-white p-[2px]">
              <Image
                src={story.image}
                alt={story.label}
                width={44}
                height={44}
                className="h-full w-full rounded-full object-cover"
              />
            </div>
          </div>
        ))}
      </div>

      <h2 className="mb-2 text-sm font-bold">Локации</h2>

      <div className="grid flex-1 grid-cols-2 grid-rows-2 gap-1.5">
        <LocationTile
          name={makhachkala.name}
          image={makhachkala.image}
          className="min-h-[76px]"
        />
        <LocationTile
          name={sulak.name}
          image={sulak.image}
          className="min-h-[76px]"
        />
        <LocationTile
          name={karadakh.name}
          image={karadakh.image}
          className="min-h-[76px]"
        />
        <LocationTile
          name={derbent.name}
          image={derbent.image}
          className="min-h-[76px]"
        />
      </div>
    </div>
  );
}
